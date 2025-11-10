import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/auth";
import Landing from "@/pages/Landing";
import CandidateDashboard from "@/pages/CandidateDashboard";
import EmployerDashboard from "@/pages/EmployerDashboard";
import CourseCatalog from "@/pages/CourseCatalog";
import CourseLearning from "@/pages/CourseLearning";
import AuthPage from "@/pages/AuthPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/login" component={AuthPage} />
      <Route path="/signup" component={AuthPage} />
      <Route path="/dashboard" component={CandidateDashboard} />
      <Route path="/courses" component={CourseCatalog} />
      <Route path="/courses/:id" component={CourseLearning} />
      <Route path="/employer/dashboard" component={EmployerDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
