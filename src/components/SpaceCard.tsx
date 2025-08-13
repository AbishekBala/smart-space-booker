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

interface SpaceCardProps {
  id: string;
  name: string;
  type: string;
  image: string;
  location: string;
  capacity: number;
  price: number;
  rating: number;
  reviews: number;
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
  name,
  type,
  image,
  location,
  capacity,
  price,
  rating,
  reviews,
  amenities,
  description,
  onClick
}: SpaceCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={onClick}>
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute top-3 left-3 bg-primary">
          {type}
        </Badge>
      </div>
      
      <CardContent className="p-6">
        <div className="mb-2">
          <h3 className="font-semibold text-lg">{name}</h3>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {location}
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            {capacity} people
          </div>
        </div>
        
        <div className="flex items-center mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-warning fill-current' : 'text-muted-foreground'}`} 
              />
            ))}
          </div>
          <span className="ml-2 text-sm font-medium">{rating}</span>
          <span className="ml-1 text-sm text-muted-foreground">({reviews} reviews)</span>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {amenities.slice(0, 3).map((amenity) => {
            const Icon = amenityIcons[amenity] || Clock;
            return (
              <div key={amenity} className="flex items-center text-xs text-muted-foreground">
                <Icon className="h-3 w-3 mr-1" />
                {amenity}
              </div>
            );
          })}
          {amenities.length > 3 && (
            <span className="text-xs text-muted-foreground">+{amenities.length - 3} more</span>
          )}
        </div>
        
        <Button className="w-full">Book Now</Button>
      </CardContent>
    </Card>
  );
};

export default SpaceCard;