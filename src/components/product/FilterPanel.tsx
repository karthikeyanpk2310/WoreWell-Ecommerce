'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RatingStars } from "../shared/RatingStars";

type Filters = {
  gender: string[];
  size: string[];
  priceRange: [number, number];
  rating: number;
};

type FilterPanelProps = {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
};

const GENDERS = ['male', 'female', 'unisex'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

export function FilterPanel({ filters, onFilterChange }: FilterPanelProps) {

  const handleCheckboxChange = (category: 'gender' | 'size', value: string, checked: boolean) => {
    const newValues = checked
      ? [...filters[category], value]
      : filters[category].filter(v => v !== value);
    onFilterChange({ ...filters, [category]: newValues });
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold hidden lg:block">Filters</h2>
      <Accordion type="multiple" defaultValue={['gender', 'size', 'price', 'rating']} className="w-full">
        <AccordionItem value="gender">
          <AccordionTrigger>Gender</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {GENDERS.map(gender => (
                <div key={gender} className="flex items-center space-x-2">
                  <Checkbox
                    id={`gender-${gender}`}
                    checked={filters.gender.includes(gender)}
                    onCheckedChange={(checked) => handleCheckboxChange('gender', gender, !!checked)}
                  />
                  <Label htmlFor={`gender-${gender}`} className="capitalize">{gender}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="size">
          <AccordionTrigger>Size</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2">
              {SIZES.map(size => (
                 <div key={size} className="flex items-center space-x-2">
                  <Checkbox
                    id={`size-${size}`}
                    checked={filters.size.includes(size)}
                    onCheckedChange={(checked) => handleCheckboxChange('size', size, !!checked)}
                  />
                  <Label htmlFor={`size-${size}`}>{size}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="p-2">
                <Slider
                  min={0}
                  max={5000}
                  step={100}
                  value={filters.priceRange}
                  onValueChange={(value) => onFilterChange({ ...filters, priceRange: value as [number, number] })}
                />
                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>INR {filters.priceRange[0]}</span>
                    <span>INR {filters.priceRange[1]}</span>
                </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="rating">
          <AccordionTrigger>Rating</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {[4, 3, 2, 1].map(rating => (
                 <div key={rating} className="flex items-center space-x-2">
                    <Checkbox
                        id={`rating-${rating}`}
                        checked={filters.rating === rating}
                        onCheckedChange={(checked) => onFilterChange({ ...filters, rating: checked ? rating : 0})}
                    />
                    <Label htmlFor={`rating-${rating}`} className="flex items-center gap-2">
                        <RatingStars rating={rating} />
                        <span>& Up</span>
                    </Label>
                 </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
