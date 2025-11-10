import type { Course, Enrollment, Certificate } from "@shared/schema";

// Courses
export async function getCourses(): Promise<Course[]> {
  const response = await fetch("/api/courses");
  if (!response.ok) throw new Error("Failed to fetch courses");
  return response.json();
}

export async function getCourse(id: string): Promise<Course> {
  const response = await fetch(`/api/courses/${id}`);
  if (!response.ok) throw new Error("Failed to fetch course");
  return response.json();
}

// Enrollments
export async function getEnrollments(): Promise<(Enrollment & { course: Course })[]> {
  const response = await fetch("/api/enrollments");
  if (!response.ok) throw new Error("Failed to fetch enrollments");
  return response.json();
}

export async function enrollInCourse(courseId: string): Promise<Enrollment> {
  const response = await fetch("/api/enrollments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ courseId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to enroll");
  }

  return response.json();
}

export async function updateProgress(
  enrollmentId: string,
  progress: number,
  completedLessons: number
): Promise<Enrollment> {
  const response = await fetch(`/api/enrollments/${enrollmentId}/progress`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ progress, completedLessons }),
  });

  if (!response.ok) throw new Error("Failed to update progress");
  return response.json();
}

export async function completeCourse(enrollmentId: string): Promise<any> {
  const response = await fetch(`/api/enrollments/${enrollmentId}/complete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) throw new Error("Failed to complete course");
  return response.json();
}

// Certificates
export async function getCertificates(): Promise<Certificate[]> {
  const response = await fetch("/api/certificates");
  if (!response.ok) throw new Error("Failed to fetch certificates");
  return response.json();
}

// Candidate search (for employers)
export async function searchCandidates(params?: {
  minSkillPoints?: number;
  skills?: string[];
}): Promise<any[]> {
  const searchParams = new URLSearchParams();
  if (params?.minSkillPoints) {
    searchParams.append("minSkillPoints", params.minSkillPoints.toString());
  }
  if (params?.skills && params.skills.length > 0) {
    searchParams.append("skills", params.skills.join(","));
  }

  const response = await fetch(`/api/candidates/search?${searchParams}`);
  if (!response.ok) throw new Error("Failed to search candidates");
  return response.json();
}

// Resume unlock
export async function unlockResume(candidateId: string): Promise<any> {
  const response = await fetch("/api/resumes/unlock", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ candidateId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to unlock resume");
  }

  return response.json();
}

export async function isResumeUnlocked(candidateId: string): Promise<boolean> {
  const response = await fetch(`/api/resumes/is-unlocked?candidateId=${candidateId}`);
  if (!response.ok) throw new Error("Failed to check unlock status");

  const data = await response.json();
  return data.isUnlocked;
}
