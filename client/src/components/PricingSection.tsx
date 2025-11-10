import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export default function PricingSection() {
  const plans = [
    {
      name: "Starter",
      price: "$49",
      period: "per month",
      resumes: 10,
      features: [
        "10 resume unlocks per month",
        "Basic candidate search",
        "Email support",
        "Search by skill points",
      ],
    },
    {
      name: "Professional",
      price: "$149",
      period: "per month",
      resumes: 50,
      popular: true,
      features: [
        "50 resume unlocks per month",
        "Advanced search filters",
        "Priority support",
        "Analytics dashboard",
        "Certificate verification",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      resumes: "Unlimited",
      features: [
        "Unlimited resume unlocks",
        "Dedicated account manager",
        "API access",
        "Custom integrations",
        "Team collaboration tools",
        "Bulk candidate export",
      ],
    },
  ];

  return (
    <div className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Employer Pricing</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan to find top talent with verified skills
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative ${plan.popular ? "border-primary shadow-lg" : ""} hover-elevate`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                </div>
              )}

              <CardHeader>
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {typeof plan.resumes === 'number' ? plan.resumes : plan.resumes} resumes
                </p>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  data-testid={`button-choose-${plan.name.toLowerCase()}`}
                >
                  {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
