import { Shirt } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Shirt className="h-7 w-7 text-primary" />
      <span className="text-2xl font-bold font-headline tracking-tighter text-foreground">
        Wore Well
      </span>
    </div>
  );
}
