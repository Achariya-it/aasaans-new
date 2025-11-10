import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import bcrypt from "bcryptjs";
import { storage } from "./storage";
import {
  insertUserSchema,
  insertEnrollmentSchema,
  insertCertificateSchema,
  insertUnlockedResumeSchema,
} from "@shared/schema";

// Middleware to require authentication
function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existing = await storage.getUserByEmail(userData.email);
      if (existing) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      const user = await storage.createUser({
        ...userData,
        password: hashedPassword,
      });

      // Set session
      req.session.userId = user.id;

      // Don't send password back
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(400).json({ message: "Invalid user data", error });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await storage.getUserByEmail(email);

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Verify password
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Set session
      req.session.userId = user.id;

      // Don't send password back
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(400).json({ message: "Login failed", error });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  // User routes
  app.get("/api/users/me", requireAuth, async (req, res) => {
    const user = await storage.getUser(req.session.userId!);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  });

  app.get("/api/users/:id", requireAuth, async (req, res) => {
    const user = await storage.getUser(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  });

  // Course routes
  app.get("/api/courses", async (req, res) => {
    const courses = await storage.getAllCourses();
    res.json(courses);
  });

  app.get("/api/courses/:id", async (req, res) => {
    const course = await storage.getCourse(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  });

  // Enrollment routes
  app.get("/api/enrollments", requireAuth, async (req, res) => {
    const enrollments = await storage.getEnrollmentsByUser(req.session.userId!);
    
    // Enrich with course data
    const enriched = await Promise.all(
      enrollments.map(async (enrollment) => {
        const course = await storage.getCourse(enrollment.courseId);
        return {
          ...enrollment,
          course,
        };
      })
    );

    res.json(enriched);
  });

  app.post("/api/enrollments", requireAuth, async (req, res) => {
    try {
      const { courseId } = req.body;
      const userId = req.session.userId!;

      // Check if already enrolled
      const existing = await storage.getEnrollment(userId, courseId);
      if (existing) {
        return res.status(400).json({ message: "Already enrolled in this course" });
      }

      const enrollment = await storage.createEnrollment({ userId, courseId });
      res.json(enrollment);
    } catch (error) {
      res.status(400).json({ message: "Invalid enrollment data", error });
    }
  });

  app.patch("/api/enrollments/:id/progress", requireAuth, async (req, res) => {
    try {
      // Load enrollment first to verify ownership before any mutation
      const enrollment = await storage.getEnrollmentById(req.params.id);
      
      if (!enrollment) {
        return res.status(404).json({ message: "Enrollment not found" });
      }

      // Verify ownership before any state change
      if (enrollment.userId !== req.session.userId) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const { progress, completedLessons } = req.body;
      const updatedEnrollment = await storage.updateEnrollmentProgress(
        req.params.id,
        progress,
        completedLessons
      );

      res.json(updatedEnrollment);
    } catch (error) {
      res.status(400).json({ message: "Failed to update progress", error });
    }
  });

  app.post("/api/enrollments/:id/complete", requireAuth, async (req, res) => {
    try {
      const enrollment = await storage.getEnrollmentById(req.params.id);
      if (!enrollment) {
        return res.status(404).json({ message: "Enrollment not found" });
      }

      // Verify ownership
      if (enrollment.userId !== req.session.userId) {
        return res.status(403).json({ message: "Forbidden" });
      }

      // Idempotency check: if already completed, return 409 Conflict
      if (enrollment.isCompleted) {
        return res.status(409).json({ message: "Course already completed" });
      }

      // Complete enrollment
      const completedEnrollment = await storage.completeEnrollment(req.params.id);

      // Get course details
      const course = await storage.getCourse(enrollment.courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      // Award skill points
      const updatedUser = await storage.updateUserSkillPoints(
        req.session.userId!,
        course.skillPoints
      );

      // Create certificate
      const certificate = await storage.createCertificate({
        userId: req.session.userId!,
        courseId: enrollment.courseId,
        courseName: course.title,
        skillPointsEarned: course.skillPoints,
      });

      res.json({
        enrollment: completedEnrollment,
        certificate,
        user: updatedUser,
      });
    } catch (error) {
      res.status(400).json({ message: "Failed to complete course", error });
    }
  });

  // Certificate routes
  app.get("/api/certificates", requireAuth, async (req, res) => {
    const certificates = await storage.getCertificatesByUser(req.session.userId!);
    res.json(certificates);
  });

  // Candidate search routes (for employers)
  app.get("/api/candidates/search", requireAuth, async (req, res) => {
    const currentUser = await storage.getUser(req.session.userId!);
    if (currentUser?.role !== "employer") {
      return res.status(403).json({ message: "Only employers can search candidates" });
    }

    const minSkillPoints = req.query.minSkillPoints
      ? parseInt(req.query.minSkillPoints as string)
      : undefined;
    const skills = req.query.skills
      ? (req.query.skills as string).split(",")
      : undefined;

    const candidates = await storage.searchCandidates({
      minSkillPoints,
      skills,
    });

    // Remove sensitive data
    const sanitized = candidates.map(({ password, email, ...rest }) => rest);
    res.json(sanitized);
  });

  // Resume unlock routes
  app.post("/api/resumes/unlock", requireAuth, async (req, res) => {
    try {
      const currentUser = await storage.getUser(req.session.userId!);
      if (currentUser?.role !== "employer") {
        return res.status(403).json({ message: "Only employers can unlock resumes" });
      }

      const { candidateId } = req.body;

      // Check if already unlocked
      const alreadyUnlocked = await storage.isResumeUnlocked(
        req.session.userId!,
        candidateId
      );

      if (alreadyUnlocked) {
        return res.status(400).json({ message: "Resume already unlocked" });
      }

      // For MVP: Mock payment - just unlock directly
      const unlock = await storage.unlockResume({
        employerId: req.session.userId!,
        candidateId,
      });
      
      // Get full candidate details
      const candidate = await storage.getUser(candidateId);
      if (!candidate) {
        return res.status(404).json({ message: "Candidate not found" });
      }

      const { password, ...candidateData } = candidate;
      res.json({
        unlock,
        candidate: candidateData,
      });
    } catch (error) {
      res.status(400).json({ message: "Failed to unlock resume", error });
    }
  });

  app.get("/api/resumes/unlocked", requireAuth, async (req, res) => {
    const currentUser = await storage.getUser(req.session.userId!);
    if (currentUser?.role !== "employer") {
      return res.status(403).json({ message: "Only employers can view unlocked resumes" });
    }

    const candidates = await storage.getUnlockedCandidates(req.session.userId!);
    const sanitized = candidates.map(({ password, ...rest }) => rest);
    res.json(sanitized);
  });

  app.get("/api/resumes/is-unlocked", requireAuth, async (req, res) => {
    const currentUser = await storage.getUser(req.session.userId!);
    if (currentUser?.role !== "employer") {
      return res.status(403).json({ message: "Only employers can check unlock status" });
    }

    const { candidateId } = req.query;
    if (!candidateId) {
      return res.status(400).json({ message: "candidateId is required" });
    }

    const isUnlocked = await storage.isResumeUnlocked(
      req.session.userId!,
      candidateId as string
    );

    res.json({ isUnlocked });
  });

  const httpServer = createServer(app);
  return httpServer;
}
