import { Button } from "@/components/ui/button";
import CourseCard from "./CourseCard";
import { ArrowRight } from "lucide-react";
import webDevThumb from '@assets/generated_images/Web_development_course_thumbnail_b1ecacd9.png';
import dataThumb from '@assets/generated_images/Data_science_course_thumbnail_5994dabd.png';
import marketingThumb from '@assets/generated_images/Digital_marketing_course_thumbnail_d255cfe8.png';
import pmThumb from '@assets/generated_images/Project_management_course_thumbnail_704d6c98.png';

export default function FeaturedCourses() {
  const courses = [
    {
      id: "web-dev",
      title: "Complete Web Development Bootcamp",
      instructor: "Dr. Angela Yu",
      thumbnail: webDevThumb,
      duration: "40 hours",
      skillPoints: 200,
    },
    {
      id: "data-science",
      title: "Data Science & Machine Learning",
      instructor: "Jose Portilla",
      thumbnail: dataThumb,
      duration: "35 hours",
      skillPoints: 250,
    },
    {
      id: "digital-marketing",
      title: "Digital Marketing Masterclass",
      instructor: "Phil Ebiner",
      thumbnail: marketingThumb,
      duration: "25 hours",
      skillPoints: 150,
    },
    {
      id: "project-management",
      title: "Project Management Professional",
      instructor: "Chris Croft",
      thumbnail: pmThumb,
      duration: "30 hours",
      skillPoints: 180,
    },
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">Featured Courses</h2>
            <p className="text-lg text-muted-foreground">
              Start learning and earning skill points today
            </p>
          </div>
          <Button variant="outline" className="gap-2 hidden sm:flex" data-testid="button-view-all-courses">
            View All
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Button variant="outline" className="gap-2" data-testid="button-view-all-courses-mobile">
            View All Courses
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
