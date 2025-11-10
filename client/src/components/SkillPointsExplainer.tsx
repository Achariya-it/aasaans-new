import { Award, TrendingUp, Briefcase } from "lucide-react";

export default function SkillPointsExplainer() {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">How Skill Points Work</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your learning translates directly into career opportunities
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Award className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Complete Courses</h3>
            <p className="text-muted-foreground">
              Each course completion earns you skill points based on difficulty and duration
            </p>
            <div className="text-3xl font-bold text-primary">+200 pts</div>
          </div>

          <div className="flex items-center justify-center">
            <TrendingUp className="h-12 w-12 text-primary" />
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Briefcase className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Get Hired</h3>
            <p className="text-muted-foreground">
              Employers prioritize candidates with higher skill points, increasing your visibility
            </p>
            <div className="text-3xl font-bold text-primary">Top 5%</div>
          </div>
        </div>

        <div className="mt-16 p-8 rounded-lg bg-primary/5 border border-primary/20">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h3 className="text-2xl font-bold">Stand Out from the Crowd</h3>
            <p className="text-muted-foreground">
              Candidates with 1000+ skill points receive 3x more profile views from employers. 
              Your continuous learning makes you more valuable in the job market.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
