import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-primary">SkillBridge</h3>
            <p className="text-sm text-muted-foreground">
              Connecting career growth with skill development for a better future.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">For Candidates</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/courses" className="text-muted-foreground hover:text-foreground">
                  Browse Courses
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-muted-foreground hover:text-foreground">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/certificates" className="text-muted-foreground hover:text-foreground">
                  Certificates
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">For Employers</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/employer/candidates" className="text-muted-foreground hover:text-foreground">
                  Find Talent
                </Link>
              </li>
              <li>
                <Link href="/employer/pricing" className="text-muted-foreground hover:text-foreground">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/employer/about" className="text-muted-foreground hover:text-foreground">
                  Why SkillBridge
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SkillBridge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
