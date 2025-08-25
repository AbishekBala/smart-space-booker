import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Users, 
  Wifi, 
  Coffee, 
  Monitor, 
  Star,
  Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SpaceCardProps {
  id: string;
  name: string;
  type: string;
  image: string;
  location: string;
  price: number;
  amenities: string[];
  description: string;
  onClick?: () => void;
}

const amenityIcons: Record<string, any> = {
  "High-speed WiFi": Wifi,
  "Coffee & Refreshments": Coffee,
  "Video Conferencing": Monitor,
  "Whiteboard": Monitor,
  "Printer Access": Monitor,
};

const SpaceCard = ({
  id,
  name,
  type,
  image,
  location,
  price,
  amenities,
  description,
  onClick
}: SpaceCardProps) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/spaces/${id}`);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-semibold mb-1">{name}</h3>
            <p className="text-sm text-gray-600">${price}/hr</p>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {amenities.map((amenity) => (
            <Badge key={amenity} variant="secondary" className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {amenity}
            </Badge>
          ))}
        </div>
        
        <Button 
          onClick={handleBookNow}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white"
        >
          Book Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default SpaceCard;