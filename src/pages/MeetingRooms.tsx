import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { format, addDays, isSameDay, addHours, parseISO, isWithinInterval, addMonths, isToday } from "date-fns";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, Star, MapPin, Users, Video, Wifi, Monitor, Printer, Lock, Power, CheckIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";

interface Room {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  capacity: string;
  amenities: string[];
  rating: number;
  reviews: number;
  type?: string;
}

interface BookingSlot {
  id: string;
  startTime: Date;
  endTime: Date;
  roomId?: number;
}

const MeetingRooms = () => {
  useScrollToTop();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlots, setSelectedSlots] = useState<BookingSlot[]>([]);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const { toast } = useToast();

  const meetingRooms: Room[] = [
    {
      id: 1,
      name: "Small Meeting Room",
      image: "/src/assets/meeting-room.jpg",
      description: "Perfect for 4-8 people with HD video conferencing and 55\" 4K display.",
      rating: 0,
      reviews: 0,
      price: 50,
      type: "Meeting Room",
      capacity: "8",
      amenities: ["HD Video Conferencing", "55\" 4K Display", "Whiteboard", "Air Conditioning", "Free WiFi"]
    },
    {
      id: 2,
      name: "Large Conference Room",
      image: "/src/assets/coworking-space.jpg",
      description: "Ideal for 10-20 people with premium AV equipment and 75\" interactive display.",
      rating: 0,
      reviews: 0,
      price: 120,
      type: "Conference Room",
      capacity: "12",
      amenities: ["Premium AV Equipment", "75\" Interactive Display", "Recording Equipment", "Catering Available", "Video Conferencing"]
    }
  ];

  const suggestedWorkspaces: Room[] = [
    {
      id: 3,
      name: "Executive Meeting Suite",
      image: "/src/assets/meeting-room.jpg",
      description: "A premium suite for executive meetings, equipped with state-of-the-art tech.",
      price: 180,
      capacity: "10",
      amenities: ["8K Display", "Video Conferencing", "Catering"],
      rating: 5.0,
      reviews: 78,
      type: "Meeting Room"
    },
    {
      id: 4,
      name: "Collaborative Hub",
      image: "/src/assets/meeting-room.jpg",
      description: "A dynamic space designed for team collaboration and workshops.",
      price: 95,
      capacity: "15",
      amenities: ["Interactive Whiteboard", "High-speed WiFi", "Coffee & Refreshments"],
      rating: 4.9,
      reviews: 150,
      type: "Meeting Room"
    },
    {
      id: 5,
      name: "Focus Room",
      image: "/src/assets/meeting-room.jpg",
      description: "A quiet, private room perfect for focused work or small team discussions.",
      price: 60,
      capacity: "6",
      amenities: ["Soundproofing", "HD Monitor", "Printer Access"],
      rating: 4.8,
      reviews: 95,
      type: "Meeting Room"
    }
  ];

  const [selectedRoom, setSelectedRoom] = useState(meetingRooms[0]);
  const [mainImage, setMainImage] = useState(selectedRoom.image);

  // Generate time slots from 9 AM to 5 PM with time range
  const timeSlots = Array.from({ length: 9 }, (_, i) => {
    const hour = 9 + i;
    const startTime = new Date(selectedDate);
    const endTime = new Date(selectedDate);
    startTime.setHours(hour, 0, 0, 0);
    endTime.setHours(hour + 1, 0, 0, 0);
    return { startTime, endTime };
  });

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      // Clear selected slots when date changes
      setSelectedSlots([]);
    }
  };

  const handleSlotClick = (timeSlot: { startTime: Date, endTime: Date }, roomId: number) => {
    // Check if slot is already selected
    const slotIndex = selectedSlots.findIndex(
      slot => isSameDay(slot.startTime, timeSlot.startTime) &&
        slot.startTime.getHours() === timeSlot.startTime.getHours() &&
        slot.roomId === roomId
    );

    if (slotIndex >= 0) {
      // Remove slot if already selected
      setSelectedSlots(prev => prev.filter((_, i) => i !== slotIndex));
    } else {
      // Add new slot
      const newSlot: BookingSlot = {
        id: `${roomId}-${timeSlot.startTime.getTime()}`,
        startTime: timeSlot.startTime,
        endTime: timeSlot.endTime,
        roomId
      };
      setSelectedSlots(prev => [...prev, newSlot]);
    }
  };

  const isSlotSelected = (timeSlot: { startTime: Date }, roomId: number) => {
    return selectedSlots.some(
      slot => isSameDay(slot.startTime, timeSlot.startTime) &&
        slot.startTime.getHours() === timeSlot.startTime.getHours() &&
        slot.roomId === roomId
    );
  };

  const handleBookNow = () => {
    if (selectedSlots.length === 0) {
      toast({
        variant: "destructive",
        title: "No slots selected",
        description: "Please select at least one time slot to book.",
      });
      return;
    }

    // Group slots by room
    const bookingsByRoom = selectedSlots.reduce((acc, slot) => {
      if (!acc[slot.roomId!]) {
        acc[slot.roomId!] = [];
      }
      acc[slot.roomId!].push(slot);
      return acc;
    }, {} as Record<number, BookingSlot[]>);

    // Process bookings for each room
    Object.entries(bookingsByRoom).forEach(([roomId, slots]) => {
      const room = meetingRooms.find(r => r.id === parseInt(roomId));
      const slotTimes = slots.map(slot =>
        `${format(slot.startTime, 'h:mm a')} - ${format(slot.endTime, 'h:mm a')}`
      ).join('\n');

      toast({
        title: `Booking Confirmed for ${room?.name}`,
        description: `You've booked the following time slots:\n${slotTimes}`,
      });
    });

    // Clear selections after booking
    setSelectedSlots([]);
  };

  const totalPrice = selectedSlots.length * selectedRoom.price;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column: Room Images and Calendar */}
            <div className="lg:w-2/3 space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Main Image */}
                <div className="md:w-1/2">
                  <div className="rounded-xl overflow-hidden bg-gray-100">
                    <img
                      src={mainImage}
                      alt={selectedRoom.name}
                      className="w-full h-[300px] object-cover"
                      loading="eager"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                      }}
                    />
                  </div>
                </div>

                {/* Calendar */}
                <div className="md:w-1/2 flex items-center justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    className="rounded-md border p-4"
                    disabled={(date) => date < new Date()}
                  />
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex gap-3">
                {[selectedRoom.image, "/src/assets/coworking-space.jpg", "/src/assets/meeting-room.jpg"].map((img, idx) => (
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

              {/* Room Info */}
              <div className="space-y-6 pt-4">
                <div>
                  <h2 className="text-2xl font-semibold mb-3">About this space</h2>
                  <p className="text-muted-foreground">{selectedRoom.description}</p>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-4">Amenities</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedRoom.amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                          <CheckIcon className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-sm">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Booking Form */}
            <div className="lg:w-1/3">
              <div className="sticky top-24">
                <Card className="border-none shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-2xl font-bold">${selectedRoom.price}<span className="text-base font-normal text-muted-foreground">/hour</span></h2>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Capacity</div>
                        <div className="font-medium text-lg">{selectedRoom.capacity}</div>
                      </div>
                    </div>

                    {/* Time Slots */}
                    <div className="mb-6">
                      <h3 className="font-medium mb-3">Select Time</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((timeSlot, idx) => {
                          const isSelected = isSlotSelected(timeSlot, selectedRoom.id);
                          return (
                            <Button
                              key={idx}
                              variant={isSelected ? "default" : "outline"}
                              className={`h-14 flex flex-col items-center justify-center p-2 ${isSelected ? 'bg-green-100 hover:bg-green-200 text-green-800 border-green-300' : ''}`}
                              onClick={() => handleSlotClick(timeSlot, selectedRoom.id)}
                            >
                              <span className="text-sm font-medium">
                                {format(timeSlot.startTime, 'h')}-{format(timeSlot.endTime, 'h a')}
                              </span>
                            </Button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Price Summary */}
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          ${selectedRoom.price} × {selectedSlots.length} hour{selectedSlots.length !== 1 ? 's' : ''}
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
                      Proceed to Checkout
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Suggested Workspaces */}
        <div className="max-w-7xl mx-auto mt-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Suggested More Meeting Spaces</h2>
            <Button variant="outline">See More <ChevronRight className="h-4 w-4 ml-2" /></Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {suggestedWorkspaces.map((room) => (
              <Card key={room.id} className="flex flex-col rounded-lg overflow-hidden border shadow-sm hover:shadow-lg transition-shadow">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                  }}
                />
                <CardContent className="p-6 flex flex-col flex-grow">
                  <h3 className="font-semibold text-xl mb-1">{room.name}</h3>
                  <p className="text-muted-foreground mb-3">${room.price}/hr</p>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">{room.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {room.amenities.slice(0, 3).map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1 text-xs text-gray-600">
                        <Clock className="h-3 w-3" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full mt-auto bg-blue-600 hover:bg-blue-700">Book Now</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MeetingRooms;