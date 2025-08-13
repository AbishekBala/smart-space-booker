import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SpaceCard from "@/components/SpaceCard";
import { 
  Building2, 
  Users, 
  Calendar, 
  CheckCircle, 
  ArrowRight,
  MapPin,
  Clock,
  Star
} from "lucide-react";
import heroImage from "@/assets/hero-workspace.jpg";
import coworkingImage from "@/assets/coworking-space.jpg";
import privateOfficeImage from "@/assets/private-office.jpg";
import meetingRoomImage from "@/assets/meeting-room.jpg";

const Index = () => {
  const featuredSpaces = [
    {
      id: "1",
      name: "Office Space",
      type: "Private Office",
      image: privateOfficeImage,
      location: "Downtown",
      capacity: 20,
      price: 0,
      rating: 4.8,
      reviews: 124,
      amenities: ["High-speed WiFi", "Coffee & Refreshments", "Printer Access"],
      description: "Premium private office spaces perfect for teams and businesses."
    },
    {
      id: "2",
      name: "Meeting Rooms",
      type: "Meeting Room",
      image: meetingRoomImage,
      location: "Tech District",
      capacity: 15,
      price: 0,
      rating: 4.9,
      reviews: 87,
      amenities: ["High-speed WiFi", "Coffee & Refreshments", "Printer Access"],
      description: "Professional meeting spaces for presentations and collaborations."
    },
    {
      id: "3",
      name: "Coworking",
      type: "Coworking",
      image: coworkingImage,
      location: "Creative Quarter",
      capacity: 50,
      price: 0,
      rating: 4.7,
      reviews: 52,
      amenities: ["High-speed WiFi", "Coffee & Refreshments", "Printer Access"],
      description: "Flexible coworking spaces perfect for individuals and teams."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Premium Workspaces <br />
                  <span className="text-primary">Redefined</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Experience flexible, modern office spaces designed for productivity and success. From private offices to collaborative coworking environments.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="px-8">
                    Explore Spaces
                  </Button>
                  <Button size="lg" variant="outline" className="px-8">
                    Schedule Tour
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Modern workspace" 
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">Simple steps to book your perfect workspace</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary-foreground">1</span>
              </div>
              <h3 className="text-xl font-semibold">Choose Your Space</h3>
              <p className="text-muted-foreground">
                Browse through our selection of office spaces, coworking desks, and meeting rooms.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary-foreground">2</span>
              </div>
              <h3 className="text-xl font-semibold">Check Availability</h3>
              <p className="text-muted-foreground">
                View available time slots and select the one that works for you.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary-foreground">3</span>
              </div>
              <h3 className="text-xl font-semibold">Book & Confirm</h3>
              <p className="text-muted-foreground">
                Complete your booking with a simple form and receive instant confirmation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Spaces */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Featured Spaces</h2>
              <p className="text-xl text-muted-foreground">Discover our most popular workspaces</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredSpaces.map((space) => (
              <SpaceCard key={space.id} {...space} />
            ))}
          </div>
          
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold">500+</div>
              <div className="text-primary-foreground/80">Spaces Available</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold">10k+</div>
              <div className="text-primary-foreground/80">Happy Customers</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold">50+</div>
              <div className="text-primary-foreground/80">Locations</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold">4.9</div>
              <div className="text-primary-foreground/80">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Why Choose Gigspace</h2>
            <p className="text-xl text-muted-foreground">Experience the future of flexible workspace booking</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6">
              <Building2 className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Prime Locations</h3>
              <p className="text-muted-foreground text-sm">
                Strategic locations in business districts and transportation hubs.
              </p>
            </Card>
            
            <Card className="text-center p-6">
              <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Instant Booking</h3>
              <p className="text-muted-foreground text-sm">
                Book by the hour, day or month with easy and flexible scheduling options.
              </p>
            </Card>
            
            <Card className="text-center p-6">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-muted-foreground text-sm">
                Dedicated customer service team available around the clock with any needs.
              </p>
            </Card>
            
            <Card className="text-center p-6">
              <Star className="h-12 w-12 text-warning mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Premium Amenities</h3>
              <p className="text-muted-foreground text-sm">
                High-speed WiFi, printing services, conference facilities for productive work.
              </p>
            </Card>
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
};

export default Index;
