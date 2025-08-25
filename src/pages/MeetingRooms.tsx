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
      rating: 4.7,
      reviews: 89,
      price: 50,
      type: "Meeting Room",
      capacity: "4-8 people",
      amenities: ["HD Video Conferencing", "55\" 4K Display", "Whiteboard", "Air Conditioning", "Free WiFi"]
    },
    {
      id: 2,
      name: "Large Conference Room",
      image: "/src/assets/coworking-space.jpg",
      description: "Ideal for 10-20 people with premium AV equipment and 75\" interactive display.",
      rating: 4.9,
      reviews: 156,
      price: 120,
      type: "Conference Room",
      capacity: "10-20 people",
      amenities: ["Premium AV Equipment", "75\" Interactive Display", "Recording Equipment", "Catering Available", "Video Conferencing"]
    }
  ];

  const selectedRoom = meetingRooms[0];

  // Generate time slots from 9 AM to 5 PM
  const timeSlots = Array.from({ length: 9 }, (_, i) => {
    const hour = 9 + i;
    const startTime = new Date(selectedDate);
    startTime.setHours(hour, 0, 0, 0);
    return startTime;
  });

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      // Clear selected slots when date changes
      setSelectedSlots([]);
    }
  };

  const handleSlotClick = (startTime: Date, roomId: number) => {
    const endTime = addHours(startTime, 1);

    // Check if slot is already selected
    const slotIndex = selectedSlots.findIndex(
      slot => isSameDay(slot.startTime, startTime) &&
        slot.startTime.getHours() === startTime.getHours() &&
        slot.roomId === roomId
    );

    if (slotIndex >= 0) {
      // Remove slot if already selected
      setSelectedSlots(prev => prev.filter((_, i) => i !== slotIndex));
    } else {
      // Add new slot
      const newSlot: BookingSlot = {
        id: `${roomId}-${startTime.getTime()}`,
        startTime,
        endTime,
        roomId
      };
      setSelectedSlots(prev => [...prev, newSlot]);
    }
  };

  const isSlotSelected = (startTime: Date, roomId: number) => {
    return selectedSlots.some(
      slot => isSameDay(slot.startTime, startTime) &&
        slot.startTime.getHours() === startTime.getHours() &&
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
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={() => window.history.back()}>
              <ChevronLeft className="h-4 w-4 mr-2" /> Back to all spaces
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-semibold">${selectedRoom.price}</span>
              <span className="text-muted-foreground">/hr</span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Room Header and Image */}
            <div className="lg:w-1/2 space-y-6">
              {/* Room Header */}
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">{selectedRoom.name}</h1>
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-muted-foreground">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{selectedRoom.capacity}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{selectedRoom.rating}</span>
                    <span className="text-muted-foreground">({selectedRoom.reviews})</span>
                  </div>
                </div>
              </div>

              {/* Room Image */}
              <div className="aspect-[16/9] overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={selectedRoom.image}
                  alt={selectedRoom.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="eager"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                  }}
                />
              </div>

              {/* Room Details Section */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">About this space</h3>
                  <p className="text-gray-600">{selectedRoom.description}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Amenities</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedRoom.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Calendar and Booking */}
            <div className="lg:w-1/2">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-4">Select Date & Time</h3>
                        <div className="flex flex-col lg:flex-row gap-6">
                          <div className="flex-shrink-0">
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={handleDateSelect}
                              className="rounded-md border shadow-sm"
                              disabled={(date) => date < new Date()}
                            />
                          </div>
                          
                          <div className="flex-1 bg-gray-50 p-4 rounded-lg border">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="font-medium text-gray-900">Available Time Slots</h3>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <div className="w-3 h-3 rounded-full bg-primary/20"></div>
                                  <span>Available</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                                  <span>Selected</span>
                                </div>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 gap-2 max-h-[360px] overflow-y-auto pr-2">
                              {timeSlots.map((time, index) => {
                                const slotStart = new Date(time);
                                const slotEnd = addHours(slotStart, 1);
                                const isSelected = isSlotSelected(slotStart, selectedRoom.id);
                                const isPast = slotStart < new Date();

                                return (
                                  <Button
                                    key={index}
                                    variant={isSelected ? "default" : "outline"}
                                    className={`
                                      justify-between h-auto py-3 px-4
                                      ${isSelected ? 'bg-primary text-primary-foreground shadow-md' : 'hover:bg-primary/10 hover:text-primary'}
                                      ${isPast ? 'opacity-50 cursor-not-allowed' : ''}
                                      text-sm w-full transition-all
                                    `}
                                    onClick={() => !isPast && handleSlotClick(slotStart, selectedRoom.id)}
                                    disabled={isPast}
                                  >
                                    <div className="flex items-center gap-3">
                                      <Clock className="h-4 w-4" />
                                      <span className="font-medium">{format(slotStart, 'h:mm a')} - {format(slotEnd, 'h:mm a')}</span>
                                    </div>
                                    {isSelected && (
                                      <span className="bg-primary-foreground/10 px-2 py-1 rounded text-xs">
                                        Selected
                                      </span>
                                    )}
                                  </Button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>

                    {selectedSlots.length > 0 && (
                      <div className="mt-6">
                        <div className="bg-gray-50 rounded-lg border p-4">
                          <h3 className="font-medium text-gray-900 mb-4">Booking Summary</h3>
                          <div className="space-y-4">
                            <div className="divide-y">
                              {selectedSlots.map((slot, index) => (
                                <div key={index} className="flex justify-between items-center py-3">
                                  <div>
                                    <p className="font-medium text-gray-900">{format(slot.startTime, 'h:mm a')}</p>
                                    <p className="text-sm text-gray-500">
                                      {format(slot.startTime, 'EEEE, MMM d')}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-medium">${selectedRoom.price}</p>
                                    <p className="text-sm text-gray-500">per hour</p>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="space-y-2 pt-3 border-t">
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">Space fee ({selectedSlots.length} {selectedSlots.length === 1 ? 'hour' : 'hours'})</span>
                                <span className="font-medium">${selectedRoom.price * selectedSlots.length}</span>
                              </div>
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">Service fee</span>
                                <span className="font-medium">${(selectedRoom.price * selectedSlots.length * 0.1).toFixed(2)}</span>
                              </div>
                              <div className="pt-2 mt-2 border-t">
                                <div className="flex justify-between items-center">
                                  <span className="font-semibold text-gray-900">Total</span>
                                  <span className="font-semibold text-lg">${(selectedRoom.price * selectedSlots.length * 1.1).toFixed(2)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Button 
                          className="w-full mt-4 bg-primary hover:bg-primary/90" 
                          size="lg" 
                          onClick={handleBookNow}
                        >
                          Book Now
                        </Button>
                      </div>
                    )}
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

export default MeetingRooms;