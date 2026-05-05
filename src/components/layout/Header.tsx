import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Leaf, ChevronDown } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Discover Your Type", href: "/ayur-analysis" },
];

const knowledgeLinks = [
  { name: "Disease Database", href: "/diseases" },
  { name: "Marma Lab (Soon)", href: "/3d-model" },
  { name: "Research & Sources", href: "/research" },
];

const wellnessLinks = [
  { name: "Yoga Library", href: "/yoga" },
  { name: "Mental Wellness", href: "/mental-health" },
  { name: "Recipes", href: "/recipes" },
  { name: "Progress Dashboard", href: "/progress" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();

  // Close mobile menu on route change and lock/unlock body scroll
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar - above overlay so hamburger/X stays clickable */}
      <div className="relative z-[60] bg-background/95 backdrop-blur-sm border-b border-border supports-[backdrop-filter]:bg-background/80">
      <nav className="mx-auto max-w-7xl px-3 xs:px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex w-full items-center justify-between gap-2 py-2.5 sm:py-4 min-h-[48px] sm:min-h-[56px]">
          {/* Logo - compact on small screens to avoid crowding */}
          <div className="flex items-center flex-shrink-0 min-w-0 max-w-[65%] sm:max-w-none">
            <Link to="/" className="flex items-center min-w-0" onClick={closeMenu} aria-label="ayur.me — home">
              <span className="text-sm xs:text-base sm:text-2xl lg:text-3xl font-heading font-bold text-gradient flex items-center whitespace-nowrap truncate">
                <Leaf className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-sage shrink-0" aria-hidden />
                <span className="truncate">ayur.me</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - lg and up */}
          <div className="hidden lg:flex lg:items-center lg:gap-6 xl:gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm xl:text-base font-medium transition-colors whitespace-nowrap hover:text-gold ${
                  location.pathname === item.href
                    ? "text-gold border-b-2 border-gold pb-0.5"
                    : "text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-sm xl:text-base font-medium text-foreground hover:text-gold transition-colors focus:outline-none">
                Knowledge <ChevronDown className="ml-1 w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 bg-white/95 backdrop-blur-md border-sage/20 shadow-xl rounded-xl">
                {knowledgeLinks.map(link => (
                  <DropdownMenuItem key={link.href} asChild className="hover:bg-sage/10 hover:text-sage-800 cursor-pointer focus:bg-sage/10 focus:text-sage-800 rounded-md">
                    <Link to={link.href} className="w-full font-medium">{link.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-sm xl:text-base font-medium text-foreground hover:text-gold transition-colors focus:outline-none">
                Wellness <ChevronDown className="ml-1 w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 bg-white/95 backdrop-blur-md border-sage/20 shadow-xl rounded-xl">
                {wellnessLinks.map(link => (
                  <DropdownMenuItem key={link.href} asChild className="hover:bg-sage/10 hover:text-sage-800 cursor-pointer focus:bg-sage/10 focus:text-sage-800 rounded-md">
                    <Link to={link.href} className="w-full font-medium">{link.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Desktop CTA + auth controls */}
          <div className="hidden lg:flex lg:items-center flex-shrink-0 gap-3">
            {!authLoading && isAuthenticated && (
              <>
                <Link
                  to="/my-assessments"
                  className="text-sm font-medium text-foreground hover:text-gold whitespace-nowrap"
                >
                  My Assessments
                </Link>
                <Button variant="ghost" size="sm" onClick={logout} aria-label={`Sign out ${user?.email ?? ""}`}>
                  Sign out
                </Button>
              </>
            )}
            {!authLoading && !isAuthenticated && (
              <Link
                to="/login"
                className="text-sm font-medium text-foreground hover:text-gold whitespace-nowrap"
              >
                Sign in
              </Link>
            )}
            <Button variant="gold" size="sm" asChild>
              <Link to="/ayur-analysis">Discover Your Dosha</Link>
            </Button>
          </div>

          {/* Mobile/Tablet menu button - min 44px touch target, visible icon */}
          <div className="flex lg:hidden -mr-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-11 w-11 min-w-[44px] min-h-[44px] text-foreground hover:text-gold hover:bg-gold/10"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden />
              ) : (
                <Menu className="h-6 w-6" aria-hidden />
              )}
            </Button>
          </div>
        </div>
      </nav>
      </div>

      {/* Mobile/Tablet overlay and slide-in panel */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-300 ease-out ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
          onClick={closeMenu}
          aria-hidden="true"
        />

        {/* Slide-in panel - right side on larger phones/tablets */}
        <div
          className={`absolute top-0 right-0 h-full w-full max-w-sm bg-background border-l border-border shadow-xl transform transition-transform duration-300 ease-out overflow-y-auto ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Close button inside panel - easy to tap */}
          <div className="sticky top-0 z-10 flex justify-end p-4 pb-0 bg-background">
            <Button
              variant="ghost"
              size="icon"
              onClick={closeMenu}
              className="h-11 w-11 min-w-[44px] min-h-[44px] text-foreground hover:text-gold hover:bg-gold/10 -mr-2"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <div className="flex flex-col pt-2 pb-8 px-4">
            {[...navigation, ...knowledgeLinks, ...wellnessLinks].map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center min-h-[48px] px-4 py-3 text-base font-medium rounded-lg transition-colors -mx-2 ${
                  location.pathname === item.href
                    ? "text-gold bg-gold/10"
                    : "text-foreground hover:text-gold hover:bg-gold/5 active:bg-gold/10"
                }`}
                onClick={closeMenu}
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-4 px-2 space-y-2">
              <Button variant="gold" size="lg" className="w-full min-h-[48px]" asChild>
                <Link to="/ayur-analysis" onClick={closeMenu}>
                  Discover Your Dosha
                </Link>
              </Button>
              {!authLoading && isAuthenticated && (
                <>
                  <Button variant="outline" size="lg" className="w-full min-h-[48px]" asChild>
                    <Link to="/my-assessments" onClick={closeMenu}>
                      My Assessments
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="w-full min-h-[48px]"
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                  >
                    Sign out
                  </Button>
                </>
              )}
              {!authLoading && !isAuthenticated && (
                <Button variant="outline" size="lg" className="w-full min-h-[48px]" asChild>
                  <Link to="/login" onClick={closeMenu}>
                    Sign in
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
