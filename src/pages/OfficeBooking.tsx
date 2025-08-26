import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { format, addDays, isSameDay, addHours, isWithinInterval } from "date-fns";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, Star, MapPin, Users, Wifi, Monitor, Printer, Lock, Power, CheckIcon, Building2, Ruler, DoorOpen } from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";

interface OfficeSpace {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  capacity: string;
  size: string;
  amenities: string[];
  rating: number;
  reviews: number;
  available: number;
  location: string;
}

interface BookingSlot {
  id: string;
  startTime: Date;
  endTime: Date;
  spaceId?: number;
}

const OfficeBooking = () => {
  useScrollToTop();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlots, setSelectedSlots] = useState<BookingSlot[]>([]);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [mainImage, setMainImage] = useState<string>("");
  const [selectedSpace, setSelectedSpace] = useState<OfficeSpace | null>(null);
  const { toast } = useToast();

  const officeSpaces: OfficeSpace[] = [
    {
      id: 1,
      name: "Private Office - Small",
      image: "/src/assets/office-1.jpg",
      description: "Private office space for 1-2 people, perfect for focused work with natural light and ergonomic furniture.",
      price: 500,
      capacity: "1-2 people",
      size: "100 sq ft",
      amenities: ["High-speed WiFi", "Ergonomic chair", "Standing desk", "Lockable door"],
      rating: 4.8,
      reviews: 24,
      available: 3,
      location: "Floor 3, North Wing"
    },
    {
      id: 2,
      name: "Private Office - Medium",
      image: "/src/assets/office-2.jpg",
      description: "Spacious office for small teams of 3-4 people with meeting area and storage solutions.",
      price: 800,
      capacity: "3-4 people",
      size: "200 sq ft",
      amenities: ["High-speed WiFi", "Meeting table", "Storage units", "Whiteboard", "Coffee machine"],
      rating: 4.9,
      reviews: 18,
      available: 2,
      location: "Floor 2, South Wing"
    },
    {
      id: 3,
      name: "Executive Suite",
      image: "/src/assets/office-3.jpg",
      description: "Luxurious executive office with premium furnishings and panoramic city views.",
      price: 1500,
      capacity: "4-6 people",
      size: "350 sq ft",
      amenities: ["Premium furnishings", "City view", "Private restroom", "Kitchenette", "Smart TV"],
      rating: 4.9,
      reviews: 32,
      available: 1,
      location: "Floor 10, East Wing"
    },
    {
      id: 4,
      name: "Team Office",
      image: "/src/assets/office-4.jpg",
      description: "Large office space for teams of 6-8 people with collaborative areas and storage.",
      price: 2000,
      capacity: "6-8 people",
      size: "500 sq ft",
      amenities: ["Open layout", "Collaborative spaces", "Storage lockers", "Whiteboards", "Kitchen access"],
      rating: 4.7,
      reviews: 15,
      available: 2,
      location: "Floor 1, West Wing"
    }
  ];

  // Set default selected space
  useState(() => {
    if (officeSpaces.length > 0) {
      setSelectedSpace(officeSpaces[0]);
      setMainImage(officeSpaces[0].image);
    }
  });

  // Generate time slots for the selected date
  const timeSlots = (): BookingSlot[] => {
    if (!selectedDate) return [];

    const slots: BookingSlot[] = [];
    const startHour = 8; // 8 AM
    const endHour = 18; // 6 PM

    for (let hour = startHour; hour < endHour; hour++) {
      const startTime = new Date(selectedDate);
      startTime.setHours(hour, 0, 0, 0);

      const endTime = new Date(startTime);
      endTime.setHours(hour + 1);

      slots.push({
        id: `slot-${hour}`,
        startTime,
        endTime,
        spaceId: selectedSpace?.id
      });
    }

    return slots;
  };

  const isSlotSelected = (slot: BookingSlot) => {
    return selectedSlots.some(s =>
      s.startTime.getTime() === slot.startTime.getTime() &&
      s.endTime.getTime() === slot.endTime.getTime()
    );
  };

  const handleSlotClick = (slot: BookingSlot) => {
    if (isSlotSelected(slot)) {
      setSelectedSlots(selectedSlots.filter(s =>
        !(s.startTime.getTime() === slot.startTime.getTime() &&
          s.endTime.getTime() === slot.endTime.getTime())
      ));
    } else {
      // For office spaces, only allow one slot selection at a time
      setSelectedSlots([slot]);
    }
  };

  const handleBookNow = () => {
    if (selectedSlots.length === 0 || !selectedSpace) return;

    const slot = selectedSlots[0];
    toast({
      title: "Office Space Booked!",
      description: `You've booked ${selectedSpace.name} on ${format(selectedDate, 'PPP')} from ${format(slot.startTime, 'h:mm a')} to ${format(slot.endTime, 'h:mm a')}`,
    });
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      // Clear selected slots when date changes
      setSelectedSlots([]);
    }
  };

  const totalPrice = selectedSpace ? selectedSpace.price * selectedSlots.length : 0;

  if (!selectedSpace) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Office Space Booking</h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column: Office Images and Info */}
            <div className="lg:w-2/3 space-y-6">
              {/* Main Image */}
              <div className="rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={mainImage}
                  alt={selectedSpace.name}
                  className="w-full h-[400px] object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                  }}
                />
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex gap-3">
                {[selectedSpace.image, "/src/assets/office-1.jpg", "/src/assets/office-2.jpg"].map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setMainImage(img)}
                    className={`w-20 h-16 rounded-md overflow-hidden cursor-pointer border-2 ${mainImage === img ? 'border-primary' : 'border-transparent'}`}
                  >
                    <img
                      src={img}
                      alt={`Preview ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Office Info */}
              <div className="space-y-6 pt-4">
                <div>
                  <h2 className="text-2xl font-semibold mb-3">About this office</h2>
                  <p className="text-muted-foreground">{selectedSpace.description}</p>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-4">Features</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <span>Capacity: {selectedSpace.capacity}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                        <Ruler className="h-4 w-4 text-primary" />
                      </div>
                      <span>Size: {selectedSpace.size}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                        <MapPin className="h-4 w-4 text-primary" />
                      </div>
                      <span>{selectedSpace.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                        <DoorOpen className="h-4 w-4 text-primary" />
                      </div>
                      <span>{selectedSpace.available} available</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-4">Amenities</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedSpace.amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                          <CheckIcon className="h-4 w-4 text-primary" />
                        </div>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Booking Form */}
            <div className="lg:w-1/3">
              <div className="sticky top-28">
                <Card className="border-none shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-2xl font-bold">${selectedSpace.price}<span className="text-base font-normal text-muted-foreground">/month</span></h2>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Available</div>
                        <div className="font-medium text-lg">{selectedSpace.available} office{selectedSpace.available !== 1 ? 's' : ''}</div>
                      </div>
                    </div>

                    {/* Calendar */}
                    <div className="mb-6">
                      <h3 className="font-medium mb-3">Select Move-in Date</h3>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDateSelect}
                        className="rounded-md border p-4"
                        disabled={(date) => date < new Date()}
                      />
                    </div>

                    {/* Time Slots */}
                    <div className="mb-6">
                      <h3 className="font-medium mb-3">Select Time</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots().map((slot) => (
                          <Button
                            key={slot.id}
                            variant={isSlotSelected(slot) ? "default" : "outline"}
                            className={`h-14 flex flex-col items-center justify-center p-2 ${isSlotSelected(slot) ? 'bg-green-100 hover:bg-green-200 text-green-800 border-green-300' : ''}`}
                            onClick={() => handleSlotClick(slot)}
                          >
                            <span className="text-sm font-medium">
                              {format(slot.startTime, 'h')}-{format(slot.endTime, 'h a')}
                            </span>
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Price Summary */}
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          ${selectedSpace.price} × {selectedSlots.length} month{selectedSlots.length !== 1 ? 's' : ''}
                        </span>
                        <span>${totalPrice}</span>
                      </div>
                      <div className="border-t pt-3 flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${totalPrice}</span>
                      </div>
                    </div>

                    <Button
                      className="w-full h-12 text-base font-medium"
                      size="lg"
                      onClick={handleBookNow}
                      disabled={selectedSlots.length === 0}
                    >
                      Book Office Space
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Suggested Office Spaces */}
          <div className="mt-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">More Office Spaces</h2>
              <Button variant="outline">See More <ChevronRight className="h-4 w-4 ml-2" /></Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {officeSpaces
                .filter(space => space.id !== selectedSpace.id)
                .map((space) => (
                  <Card
                    key={space.id}
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => {
                      setSelectedSpace(space);
                      setMainImage(space.image);
                      setSelectedSlots([]);
                    }}
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={space.image}
                        alt={space.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-lg">{space.name}</h3>
                        <div className="flex items-center bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
                          <Star className="h-3 w-3 mr-1 fill-primary" />
                          {space.rating}
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm mt-1">${space.price}/month</p>
                      <div className="flex items-center text-sm text-muted-foreground mt-2">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        <span>{space.location}</span>
                      </div>
                      <div className="flex items-center justify-between mt-3 text-sm">
                        <div className="flex items-center">
                          <Users className="h-3.5 w-3.5 mr-1" />
                          <span>{space.capacity}</span>
                        </div>
                        <div className="text-green-600">{space.available} available</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OfficeBooking;