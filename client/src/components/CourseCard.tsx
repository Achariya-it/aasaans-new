import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Award, Clock, BookOpen } from "lucide-react";

interface CourseCardProps {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  duration: string;
  skillPoints: number;
  enrolled?: boolean;
  progress?: number;
  variant?: "vertical" | "horizontal";
}

export default function CourseCard({
  id,
  title,
  instructor,
  thumbnail,
  duration,
  skillPoints,
  enrolled = false,
  progress = 0,
  variant = "vertical",
}: CourseCardProps) {
  if (variant === "horizontal") {
    return (
      <Card className="overflow-hidden hover-elevate" data-testid={`card-course-${id}`}>
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-48 h-32 sm:h-auto flex-shrink-0">
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg line-clamp-1" data-testid={`text-course-title-${id}`}>{title}</h3>
                  <p className="text-sm text-muted-foreground">{instructor}</p>
                </div>
                <Badge variant="secondary" className="flex-shrink-0">
                  <Award className="h-3 w-3 mr-1" />
                  {skillPoints} pts
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-2 flex-1">
              {enrolled && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{progress}%</span>
                  </div>
                  <Progress value={progress} />
                </div>
              )}
            </CardContent>
            <CardFooter className="pt-2">
              <div className="flex items-center justify-between w-full gap-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {duration}
                  </span>
                </div>
                <Button size="sm" data-testid={`button-continue-${id}`}>
                  {enrolled ? "Continue" : "Enroll"}
                </Button>
              </div>
            </CardFooter>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover-elevate active-elevate-2" data-testid={`card-course-${id}`}>
      <div className="aspect-video relative">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-2 right-2 bg-background/90 backdrop-blur">
          <Award className="h-3 w-3 mr-1" />
          {skillPoints} pts
        </Badge>
      </div>
      <CardHeader className="pb-2">
        <h3 className="font-semibold text-lg line-clamp-2" data-testid={`text-course-title-${id}`}>{title}</h3>
        <p className="text-sm text-muted-foreground">{instructor}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {duration}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            12 lessons
          </span>
        </div>
        {enrolled && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full" data-testid={`button-${enrolled ? 'continue' : 'enroll'}-${id}`}>
          {enrolled ? "Continue Learning" : "Enroll Now"}
        </Button>
      </CardFooter>
    </Card>
  );
}
