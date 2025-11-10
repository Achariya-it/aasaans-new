import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Award, User, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/auth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const userRole = user?.role as "candidate" | "employer" | null;
  const userName = user?.name;
  const skillPoints = user?.skillPoints;
  const [, setLocation] = useLocation();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const candidateLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/courses", label: "Browse Courses" },
    { href: "/my-learning", label: "My Learning" },
    { href: "/certificates", label: "Certificates" },
  ];

  const employerLinks = [
    { href: "/employer/dashboard", label: "Dashboard" },
    { href: "/employer/candidates", label: "Search Candidates" },
    { href: "/employer/payments", label: "Payment History" },
  ];

  const links = userRole === "candidate" ? candidateLinks : userRole === "employer" ? employerLinks : [];

  return (
    <nav className="sticky top-0 z-50 border-b bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" data-testid="link-home">
              <span className="text-2xl font-bold text-primary">SkillBridge</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {links.map((link) => (
                <Link key={link.href} href={link.href} data-testid={`link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}>
                  <Button
                    variant="ghost"
                    className={location === link.href ? "bg-accent" : ""}
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {userRole && (
              <>
                <Button variant="ghost" size="icon" data-testid="button-notifications">
                  <Bell className="h-5 w-5" />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="gap-2" data-testid="button-user-menu">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="" />
                        <AvatarFallback>{userName?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                      <div className="hidden sm:flex flex-col items-start">
                        <span className="text-sm font-medium">{userName}</span>
                        {userRole === "candidate" && skillPoints !== undefined && (
                          <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                            <Award className="h-3 w-3 mr-1" />
                            {skillPoints} pts
                          </Badge>
                        )}
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem data-testid="menu-item-profile">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    {userRole === "candidate" && (
                      <DropdownMenuItem data-testid="menu-item-certificates">
                        <Award className="mr-2 h-4 w-4" />
                        Certificates
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => { logout(); setLocation("/"); }} data-testid="menu-item-logout">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}

            {!userRole && (
              <>
                <Link href="/login">
                  <Button variant="ghost" data-testid="button-login">Login</Button>
                </Link>
                <Link href="/signup">
                  <Button data-testid="button-signup">Sign Up</Button>
                </Link>
              </>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
