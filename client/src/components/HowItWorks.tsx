import { Card, CardContent } from "@/components/ui/card";
import { Upload, BookOpen, Award, Briefcase, Search, CreditCard } from "lucide-react";

export default function HowItWorks() {
  const candidateSteps = [
    {
      icon: Upload,
      title: "Upload Resume",
      description: "Create your profile and upload your professional resume",
    },
    {
      icon: BookOpen,
      title: "Take Courses",
      description: "Browse and enroll in courses to develop new skills",
    },
    {
      icon: Award,
      title: "Earn Points",
      description: "Complete courses and earn skill points with certificates",
    },
  ];

  const employerSteps = [
    {
      icon: Search,
      title: "Search Candidates",
      description: "Find candidates with the highest skill points",
    },
    {
      icon: CreditCard,
      title: "Purchase Access",
      description: "Pay to unlock and view detailed candidate resumes",
    },
    {
      icon: Briefcase,
      title: "Hire Talent",
      description: "Connect with top-skilled professionals for your team",
    },
  ];

  return (
    <div className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A simple process that connects learning with career opportunities
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-primary">For Candidates</h3>
            <div className="space-y-6">
              {candidateSteps.map((step, index) => (
                <Card key={index} className="hover-elevate">
                  <CardContent className="flex items-start gap-4 pt-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <step.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-1">{step.title}</h4>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6 text-primary">For Employers</h3>
            <div className="space-y-6">
              {employerSteps.map((step, index) => (
                <Card key={index} className="hover-elevate">
                  <CardContent className="flex items-start gap-4 pt-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <step.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-1">{step.title}</h4>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
