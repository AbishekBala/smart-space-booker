import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  MapPin, 
  Users, 
  Wifi, 
  Coffee, 
  Monitor, 
  Star,
  Clock,
  ArrowLeft,
  Share,
  Heart,
  Calendar as CalendarIcon,
  CheckCircle,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import privateOfficeImage from "@/assets/private-office.jpg";
import meetingRoomImage from "@/assets/meeting-room.jpg";
import coworkingImage from "@/assets/coworking-space.jpg";

const SpaceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [duration, setDuration] = useState("");

  // Mock data - in real app this would come from API
  const space = {
    id: "1",
    name: "Executive Office Suite",
    type: "Private Office",
    images: [privateOfficeImage, meetingRoomImage, coworkingImage],
    location: "Downtown Financial District",
    address: "123 Business Avenue, San Francisco, CA 94107",
    capacity: 4,
    price: 75,
    rating: 4.8,
    reviews: 124,
    amenities: [
      "High-speed WiFi",
      "Coffee & Refreshments", 
      "Printer Access",
      "Whiteboard",
      "Video Conferencing",
      "Air Conditioning",
      "Natural Light",
      "24/7 Access"
    ],
    description: "Premium private office space perfect for executives and small teams with all amenities included. This modern workspace features floor-to-ceiling windows, ergonomic furniture, and state-of-the-art technology to ensure maximum productivity.",
    rules: [
      "No smoking allowed",
      "Respect other tenants",
      "Clean up after use",
      "Maximum capacity: 4 people"
    ],
    availability: {
      "2024-01-15": ["9:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      "2024-01-16": ["9:00", "10:00", "13:00", "14:00", "15:00"],
      "2024-01-17": ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00"]
    }
  };

  const amenityIcons: Record<string, any> = {
    "High-speed WiFi": Wifi,
    "Coffee & Refreshments": Coffee,
    "Video Conferencing": Monitor,
    "Whiteboard": Monitor,
    "Printer Access": Monitor,
  };

  const timeSlots = [
    "8:00", "9:00", "10:00", "11:00", "12:00", 
    "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
  ];

  const getAvailableSlots = (date: Date) => {
    const dateKey = date.toISOString().split('T')[0];
    return space.availability[dateKey] || [];
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Spaces
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <img 
                  src={space.images[currentImageIndex]} 
                  alt={space.name}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-primary">
                  {space.type}
                </Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                {space.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={cn(
                      "aspect-video rounded-md overflow-hidden border-2 transition-colors",
                      currentImageIndex === index ? "border-primary" : "border-transparent"
                    )}
                  >
                    <img 
                      src={image} 
                      alt={`${space.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Space Info */}
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{space.name}</h1>
                  <div className="flex items-center space-x-4 text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {space.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      Up to {space.capacity} people
                    </div>
                  </div>
                  <div className="flex items-center mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-5 w-5 ${i < Math.floor(space.rating) ? 'text-warning fill-current' : 'text-muted-foreground'}`} 
                        />
                      ))}
                    </div>
                    <span className="ml-2 font-medium">{space.rating}</span>
                    <span className="ml-1 text-muted-foreground">({space.reviews} reviews)</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="amenities">Amenities</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground">{space.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Space Rules</h3>
                    <ul className="space-y-1">
                      {space.rules.map((rule, index) => (
                        <li key={index} className="flex items-center text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-success mr-2" />
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="amenities">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {space.amenities.map((amenity) => {
                      const Icon = amenityIcons[amenity] || CheckCircle;
                      return (
                        <div key={amenity} className="flex items-center space-x-2">
                          <Icon className="h-5 w-5 text-primary" />
                          <span className="text-sm">{amenity}</span>
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>
                
                <TabsContent value="location">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Address</h3>
                      <p className="text-muted-foreground">{space.address}</p>
                    </div>
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">Map would go here</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews">
                  <div className="space-y-4">
                    <div className="text-center text-muted-foreground">
                      Reviews section would be implemented here
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-primary">${space.price}</div>
                  <div className="text-muted-foreground">per day</div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Select Date</label>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border pointer-events-auto"
                      disabled={(date) => date < new Date()}
                    />
                  </div>
                  
                  {selectedDate && (
                    <>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Available Times</label>
                        <div className="grid grid-cols-3 gap-2">
                          {timeSlots.map((time) => {
                            const available = getAvailableSlots(selectedDate).includes(time);
                            return (
                              <Button
                                key={time}
                                variant={selectedTime === time ? "default" : "outline"}
                                size="sm"
                                className={cn(
                                  "text-xs",
                                  !available && "opacity-50 cursor-not-allowed"
                                )}
                                onClick={() => available && setSelectedTime(time)}
                                disabled={!available}
                              >
                                {available ? time : (
                                  <span className="flex items-center">
                                    <X className="h-3 w-3 mr-1" />
                                    {time}
                                  </span>
                                )}
                              </Button>
                            );
                          })}
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">Duration</label>
                        <Select value={duration} onValueChange={setDuration}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 hour</SelectItem>
                            <SelectItem value="2">2 hours</SelectItem>
                            <SelectItem value="4">4 hours</SelectItem>
                            <SelectItem value="8">Full day</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}
                  
                  <Button 
                    className="w-full" 
                    disabled={!selectedDate || !selectedTime || !duration}
                    onClick={() => navigate('/booking')}
                  >
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Book Now
                  </Button>
                  
                  <div className="text-xs text-muted-foreground text-center space-y-1">
                    <div className="flex items-center justify-center">
                      <CheckCircle className="h-3 w-3 text-success mr-1" />
                      Free cancellation up to 24 hours
                    </div>
                    <div className="flex items-center justify-center">
                      <CheckCircle className="h-3 w-3 text-success mr-1" />
                      Instant booking confirmation
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SpaceDetails;