import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Video, Users, Presentation, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const MeetingRooms = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    roomType: "",
    attendees: "",
    timeSlot: "",
    duration: "",
    equipment: "",
    requirements: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Meeting Room Booked Successfully",
      description: "Your meeting room has been reserved. Check your email for confirmation details.",
    });
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      roomType: "",
      attendees: "",
      timeSlot: "",
      duration: "",
      equipment: "",
      requirements: ""
    });
    setSelectedDate(undefined);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Book Professional Meeting Rooms
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Modern meeting rooms equipped with the latest technology. Perfect for presentations, 
              client meetings, and team collaborations.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Room Types */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Available Meeting Rooms</h2>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Small Meeting Room
                  </CardTitle>
                  <CardDescription>Perfect for 4-8 people</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>4-8 people capacity</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Video className="h-4 w-4" />
                      <span>HD video conferencing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Presentation className="h-4 w-4" />
                      <span>55" 4K display</span>
                    </div>
                  </div>
                  <p className="font-semibold text-primary mt-4">$50/hour</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Large Conference Room
                  </CardTitle>
                  <CardDescription>Ideal for 10-20 people</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>10-20 people capacity</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Video className="h-4 w-4" />
                      <span>Premium AV equipment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Presentation className="h-4 w-4" />
                      <span>75" interactive display</span>
                    </div>
                  </div>
                  <p className="font-semibold text-primary mt-4">$120/hour</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Presentation className="h-5 w-5 text-primary" />
                    Executive Boardroom
                  </CardTitle>
                  <CardDescription>Premium space for 8-12 executives</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>8-12 people capacity</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>Corner office views</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Video className="h-4 w-4" />
                      <span>Executive-level amenities</span>
                    </div>
                  </div>
                  <p className="font-semibold text-primary mt-4">$200/hour</p>
                </CardContent>
              </Card>
            </div>

            {/* Booking Form */}
            <Card>
              <CardHeader>
                <CardTitle>Book Your Meeting Room</CardTitle>
                <CardDescription>
                  Reserve the perfect meeting space for your team or clients.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                        aria-describedby="name-description"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        aria-describedby="email-description"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="room-type">Room Type *</Label>
                      <Select onValueChange={(value) => handleInputChange("roomType", value)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select room type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small-meeting">Small Meeting Room (4-8)</SelectItem>
                          <SelectItem value="large-conference">Large Conference Room (10-20)</SelectItem>
                          <SelectItem value="executive-boardroom">Executive Boardroom (8-12)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="attendees">Expected Attendees *</Label>
                      <Select onValueChange={(value) => handleInputChange("attendees", value)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Number of attendees" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2-4">2-4 people</SelectItem>
                          <SelectItem value="5-8">5-8 people</SelectItem>
                          <SelectItem value="9-12">9-12 people</SelectItem>
                          <SelectItem value="13-20">13-20 people</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Meeting Date *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                            aria-label="Select date"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
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
                      <Label htmlFor="time-slot">Time Slot *</Label>
                      <Select onValueChange={(value) => handleInputChange("timeSlot", value)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
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
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="duration">Duration *</Label>
                      <Select onValueChange={(value) => handleInputChange("duration", value)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Meeting duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-hour">1 Hour</SelectItem>
                          <SelectItem value="2-hours">2 Hours</SelectItem>
                          <SelectItem value="3-hours">3 Hours</SelectItem>
                          <SelectItem value="4-hours">4 Hours</SelectItem>
                          <SelectItem value="full-day">Full Day</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="equipment">Required Equipment</Label>
                      <Select onValueChange={(value) => handleInputChange("equipment", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Additional equipment" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard Setup</SelectItem>
                          <SelectItem value="video-conference">Video Conferencing</SelectItem>
                          <SelectItem value="presentation">Presentation Setup</SelectItem>
                          <SelectItem value="recording">Recording Equipment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="requirements">Special Requirements</Label>
                    <Textarea
                      id="requirements"
                      placeholder="Any specific setup requirements, catering needs, or special requests..."
                      value={formData.requirements}
                      onChange={(e) => handleInputChange("requirements", e.target.value)}
                      rows={3}
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Book Meeting Room
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MeetingRooms;