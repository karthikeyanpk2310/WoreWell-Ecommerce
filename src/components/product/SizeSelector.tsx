'use client';

import { Button } from '@/components/ui/button';

type SizeSelectorProps = {
  sizes: string[];
  selectedSize: string | null;
  onSizeSelect: (size: string) => void;
};

export function SizeSelector({ sizes, selectedSize, onSizeSelect }: SizeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map((size) => (
        <Button
          key={size}
          variant={selectedSize === size ? 'default' : 'outline'}
          size="sm"
          onClick={() => onSizeSelect(size)}
          className="w-12 h-10"
        >
          {size}
        </Button>
      ))}
    </div>
  );
}
