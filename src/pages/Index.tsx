import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Sidebar from "@/components/Sidebar";
import PropertyMap from "@/components/PropertyMap";
import PropertyCard from "@/components/PropertyCard";
import PropertyOverlay from "@/components/PropertyOverlay";
import SearchFilters from "@/components/SearchFilters";
import TenantsPanel from "@/components/TenantsPanel";
import { Tables } from "@/integrations/supabase/types";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const Index = () => {
  const [selectedProperty, setSelectedProperty] = useState<Tables<"properties"> | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [stateFilter, setStateFilter] = useState("all");
  const [cityFilter, setCityFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const filteredProperties = properties.filter((property) => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = stateFilter === "all" || property.state === stateFilter;
    const matchesCity = cityFilter === "all" || property.city === cityFilter;
    const matchesType = typeFilter === "all" || property.property_type.toLowerCase() === typeFilter.toLowerCase();
    
    return matchesSearch && matchesState && matchesCity && matchesType;
  });

  const propertyImages = [property1, property2, property3];

  // Auto-select first property on load
  useEffect(() => {
    if (filteredProperties.length > 0 && !selectedProperty) {
      setSelectedProperty(filteredProperties[0]);
    }
  }, [filteredProperties, selectedProperty]);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="ml-20 p-6">
        <div className="mb-6">
          <SearchFilters
            onSearchChange={setSearchQuery}
            onStateChange={setStateFilter}
            onCityChange={setCityFilter}
            onTypeChange={setTypeFilter}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-[500px] bg-card rounded-lg overflow-hidden relative">
              <PropertyMap
                properties={filteredProperties}
                onPropertySelect={setSelectedProperty}
                selectedProperty={selectedProperty}
              />
              <PropertyOverlay
                property={selectedProperty}
                onClose={() => setSelectedProperty(null)}
              />
            </div>

            {selectedProperty && (
              <PropertyCard
                property={selectedProperty}
                image={propertyImages[properties.indexOf(selectedProperty) % propertyImages.length]}
              />
            )}
          </div>

          <div className="space-y-6">
            <TenantsPanel
              totalMembers={8500}
              tenants={[
                { name: "John Doe" },
                { name: "Jane Smith" },
                { name: "Bob Johnson" },
              ]}
            />

            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">
                Loading properties...
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProperties.slice(0, 3).map((property, index) => (
                  <div 
                    key={property.id}
                    onClick={() => setSelectedProperty(property)}
                    className="cursor-pointer"
                  >
                    <PropertyCard
                      property={property}
                      image={propertyImages[index % propertyImages.length]}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
