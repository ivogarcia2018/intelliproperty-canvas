import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tables } from "@/integrations/supabase/types";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PropertyOverlayProps {
  property: Tables<"properties"> | null;
  onClose: () => void;
}

const PropertyOverlay = ({ property, onClose }: PropertyOverlayProps) => {
  if (!property) return null;

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 w-96">
      <Card className="bg-secondary/95 backdrop-blur-sm border-border">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="secondary" className="text-xs">
              Property Details
            </Badge>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-card rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">House Number</p>
              <p className="text-2xl font-bold text-primary-foreground">{property.units?.[0] || "N/A"}</p>
            </div>
            
            <div className="bg-card rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">Estimated House Price</p>
              <p className="text-xl font-bold text-primary-foreground">
                ${(property.price / 1000000).toFixed(3)}M
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">Average Age</p>
              <p className="text-2xl font-bold text-primary-foreground">{property.building_age}Y</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PropertyOverlay;