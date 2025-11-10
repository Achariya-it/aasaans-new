import {
  type User,
  type InsertUser,
  type Course,
  type InsertCourse,
  type Enrollment,
  type InsertEnrollment,
  type Certificate,
  type InsertCertificate,
  type UnlockedResume,
  type InsertUnlockedResume,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserSkillPoints(userId: string, points: number): Promise<User | undefined>;
  
  // Course operations
  getAllCourses(): Promise<Course[]>;
  getCourse(id: string): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  
  // Enrollment operations
  getEnrollmentsByUser(userId: string): Promise<Enrollment[]>;
  getEnrollment(userId: string, courseId: string): Promise<Enrollment | undefined>;
  getEnrollmentById(id: string): Promise<Enrollment | undefined>;
  createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment>;
  updateEnrollmentProgress(id: string, progress: number, completedLessons: number): Promise<Enrollment | undefined>;
  completeEnrollment(id: string): Promise<Enrollment | undefined>;
  
  // Certificate operations
  getCertificatesByUser(userId: string): Promise<Certificate[]>;
  createCertificate(certificate: InsertCertificate): Promise<Certificate>;
  
  // Candidate search operations
  searchCandidates(query?: { minSkillPoints?: number; skills?: string[] }): Promise<User[]>;
  
  // Resume unlock operations
  unlockResume(unlock: InsertUnlockedResume): Promise<UnlockedResume>;
  isResumeUnlocked(employerId: string, candidateId: string): Promise<boolean>;
  getUnlockedCandidates(employerId: string): Promise<User[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private courses: Map<string, Course>;
  private enrollments: Map<string, Enrollment>;
  private certificates: Map<string, Certificate>;
  private unlockedResumes: Map<string, UnlockedResume>;

  constructor() {
    this.users = new Map();
    this.courses = new Map();
    this.enrollments = new Map();
    this.certificates = new Map();
    this.unlockedResumes = new Map();
    this.seedData();
  }

  private seedData() {
    // Seed some courses
    const courseData: InsertCourse[] = [
      {
        title: "Complete Web Development Bootcamp",
        description: "Master web development with HTML, CSS, JavaScript, React, Node.js, and more",
        instructor: "Dr. Angela Yu",
        thumbnail: "/assets/web-dev.jpg",
        duration: "40 hours",
        skillPoints: 200,
        totalLessons: 12,
      },
      {
        title: "Data Science & Machine Learning",
        description: "Learn Python, data analysis, visualization, and machine learning algorithms",
        instructor: "Jose Portilla",
        thumbnail: "/assets/data-science.jpg",
        duration: "35 hours",
        skillPoints: 250,
        totalLessons: 15,
      },
      {
        title: "Digital Marketing Masterclass",
        description: "Master SEO, social media marketing, email marketing, and analytics",
        instructor: "Phil Ebiner",
        thumbnail: "/assets/digital-marketing.jpg",
        duration: "25 hours",
        skillPoints: 150,
        totalLessons: 10,
      },
      {
        title: "Project Management Professional",
        description: "Learn project management methodologies, tools, and best practices",
        instructor: "Chris Croft",
        thumbnail: "/assets/project-management.jpg",
        duration: "30 hours",
        skillPoints: 180,
        totalLessons: 12,
      },
    ];

    courseData.forEach(async (course) => {
      await this.createCourse(course);
    });
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find((user) => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      ...insertUser,
      id,
      headline: insertUser.headline ?? null,
      location: insertUser.location ?? null,
      skills: insertUser.skills ?? null,
      resumeUrl: insertUser.resumeUrl ?? null,
      companyName: insertUser.companyName ?? null,
      skillPoints: 0,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserSkillPoints(userId: string, points: number): Promise<User | undefined> {
    const user = this.users.get(userId);
    if (!user) return undefined;

    const updatedUser = { ...user, skillPoints: (user.skillPoints || 0) + points };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  // Course operations
  async getAllCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }

  async getCourse(id: string): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = randomUUID();
    const course: Course = {
      ...insertCourse,
      id,
      totalLessons: insertCourse.totalLessons ?? 12,
      createdAt: new Date(),
    };
    this.courses.set(id, course);
    return course;
  }

  // Enrollment operations
  async getEnrollmentsByUser(userId: string): Promise<Enrollment[]> {
    return Array.from(this.enrollments.values()).filter((e) => e.userId === userId);
  }

  async getEnrollment(userId: string, courseId: string): Promise<Enrollment | undefined> {
    return Array.from(this.enrollments.values()).find(
      (e) => e.userId === userId && e.courseId === courseId
    );
  }

  async getEnrollmentById(id: string): Promise<Enrollment | undefined> {
    return this.enrollments.get(id);
  }

  async createEnrollment(insertEnrollment: InsertEnrollment): Promise<Enrollment> {
    const id = randomUUID();
    const enrollment: Enrollment = {
      ...insertEnrollment,
      id,
      progress: 0,
      completedLessons: 0,
      isCompleted: false,
      enrolledAt: new Date(),
      completedAt: null,
    };
    this.enrollments.set(id, enrollment);
    return enrollment;
  }

  async updateEnrollmentProgress(
    id: string,
    progress: number,
    completedLessons: number
  ): Promise<Enrollment | undefined> {
    const enrollment = this.enrollments.get(id);
    if (!enrollment) return undefined;

    const updated = { ...enrollment, progress, completedLessons };
    this.enrollments.set(id, updated);
    return updated;
  }

  async completeEnrollment(id: string): Promise<Enrollment | undefined> {
    const enrollment = this.enrollments.get(id);
    if (!enrollment) return undefined;

    const updated = {
      ...enrollment,
      isCompleted: true,
      progress: 100,
      completedAt: new Date(),
    };
    this.enrollments.set(id, updated);
    return updated;
  }

  // Certificate operations
  async getCertificatesByUser(userId: string): Promise<Certificate[]> {
    return Array.from(this.certificates.values()).filter((c) => c.userId === userId);
  }

  async createCertificate(insertCertificate: InsertCertificate): Promise<Certificate> {
    const id = randomUUID();
    const certificate: Certificate = {
      ...insertCertificate,
      id,
      issuedAt: new Date(),
    };
    this.certificates.set(id, certificate);
    return certificate;
  }

  // Candidate search operations
  async searchCandidates(query?: {
    minSkillPoints?: number;
    skills?: string[];
  }): Promise<User[]> {
    let candidates = Array.from(this.users.values()).filter((u) => u.role === "candidate");

    if (query?.minSkillPoints !== undefined) {
      candidates = candidates.filter((c) => (c.skillPoints || 0) >= query.minSkillPoints!);
    }

    if (query?.skills && query.skills.length > 0) {
      candidates = candidates.filter((c) =>
        query.skills!.some((skill) => c.skills?.includes(skill))
      );
    }

    // Sort by skill points descending
    candidates.sort((a, b) => (b.skillPoints || 0) - (a.skillPoints || 0));

    return candidates;
  }

  // Resume unlock operations
  async unlockResume(insertUnlock: InsertUnlockedResume): Promise<UnlockedResume> {
    const id = randomUUID();
    const unlock: UnlockedResume = {
      ...insertUnlock,
      id,
      unlockedAt: new Date(),
    };
    this.unlockedResumes.set(id, unlock);
    return unlock;
  }

  async isResumeUnlocked(employerId: string, candidateId: string): Promise<boolean> {
    return Array.from(this.unlockedResumes.values()).some(
      (u) => u.employerId === employerId && u.candidateId === candidateId
    );
  }

  async getUnlockedCandidates(employerId: string): Promise<User[]> {
    const unlocked = Array.from(this.unlockedResumes.values())
      .filter((u) => u.employerId === employerId)
      .map((u) => u.candidateId);

    return Array.from(this.users.values()).filter((u) => unlocked.includes(u.id));
  }
}

export const storage = new MemStorage();
