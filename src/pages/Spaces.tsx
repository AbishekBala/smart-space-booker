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
import { 
  Filter, 
  Search, 
  MapPin, 
  SlidersHorizontal,
  Grid3X3,
  List
} from "lucide-react";
import coworkingImage from "@/assets/coworking-space.jpg";
import privateOfficeImage from "@/assets/private-office.jpg";
import meetingRoomImage from "@/assets/meeting-room.jpg";
import { useNavigate } from "react-router-dom";

const Spaces = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [searchTerm, setSearchTerm] = useState("");
  const [spaceType, setSpaceType] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");

  const allSpaces = [
    {
      id: "1",
      name: "Executive Office Suite",
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
      name: "Conference Room A",
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
      name: "Coworking Hotdesk",
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
      name: "Innovation Lab",
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
      name: "Creative Studio",
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
      name: "Open Desk Area",
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
    const matchesSearch = space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         space.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = spaceType === "all-types" || !spaceType || space.type === spaceType;
    const matchesLocation = !location || space.location.toLowerCase().includes(location.toLowerCase());
    const matchesCapacity = capacity === "any-size" || !capacity || space.capacity >= parseInt(capacity);
    const matchesPrice = space.price >= priceRange[0] && space.price <= priceRange[1];

    return matchesSearch && matchesType && matchesLocation && matchesCapacity && matchesPrice;
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
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="relative md:col-span-2">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    placeholder="Search spaces, locations..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
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
                <Button>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="flex items-center mb-6">
                  <SlidersHorizontal className="h-5 w-5 mr-2" />
                  <h3 className="font-semibold">Filter Options</h3>
                </div>
                
                <div className="space-y-6">
                  {/* Location */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input 
                        placeholder="Enter location" 
                        className="pl-10"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  {/* Price Range */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Price Range: ${priceRange[0]} - ${priceRange[1]}/day
                    </label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={200}
                      min={0}
                      step={5}
                      className="mt-2"
                    />
                  </div>
                  
                  {/* Amenities */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Amenities</label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="wifi" className="rounded" />
                        <label htmlFor="wifi" className="text-sm">High-speed WiFi</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="coffee" className="rounded" />
                        <label htmlFor="coffee" className="text-sm">Coffee & Refreshments</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="parking" className="rounded" />
                        <label htmlFor="parking" className="text-sm">Parking</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="printing" className="rounded" />
                        <label htmlFor="printing" className="text-sm">Printing Services</label>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Reset Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Results */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold mb-1">Available Spaces</h2>
                <p className="text-muted-foreground">
                  {filteredSpaces.length} space{filteredSpaces.length !== 1 ? 's' : ''} found
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
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
                
                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Results Grid */}
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" 
              : "space-y-6"
            }>
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
                <Button variant="outline" onClick={() => {
                  setSearchTerm("");
                  setSpaceType("all-types");
                  setLocation("");
                  setCapacity("any-size");
                  setPriceRange([0, 200]);
                }}>
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