import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchFiltersProps {
  onSearchChange: (value: string) => void;
  onStateChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onTypeChange: (value: string) => void;
}

const SearchFilters = ({
  onSearchChange,
  onStateChange,
  onCityChange,
  onTypeChange,
}: SearchFiltersProps) => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search"
          className="pl-10 bg-card"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <Select onValueChange={onTypeChange}>
        <SelectTrigger className="w-48 bg-card">
          <SelectValue placeholder="Insurance Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="townhouse">Townhouse</SelectItem>
          <SelectItem value="villa">Villa</SelectItem>
          <SelectItem value="condo">Condo</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={onStateChange}>
        <SelectTrigger className="w-32 bg-card">
          <SelectValue placeholder="State" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All States</SelectItem>
          <SelectItem value="CA">California</SelectItem>
          <SelectItem value="NY">New York</SelectItem>
          <SelectItem value="TX">Texas</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={onCityChange}>
        <SelectTrigger className="w-32 bg-card">
          <SelectValue placeholder="City" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Cities</SelectItem>
          <SelectItem value="Los Angeles">Los Angeles</SelectItem>
          <SelectItem value="Irvine">Irvine</SelectItem>
          <SelectItem value="Huntington Beach">Huntington Beach</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchFilters;