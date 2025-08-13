import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  MapPin, 
  Phone, 
  Mail, 
  Clock 
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold">SpaceBook</span>
            </div>
            <p className="text-muted-foreground">
              Your flexible workspace solution for professionals, teams, and startups.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/spaces" className="block text-muted-foreground hover:text-primary transition-colors">
                Find Spaces
              </Link>
              <Link to="/how-it-works" className="block text-muted-foreground hover:text-primary transition-colors">
                How It Works
              </Link>
              <Link to="/pricing" className="block text-muted-foreground hover:text-primary transition-colors">
                Pricing
              </Link>
              <Link to="/contact" className="block text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold">Resources</h3>
            <div className="space-y-2">
              <Link to="/faq" className="block text-muted-foreground hover:text-primary transition-colors">
                FAQ
              </Link>
              <Link to="/blog" className="block text-muted-foreground hover:text-primary transition-colors">
                Blog
              </Link>
              <Link to="/testimonials" className="block text-muted-foreground hover:text-primary transition-colors">
                Testimonials
              </Link>
              <Link to="/terms" className="block text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="block text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="text-muted-foreground">
                  <p>123 Workspace Avenue,</p>
                  <p>Tech District, San Francisco, CA 94107</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">info@spacebook.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">Mon-Fri: 8am - 8pm</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2023 SpaceBook. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;