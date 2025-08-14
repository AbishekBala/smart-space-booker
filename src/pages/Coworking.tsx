import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, Star, MapPin, Users, Wifi, Coffee } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";

const Coworking = () => {
  // Scroll to top when component mounts
  useScrollToTop();
  
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [formData, setFormData] = useState({
    spaceType: "",
    date: "",
    timeFrom: "",
    timeUntil: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Availability Checked",
      description: "Available spaces have been updated based on your search criteria.",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const coworkingSpaces = [
    {
      id: 1,
      name: "Coworking Space",
      image: "/src/assets/coworking-space.jpg",
      description: "Flexible workspace with high-speed internet, complimentary beverages, and networking opportunities.",
      rating: 4.8,
      reviews: 124,
      price: 25,
      type: "Coworking",
      capacity: "1-10 people",
      amenities: ["High-speed WiFi", "Coffee & Refreshments", "Networking Events"]
    },
    {
      id: 2,
      name: "Private Office",
      image: "/src/assets/private-office.jpg",
      description: "Secure, dedicated office space for teams of 1-10 people with 24/7 access and amenities.",
      rating: 4.9,
      reviews: 87,
      price: 75,
      type: "Private Office",
      capacity: "1-10 people",
      amenities: ["24/7 Access", "Dedicated Space", "Premium Amenities"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Find Your Perfect Workspace
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Search available spaces and book your next productive environment with ease.
            </p>
          </div>

          {/* Search/Availability Form */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="space-type">Space Type</Label>
                    <Select onValueChange={(value) => handleInputChange("spaceType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Space Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="coworking">Coworking Space</SelectItem>
                        <SelectItem value="private-office">Private Office</SelectItem>
                        <SelectItem value="meeting-room">Meeting Room</SelectItem>
                        <SelectItem value="dedicated-desk">Dedicated Desk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                          aria-label="Select date"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : "Select Date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <Label htmlFor="time-from">Time From</Label>
                    <Select onValueChange={(value) => handleInputChange("timeFrom", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Start Time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="09:00">9:00 AM</SelectItem>
                        <SelectItem value="10:00">10:00 AM</SelectItem>
                        <SelectItem value="11:00">11:00 AM</SelectItem>
                        <SelectItem value="12:00">12:00 PM</SelectItem>
                        <SelectItem value="13:00">1:00 PM</SelectItem>
                        <SelectItem value="14:00">2:00 PM</SelectItem>
                        <SelectItem value="15:00">3:00 PM</SelectItem>
                        <SelectItem value="16:00">4:00 PM</SelectItem>
                        <SelectItem value="17:00">5:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="time-until">Time Until</Label>
                    <Select onValueChange={(value) => handleInputChange("timeUntil", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select End Time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10:00">10:00 AM</SelectItem>
                        <SelectItem value="11:00">11:00 AM</SelectItem>
                        <SelectItem value="12:00">12:00 PM</SelectItem>
                        <SelectItem value="13:00">1:00 PM</SelectItem>
                        <SelectItem value="14:00">2:00 PM</SelectItem>
                        <SelectItem value="15:00">3:00 PM</SelectItem>
                        <SelectItem value="16:00">4:00 PM</SelectItem>
                        <SelectItem value="17:00">5:00 PM</SelectItem>
                        <SelectItem value="18:00">6:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="text-center">
                  <Button type="submit" size="lg">
                    Check Availability
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Workspace Listings */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {coworkingSpaces.map((space) => (
              <Card key={space.id} className="overflow-hidden">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={space.image} 
                    alt={space.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{space.name}</h3>
                  <p className="text-muted-foreground mb-4">{space.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-500 fill-current mr-1" />
                      <span className="font-medium">{space.rating}</span>
                      <span className="text-muted-foreground ml-1">({space.reviews} reviews)</span>
                    </div>
                    <div className="text-primary font-bold text-lg">${space.price}/day</div>
                  </div>
                  
                  <Button variant="outline" className="w-full">View Details</Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Current Selection Summary */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Your Current Selection</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Space Type</Label>
                  <p className="font-medium text-primary">
                    {formData.spaceType || "Not selected"}
                  </p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Date</Label>
                  <p className="font-medium text-primary">
                    {selectedDate ? format(selectedDate, "PPP") : "Not selected"}
                  </p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Time From</Label>
                  <p className="font-medium text-primary">
                    {formData.timeFrom || "Not selected"}
                  </p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Time Until</Label>
                  <p className="font-medium text-primary">
                    {formData.timeUntil || "Not selected"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">
                  Make your selections above to see available spaces
                </p>
                <Button>Continue Booking</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Coworking;