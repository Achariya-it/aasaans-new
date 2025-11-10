import Navbar from "@/components/Navbar";
import StatsCard from "@/components/StatsCard";
import CandidateCard from "@/components/CandidateCard";
import { DollarSign, Eye, Users, Search as SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery, useMutation } from "@tanstack/react-query";
import { searchCandidates, unlockResume, isResumeUnlocked } from "@/lib/api";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";

export default function EmployerDashboard() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!user || user.role !== "employer") {
      setLocation("/");
    }
  }, [user, setLocation]);

  const { data: candidates, isLoading } = useQuery({
    queryKey: ["/api/candidates/search"],
    queryFn: () => searchCandidates(),
    enabled: !!user,
  });

  const unlockMutation = useMutation({
    mutationFn: unlockResume,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/candidates/search"] });
      toast({
        title: "Resume unlocked!",
        description: "You can now view the full candidate profile.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Unlock failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (!user) return null;

  const filteredCandidates = candidates?.filter((candidate: any) =>
    candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.headline?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.location?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleUnlock = async (candidateId: string) => {
    const isUnlocked = await isResumeUnlocked(candidateId);
    if (isUnlocked) {
      toast({
        title: "Already unlocked",
        description: "You already have access to this candidate's resume.",
      });
      return;
    }
    unlockMutation.mutate(candidateId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Employer Dashboard</h1>
          <p className="text-muted-foreground">Find and hire top talent with verified skills</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatsCard
            title="Total Candidates"
            value={candidates?.length || 0}
            icon={Users}
          />
          <StatsCard
            title="High Performers"
            value={candidates?.filter((c: any) => c.skillPoints >= 1000).length || 0}
            icon={Eye}
          />
          <StatsCard
            title="Active Searches"
            value="1"
            icon={SearchIcon}
          />
          <StatsCard
            title="Resumes Viewed"
            value="0"
            icon={DollarSign}
          />
        </div>

        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search candidates by skills, location, or name..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search-candidates"
              />
            </div>
            <Button data-testid="button-advanced-search">Advanced Search</Button>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading candidates...</p>
          </div>
        ) : (
          <>
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Top Candidates</h2>
                <Button variant="outline" data-testid="button-view-all-candidates">View All</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCandidates.slice(0, 9).map((candidate: any) => (
                  <div key={candidate.id} onClick={() => handleUnlock(candidate.id)}>
                    <CandidateCard
                      id={candidate.id}
                      name={candidate.name}
                      headline={candidate.headline || "Professional"}
                      location={candidate.location || "Location not specified"}
                      skillPoints={candidate.skillPoints || 0}
                      skills={candidate.skills || []}
                      isPremium={true}
                      unlocked={false}
                    />
                  </div>
                ))}
              </div>
            </div>

            {filteredCandidates.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No candidates found matching your search.</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
