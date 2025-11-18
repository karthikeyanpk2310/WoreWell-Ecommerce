
import { Skeleton } from "@/components/ui/skeleton";

export function CarouselSkeleton() {
  return (
    <div>
      <Skeleton className="h-8 w-1/3 mb-6" />
      <div className="w-full overflow-hidden">
        <div className="flex space-x-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="shrink-0 w-full basis-1/1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 p-1">
              <div className="space-y-2">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-5 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
