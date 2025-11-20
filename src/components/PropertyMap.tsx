import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Tables } from "@/integrations/supabase/types";

interface PropertyMapProps {
  properties: Tables<"properties">[];
  onPropertySelect?: (property: Tables<"properties">) => void;
  selectedProperty?: Tables<"properties"> | null;
}

const PropertyMap = ({ properties, onPropertySelect, selectedProperty }: PropertyMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map - You'll need to add your Mapbox token
    mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN_HERE';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-117.9265, 33.6846], // Costa Mesa, CA
      zoom: 10,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      markers.current.forEach(marker => marker.remove());
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Add markers for each property
    properties.forEach((property) => {
      if (property.latitude && property.longitude) {
        const el = document.createElement('div');
        el.className = 'property-marker';
        el.style.width = '40px';
        el.style.height = '40px';
        el.style.borderRadius = '50%';
        el.style.backgroundColor = property.id === selectedProperty?.id ? 'hsl(var(--primary))' : 'hsl(var(--chart-1))';
        el.style.border = '3px solid white';
        el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
        el.style.cursor = 'pointer';
        el.style.display = 'flex';
        el.style.alignItems = 'center';
        el.style.justifyContent = 'center';
        el.style.fontSize = '14px';
        el.style.fontWeight = 'bold';
        el.style.color = 'white';
        
        const marker = new mapboxgl.Marker(el)
          .setLngLat([property.longitude, property.latitude])
          .addTo(map.current!);

        el.addEventListener('click', () => {
          onPropertySelect?.(property);
        });

        markers.current.push(marker);
      }
    });
  }, [properties, selectedProperty, onPropertySelect]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
      <div className="absolute top-4 left-4 bg-card rounded-lg shadow-lg px-3 py-1.5">
        <p className="text-sm font-medium text-muted-foreground">
          {properties.length} properties
        </p>
      </div>
    </div>
  );
};

export default PropertyMap;