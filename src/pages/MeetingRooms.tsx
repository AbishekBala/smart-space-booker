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

  const [selectedRoom, setSelectedRoom] = useState(meetingRooms[0]);
  const [mainImage, setMainImage] = useState(selectedRoom.image);

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
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left Side: Image Gallery, About, Amenities */}
            <div className="lg:w-1/2 flex flex-col">
              {/* Room Header */}
              <div className="flex justify-between items-center mb-4">
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

              {/* Main Image */}
              <div className="aspect-[16/9] overflow-hidden rounded-xl bg-gray-100 mb-4">
                <img
                  src={mainImage}
                  alt={selectedRoom.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="eager"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                  }}
                />
              </div>
              {/* Sub Images Thumbnails */}
              <div className="flex gap-3 mb-6">
                {[selectedRoom.image, "/src/assets/coworking-space.jpg", "/src/assets/meeting-room.jpg"].map((img, idx) => (
                  <button
                    key={idx}
                    className={`w-20 h-14 rounded-lg overflow-hidden border-2 ${mainImage === img ? 'border-blue-500' : 'border-transparent'}`}
                    onClick={() => setMainImage(img)}
                    type="button"
                  >
                    <img src={img} alt="Preview" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* About & Amenities */}
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

            {/* Right Side: Slots, Calendar, Checkout */}
            <div className="lg:w-1/2 flex flex-col gap-8">
              <Card className="flex-1">
                <CardContent className="p-6 flex flex-col gap-8">
                  {/* Time Slots Horizontal */}
                  <div>
                    <h3 className="font-medium mb-4">Select Time Slot</h3>
                    <div className="flex gap-4 flex-wrap mb-2">
                      {timeSlots.map((time, index) => {
                        const slotStart = new Date(time);
                        const slotEnd = addHours(slotStart, 1);
                        const isSelected = isSlotSelected(slotStart, selectedRoom.id);
                        const isPast = slotStart < new Date();
                        return (
                          <button
                            key={index}
                            className={`min-w-[100px] px-4 py-3 rounded-lg border text-sm font-medium flex flex-col items-center justify-center transition-all duration-200
                              ${isSelected ? 'bg-blue-600 text-white border-blue-600 shadow-lg' : 'bg-white text-gray-900 border-gray-200 hover:bg-blue-50'}
                              ${isPast ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                            `}
                            onClick={() => !isPast && handleSlotClick(slotStart, selectedRoom.id)}
                            disabled={isPast}
                            type="button"
                          >
                            <span>{format(slotStart, 'h a')} - {format(slotEnd, 'h a')}</span>
                            {isSelected && <span className="mt-1 text-xs font-bold bg-white text-blue-600 px-2 py-0.5 rounded">Selected</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Calendar Below Slots */}
                  <div>
                    <h3 className="font-medium mb-4">Select Date</h3>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      className="rounded-md border shadow-sm mx-auto"
                      disabled={(date) => date < new Date()}
                    />
                  </div>

                  {/* Booking Summary & Proceed Button */}
                  {selectedSlots.length > 0 && (
                    <div className="mt-2">
                      <div className="bg-gray-50 rounded-lg border p-4 mb-4">
                        <h3 className="font-medium text-gray-900 mb-4">Booking Summary</h3>
                        <div className="space-y-4">
                          <div className="divide-y">
                            {selectedSlots.map((slot, index) => (
                              <div key={index} className="flex justify-between items-center py-3">
                                <div>
                                  <p className="font-medium text-gray-900">{format(slot.startTime, 'h:mm a')}</p>
                                  <p className="text-sm text-gray-500">{format(slot.startTime, 'EEEE, MMM d')}</p>
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
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 rounded-lg font-semibold shadow-lg" 
                        size="lg" 
                        onClick={handleBookNow}
                      >
                        Proceed to Checkout
                      </Button>
                    </div>
                  )}
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