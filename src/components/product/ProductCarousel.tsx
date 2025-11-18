import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ProductCard } from './ProductCard';
import type { Product } from '@/types';

type ProductCarouselProps = {
  title: string;
  description?: string;
  products: Product[];
};

export function ProductCarousel({ title, description, products }: ProductCarouselProps) {
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-3xl font-headline font-bold">{title}</h2>
        {description && <p className="text-muted-foreground mt-1">{description}</p>}
      </div>
      <Carousel
        opts={{
          align: 'start',
          loop: products.length > 5,
        }}
        className="w-full"
      >
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product.id} className="basis-1/1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
              <div className="p-1">
                <ProductCard product={product} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden lg:flex" />
        <CarouselNext className="hidden lg:flex" />
      </Carousel>
    </section>
  );
}
