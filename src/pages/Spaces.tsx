import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SpaceCard from "@/components/SpaceCard";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import { 
  Filter, 
  Search
} from "lucide-react";
import coworkingImage from "@/assets/coworking-space.jpg";
import privateOfficeImage from "@/assets/private-office.jpg";
import meetingRoomImage from "@/assets/meeting-room.jpg";
import { useNavigate } from "react-router-dom";

const Spaces = () => {
  // Scroll to top when component mounts
  useScrollToTop();
  
  const navigate = useNavigate();
  const [priceRange] = useState([0, 200]);
  const [spaceType, setSpaceType] = useState("");
  const [capacity, setCapacity] = useState("");

  const allSpaces = [
    {
      id: "1",
      name: "Private Office",
      type: "Private Office",
      image: privateOfficeImage,
      location: "Downtown Financial District",
      capacity: 4,
      price: 75,
      rating: 4.8,
      reviews: 124,
      amenities: ["High-speed WiFi", "Coffee & Refreshments", "Printer Access"],
      description: "Premium private office space perfect for executives and small teams with all amenities included."
    },
    {
      id: "2",
      name: "Meeting Room",
      type: "Meeting Room",
      image: meetingRoomImage,
      location: "Tech District",
      capacity: 12,
      price: 120,
      rating: 4.9,
      reviews: 87,
      amenities: ["Video Conferencing", "Whiteboard", "High-speed WiFi"],
      description: "Fully-equipped meeting space designed for presentations and team collaborations with advanced AV capabilities."
    },
    {
      id: "3",
      name: "Coworking Space",
      type: "Coworking",
      image: coworkingImage,
      location: "Creative Quarter",
      capacity: 1,
      price: 25,
      rating: 4.7,
      reviews: 52,
      amenities: ["High-speed WiFi", "Coffee & Refreshments", "Networking"],
      description: "Flexible workspace in our vibrant coworking area perfect for freelancers and digital nomads seeking community."
    },
    {
      id: "4",
      name: "Meeting Room",
      type: "Meeting Room",
      image: meetingRoomImage,
      location: "Innovation Hub",
      capacity: 8,
      price: 95,
      rating: 4.6,
      reviews: 34,
      amenities: ["Video Conferencing", "Whiteboard", "High-speed WiFi"],
      description: "Modern meeting space with state-of-the-art technology for brainstorming and collaborative work sessions."
    },
    {
      id: "5",
      name: "Private Office",
      type: "Private Office",
      image: privateOfficeImage,
      location: "Arts District",
      capacity: 6,
      price: 85,
      rating: 4.5,
      reviews: 67,
      amenities: ["High-speed WiFi", "Coffee & Refreshments", "Natural Light"],
      description: "Inspiring workspace with abundant natural light and creative atmosphere, perfect for design teams and startups."
    },
    {
      id: "6",
      name: "Coworking Space",
      type: "Coworking",
      image: coworkingImage,
      location: "Business Park",
      capacity: 1,
      price: 20,
      rating: 4.4,
      reviews: 89,
      amenities: ["High-speed WiFi", "Coffee & Refreshments", "Printing"],
      description: "Affordable coworking space in a professional environment with networking opportunities and modern facilities."
    }
  ];

  const filteredSpaces = allSpaces.filter(space => {
    const matchesType = spaceType === "all-types" || !spaceType || space.type === spaceType;
    const matchesCapacity = capacity === "any-size" || !capacity || space.capacity >= parseInt(capacity);
    const matchesPrice = space.price >= priceRange[0] && space.price <= priceRange[1];

    return matchesType && matchesCapacity && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Header Section */}
      <section className="bg-secondary/50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Find Your Perfect Workspace</h1>
            <p className="text-xl text-muted-foreground">
              Discover flexible, professional spaces designed to help you and your team thrive.
            </p>
          </div>
          
          {/* Search Bar */}
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select value={spaceType} onValueChange={setSpaceType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Space Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-types">All Types</SelectItem>
                      <SelectItem value="Private Office">Private Office</SelectItem>
                      <SelectItem value="Coworking">Coworking</SelectItem>
                      <SelectItem value="Meeting Room">Meeting Room</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={capacity} onValueChange={setCapacity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Capacity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any-size">Any Size</SelectItem>
                      <SelectItem value="1">1+ People</SelectItem>
                      <SelectItem value="4">4+ People</SelectItem>
                      <SelectItem value="8">8+ People</SelectItem>
                      <SelectItem value="12">12+ People</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  className="w-full sm:w-auto"
                  onClick={() => {
                    // Search functionality is handled by the filteredSpaces array
                    // The button is just for visual consistency
                  }}
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div>
          {/* Results */}
          <div>
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold mb-1">Available Spaces</h2>
                <p className="text-muted-foreground">
                  {filteredSpaces.length} space{filteredSpaces.length !== 1 ? 's' : ''} found
                </p>
              </div>
              
              <Select defaultValue="recommended">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredSpaces.map((space) => (
                <SpaceCard 
                  key={space.id} 
                  {...space} 
                  onClick={() => navigate(`/spaces/${space.id}`)}
                />
              ))}
            </div>
            
            {filteredSpaces.length === 0 && (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-4">
                  <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No spaces found</h3>
                  <p>Try adjusting your filters or search criteria</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSpaceType("");
                    setCapacity("");
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Spaces;