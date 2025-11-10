import Navbar from "@/components/Navbar";
import CourseCard from "@/components/CourseCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getCourses, enrollInCourse, getEnrollments } from "@/lib/api";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth";
import { useState } from "react";

export default function CourseCatalog() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: courses, isLoading } = useQuery({
    queryKey: ["/api/courses"],
    queryFn: getCourses,
  });

  const { data: enrollments } = useQuery({
    queryKey: ["/api/enrollments"],
    queryFn: getEnrollments,
    enabled: !!user && user.role === "candidate",
  });

  const enrollMutation = useMutation({
    mutationFn: enrollInCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/enrollments"] });
      toast({
        title: "Enrolled successfully!",
        description: "You can now start learning.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Enrollment failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const enrolledCourseIds = new Set(enrollments?.map((e) => e.courseId) || []);

  const filteredCourses = courses?.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleEnroll = (courseId: string) => {
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to enroll in courses.",
        variant: "destructive",
      });
      return;
    }
    enrollMutation.mutate(courseId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Course Catalog</h1>
          <p className="text-muted-foreground">Explore courses and start earning skill points</p>
        </div>

        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search-courses"
              />
            </div>
            <Button variant="outline" className="gap-2" data-testid="button-filters">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading courses...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => {
                const isEnrolled = enrolledCourseIds.has(course.id);
                const enrollment = enrollments?.find((e) => e.courseId === course.id);
                
                return (
                  <div key={course.id} onClick={() => !isEnrolled && handleEnroll(course.id)}>
                    <CourseCard
                      id={course.id}
                      title={course.title}
                      instructor={course.instructor}
                      thumbnail={course.thumbnail}
                      duration={course.duration}
                      skillPoints={course.skillPoints}
                      enrolled={isEnrolled}
                      progress={enrollment?.progress || 0}
                    />
                  </div>
                );
              })}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No courses found matching your search.</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
