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
import { Calendar as CalendarIcon, Wifi, Coffee, Users2, Zap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const Coworking = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    profession: "",
    planType: "",
    duration: "",
    accessTimes: "",
    requirements: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Coworking Space Booked Successfully",
      description: "Welcome to our community! Your membership details have been sent to your email.",
    });
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      profession: "",
      planType: "",
      duration: "",
      accessTimes: "",
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
              Join Our Vibrant Coworking Community
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Flexible workspace solutions for freelancers, entrepreneurs, and remote teams. 
              Network, collaborate, and grow in our inspiring environment.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Plan Types */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Membership Plans</h2>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Coffee className="h-5 w-5 text-primary" />
                    Day Pass
                  </CardTitle>
                  <CardDescription>Perfect for trying out our space</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      <span>Access from 9 AM - 6 PM</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wifi className="h-4 w-4" />
                      <span>High-speed internet</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Coffee className="h-4 w-4" />
                      <span>Complimentary coffee & tea</span>
                    </div>
                  </div>
                  <p className="font-semibold text-primary mt-4">$25/day</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users2 className="h-5 w-5 text-primary" />
                    Flexible Membership
                  </CardTitle>
                  <CardDescription>5 days per month access</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      <span>5 days monthly access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wifi className="h-4 w-4" />
                      <span>Premium workspace areas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users2 className="h-4 w-4" />
                      <span>Community events access</span>
                    </div>
                  </div>
                  <p className="font-semibold text-primary mt-4">$99/month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Unlimited Membership
                  </CardTitle>
                  <CardDescription>24/7 access to all amenities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      <span>24/7 unlimited access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users2 className="h-4 w-4" />
                      <span>Private phone booths</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Coffee className="h-4 w-4" />
                      <span>Meeting room discounts</span>
                    </div>
                  </div>
                  <p className="font-semibold text-primary mt-4">$199/month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users2 className="h-5 w-5 text-primary" />
                    Dedicated Desk
                  </CardTitle>
                  <CardDescription>Your own permanent workspace</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      <span>Your personal desk</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users2 className="h-4 w-4" />
                      <span>Storage locker included</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Coffee className="h-4 w-4" />
                      <span>Priority community access</span>
                    </div>
                  </div>
                  <p className="font-semibold text-primary mt-4">$299/month</p>
                </CardContent>
              </Card>
            </div>

            {/* Booking Form */}
            <Card>
              <CardHeader>
                <CardTitle>Join Our Coworking Space</CardTitle>
                <CardDescription>
                  Start your journey with us. Choose the perfect plan for your work style.
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
                      <Label htmlFor="profession">Profession/Industry</Label>
                      <Input
                        id="profession"
                        value={formData.profession}
                        onChange={(e) => handleInputChange("profession", e.target.value)}
                        placeholder="e.g., Software Developer, Designer"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="plan-type">Membership Plan *</Label>
                    <Select onValueChange={(value) => handleInputChange("planType", value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select membership plan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="day-pass">Day Pass - $25/day</SelectItem>
                        <SelectItem value="flexible">Flexible Membership - $99/month</SelectItem>
                        <SelectItem value="unlimited">Unlimited Membership - $199/month</SelectItem>
                        <SelectItem value="dedicated">Dedicated Desk - $299/month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Membership Start Date *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                            aria-label="Select start date"
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
                      <Label htmlFor="duration">Initial Duration</Label>
                      <Select onValueChange={(value) => handleInputChange("duration", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Membership duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-month">1 Month</SelectItem>
                          <SelectItem value="3-months">3 Months</SelectItem>
                          <SelectItem value="6-months">6 Months</SelectItem>
                          <SelectItem value="12-months">12 Months</SelectItem>
                          <SelectItem value="ongoing">Ongoing Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="access-times">Preferred Access Times</Label>
                    <Select onValueChange={(value) => handleInputChange("accessTimes", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="When do you typically work?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard Hours (9 AM - 6 PM)</SelectItem>
                        <SelectItem value="early-bird">Early Bird (6 AM - 3 PM)</SelectItem>
                        <SelectItem value="night-owl">Evening (12 PM - 9 PM)</SelectItem>
                        <SelectItem value="flexible">Flexible Schedule</SelectItem>
                        <SelectItem value="weekend">Weekend Primarily</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="requirements">Special Requirements</Label>
                    <Textarea
                      id="requirements"
                      placeholder="Tell us about your work style, any accessibility needs, or special requests..."
                      value={formData.requirements}
                      onChange={(e) => handleInputChange("requirements", e.target.value)}
                      rows={3}
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Start Membership
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Community Features */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
              What Makes Our Community Special
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Users2 className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Networking Events</h3>
                    <p className="text-sm text-muted-foreground">
                      Monthly meetups, workshops, and social events to connect with like-minded professionals.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Wifi className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Premium Amenities</h3>
                    <p className="text-sm text-muted-foreground">
                      High-speed internet, ergonomic furniture, printing services, and complimentary beverages.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">24/7 Access</h3>
                    <p className="text-sm text-muted-foreground">
                      Work on your schedule with secure keycard access and flexible membership options.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Coworking;