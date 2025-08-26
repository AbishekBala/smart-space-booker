import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { format, isSameDay } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { CheckIcon, Clock, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";

interface CoworkingSpace {
  id: number;
  name: string;
  description: string;
  price: number;
  capacity: number;
  image: string;
  amenities: string[];
  type: 'hot-desk' | 'dedicated-desk' | 'private-office';
  availableDesks: number;
}

interface BookingSlot {
  startTime: Date;
  endTime: Date;
  spaceId: number;
}

const CoworkingSpaces = () => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [selectedSpace, setSelectedSpace] = useState<CoworkingSpace | null>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const { toast } = useToast();

  // Sample data - replace with actual API call
  const coworkingSpaces: CoworkingSpace[] = [
    {
      id: 1,
      name: "Open Workspace Hot Desk",
      description: "Flexible hot desk in our vibrant open workspace with high-speed internet and access to all common areas.",
      price: 15,
      capacity: 1,
      image: "/src/assets/coworking-space.jpg",
      type: 'hot-desk',
      availableDesks: 8,
      amenities: ["High-speed WiFi", "Printing", "Coffee & Tea", "24/7 Access"]
    },
    {
      id: 2,
      name: "Dedicated Desk",
      description: "Your own dedicated workspace with locking storage and monitor stand in a shared office environment.",
      price: 250,
      capacity: 1,
      image: "/src/assets/dedicated-desk.jpg",
      type: 'dedicated-desk',
      availableDesks: 3,
      amenities: ["Personal Storage", "Dual Monitor Setup", "Mail Handling", "Meeting Room Credits"]
    },
    {
      id: 3,
      name: "Private Office",
      description: "Fully furnished private office for small teams with customizable layout options.",
      price: 800,
      capacity: 4,
      image: "/src/assets/private-office.jpg",
      type: 'private-office',
      availableDesks: 2,
      amenities: ["Lockable Door", "Custom Branding", "Phone Booth Access", "Priority Support"]
    }
  ];

  // Set default selected space
  useEffect(() => {
    if (coworkingSpaces.length > 0 && !selectedSpace) {
      setSelectedSpace(coworkingSpaces[0]);
      setMainImage(coworkingSpaces[0].image);
    }
  }, [coworkingSpaces]);

  const totalPrice = selectedSpace ? 
    selectedSpace.price * selectedDates.length * (selectedSpace.type === 'private-office' ? 1 : 1) : 0;

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    setSelectedDates(prev => {
      // If date already selected, remove it
      if (prev.some(selectedDate => isSameDay(selectedDate, date))) {
        return prev.filter(selectedDate => !isSameDay(selectedDate, date));
      }
      // Otherwise add it
      return [...prev, date].sort((a, b) => a.getTime() - b.getTime());
    });
  };

  const isSlotSelected = (slot: BookingSlot, spaceId: number) => {
    return selectedSlots.some(
      selectedSlot => 
        selectedSlot.spaceId === spaceId && 
        selectedSlot.startTime.getTime() === slot.startTime.getTime()
    );
  };

  const [selectedSlots, setSelectedSlots] = useState<BookingSlot[]>([]);

  const handleSlotClick = (slot: BookingSlot, spaceId: number) => {
    const isSelected = isSlotSelected(slot, spaceId);

    if (isSelected) {
      setSelectedSlots(selectedSlots.filter(s =>
        !(s.spaceId === spaceId && s.startTime.getTime() === slot.startTime.getTime())
      ));
    } else {
      // For coworking, allow selecting only one slot at a time
      setSelectedSlots([{ ...slot, spaceId }]);
    }
  };

  const handleBookNow = () => {
    if (selectedDates.length === 0 || !selectedSpace) return;

    const formattedDates = selectedDates
      .sort((a, b) => a.getTime() - b.getTime())
      .map(date => format(date, 'MMM d, yyyy'))
      .join(', ');

    toast({
      title: "Booking Confirmed!",
      description: (
        <div className="space-y-2">
          <p>You've booked <strong>{selectedSpace.name}</strong></p>
          <p>Dates: {formattedDates}</p>
          <p>Total: ${totalPrice}</p>
        </div>
      ),
    });

    setSelectedDates([]);
  };

  if (!selectedSpace) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-3 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Left Column: Space Images and Info */}
            <div className="lg:w-2/3 space-y-4">
              <div className="flex flex-col gap-4">
                {/* Main Image */}
                <div className="w-full">
                  <div className="rounded-xl overflow-hidden bg-gray-100 shadow-md">
                    <img
                      src={mainImage}
                      alt={selectedSpace.name}
                      className="w-full h-[360px] md:h-[480px] object-cover transition-transform duration-300 hover:scale-105"
                      loading="eager"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                      }}
                    />
                  </div>
                </div>

                {/* Calendar */}
                {/* <div className="md:w-1/2 flex items-center justify-center">
                                    <Calendar
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={handleDateSelect}
                                        className="rounded-md border p-2 w-full"
                                        disabled={(date) => date < new Date()}
                                    />
                                </div> */}
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {[selectedSpace.image, "/src/assets/coworking-space-2.jpg", "/src/assets/coworking-space-3.jpg"].map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setMainImage(img)}
                    className={`flex-shrink-0 w-20 h-16 md:w-24 md:h-20 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${mainImage === img ? 'ring-2 ring-primary ring-offset-2' : 'opacity-80 hover:opacity-100'}`}
                  >
                    <img
                      src={img}
                      alt={`Preview ${idx + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Space Info */}
              <div className="space-y-3 pt-2">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{selectedSpace.name}</h2>
                  <p className="text-muted-foreground text-sm">{selectedSpace.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Space Details</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10">
                        <CheckIcon className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-sm">{selectedSpace.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10">
                        <CheckIcon className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-sm">Up to {selectedSpace.capacity} person{selectedSpace.capacity > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10">
                        <CheckIcon className="h-3 w-3 text-primary" />
                      </div>
                      {/* <span className="text-sm">{selectedSpace.availableDesks} available</span> */}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Amenities</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedSpace.amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10">
                          <CheckIcon className="h-3 w-3 text-primary" />
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
              <div className="sticky top-20">
                <Card className="border-none shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-xl font-bold">${selectedSpace.price}<span className="text-sm font-normal text-muted-foreground">/{selectedSpace.type === 'private-office' ? 'month' : 'day'}</span></h2>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">Available</div>
                        <div className="font-medium">{selectedSpace.availableDesks} {selectedSpace.type === 'private-office' ? 'offices' : 'desks'}</div>
                      </div>
                    </div>

                    {/* Time Slots */}
                    {/* <div className="mb-4">
                                            <h3 className="font-medium mb-2">Select Time</h3>
                                            <div className="grid grid-cols-3 gap-1.5">
                                                {timeSlots.map((timeSlot, idx) => {
                                                    const isSelected = isSlotSelected(timeSlot, selectedSpace.id);
                                                    return (
                                                        <Button
                                                            key={idx}
                                                            variant={isSelected ? "default" : "outline"}
                                                            className={`h-10 text-xs ${isSelected ? 'bg-green-100 hover:bg-green-200 text-green-800 border-green-300' : ''}`}
                                                            onClick={() => handleSlotClick(timeSlot, selectedSpace.id)}
                                                            disabled={selectedSpace.availableDesks === 0}
                                                        >
                                                            {format(timeSlot.startTime, 'h a')}
                                                        </Button>
                                                    );
                                                })}
                                            </div>
                                        </div> */}
                    <div className="w-full">
                      <div className="mb-4">
                        <h3 className="font-medium mb-2">Select Dates</h3>
                        <Calendar
                          mode="multiple"
                          selected={selectedDates}
                          onSelect={(dates) => setSelectedDates(dates || [])}
                          className="rounded-md border p-3 w-full"
                          disabled={(date) => {
                            // Disable past dates and dates more than 30 days in the future
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            const maxDate = new Date();
                            maxDate.setDate(today.getDate() + 30);
                            return date < today || date > maxDate;
                          }}
                        />
                      </div>
                      {selectedDates.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium mb-2">Selected Dates:</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedDates.map((date, index) => (
                              <div 
                                key={index} 
                                className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full flex items-center gap-2"
                              >
                                {format(date, 'MMM d, yyyy')}
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedDates(prev => prev.filter((_, i) => i !== index));
                                  }}
                                  className="text-primary/70 hover:text-primary"
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Price Summary */}
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          ${selectedSpace.price} × {selectedDates.length} {selectedSpace.type === 'private-office' ? 'month' : 'day'}{selectedDates.length !== 1 ? 's' : ''}
                        </span>
                        <span>${totalPrice}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${totalPrice}</span>
                      </div>
                    </div>

                    <Button
                      className="w-full h-10 text-sm font-medium mt-4"
                      size="sm"
                      onClick={handleBookNow}
                      disabled={selectedDates.length === 0}
                    >
                      {selectedDates.length > 0 
                        ? `Book ${selectedDates.length} Day${selectedDates.length > 1 ? 's' : ''}` 
                        : 'Select Dates'}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* More Coworking Spaces */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">More Coworking Spaces</h2>
              <p className="mt-2 text-sm text-gray-600">Explore other available workspaces that might suit your needs</p>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0" size="sm">
              View All Spaces <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coworkingSpaces
              .filter(space => space.id !== selectedSpace.id)
              .map((space) => (
                <Card
                  key={space.id}
                  className="h-full flex flex-col overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                  onClick={() => {
                    setSelectedSpace(space);
                    setMainImage(space.image);
                    setSelectedDates([]);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <div className="relative pb-[60%] overflow-hidden">
                    <img
                      src={space.image}
                      alt={space.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                      }}
                    />
                    <div className="absolute bottom-2 right-2 bg-white/90 text-xs font-medium px-2 py-1 rounded-full">
                      {space.availableDesks} {space.type === 'private-office' ? 'offices' : 'desks'} available
                    </div>
                  </div>
                  <CardContent className="p-5 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{space.name}</h3>
                      <span className="bg-primary/10 text-primary text-sm font-medium px-2.5 py-0.5 rounded-full">
                        ${space.price}<span className="text-xs">/{space.type === 'private-office' ? 'mo' : 'day'}</span>
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{space.description}</p>
                    
                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {space.amenities.slice(0, 3).map((amenity, idx) => (
                          <div key={idx} className="inline-flex items-center gap-1 bg-gray-100 rounded-full px-2.5 py-1 text-xs text-gray-700">
                            <CheckIcon className="h-3 w-3 text-primary" />
                            <span>{amenity}</span>
                          </div>
                        ))}
                        {space.amenities.length > 3 && (
                          <span className="text-xs text-gray-500 self-center">+{space.amenities.length - 3} more</span>
                        )}
                      </div>
                      
                      <Button className="w-full" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CoworkingSpaces;
