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
import heroImage from "@/assets/hero-workspace.jpg";
import coworkingImage from "@/assets/coworking-space.jpg";
import privateOfficeImage from "@/assets/private-office.jpg";
import meetingRoomImage from "@/assets/meeting-room.jpg";

const Index = () => {
  // Scroll to top when component mounts
  useScrollToTop();
  const navigate = useNavigate();
  
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
      name: "Coworking Hotdesk",
      type: "Coworking",
      image: coworkingImage,
      location: "Tech Hub",
      price: 25,
      amenities: ["WiFi", "Coffee Bar", "Phone Booths"],
      description: "Flexible workspace perfect for individuals and small teams."
    },
    {
      id: "4",
      name: "Creative Studio",
      type: "Studio",
      image: privateOfficeImage,
      location: "Arts District",
      price: 95,
      amenities: ["24 Hours", "Studio Lighting", "Sound System"],
      description: "Inspiring space designed for creative teams, photographers, filming events, and team building."
    },
    {
      id: "5",
      name: "Private Office",
      type: "Office",
      image: privateOfficeImage,
      location: "Business District",
      price: 55,
      amenities: ["12 People", "Private Access", "Phone System"],
      description: "Single dedicated office space for focused work and private meetings for growing teams."
    },
    {
      id: "6",
      name: "Casual Meeting Pod",
      type: "Meeting Pod",
      image: meetingRoomImage,
      location: "Innovation Hub",
      price: 45,
      amenities: ["24 Hours", "Lounge Setup", "Smart TV"],
      description: "Comfortable, informal meeting space ideal for brainstorming and team meetings."
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
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-medium mb-4">Browse available assets</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select>
                <SelectTrigger className="w-full">
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
                  {/* <SelectItem value="whiteboard">Whiteboard</SelectItem> */}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end mt-4">
              <Button 
                onClick={() => navigate("/book")}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8"
              >
                Explore
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Book your perfect event in four simple steps. Our streamlined process makes event
              planning effortless and enjoyable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-32 h-32 bg-blue-50 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-16 h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Choose Available Assets</h3>
              <p className="text-sm text-gray-500">
                Select from our wide range of premium workspaces
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-32 h-32 bg-blue-50 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-16 h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Browse Assets</h3>
              <p className="text-sm text-gray-500">
                Explore verified spaces and available options
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-32 h-32 bg-blue-50 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-16 h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Confirm Booking</h3>
              <p className="text-sm text-gray-500">
                Secure your booking with our guided confirmation
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="w-32 h-32 bg-blue-50 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-16 h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Enjoy Your Space</h3>
              <p className="text-sm text-gray-500">
                Relax and enjoy your perfectly planned space
              </p>
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
              />
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">
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
