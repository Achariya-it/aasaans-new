import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Users } from "lucide-react";
import heroImage from '@assets/generated_images/Hero_split-screen_learning_employer_71396fd0.png';

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Connect Your Career with{" "}
                <span className="text-primary">Skill Development</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground">
                Complete courses, earn skill points, and get noticed by top employers. 
                Your learning journey is your competitive advantage.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gap-2" data-testid="button-get-started-candidate">
                <Award className="h-5 w-5" />
                Start Learning
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2" data-testid="button-get-started-employer">
                <Users className="h-5 w-5" />
                Find Talent
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold">10,000+</div>
                <div className="text-sm text-muted-foreground">Active Learners</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm text-muted-foreground">Top Employers</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <div className="text-3xl font-bold">100+</div>
                <div className="text-sm text-muted-foreground">Courses</div>
              </div>
            </div>
          </div>

          <div className="relative lg:h-[500px]">
            <img
              src={heroImage}
              alt="Learning and hiring platform"
              className="rounded-lg w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
