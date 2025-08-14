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
import heroImage from "@/assets/hero-workspace.jpg";
import coworkingImage from "@/assets/coworking-space.jpg";
import privateOfficeImage from "@/assets/private-office.jpg";
import meetingRoomImage from "@/assets/meeting-room.jpg";

const Index = () => {
  // Scroll to top when component mounts
  useScrollToTop();
  
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
      {/* Hero Section - Reference Style */}
      <section
        className="relative flex flex-col items-center justify-center min-h-[70vh] w-full"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-blue-800/60 to-indigo-900/70 z-0" />
        <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 py-20">
          <h1 className="text-white text-5xl font-bold mb-4 text-center">Your Space, Your Time</h1>
          <p className="text-white text-lg mb-10 text-center max-w-2xl">
            GigSpace offers premium office spaces, coworking desks, and meeting rooms — flexible, affordable, and tailored to your needs.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center w-full max-w-4xl">
            {/* Office Space Card */}
            <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-8 w-full md:w-1/3">
              <div className="bg-blue-100 rounded-full p-4 mb-4">
                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 3v4M8 3v4"/></svg>
              </div>
              <h2 className="font-semibold text-xl mb-2">Office Space</h2>
              <button className="bg-blue-500 text-white rounded-md px-6 py-2 mt-4 hover:bg-blue-600">Explore</button>
            </div>
            {/* Coworking Card */}
            <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-8 w-full md:w-1/3">
              <div className="bg-blue-100 rounded-full p-4 mb-4">
                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
              </div>
              <h2 className="font-semibold text-xl mb-2">Coworking</h2>
              <button className="bg-blue-500 text-white rounded-md px-6 py-2 mt-4 hover:bg-blue-600">Explore</button>
            </div>
            {/* Meeting Rooms Card */}
            <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-8 w-full md:w-1/3">
              <div className="bg-blue-100 rounded-full p-4 mb-4">
                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="13" rx="2"/><path d="M8 3v4M16 3v4"/></svg>
              </div>
              <h2 className="font-semibold text-xl mb-2">Meeting Rooms</h2>
              <button className="bg-blue-500 text-white rounded-md px-6 py-2 mt-4 hover:bg-blue-600">Explore</button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/30 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100/40 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100/30 rounded-full translate-x-1/3 translate-y-1/3" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              How It Works
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
              Simple steps to book your perfect workspace
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started with our streamlined booking process in just three easy steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Step 1 */}
            <div className="relative group">
              <div className="text-center space-y-6 p-8 rounded-2xl bg-white/70 backdrop-blur-sm border border-blue-100/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-blue-200 transition-shadow duration-300">
                    <span className="text-3xl font-bold text-white">1</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-200 rounded-full animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Choose Your Space</h3>
                <p className="text-gray-600 leading-relaxed">
                  Browse through our curated selection of premium office spaces, collaborative coworking desks, and state-of-the-art meeting rooms.
                </p>
                <div className="flex justify-center">
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
                </div>
              </div>
              {/* Connection line */}
              <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-0.5 bg-gradient-to-r from-blue-300 to-blue-200 transform -translate-y-1/2" />
            </div>
            
            {/* Step 2 */}
            <div className="relative group">
              <div className="text-center space-y-6 p-8 rounded-2xl bg-white/70 backdrop-blur-sm border border-blue-100/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-indigo-200 transition-shadow duration-300">
                    <span className="text-3xl font-bold text-white">2</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-indigo-200 rounded-full animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Check Availability</h3>
                <p className="text-gray-600 leading-relaxed">
                  View real-time availability and select the perfect time slot that aligns with your schedule and requirements.
                </p>
                <div className="flex justify-center">
                  <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                </div>
              </div>
              {/* Connection line */}
              <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-0.5 bg-gradient-to-r from-indigo-300 to-indigo-200 transform -translate-y-1/2" />
            </div>
            
            {/* Step 3 */}
            <div className="relative group">
              <div className="text-center space-y-6 p-8 rounded-2xl bg-white/70 backdrop-blur-sm border border-blue-100/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-green-200 transition-shadow duration-300">
                    <span className="text-3xl font-bold text-white">3</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-200 rounded-full animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Book & Confirm</h3>
                <p className="text-gray-600 leading-relaxed">
                  Complete your booking with our secure, streamlined form and receive instant confirmation with all the details.
                </p>
                <div className="flex justify-center">
                  <div className="w-12 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" />
                </div>
              </div>
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
