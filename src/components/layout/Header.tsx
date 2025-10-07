import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Leaf, Heart } from "lucide-react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Discover Your Type", href: "/ayur-analysis" },
  { name: "Vyadhi", href: "/diseases" },
  { name: "Yoga Library", href: "/yoga" },
  { name: "Mental Wellness", href: "/mental-health" },
  { name: "3D Marma Model", href: "/3d-model" },
  { name: "Recipes", href: "/recipes" },
  { name: "Progress", href: "/progress" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-3xl font-heading font-bold text-gradient flex items-center">
                <span className="mr-2">🌿</span> ayur.me
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-gold ${
                  location.pathname === item.href
                    ? "text-gold border-b-2 border-gold pb-1"
                    : "text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex lg:items-center">
            <Button variant="gold" size="sm" asChild>
              <Link to="/ayur-analysis">Discover Your Dosha</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 text-base font-medium transition-colors ${
                    location.pathname === item.href
                      ? "text-gold bg-gold/10"
                      : "text-foreground hover:text-gold hover:bg-gold/5"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                <Button variant="gold" size="sm" className="w-full" asChild>
                  <Link to="/ayur-analysis">Start Your Journey</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}