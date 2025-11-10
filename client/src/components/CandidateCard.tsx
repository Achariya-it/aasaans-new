import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Award, MapPin, Briefcase, Lock } from "lucide-react";

interface CandidateCardProps {
  id: string;
  name: string;
  headline: string;
  location: string;
  skillPoints: number;
  skills: string[];
  avatar?: string;
  isPremium: boolean;
  unlocked?: boolean;
}

export default function CandidateCard({
  id,
  name,
  headline,
  location,
  skillPoints,
  skills,
  avatar,
  isPremium,
  unlocked = false,
}: CandidateCardProps) {
  return (
    <Card className="hover-elevate active-elevate-2 relative" data-testid={`card-candidate-${id}`}>
      {isPremium && !unlocked && (
        <div className="absolute top-2 right-2 z-10">
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            <Lock className="h-3 w-3 mr-1" />
            Premium
          </Badge>
        </div>
      )}
      
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={avatar} />
            <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate" data-testid={`text-candidate-name-${id}`}>{name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-1">{headline}</p>
            
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {location}
              </span>
            </div>

            <div className="mt-3">
              <Badge variant="secondary" className="bg-primary/10 text-primary font-semibold">
                <Award className="h-4 w-4 mr-1" />
                {skillPoints} Skill Points
              </Badge>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {skills.slice(0, 4).map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {skills.length > 4 && (
            <Badge variant="secondary" className="text-xs">
              +{skills.length - 4} more
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter>
        <Button 
          className="w-full" 
          variant={unlocked ? "outline" : "default"}
          data-testid={`button-${unlocked ? 'view' : 'unlock'}-resume-${id}`}
        >
          {unlocked ? (
            <>
              <Briefcase className="h-4 w-4 mr-2" />
              View Resume
            </>
          ) : (
            <>
              <Lock className="h-4 w-4 mr-2" />
              Unlock Resume
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
