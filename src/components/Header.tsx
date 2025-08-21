import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Phone, Menu, LogIn, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLoggedIn, username, logout } = useAuth();
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  const navigationLinks = [
    { href: "/", label: "Home", ariaLabel: "Home page" },
    { href: "/book", label: "WorkSpaces", ariaLabel: "View and book workspaces" },
    { href: "/about", label: "About Us", ariaLabel: "About us" },
    { href: "/contact", label: "Contact", ariaLabel: "Contact us" },
  ];

  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className="text-xl font-bold">Gigspace</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
          {navigationLinks.map((link) => (
            <Link 
              key={link.href}
              to={link.href} 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive(link.href) ? 'text-primary' : 'text-foreground'
              }`}
              aria-label={link.ariaLabel}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <nav className="flex flex-col space-y-4 mt-8" role="navigation" aria-label="Mobile navigation">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`text-lg font-medium transition-colors hover:text-primary p-2 rounded-md ${
                      isActive(link.href) ? 'text-primary bg-primary/10' : 'text-foreground'
                    }`}
                    aria-label={link.ariaLabel}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 border-t">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                    <Phone className="h-4 w-4" />
                    <span>(555) 123-4567</span>
                  </div>
                  {isLoggedIn ? (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Welcome, {username}!</p>
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        onClick={handleLogout}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full">
                        <LogIn className="h-4 w-4 mr-2" />
                        Sign In
                      </Button>
                    </Link>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <div className="hidden lg:flex items-center space-x-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span>(555) 123-4567</span>
          </div>
          {isLoggedIn ? (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-muted-foreground">Welcome, {username}!</span>
              {isAdmin && (
                <Link to="/admin">
                  <Button variant="outline" size="sm">
                    Admin Dashboard
                  </Button>
                </Link>
              )}
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button className="bg-blue-500 hover:bg-blue-600">
                Sign up
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;