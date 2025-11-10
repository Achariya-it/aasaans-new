import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull(), // 'candidate' or 'employer'
  // Candidate-specific fields
  headline: text("headline"),
  location: text("location"),
  skills: text("skills").array(),
  resumeUrl: text("resume_url"),
  skillPoints: integer("skill_points").default(0),
  // Employer-specific fields
  companyName: text("company_name"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const courses = pgTable("courses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  instructor: text("instructor").notNull(),
  thumbnail: text("thumbnail").notNull(),
  duration: text("duration").notNull(),
  skillPoints: integer("skill_points").notNull(),
  totalLessons: integer("total_lessons").notNull().default(12),
  createdAt: timestamp("created_at").defaultNow(),
});

export const enrollments = pgTable("enrollments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  courseId: varchar("course_id").notNull().references(() => courses.id),
  progress: integer("progress").notNull().default(0), // 0-100
  completedLessons: integer("completed_lessons").notNull().default(0),
  isCompleted: boolean("is_completed").notNull().default(false),
  enrolledAt: timestamp("enrolled_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

export const certificates = pgTable("certificates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  courseId: varchar("course_id").notNull().references(() => courses.id),
  courseName: text("course_name").notNull(),
  skillPointsEarned: integer("skill_points_earned").notNull(),
  issuedAt: timestamp("issued_at").defaultNow(),
});

export const unlockedResumes = pgTable("unlocked_resumes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  employerId: varchar("employer_id").notNull().references(() => users.id),
  candidateId: varchar("candidate_id").notNull().references(() => users.id),
  unlockedAt: timestamp("unlocked_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  skillPoints: true,
});

export const insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
  createdAt: true,
});

export const insertEnrollmentSchema = createInsertSchema(enrollments).omit({
  id: true,
  enrolledAt: true,
  completedAt: true,
  progress: true,
  completedLessons: true,
  isCompleted: true,
});

export const insertCertificateSchema = createInsertSchema(certificates).omit({
  id: true,
  issuedAt: true,
});

export const insertUnlockedResumeSchema = createInsertSchema(unlockedResumes).omit({
  id: true,
  unlockedAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type Course = typeof courses.$inferSelect;

export type InsertEnrollment = z.infer<typeof insertEnrollmentSchema>;
export type Enrollment = typeof enrollments.$inferSelect;

export type InsertCertificate = z.infer<typeof insertCertificateSchema>;
export type Certificate = typeof certificates.$inferSelect;

export type InsertUnlockedResume = z.infer<typeof insertUnlockedResumeSchema>;
export type UnlockedResume = typeof unlockedResumes.$inferSelect;
