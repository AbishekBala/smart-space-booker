import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
// Calendar removed per requirement
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
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
    const [savedAssets, setSavedAssets] = useState<Array<{
      id: string;
      name: string;
      type: string;
      location: string;
      capacity: string;
      description: string;
      basePrice: string;
      currency: string;
      amenities: string[];
      images: File[];
      slots: Array<{
        id: string;
        name: string;
        date: Date;
        slots: string[];
        type: 'daily' | 'hourly';
        hoursCount: number;
      }>;
    }>>([
      {
        id: 'sample-1',
        name: 'Executive Conference Room',
        type: 'conference-room',
        location: 'floor-2',
        capacity: '10-12',
        description: 'Premium conference room equipped with 4K display, video conferencing, and whiteboard.',
        basePrice: '120',
        currency: 'USD',
        amenities: ['wifi', 'projector', 'whiteboard', 'security', 'parking'],
        images: [],
        slots: [],
      },
      {
        id: 'sample-2',
        name: 'Private Office Suite',
        type: 'private-office',
        location: 'floor-3',
        capacity: '4-6',
        description: 'Quiet private office with ergonomic chairs, dedicated AC, and secure access.',
        basePrice: '75',
        currency: 'USD',
        amenities: ['wifi', 'ac', 'security', 'accessibility'],
        images: [],
        slots: [],
      },
    ]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [availabilityMode, setAvailabilityMode] = useState("daily");
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedDailySlot, setSelectedDailySlot] = useState<string>("");
  const [customStartTime, setCustomStartTime] = useState<string>("");
  const [customEndTime, setCustomEndTime] = useState<string>("");
  const [hourlyStartTime, setHourlyStartTime] = useState<string>("");
  const [hourlyEndTime, setHourlyEndTime] = useState<string>("");
  const [weekSchedule, setWeekSchedule] = useState<Array<{
    day: string;
    label: string;
    enabled: boolean;
    start: string;
    end: string;
  }>>([
    { day: 'monday', label: 'Monday', enabled: true, start: '8:00', end: '16:00' },
    { day: 'tuesday', label: 'Tuesday', enabled: true, start: '8:00', end: '16:00' },
    { day: 'wednesday', label: 'Wednesday', enabled: true, start: '8:00', end: '16:00' },
    { day: 'thursday', label: 'Thursday', enabled: true, start: '8:00', end: '16:00' },
    { day: 'friday', label: 'Friday', enabled: true, start: '8:00', end: '16:00' },
    { day: 'saturday', label: 'Saturday', enabled: false, start: '8:00', end: '16:00' },
    { day: 'sunday', label: 'Sunday', enabled: false, start: '8:00', end: '16:00' },
  ]);
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
  currency: "INR",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingAssetId, setEditingAssetId] = useState<string | null>(null);
  const [showAssetDialog, setShowAssetDialog] = useState(false);
  const [assetToView, setAssetToView] = useState<null | {
    id: string;
    name: string;
    type: string;
    location: string;
    capacity: string;
    description: string;
    basePrice: string;
    currency: string;
    amenities: string[];
    images: File[];
    slots: Array<{
      id: string;
      name: string;
      date: Date;
      slots: string[];
      type: 'daily' | 'hourly';
      hoursCount: number;
    }>;
  }>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [activeEditTab, setActiveEditTab] = useState<'basic' | 'amenities' | 'availability'>('basic');

  const resetAssetBuilder = () => {
    setAssetForm({
      name: "",
      type: "",
      location: "",
      capacity: "",
      description: "",
      basePrice: "",
  currency: "INR",
    });
    setSelectedAmenities([]);
    setUploadedImages([]);
    setAvailabilityMode("daily");
    setSelectedTimeSlots([]);
    setSelectedDate(new Date());
  setSelectedDailySlot("");
  setCustomStartTime('');
  setCustomEndTime('');
  setHourlyStartTime('');
  setHourlyEndTime('');
    setSavedSlots([]);
    setIsEditing(false);
    setEditingAssetId(null);
    setCurrentStep(1);
  };

  const handleSaveAsset = () => {
    const assetId = isEditing && editingAssetId ? editingAssetId : Date.now().toString();
    const newAsset = {
      id: assetId,
      name: assetForm.name.trim(),
      type: assetForm.type,
      location: assetForm.location,
      capacity: assetForm.capacity,
      description: assetForm.description,
      basePrice: assetForm.basePrice,
      currency: assetForm.currency,
      amenities: [...selectedAmenities],
      images: [...uploadedImages],
      slots: [...savedSlots],
    };

    setSavedAssets(prev => {
      if (isEditing && editingAssetId) {
        return prev.map(a => (a.id === editingAssetId ? newAsset : a));
      }
      return [newAsset, ...prev];
    });

    resetAssetBuilder();
    setActiveTab("assets");
    alert(isEditing ? "Asset updated successfully!" : "Asset created successfully!");
  };

  const handleEditAsset = (assetId: string) => {
    const asset = savedAssets.find(a => a.id === assetId);
    if (!asset) return;
    setIsEditing(true);
    setEditingAssetId(asset.id);
    setAssetForm({
      name: asset.name,
      type: asset.type,
      location: asset.location,
      capacity: asset.capacity,
      description: asset.description,
      basePrice: asset.basePrice,
      currency: asset.currency,
    });
    setSelectedAmenities(asset.amenities);
    setUploadedImages(asset.images);
    setSavedSlots(asset.slots);
    setAvailabilityMode("daily");
    setSelectedDailySlot("");
    setActiveEditTab('basic');
    setShowEditDialog(true);
  };

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
      {[1, 2, 3].map((step) => (
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
          </span>
          {step < 3 && <div className="w-12 h-px bg-gray-300 ml-4" />}
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
          <Select value={assetForm.location} onValueChange={(value) => setAssetForm(prev => ({ ...prev, location: value }))}>
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
          <Select value={assetForm.capacity} onValueChange={(value) => setAssetForm(prev => ({ ...prev, capacity: value }))}>
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
        // For daily mode, use custom start/end first if available
        if (customStartTime && customEndTime) {
          const start = parseInt(customStartTime.split(':')[0], 10);
          const end = parseInt(customEndTime.split(':')[0], 10);
          return Math.max(0, end - start);
        }
        // Fallback to counting selectedTimeSlots
        return selectedTimeSlots.length;
      } else {
        // For hourly mode, use the length of selected time slots
        return selectedTimeSlots.length;
      }
    };

    const buildAutoName = () => {
      if (availabilityMode === 'daily') {
        const enabled = weekSchedule.filter(w => w.enabled);
        const labels = enabled.map(e => e.label);
        // if all enabled have same time range, show range
        const sameRange = enabled.every(e => e.start === enabled[0].start && e.end === enabled[0].end);
        const rangePart = sameRange ? ` ${formatTime(enabled[0].start)} - ${formatTime(enabled[0].end)}` : '';
        const daysPart = labels.length === 7 ? 'Everyday' : labels.length >= 5 && labels.slice(0,5).map(l=>l).join('-') ? labels.join(', ') : labels.join(', ');
        return `Schedule: ${daysPart}${rangePart}`;
      }
      // hourly
      return `Hourly • ${selectedTimeSlots.length} ${selectedTimeSlots.length === 1 ? 'hour' : 'hours'}`;
    };

    const formatTime = (t: string) => {
      const [h, m] = t.split(':').map(Number);
      const ampm = h >= 12 ? 'PM' : 'AM';
      const hour12 = h % 12 === 0 ? 12 : h % 12;
      return `${hour12}:${m.toString().padStart(2,'0')} ${ampm}`;
    };

    const saveSlot = () => {
      if (availabilityMode === "daily") {
        const enabledDays = weekSchedule.filter(w => w.enabled);
        if (enabledDays.length === 0) {
          toast({ title: 'No days enabled', description: 'Please enable at least one day before saving the daily schedule.' });
          return;
        }
        for (const d of enabledDays) {
          const start = parseInt(d.start.split(':')[0], 10);
          const end = parseInt(d.end.split(':')[0], 10);
          if (isNaN(start) || isNaN(end) || end <= start) {
            alert(`Invalid time range for ${d.label}. Ensure end time is after start time.`);
            return;
          }
        }
      }

      if (availabilityMode === "hourly" && selectedTimeSlots.length === 0) {
        toast({ title: 'No slots selected', description: 'Please select at least one time slot before saving.' });
        return;
      }

      // perform direct save with autogenerated name
      const name = buildAutoName();

      // For daily mode, encode weekSchedule into slots like 'monday|08:00-16:00'
      const encodedSlots = availabilityMode === 'daily'
        ? weekSchedule.filter(w => w.enabled).map(w => `${w.day}|${w.start}-${w.end}`)
        : [...selectedTimeSlots];

      const newSlot = {
        id: Date.now().toString(),
        name,
        date: new Date(),
        slots: encodedSlots,
        type: availabilityMode as 'daily' | 'hourly',
        hoursCount: calculateSelectedHours()
      };

      setSavedSlots(prev => [...prev, newSlot]);
      setSelectedTimeSlots([]);
      // keep weekSchedule as-is so user sees it after save
      setSlotName("");
  setShowNameDialog(false);
  toast({ title: 'Saved', description: 'Slot configuration saved successfully!' });
    };

    const confirmSaveSlot = () => {
      if (!slotName.trim()) {
        toast({ title: 'Name required', description: 'Please enter a name for the slot configuration.' });
        return;
      }

      // For daily mode, encode weekSchedule into slots like 'monday|08:00-16:00'
      const encodedSlots = availabilityMode === 'daily'
        ? weekSchedule.filter(w => w.enabled).map(w => `${w.day}|${w.start}-${w.end}`)
        : [...selectedTimeSlots];

      const newSlot = {
        id: Date.now().toString(),
        name: slotName.trim(),
        date: new Date(),
        slots: encodedSlots,
        type: availabilityMode as 'daily' | 'hourly',
        hoursCount: calculateSelectedHours()
      };

      setSavedSlots(prev => [...prev, newSlot]);
      setSelectedTimeSlots([]);
      setSlotName("");
  setShowNameDialog(false);
  toast({ title: 'Saved', description: 'Slot configuration saved successfully!' });
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
      setAvailabilityMode(slot.type);
      if (slot.type === 'daily') {
        // Decode encoded week schedule if present (format: day|HH:MM-HH:MM)
        const decoded = weekSchedule.map(ws => ({ ...ws }));
        let matched = false;
        slot.slots.forEach(s => {
          if (typeof s === 'string' && s.includes('|') && s.includes('-')) {
            const [day, range] = s.split('|');
            const [start, end] = range.split('-');
            const idx = decoded.findIndex(d => d.day === day);
            if (idx !== -1) {
              decoded[idx].enabled = true;
              decoded[idx].start = start;
              decoded[idx].end = end;
              matched = true;
            }
          }
        });
        if (matched) {
          setWeekSchedule(decoded);
          // Also build selectedTimeSlots as union of first enabled day's slots for preview
          const firstEnabled = decoded.find(d => d.enabled);
          if (firstEnabled) {
            const start = parseInt(firstEnabled.start.split(':')[0], 10);
            const end = parseInt(firstEnabled.end.split(':')[0], 10);
            const rangeSlots: string[] = [];
            for (let h = start; h < end; h++) rangeSlots.push(`${h}:00`);
            setSelectedTimeSlots(rangeSlots);
          } else {
            setSelectedTimeSlots([]);
          }
        } else {
          // Backwards compatibility: previous format was array of hour strings
          setSelectedTimeSlots(slot.slots as string[]);
        }
      } else {
        // hourly
        setSelectedTimeSlots(slot.slots as string[]);
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
                  setCustomStartTime('');
                  setCustomEndTime('');
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
                  setCustomStartTime('');
                  setCustomEndTime('');
                }}
              >
                Hourly Slots
              </Button>
            </div>

            {/* Daily/Hourly Slot Interface */}
            <div className="grid grid-cols-1 gap-6">
              {/* Time Slots Section */}
              <div className="col-span-1">
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
                  /* Weekly Schedule Table */
                  <div className="space-y-3">
                    <div className="text-sm text-gray-600 mb-2">Configure weekly availability. Enable days and set start/end times.</div>
                    <div className="overflow-x-auto">
                      <table className="w-full table-auto border-collapse">
                        <thead>
                          <tr className="text-left text-sm text-gray-600">
                            <th className="p-2">Day</th>
                            <th className="p-2">Start Time</th>
                            <th className="p-2">End Time</th>
                            <th className="p-2">Enabled</th>
                          </tr>
                        </thead>
                        <tbody>
                          {weekSchedule.map((row, idx) => (
                            <tr key={row.day} className="border-t">
                              <td className="p-2 align-middle">{row.label}</td>
                              <td className="p-2">
                                <Select value={row.start} onValueChange={(val) => {
                                  setWeekSchedule(prev => prev.map((r, i) => i === idx ? { ...r, start: val } : r));
                                }}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {timeSlots.slice(0, -1).map(ts => (
                                      <SelectItem key={ts.value} value={ts.value}>{ts.label}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </td>
                              <td className="p-2">
                                <Select value={row.end} onValueChange={(val) => {
                                  setWeekSchedule(prev => prev.map((r, i) => i === idx ? { ...r, end: val } : r));
                                }}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {timeSlots.slice(1).map(ts => (
                                      <SelectItem key={ts.value} value={ts.value}>{ts.label}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </td>
                              <td className="p-2">
                                <input
                                  type="checkbox"
                                  checked={row.enabled}
                                  onChange={(e) => {
                                    const on = e.target.checked;
                                    setWeekSchedule(prev => prev.map((r, i) => i === idx ? { ...r, enabled: on } : r));
                                  }}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  /* Hourly Slots - From/To selects */
                  <div className="space-y-3">
                    <div className="text-sm text-gray-600 mb-2">Select hourly range (from → to)</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <Label>From</Label>
                        <Select value={hourlyStartTime} onValueChange={(val) => {
                          setHourlyStartTime(val);
                          if (hourlyEndTime) {
                            const start = parseInt(val.split(':')[0], 10);
                            const end = parseInt(hourlyEndTime.split(':')[0], 10);
                            if (!isNaN(start) && !isNaN(end) && end > start) {
                              const rangeSlots: string[] = [];
                              for (let h = start; h < end; h++) rangeSlots.push(`${h}:00`);
                              setSelectedTimeSlots(rangeSlots);
                            }
                          }
                        }}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select from" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.slice(0, -1).map(ts => (
                              <SelectItem key={ts.value} value={ts.value}>{ts.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>To</Label>
                        <Select value={hourlyEndTime} onValueChange={(val) => {
                          setHourlyEndTime(val);
                          if (hourlyStartTime) {
                            const start = parseInt(hourlyStartTime.split(':')[0], 10);
                            const end = parseInt(val.split(':')[0], 10);
                            if (!isNaN(start) && !isNaN(end) && end > start) {
                              const rangeSlots: string[] = [];
                              for (let h = start; h < end; h++) rangeSlots.push(`${h}:00`);
                              setSelectedTimeSlots(rangeSlots);
                            }
                          }
                        }}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select to" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.slice(1).map(ts => (
                              <SelectItem key={ts.value} value={ts.value}>{ts.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Save Slot Button */}
                <div className="mt-6 flex justify-center">
                  <Button
                    onClick={saveSlot}
                    disabled={
                      (availabilityMode === 'daily' && weekSchedule.filter(w => w.enabled).length === 0) ||
                      (availabilityMode === 'hourly' && selectedTimeSlots.length === 0)
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
                        <p className="text-sm text-gray-500">{slot.type === 'daily' ? 'Daily' : 'Hourly'} Mode</p>
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
            <div className="text-sm text-gray-500">{calculateSelectedHours()} hours selected • {savedSlots.length} saved configurations</div>
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
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Assets</h1>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  resetAssetBuilder();
                  setActiveTab("create-asset");
                  setAssetManagementExpanded(true);
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Asset
              </Button>
            </div>

            {savedAssets.length === 0 ? (
              <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">No assets yet. Click "Add New Asset" to create one.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedAssets.map(asset => (
                  <Card key={asset.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => { setAssetToView(asset); setShowAssetDialog(true); }}>
                    <div className="h-40 w-full bg-gray-100 flex items-center justify-center">
                      <span className="text-xs text-gray-500">{asset.images.length ? 'Cover Image' : 'No image'}</span>
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{asset.name}</CardTitle>
                          <CardDescription className="text-xs capitalize">{asset.type.replace('-', ' ')}</CardDescription>
                        </div>
                        <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleEditAsset(asset.id); }}>
                          <Edit className="h-4 w-4 mr-1" /> Edit
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="text-gray-700">
                          <div><span className="font-medium">Location:</span> {asset.location || "—"}</div>
                          <div><span className="font-medium">Capacity:</span> {asset.capacity || "—"}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold">{asset.basePrice ? `${asset.currency} ${asset.basePrice}` : "—"}</div>
                          <div className="text-xs text-gray-500">per day</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {asset.amenities.slice(0, 4).map(a => (
                          <Badge key={a} variant="secondary" className="text-xs">{a}</Badge>
                        ))}
                        {asset.amenities.length > 4 && (
                          <Badge variant="outline" className="text-xs">+{asset.amenities.length - 4} more</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
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
              <h1 className="text-2xl font-bold">{isEditing ? "Edit Asset" : "Create New Asset"}</h1>
            </div>
            {renderStepIndicator()}
            {currentStep === 1 && renderBasicInformation()}
            {currentStep === 2 && renderAmenities()}
            {currentStep === 3 && renderAvailability()}
            {currentStep < 3 && (
              <div className="flex justify-between">
                <Button 
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                >
                  Back
                </Button>
                <div className="space-x-2">
                  <Button variant="outline">Save Draft</Button>
                  <Button 
                    onClick={() => {
                      setCurrentStep(currentStep + 1);
                    }}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
            {currentStep === 3 && (
              <div className="flex justify-between">
                <Button 
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                >
                  Back
                </Button>
                <div className="space-x-2">
                  <Button variant="outline">Save Draft</Button>
                  <Button 
                    onClick={handleSaveAsset}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isEditing ? "Update & Exit" : "Save & Exit"}
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
      <div className="w-64 bg-blue-600 text-white p-6 h-screen sticky top-0 overflow-hidden">
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
                  {/* Dynamic asset list under Assets submenu - intentionally hidden as requested */}
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
      <div className="flex-1 p-8 h-screen overflow-y-auto">
        <div className="flex items-center justify-end mb-8">
          <div className="flex items-center space-x-4">
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

        {/* Asset Details Dialog */}
        <Dialog open={showAssetDialog} onOpenChange={setShowAssetDialog}>
    <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
            {assetToView && (
              <div className="space-y-4">
                <div className="h-56 w-full bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-xs text-gray-500">{assetToView.images.length ? 'Image carousel here' : 'No image available'}</span>
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <DialogHeader>
                      <DialogTitle className="text-xl">{assetToView.name}</DialogTitle>
                      <DialogDescription className="capitalize">{assetToView.type.replace('-', ' ')}</DialogDescription>
                    </DialogHeader>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{assetToView.basePrice ? `${assetToView.currency} ${assetToView.basePrice}` : '—'}</div>
                    <div className="text-xs text-gray-500">per day</div>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div><span className="font-medium">Location:</span> {assetToView.location || '—'}</div>
                    <div><span className="font-medium">Capacity:</span> {assetToView.capacity || '—'}</div>
                  </div>
                  <div>
                    <div className="font-medium mb-1">Amenities</div>
                    <div className="flex flex-wrap gap-1">
                      {assetToView.amenities.map(a => (
                        <Badge key={a} variant="secondary" className="text-xs">{a}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {assetToView.description && (
                  <div>
                    <div className="font-medium text-sm mb-1">Description</div>
                    <p className="text-sm text-gray-700">{assetToView.description}</p>
                  </div>
                )}

                {assetToView.slots.length > 0 && (
                  <div>
                    <div className="font-medium text-sm mb-1">Saved Availability Presets</div>
                    <div className="flex flex-wrap gap-2">
                      {assetToView.slots.map(s => (
                        <Badge key={s.id} className="text-xs">{s.name} • {s.type === 'daily' ? 'Daily' : 'Hourly'}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAssetDialog(false)}>Close</Button>
                  <Button onClick={() => { setShowAssetDialog(false); handleEditAsset(assetToView.id); }}>Edit</Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Asset Dialog with Section Tabs */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl">{isEditing ? 'Edit Asset' : 'Create Asset'}</DialogTitle>
              <DialogDescription>Update the selected section and click Save below.</DialogDescription>
            </DialogHeader>
            <div className="flex items-center gap-2 mb-4">
              <Button variant={activeEditTab === 'basic' ? 'default' : 'outline'} size="sm" onClick={() => setActiveEditTab('basic')}>1. Basic Information</Button>
              <Button variant={activeEditTab === 'amenities' ? 'default' : 'outline'} size="sm" onClick={() => setActiveEditTab('amenities')}>2. Amenities</Button>
              <Button variant={activeEditTab === 'availability' ? 'default' : 'outline'} size="sm" onClick={() => setActiveEditTab('availability')}>3. Availability</Button>
            </div>

            <div className="space-y-4">
              {activeEditTab === 'basic' && (
                <div className="space-y-6">
                  {renderBasicInformation()}
                  <div className="flex justify-end">
                    <Button onClick={() => {
                      if (!editingAssetId) return;
                      const updated = {
                        id: editingAssetId,
                        name: assetForm.name.trim(),
                        type: assetForm.type,
                        location: assetForm.location,
                        capacity: assetForm.capacity,
                        description: assetForm.description,
                        basePrice: assetForm.basePrice,
                        currency: assetForm.currency,
                        amenities: selectedAmenities,
                        images: uploadedImages,
                        slots: savedSlots,
                      };
                      setSavedAssets(prev => prev.map(a => a.id === editingAssetId ? updated : a));
                    }}>Save Basic Information</Button>
                  </div>
                </div>
              )}

              {activeEditTab === 'amenities' && (
                <div className="space-y-6">
                  {renderAmenities()}
                  <div className="flex justify-end">
                    <Button onClick={() => {
                      if (!editingAssetId) return;
                      setSavedAssets(prev => prev.map(a => a.id === editingAssetId ? { ...a, amenities: selectedAmenities } : a));
                    }}>Save Amenities</Button>
                  </div>
                </div>
              )}

              {activeEditTab === 'availability' && (
                <div className="space-y-6">
                  {renderAvailability()}
                  <div className="flex justify-end">
                    <Button onClick={() => {
                      if (!editingAssetId) return;
                      setSavedAssets(prev => prev.map(a => a.id === editingAssetId ? { ...a, slots: savedSlots } : a));
                    }}>Save Availability</Button>
                  </div>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowEditDialog(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminDashboard;
