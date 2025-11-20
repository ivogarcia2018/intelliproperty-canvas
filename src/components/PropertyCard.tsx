import { Calendar, Eye, Thermometer, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tables } from "@/integrations/supabase/types";
import { format } from "date-fns";

interface PropertyCardProps {
  property: Tables<"properties">;
  onFavorite?: () => void;
  isFavorited?: boolean;
  image?: string;
}

const PropertyCard = ({ property, onFavorite, isFavorited, image }: PropertyCardProps) => {
  return (
    <Card className="overflow-hidden bg-card hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        {image && (
          <img 
            src={image} 
            alt={property.title}
            className="w-full h-48 object-cover"
          />
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-card/80 backdrop-blur-sm hover:bg-card"
          onClick={onFavorite}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-primary text-primary' : ''}`} />
        </Button>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">{property.title}</h3>
            <p className="text-sm text-muted-foreground">{property.address}</p>
            <p className="text-xs text-muted-foreground">
              {property.city}, {property.state} {property.zip_code}
            </p>
          </div>
        </div>

        {property.units && property.units.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {property.units.map((unit) => (
              <Badge key={unit} variant="secondary" className="text-xs">
                {unit}
              </Badge>
            ))}
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 text-center border-t border-border pt-4">
          <div>
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <Calendar className="w-3 h-3" />
            </div>
            <p className="text-xs text-muted-foreground">Building Age</p>
            <p className="text-lg font-semibold">{property.building_age}Y</p>
          </div>
          
          <div>
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <Eye className="w-3 h-3" />
            </div>
            <p className="text-xs text-muted-foreground">Daily Visitors</p>
            <p className="text-lg font-semibold">{property.daily_visitors?.toLocaleString()}</p>
          </div>
          
          <div>
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <Thermometer className="w-3 h-3" />
            </div>
            <p className="text-xs text-muted-foreground">Temperature</p>
            <p className="text-lg font-semibold">{property.temperature}°F</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Estimated Price</p>
              <p className="text-2xl font-bold text-primary">
                ${property.price.toLocaleString()}
              </p>
            </div>
            <Badge variant="outline">{property.property_type}</Badge>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PropertyCard;