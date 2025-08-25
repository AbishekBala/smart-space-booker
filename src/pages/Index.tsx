import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SpaceCard from "@/components/SpaceCard";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
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
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-workspace.jpg";
import coworkingImage from "@/assets/coworking-space.jpg";
import privateOfficeImage from "@/assets/private-office.jpg";
import meetingRoomImage from "@/assets/meeting-room.jpg";

const Index = () => {
  // Scroll to top when component mounts
  useScrollToTop();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: "Error", 
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically send the email to your backend
    toast({
      title: "Success!",
      description: "Thank you for subscribing to our newsletter!",
    });
    setEmail("");
  };
  
  const featuredSpaces = [
    {
      id: "1",
      name: "Executive Office Suite",
      type: "Private Office",
      image: privateOfficeImage,
      location: "Downtown",
      price: 75,
      amenities: ["WiFi", "All Day Access", "Printer Access"],
      description: "Executive suite with modern amenities perfect for professional and private local business."
    },
    {
      id: "2",
      name: "Conference Room",
      type: "Meeting Room",
      image: meetingRoomImage,
      location: "Downtown",
      price: 120,
      amenities: ["WiFi", "Video Conferencing", "Whiteboard"],
      description: "Professional space perfect for conferences and executive meetings."
    },
    {
      id: "3",
      name: "Coworking Space",
      type: "Coworking",
      image: coworkingImage,
      location: "Tech Hub",
      price: 25,
      amenities: ["WiFi", "Coffee Bar", "Phone Booths"],
      description: "Flexible workspace perfect for individuals and small teams."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section - Reference Style */}
      <section
        className="relative flex flex-col items-center h-[75vh] w-full"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 65%'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 z-0" />
        <div className="relative z-10 flex flex-col items-center w-full px-4 mt-[25vh]">
          <div className="text-center text-white mb-8 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Your Perfect Workspace Awaits
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
              From private offices to dynamic coworking spaces, find the perfect environment for your success.
            </p>
          </div>

          {/* Search Box */}
          <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-medium mb-4">Browse available assets</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <Select>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Asset Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="office">Office Space</SelectItem>
                  <SelectItem value="meeting">Meeting Room</SelectItem>
                  <SelectItem value="coworking">Coworking Space</SelectItem>
                </SelectContent>
              </Select>

              <Input type="date" className="w-full" />

              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Capacity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-4">1-4 People</SelectItem>
                  <SelectItem value="5-10">5-10 People</SelectItem>
                  <SelectItem value="10+">10+ People</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Amenities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wifi">WiFi</SelectItem>
                  <SelectItem value="projector">Projector</SelectItem>
                  <SelectItem value="whiteboard">Whiteboard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end mt-4">
              <Button 
                onClick={() => navigate("/spaces")}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 h-10"
              >
                Explore
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple, fast, and secure. Get your perfect workspace in just four easy steps.
            </p>
          </div>
          
          <div className="relative max-w-6xl mx-auto">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gray-200 transform -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="relative bg-white p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 group">
                <div className="absolute -top-4 left-8 bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                  <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Search</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Browse our curated collection of premium workspaces tailored to your needs
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative bg-white p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 group">
                <div className="absolute -top-4 left-8 bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                  <Building2 className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Explore</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  View detailed photos, amenities, and verified reviews from real users
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative bg-white p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 group">
                <div className="absolute -top-4 left-8 bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                  <CheckCircle className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Book</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Secure your space instantly with our streamlined booking process
                </p>
              </div>

              {/* Step 4 */}
              <div className="relative bg-white p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 group">
                <div className="absolute -top-4 left-8 bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  4
                </div>
                <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                  <Star className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Enjoy</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Access your professionally managed workspace and focus on what matters
                </p>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-16">
              <Button 
                onClick={() => navigate("/spaces")}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-medium text-base shadow-sm hover:shadow-md transition-all duration-200"
              >
                Start Booking
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Spaces */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured WorkSpaces</h2>
            <p className="text-gray-600">
              Discover our handpicked selection of top-rated spaces that guarantee exceptional experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredSpaces.map((space) => (
              <SpaceCard key={space.id} {...space} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-600 mb-6">
              Subscribe for the latest event deals, venue updates, and exclusive offers.
              Never miss out on the perfect event opportunity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="flex-grow"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubscribe()}
              />
              <Button 
                onClick={handleSubscribe}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
