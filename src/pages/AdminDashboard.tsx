import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  LayoutDashboard, 
  Plus, 
  Settings, 
  Users, 
  BarChart3, 
  HelpCircle,
  Wifi,
  Car,
  Shield,
  Monitor,
  Coffee,
  User,
  Calendar as CalendarIcon,
  Upload,
  X,
  ChevronLeft,
  ChevronDown,
  ChevronRight,
  Clock,
  Check,
  Save,
  Trash2,
  Edit
} from "lucide-react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [availabilityMode, setAvailabilityMode] = useState("daily");
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedDailySlot, setSelectedDailySlot] = useState<string>("");
  const [savedSlots, setSavedSlots] = useState<Array<{
    id: string;
    name: string;
    date: Date;
    slots: string[];
    type: 'daily' | 'hourly';
    hoursCount: number;
  }>>([]);
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [slotName, setSlotName] = useState("");
  const [assetManagementExpanded, setAssetManagementExpanded] = useState(false);
  const [assetForm, setAssetForm] = useState({
    name: "",
    type: "",
    location: "",
    capacity: "",
    description: "",
    basePrice: "",
    currency: "USD",
  });
  const [pricingForm, setPricingForm] = useState({
    basePrice: "150.00",
    currency: "USD",
    pricingType: "per-night",
    priceIncludesTaxes: true,
    taxRate: "8.00",
    taxDescription: "VAT, GST, Sales Tax"
  });

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { 
      id: "asset-management", 
      label: "Asset Management", 
      icon: Settings,
      hasSubmenu: true,
      submenu: [
        { id: "assets", label: "Assets", icon: Settings },
        { id: "create-asset", label: "Create New Asset", icon: Plus }
      ]
    },
    { id: "availability", label: "Availability", icon: CalendarIcon },
    { id: "pricing", label: "Pricing & Details", icon: BarChart3 },
    { id: "amenities", label: "Amenities", icon: Wifi },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "user-management", label: "User Management", icon: Users },
    { id: "help", label: "Help & Support", icon: HelpCircle },
  ];

  const commonAmenities = [
    { id: "wifi", label: "Wi-Fi", icon: Wifi },
    { id: "projector", label: "Projector", icon: Monitor },
    { id: "whiteboard", label: "Whiteboard", icon: Monitor },
    { id: "parking", label: "Parking", icon: Car },
    { id: "ac", label: "Air Conditioning", icon: Monitor },
    { id: "catering", label: "Catering", icon: Coffee },
    { id: "accessibility", label: "Accessibility", icon: Shield },
    { id: "av-equipment", label: "AV Equipment", icon: Monitor },
    { id: "security", label: "Security", icon: Shield },
  ];

  const handleAmenityToggle = (amenityId: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenityId) 
        ? prev.filter(id => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedImages(prev => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const renderStepIndicator = () => (
    <div className="flex items-center space-x-4 mb-8">
      {[1, 2, 3, 4].map((step) => (
        <div key={step} className="flex items-center">
          <div 
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step <= currentStep 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            {step}
          </div>
          <span className="ml-2 text-sm font-medium">
            {step === 1 && "Basic Information"}
            {step === 2 && "Amenities"}
            {step === 3 && "Availability"}
            {step === 4 && "Pricing"}
          </span>
          {step < 4 && <div className="w-12 h-px bg-gray-300 ml-4" />}
        </div>
      ))}
    </div>
  );

  const renderBasicInformation = () => (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
        <CardDescription>
          Enter the essential details about this asset. All fields marked with * are required.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="asset-name">Asset Name *</Label>
            <Input
              id="asset-name"
              placeholder="Enter asset name"
              value={assetForm.name}
              onChange={(e) => setAssetForm(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="asset-type">Asset Type *</Label>
            <Select 
              value={assetForm.type} 
              onValueChange={(value) => setAssetForm(prev => ({ ...prev, type: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select asset type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="meeting-room">Meeting Room</SelectItem>
                <SelectItem value="private-office">Private Office</SelectItem>
                <SelectItem value="coworking">Coworking Space</SelectItem>
                <SelectItem value="conference-room">Conference Room</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location *</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="floor-1">Floor 1 - East Wing</SelectItem>
              <SelectItem value="floor-2">Floor 2 - West Wing</SelectItem>
              <SelectItem value="floor-3">Floor 3 - North Wing</SelectItem>
              <SelectItem value="ground">Ground Floor - Main Hall</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="capacity">Capacity *</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Number of people" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-2">1-2 people</SelectItem>
              <SelectItem value="3-5">3-5 people</SelectItem>
              <SelectItem value="6-10">6-10 people</SelectItem>
              <SelectItem value="11-15">11-15 people</SelectItem>
              <SelectItem value="16-20">16-20 people</SelectItem>
              <SelectItem value="20+">20+ people</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="base-price">Base Price *</Label>
            <Input
              id="base-price"
              type="number"
              placeholder="Enter base price"
              value={assetForm.basePrice}
              onChange={(e) => setAssetForm(prev => ({ ...prev, basePrice: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="currency">Currency *</Label>
            <Select 
              value={assetForm.currency} 
              onValueChange={(value) => setAssetForm(prev => ({ ...prev, currency: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD - US Dollar</SelectItem>
                <SelectItem value="EUR">EUR - Euro</SelectItem>
                <SelectItem value="GBP">GBP - British Pound</SelectItem>
                <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter a short description of the asset"
              value={assetForm.description}
              onChange={(e) => setAssetForm(prev => ({ ...prev, description: e.target.value }))}
              className="min-h-[100px]"
            />
            <p className="text-xs text-gray-500">Brief description of the asset's features and purpose (max 500 characters)</p>
          </div>
          <div className="space-y-2">
            <Label>Asset Images *</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm font-medium mb-1">Drag and drop images here</p>
              <p className="text-xs text-gray-500 mb-2">or</p>
              <Button variant="outline" size="sm" onClick={() => document.getElementById('file-upload')?.click()}>
                Browse Files
              </Button>
              <input
                id="file-upload"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <p className="text-xs text-gray-500 mt-2">Support formats: JPG, PNG, WEBP • Max size: 2MB per image</p>
            </div>
          </div>
        </div>

        {uploadedImages.length > 0 && (
          <div>
            <Label className="text-sm font-medium mb-3 block">Uploaded Images</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {uploadedImages.map((file, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg border"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                  <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
                    Image {index + 1}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">Set any one image as cover picture and you can delete the image if not needed</p>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderAmenities = () => (
    <Card>
      <CardHeader>
        <CardTitle>Asset Amenities</CardTitle>
        <CardDescription>Select amenities available for this asset</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Common Amenities</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {commonAmenities.map((amenity) => (
              <div key={amenity.id} className="flex items-center space-x-3">
                <Checkbox
                  id={amenity.id}
                  checked={selectedAmenities.includes(amenity.id)}
                  onCheckedChange={() => handleAmenityToggle(amenity.id)}
                />
                <amenity.icon className="h-4 w-4 text-blue-600" />
                <Label htmlFor={amenity.id} className="text-sm font-medium">
                  {amenity.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Custom Amenities</h3>
          <p className="text-sm text-gray-600 mb-3">Add any additional amenities specific to this asset</p>
          <div className="flex space-x-2">
            <Input placeholder="Enter custom amenity" className="flex-1" />
            <Button variant="outline" size="sm">Add</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderAvailability = () => {
    // Generate time slots (hourly from 9 AM to 6 PM)
    const generateTimeSlots = () => {
      const slots = [];
      for (let hour = 9; hour <= 18; hour++) {
        const time12 = hour > 12 ? `${hour - 12}:00 PM` : hour === 12 ? '12:00 PM' : `${hour}:00 AM`;
        const timeValue = `${hour}:00`;
        slots.push({ value: timeValue, label: time12 });
      }
      return slots;
    };

    const timeSlots = generateTimeSlots();

    const toggleTimeSlot = (timeValue: string) => {
      setSelectedTimeSlots(prev => 
        prev.includes(timeValue)
          ? prev.filter(slot => slot !== timeValue)
          : [...prev, timeValue].sort()
      );
    };

    const calculateSelectedHours = () => {
      if (availabilityMode === "daily") {
        // For daily mode, calculate based on selected daily slot
        switch (selectedDailySlot) {
          case "morning": return 3;
          case "afternoon": return 6;
          case "fullday": return 9;
          default: return 0;
        }
      } else {
        // For hourly mode, use the length of selected time slots
        return selectedTimeSlots.length;
      }
    };

    const saveSlot = () => {
      if (!selectedDate) {
        alert('Please select a date before saving.');
        return;
      }
      
      if (availabilityMode === "daily" && !selectedDailySlot) {
        alert('Please select a daily slot before saving.');
        return;
      }
      
      if (availabilityMode === "hourly" && selectedTimeSlots.length === 0) {
        alert('Please select at least one time slot before saving.');
        return;
      }
      
      setShowNameDialog(true);
    };

    const confirmSaveSlot = () => {
      if (!slotName.trim()) {
        alert('Please enter a name for the slot configuration.');
        return;
      }

      const newSlot = {
        id: Date.now().toString(),
        name: slotName.trim(),
        date: selectedDate!,
        slots: [...selectedTimeSlots],
        type: availabilityMode as 'daily' | 'hourly',
        hoursCount: calculateSelectedHours()
      };

      setSavedSlots(prev => [...prev, newSlot]);
      setSelectedTimeSlots([]);
      setSlotName("");
      setShowNameDialog(false);
      alert('Slot configuration saved successfully!');
    };

    const cancelSaveSlot = () => {
      setSlotName("");
      setShowNameDialog(false);
    };

    const deleteSlot = (slotId: string) => {
      if (confirm('Are you sure you want to delete this slot configuration?')) {
        setSavedSlots(prev => prev.filter(slot => slot.id !== slotId));
      }
    };

    const loadSlot = (slot: typeof savedSlots[0]) => {
      setSelectedDate(slot.date);
      setSelectedTimeSlots(slot.slots);
      setAvailabilityMode(slot.type);
      
      // If it's a daily slot, determine which daily slot was selected based on the time slots
      if (slot.type === 'daily') {
        if (slot.slots.length === 3 && slot.slots.includes("9:00")) {
          setSelectedDailySlot("morning");
        } else if (slot.slots.length === 6 && slot.slots.includes("12:00") && slot.slots.includes("17:00")) {
          setSelectedDailySlot("afternoon");
        } else if (slot.slots.length >= 9) {
          setSelectedDailySlot("fullday");
        }
      } else {
        setSelectedDailySlot("");
      }
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle>Asset Availability Settings</CardTitle>
          <CardDescription>Define when your asset is available for booking</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Availability Mode Selector */}
          <div>
            <div className="flex space-x-2 mb-6">
              <Button 
                variant={availabilityMode === "daily" ? "default" : "outline"} 
                size="sm"
                onClick={() => {
                  setAvailabilityMode("daily");
                  setSelectedTimeSlots([]);
                  setSelectedDailySlot("");
                }}
              >
                Daily Slots
              </Button>
              <Button 
                variant={availabilityMode === "hourly" ? "default" : "outline"} 
                size="sm"
                onClick={() => {
                  setAvailabilityMode("hourly");
                  setSelectedTimeSlots([]);
                  setSelectedDailySlot("");
                }}
              >
                Hourly Slots
              </Button>
            </div>

            {/* Daily/Hourly Slot Interface */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Calendar Section */}
              <div className="lg:col-span-1">
                <h3 className="text-lg font-medium mb-4">Select Date</h3>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </div>

              {/* Time Slots Section */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Available Time Slots</h3>
                  <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-600">
                      {calculateSelectedHours()} {calculateSelectedHours() === 1 ? 'hour' : 'hours'} selected
                    </span>
                  </div>
                </div>

                {availabilityMode === "daily" ? (
                  /* Daily Slots - Full Day Options */
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        { value: "morning", label: "Morning (9:00 AM - 12:00 PM)", hours: "3 hours", slots: ["9:00", "10:00", "11:00"] },
                        { value: "afternoon", label: "Afternoon (12:00 PM - 6:00 PM)", hours: "6 hours", slots: ["12:00", "13:00", "14:00", "15:00", "16:00", "17:00"] },
                        { value: "fullday", label: "Full Day (9:00 AM - 6:00 PM)", hours: "9 hours", slots: timeSlots.map(s => s.value) }
                      ].map((slot) => (
                        <div
                          key={slot.value}
                          onClick={() => {
                            setSelectedDailySlot(slot.value);
                            setSelectedTimeSlots(slot.slots);
                          }}
                          className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            selectedDailySlot === slot.value
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                          }`}
                        >
                          <div>
                            <h4 className={`font-medium ${
                              selectedDailySlot === slot.value ? 'text-blue-900' : 'text-gray-900'
                            }`}>{slot.label}</h4>
                            <p className={`text-sm ${
                              selectedDailySlot === slot.value ? 'text-blue-700' : 'text-gray-500'
                            }`}>{slot.hours}</p>
                          </div>
                          <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center transition-all ${
                            selectedDailySlot === slot.value
                              ? 'border-blue-500 bg-blue-500'
                              : 'border-gray-300'
                          }`}>
                            {selectedDailySlot === slot.value && (
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* Hourly Slots - Individual Hour Selection */
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.value}
                        onClick={() => toggleTimeSlot(slot.value)}
                        className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                          selectedTimeSlots.includes(slot.value)
                            ? 'border-blue-500 bg-blue-500 text-white'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50'
                        }`}
                      >
                        {selectedTimeSlots.includes(slot.value) && (
                          <Check className="h-3 w-3 mx-auto mb-1" />
                        )}
                        {slot.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Save Slot Button */}
                <div className="mt-6 flex justify-center">
                  <Button
                    onClick={saveSlot}
                    disabled={
                      !selectedDate || 
                      (availabilityMode === "daily" && !selectedDailySlot) ||
                      (availabilityMode === "hourly" && selectedTimeSlots.length === 0)
                    }
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Slot Configuration
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Saved Slots Display */}
          {savedSlots.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-4">Saved Slot Configurations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedSlots.map((slot) => (
                  <Card key={slot.id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{slot.name}</h4>
                        <p className="text-sm text-gray-500">
                          {slot.date.toLocaleDateString()} • {slot.type === 'daily' ? 'Daily' : 'Hourly'} Mode
                        </p>
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => loadSlot(slot)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteSlot(slot.id)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span className="text-blue-600 font-medium">
                        {slot.hoursCount} {slot.hoursCount === 1 ? 'hour' : 'hours'}
                      </span>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      {slot.slots.length > 0 && (
                        <span>
                          {slot.slots.slice(0, 3).map(timeValue => {
                            const timeSlot = timeSlots.find(ts => ts.value === timeValue);
                            return timeSlot?.label;
                          }).join(', ')}
                          {slot.slots.length > 3 && ` +${slot.slots.length - 3} more`}
                        </span>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setSelectedTimeSlots([]);
                  setSelectedDailySlot("");
                }}
              >
                Clear All
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  if (availabilityMode === "daily") {
                    setSelectedDailySlot("fullday");
                    setSelectedTimeSlots(timeSlots.map(s => s.value));
                  } else {
                    setSelectedTimeSlots(timeSlots.map(s => s.value));
                  }
                }}
              >
                Select All
              </Button>
            </div>
            <div className="text-sm text-gray-500">
              {selectedDate?.toLocaleDateString()} • {calculateSelectedHours()} hours selected • {savedSlots.length} saved configurations
            </div>
          </div>

          {/* Save Slot Name Dialog */}
          <Dialog open={showNameDialog} onOpenChange={setShowNameDialog}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Save Slot Configuration</DialogTitle>
                <DialogDescription>
                  Enter a name for this slot configuration. This will help you identify it later.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="slot-name">Configuration Name</Label>
                  <Input
                    id="slot-name"
                    placeholder="e.g., Morning Shift, Weekend Hours, etc."
                    value={slotName}
                    onChange={(e) => setSlotName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        confirmSaveSlot();
                      }
                    }}
                  />
                </div>
                <div className="text-sm text-gray-500">
                  <p><strong>Date:</strong> {selectedDate?.toLocaleDateString()}</p>
                  <p><strong>Mode:</strong> {availabilityMode === 'daily' ? 'Daily Slots' : 'Hourly Slots'}</p>
                  <p><strong>Hours:</strong> {calculateSelectedHours()} {calculateSelectedHours() === 1 ? 'hour' : 'hours'} selected</p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={cancelSaveSlot}>
                  Cancel
                </Button>
                <Button onClick={confirmSaveSlot} disabled={!slotName.trim()}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Configuration
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    );
  };

  const renderPricing = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Side - Pricing Configuration */}
      <div className="space-y-6">
        {/* Base Pricing */}
        <Card>
          <CardHeader>
            <CardTitle>Base Pricing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="base-price">Base Price *</Label>
                <Input 
                  id="base-price" 
                  value={pricingForm.basePrice}
                  onChange={(e) => setPricingForm(prev => ({ ...prev, basePrice: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Currency *</Label>
                <Select 
                  value={pricingForm.currency}
                  onValueChange={(value) => setPricingForm(prev => ({ ...prev, currency: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                    <SelectItem value="GBP">GBP - British Pound</SelectItem>
                    <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium">Pricing Type</Label>
              <div className="flex space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id="per-night" 
                    name="pricingType" 
                    value="per-night"
                    checked={pricingForm.pricingType === "per-night"}
                    onChange={(e) => setPricingForm(prev => ({ ...prev, pricingType: e.target.value }))}
                  />
                  <Label htmlFor="per-night" className="text-sm">Per Night</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id="per-time-slot" 
                    name="pricingType" 
                    value="per-time-slot"
                    checked={pricingForm.pricingType === "per-time-slot"}
                    onChange={(e) => setPricingForm(prev => ({ ...prev, pricingType: e.target.value }))}
                  />
                  <Label htmlFor="per-time-slot" className="text-sm">Per Time Slot</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id="per-day" 
                    name="pricingType" 
                    value="per-day"
                    checked={pricingForm.pricingType === "per-day"}
                    onChange={(e) => setPricingForm(prev => ({ ...prev, pricingType: e.target.value }))}
                  />
                  <Label htmlFor="per-day" className="text-sm">Per Day</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tax Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Tax Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Checkbox 
                id="price-includes-taxes"
                checked={pricingForm.priceIncludesTaxes}
                onCheckedChange={(checked) => setPricingForm(prev => ({ ...prev, priceIncludesTaxes: checked as boolean }))}
              />
              <Label htmlFor="price-includes-taxes">Price includes taxes</Label>
              <Checkbox id="tax-exempt" />
              <Label htmlFor="tax-exempt">Tax exempt</Label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tax-rate">Tax Rate (%)</Label>
                <Input 
                  id="tax-rate" 
                  value={pricingForm.taxRate}
                  onChange={(e) => setPricingForm(prev => ({ ...prev, taxRate: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tax-description">Tax Description</Label>
                <Input 
                  id="tax-description" 
                  placeholder="e.g. VAT, GST, Sales Tax"
                  value={pricingForm.taxDescription}
                  onChange={(e) => setPricingForm(prev => ({ ...prev, taxDescription: e.target.value }))}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Price Adjustments - Seasonal Pricing */}
        <Card>
          <CardHeader>
            <CardTitle>Price Adjustments</CardTitle>
            <CardDescription>Seasonal Pricing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-600 mb-2">
              <div className="col-span-3">Season Name</div>
              <div className="col-span-2">Start Date</div>
              <div className="col-span-2">End Date</div>
              <div className="col-span-2">Adjustment</div>
              <div className="col-span-3"></div>
            </div>
            
            <div className="border rounded-lg p-3">
              <div className="grid grid-cols-12 gap-2 items-center">
                <Input className="col-span-3" defaultValue="Summer Peak" />
                <Input className="col-span-2" type="date" defaultValue="2025-06-01" />
                <Input className="col-span-2" type="date" defaultValue="2025-08-31" />
                <div className="col-span-2 flex items-center space-x-1">
                  <Input defaultValue="25" className="w-12" />
                  <span className="text-sm">%</span>
                </div>
                <Button variant="outline" size="sm" className="col-span-3">Remove</Button>
              </div>
            </div>
            
            <div className="border rounded-lg p-3">
              <div className="grid grid-cols-12 gap-2 items-center">
                <Input className="col-span-3" defaultValue="Winter Holiday" />
                <Input className="col-span-2" type="date" defaultValue="2025-12-15" />
                <Input className="col-span-2" type="date" defaultValue="2026-01-05" />
                <div className="col-span-2 flex items-center space-x-1">
                  <Input defaultValue="50" className="w-12" />
                  <span className="text-sm">%</span>
                </div>
                <Button variant="outline" size="sm" className="col-span-3">Remove</Button>
              </div>
            </div>
            
            <Button variant="outline" size="sm">Add Seasonal Price</Button>
          </CardContent>
        </Card>

        {/* Promotional Discounts */}
        <Card>
          <CardHeader>
            <CardTitle>Promotional Discounts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-600 mb-2">
              <div className="col-span-3">Promotion Name</div>
              <div className="col-span-2">Start Date</div>
              <div className="col-span-2">End Date</div>
              <div className="col-span-2">Discount</div>
              <div className="col-span-3">Status</div>
            </div>
            
            <div className="border rounded-lg p-3">
              <div className="grid grid-cols-12 gap-2 items-center">
                <Input className="col-span-3" defaultValue="Early Bird Special" />
                <Input className="col-span-2" type="date" defaultValue="2025-05-01" />
                <Input className="col-span-2" type="date" defaultValue="2025-05-31" />
                <div className="col-span-2 flex items-center space-x-1">
                  <Input defaultValue="15" className="w-12" />
                  <span className="text-sm">%</span>
                </div>
                <Select defaultValue="active">
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="border rounded-lg p-3">
              <div className="grid grid-cols-12 gap-2 items-center">
                <Input className="col-span-3" defaultValue="Last Minute Deal" />
                <Input className="col-span-2" type="date" defaultValue="2025-06-15" />
                <Input className="col-span-2" type="date" defaultValue="2025-06-30" />
                <div className="col-span-2 flex items-center space-x-1">
                  <Input defaultValue="20" className="w-12" />
                  <span className="text-sm">%</span>
                </div>
                <Select defaultValue="scheduled">
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button variant="outline" size="sm">Add Promotion</Button>
          </CardContent>
        </Card>

        {/* Length of Stay Discounts */}
        <Card>
          <CardHeader>
            <CardTitle>Length of Stay Discounts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Weekly Discount (7+ nights)</Label>
                <div className="flex items-center space-x-1">
                  <Input defaultValue="10" className="w-16" />
                  <span className="text-sm">%</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Monthly Discount (28+ nights)</Label>
                <div className="flex items-center space-x-1">
                  <Input defaultValue="25" className="w-16" />
                  <span className="text-sm">%</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Custom (specify nights)</Label>
                <div className="flex items-center space-x-1">
                  <Input defaultValue="14" className="w-16" />
                  <Input defaultValue="15" className="w-16" />
                  <span className="text-sm">%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Details */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cancellation-policy">Cancellation Policy*</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Flexible - Full refund 24 hours prior to arrival" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flexible">Flexible - Full refund 24 hours prior to arrival</SelectItem>
                  <SelectItem value="moderate">Moderate - Full refund 5 days prior to arrival</SelectItem>
                  <SelectItem value="strict">Strict - 50% refund until 1 week prior to arrival</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="custom-cancellation">Custom Cancellation Policy</Label>
              <Textarea 
                id="custom-cancellation"
                placeholder="Describe your custom cancellation policy here..."
                className="min-h-[80px]"
              />
            </div>

            <div>
              <h4 className="font-medium mb-3">Additional Fees</h4>
              <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-600 mb-2">
                <div className="col-span-3">Fee Name</div>
                <div className="col-span-2">Amount</div>
                <div className="col-span-3">Type</div>
                <div className="col-span-2">Taxable</div>
                <div className="col-span-2"></div>
              </div>
              
              <div className="space-y-2">
                <div className="grid grid-cols-12 gap-2 items-center">
                  <Input className="col-span-3" defaultValue="Cleaning Fee" />
                  <Input className="col-span-2" defaultValue="75.00" />
                  <Select defaultValue="per-stay">
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="per-stay">Per Stay</SelectItem>
                      <SelectItem value="per-night">Per Night</SelectItem>
                      <SelectItem value="per-person">Per Person</SelectItem>
                    </SelectContent>
                  </Select>
                  <Checkbox defaultChecked className="col-span-2" />
                  <Button variant="outline" size="sm" className="col-span-2">Remove</Button>
                </div>
                
                <div className="grid grid-cols-12 gap-2 items-center">
                  <Input className="col-span-3" defaultValue="Security Deposit" />
                  <Input className="col-span-2" defaultValue="250.00" />
                  <Select defaultValue="per-stay">
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="per-stay">Per Stay</SelectItem>
                      <SelectItem value="per-night">Per Night</SelectItem>
                    </SelectContent>
                  </Select>
                  <Checkbox defaultChecked className="col-span-2" />
                  <Button variant="outline" size="sm" className="col-span-2">Remove</Button>
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="mt-2">Add Fee</Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="internal-notes">Notes for Internal Use</Label>
              <Textarea 
                id="internal-notes"
                placeholder="Add any internal notes about pricing or special conditions..."
                className="min-h-[60px]"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Side - Pricing Preview */}
      <div>
        <div className="sticky top-4">
          <Card>
            <CardHeader>
              <CardTitle>Pricing Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Base Price</span>
                  <span className="font-medium">${pricingForm.basePrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cleaning Fee</span>
                  <span>$75.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Security Deposit</span>
                  <span>$250.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax ({pricingForm.taxRate}%)</span>
                  <span>${(parseFloat(pricingForm.basePrice) * parseFloat(pricingForm.taxRate) / 100).toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium text-blue-600">
                  <span>Total ({pricingForm.pricingType})</span>
                  <span>${(parseFloat(pricingForm.basePrice) + 75 + (parseFloat(pricingForm.basePrice) * parseFloat(pricingForm.taxRate) / 100)).toFixed(2)}</span>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-3">Sample Calculations</h4>
                <div className="space-y-4 text-sm">
                  <div>
                    <div className="font-medium">Regular Session (1 night)</div>
                    <div className="flex justify-between">
                      <span>Base Price</span>
                      <span>${pricingForm.basePrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fees</span>
                      <span>$75.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes</span>
                      <span>${(parseFloat(pricingForm.basePrice) * parseFloat(pricingForm.taxRate) / 100).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${(parseFloat(pricingForm.basePrice) + 75 + (parseFloat(pricingForm.basePrice) * parseFloat(pricingForm.taxRate) / 100)).toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <div className="font-medium">Summer Peak (1 night)</div>
                    <div className="flex justify-between">
                      <span>Base Price</span>
                      <span>${(parseFloat(pricingForm.basePrice) * 1.25).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Weekly Discount (-10%)</span>
                      <span>-${(parseFloat(pricingForm.basePrice) * 1.25 * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fees</span>
                      <span>$75.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes</span>
                      <span>${(parseFloat(pricingForm.basePrice) * 1.15 * parseFloat(pricingForm.taxRate) / 100).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${(parseFloat(pricingForm.basePrice) * 1.15 + 75 + (parseFloat(pricingForm.basePrice) * 1.15 * parseFloat(pricingForm.taxRate) / 100)).toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <div className="font-medium">Weekly Stay (7 nights)</div>
                    <div className="flex justify-between">
                      <span>Base Price (7 nights)</span>
                      <span>${(parseFloat(pricingForm.basePrice) * 7).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Weekly Discount (-10%)</span>
                      <span>-${(parseFloat(pricingForm.basePrice) * 7 * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fees</span>
                      <span>$75.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes</span>
                      <span>${(parseFloat(pricingForm.basePrice) * 6.3 * parseFloat(pricingForm.taxRate) / 100).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${(parseFloat(pricingForm.basePrice) * 6.3 + 75 + (parseFloat(pricingForm.basePrice) * 6.3 * parseFloat(pricingForm.taxRate) / 100)).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700">Save & Finalize Pricing</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  // Add navigation buttons for pricing step
  const renderPricingNavigation = () => (
    <div className="flex justify-between mt-6">
      <Button 
        variant="outline"
        onClick={() => setCurrentStep(3)}
      >
        Previous: Availability
      </Button>
      <Button 
        onClick={() => {
          alert("Asset created successfully!");
          setActiveTab("dashboard");
          setCurrentStep(1);
        }}
        className="bg-blue-600 hover:bg-blue-700"
      >
        Save & Exit
      </Button>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back, Alex Morgan</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Assets</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <LayoutDashboard className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Bookings</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <CalendarIcon className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Users</p>
                <p className="text-2xl font-bold">156</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>


      </div>


    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard();
      case "assets":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">Assets</h1>
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-500">Asset management content coming soon...</p>
            </div>
          </div>
        );
      case "create-asset":
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setActiveTab("assets")}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
              <h1 className="text-2xl font-bold">Create New Asset</h1>
            </div>
            
            {currentStep === 4 && (
              <div className="mb-4">
                <h2 className="text-lg font-medium text-gray-600">Asset Creation: Pricing & Details</h2>
              </div>
            )}
            
            {renderStepIndicator()}
            
            {currentStep === 1 && renderBasicInformation()}
            {currentStep === 2 && renderAmenities()}
            {currentStep === 3 && renderAvailability()}
            {currentStep === 4 && (
              <>
                {renderPricing()}
                {renderPricingNavigation()}
              </>
            )}
            
            {currentStep < 4 && (
              <div className="flex justify-between">
                <Button 
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                >
                  Back
                </Button>
                <div className="space-x-2">
                  <Button variant="outline">Save Draft</Button>
                  <Button 
                    onClick={() => {
                      if (currentStep < 4) {
                        setCurrentStep(currentStep + 1);
                      } else {
                        alert("Asset created successfully!");
                        setActiveTab("assets");
                        setCurrentStep(1);
                      }
                    }}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {currentStep < 4 ? "Save & Continue" : "Save & Exit"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Content for {activeTab} coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-blue-600 text-white p-6">
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
            <span className="text-blue-600 font-bold text-lg">G</span>
          </div>
          <span className="text-xl font-bold">Gigspace</span>
        </div>

        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => {
                  if (item.hasSubmenu) {
                    setAssetManagementExpanded(!assetManagementExpanded);
                  } else {
                    setActiveTab(item.id);
                  }
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === item.id || (item.hasSubmenu && (activeTab === 'assets' || activeTab === 'create-asset'))
                    ? 'bg-blue-700 text-white' 
                    : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="h-5 w-5" />
                  <span className="text-sm">{item.label}</span>
                </div>
                {item.hasSubmenu && (
                  assetManagementExpanded ? 
                    <ChevronDown className="h-4 w-4" /> : 
                    <ChevronRight className="h-4 w-4" />
                )}
              </button>
              
              {item.hasSubmenu && assetManagementExpanded && (
                <div className="ml-4 mt-1 space-y-1">
                  {item.submenu?.map((subItem) => (
                    <button
                      key={subItem.id}
                      onClick={() => setActiveTab(subItem.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === subItem.id 
                          ? 'bg-blue-800 text-white' 
                          : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                      }`}
                    >
                      <subItem.icon className="h-4 w-4" />
                      <span className="text-xs">{subItem.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-blue-500">
          <p className="text-xs text-blue-200">© 2025 Gigspace. All rights reserved.</p>
          <p className="text-xs text-blue-200 mt-1">
            Need assistance? Designed and developed with ❤️ for entrepreneurs and businesses
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div></div>
          <div className="flex items-center space-x-4">
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                setActiveTab("create-asset");
                setAssetManagementExpanded(true);
              }}
            >
              New Asset
            </Button>
            <div className="text-right">
              <p className="text-sm font-medium">Alex Morgan</p>
              <p className="text-xs text-gray-500">Admin Manager</p>
            </div>
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
