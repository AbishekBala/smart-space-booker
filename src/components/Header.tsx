import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">S</span>
          </div>
          <span className="text-xl font-bold text-foreground">SpaceBook</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive('/') ? 'text-primary' : 'text-foreground'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/spaces" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive('/spaces') ? 'text-primary' : 'text-foreground'
            }`}
          >
            Find Spaces
          </Link>
          <Link 
            to="/how-it-works" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive('/how-it-works') ? 'text-primary' : 'text-foreground'
            }`}
          >
            How It Works
          </Link>
          <Link 
            to="/contact" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive('/contact') ? 'text-primary' : 'text-foreground'
            }`}
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex items-center space-x-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span>(555) 123-4567</span>
          </div>
          <Button>Book Now</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;