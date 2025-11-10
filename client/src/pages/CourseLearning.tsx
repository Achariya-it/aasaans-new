import { useParams, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getCourse, getEnrollments, updateProgress, completeCourse } from "@/lib/api";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, CheckCircle2, BookOpen } from "lucide-react";

export default function CourseLearning() {
  const params = useParams() as { id: string };
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: course, isLoading: courseLoading } = useQuery({
    queryKey: ["/api/courses", params.id],
    queryFn: () => getCourse(params.id),
  });

  const { data: enrollments } = useQuery({
    queryKey: ["/api/enrollments"],
    queryFn: getEnrollments,
  });

  const enrollment = enrollments?.find((e) => e.courseId === params.id);

  const completeMutation = useMutation({
    mutationFn: completeCourse,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/enrollments"] });
      queryClient.invalidateQueries({ queryKey: ["/api/certificates"] });
      toast({
        title: "Course completed!",
        description: `You earned ${data.certificate.skillPointsEarned} skill points and received a certificate!`,
      });
      setLocation("/dashboard");
    },
    onError: (error: Error) => {
      toast({
        title: "Completion failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (courseLoading || !course) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!enrollment) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground">You are not enrolled in this course.</p>
          <Button onClick={() => setLocation("/courses")} className="mt-4">
            Browse Courses
          </Button>
        </div>
      </div>
    );
  }

  const handleComplete = () => {
    if (enrollment.isCompleted) {
      toast({
        title: "Already completed",
        description: "You have already completed this course.",
      });
      return;
    }
    completeMutation.mutate(enrollment.id);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => setLocation("/dashboard")} className="mb-4">
            ← Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
          <p className="text-muted-foreground">Instructor: {course.instructor}</p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Course Progress</h2>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span className="font-semibold">{course.skillPoints} points</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span className="font-medium">{enrollment.progress}%</span>
                  </div>
                  <Progress value={enrollment.progress} />
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  <span>
                    {enrollment.completedLessons} / {course.totalLessons} lessons completed
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Course Content</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Array.from({ length: course.totalLessons }, (_, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      i < enrollment.completedLessons
                        ? "bg-primary/5 border border-primary/20"
                        : "bg-muted/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {i < enrollment.completedLessons ? (
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30" />
                      )}
                      <span className="font-medium">Lesson {i + 1}</span>
                    </div>
                    {i >= enrollment.completedLessons && i === enrollment.completedLessons && (
                      <span className="text-xs text-primary font-medium">In Progress</span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              {enrollment.isCompleted ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Course Completed!</h3>
                  <p className="text-muted-foreground mb-4">
                    You've earned {course.skillPoints} skill points and received your certificate.
                  </p>
                  <Button onClick={() => setLocation("/dashboard")}>
                    Back to Dashboard
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <h3 className="text-2xl font-bold mb-2">Ready to Complete?</h3>
                  <p className="text-muted-foreground mb-6">
                    Complete this course to earn {course.skillPoints} skill points and receive your certificate!
                  </p>
                  <Button
                    size="lg"
                    onClick={handleComplete}
                    disabled={completeMutation.isPending}
                    data-testid="button-complete-course"
                  >
                    {completeMutation.isPending ? "Completing..." : "Complete Course"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
