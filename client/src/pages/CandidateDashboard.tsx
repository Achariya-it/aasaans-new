import Navbar from "@/components/Navbar";
import StatsCard from "@/components/StatsCard";
import CourseCard from "@/components/CourseCard";
import { Award, BookOpen, FileCheck, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getEnrollments, getCertificates } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { useEffect } from "react";

export default function CandidateDashboard() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!user || user.role !== "candidate") {
      setLocation("/");
    }
  }, [user, setLocation]);

  const { data: enrollments, isLoading: enrollmentsLoading } = useQuery({
    queryKey: ["/api/enrollments"],
    queryFn: getEnrollments,
    enabled: !!user,
  });

  const { data: certificates } = useQuery({
    queryKey: ["/api/certificates"],
    queryFn: getCertificates,
    enabled: !!user,
  });

  if (!user) return null;

  const enrolledCourses = enrollments?.filter((e) => !e.isCompleted) || [];
  const completedCount = enrollments?.filter((e) => e.isCompleted).length || 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
          <p className="text-muted-foreground">Continue your learning journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatsCard
            title="Total Skill Points"
            value={user.skillPoints || 0}
            icon={Award}
          />
          <StatsCard
            title="Courses Completed"
            value={completedCount}
            icon={BookOpen}
          />
          <StatsCard
            title="Certificates Earned"
            value={certificates?.length || 0}
            icon={FileCheck}
          />
          <StatsCard
            title="Active Courses"
            value={enrolledCourses.length}
            icon={Trophy}
          />
        </div>

        {enrollmentsLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading your courses...</p>
          </div>
        ) : enrolledCourses.length > 0 ? (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Continue Learning</h2>
            </div>
            <div className="space-y-4">
              {enrolledCourses.map((enrollment) => (
                <CourseCard
                  key={enrollment.id}
                  id={enrollment.course.id}
                  title={enrollment.course.title}
                  instructor={enrollment.course.instructor}
                  thumbnail={enrollment.course.thumbnail}
                  duration={enrollment.course.duration}
                  skillPoints={enrollment.course.skillPoints}
                  variant="horizontal"
                  enrolled={true}
                  progress={enrollment.progress}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="mb-12 text-center py-12">
            <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No enrolled courses yet</h3>
            <p className="text-muted-foreground mb-4">
              Start learning today and earn skill points!
            </p>
            <Button onClick={() => setLocation("/courses")} data-testid="button-browse-courses">
              Browse Courses
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
