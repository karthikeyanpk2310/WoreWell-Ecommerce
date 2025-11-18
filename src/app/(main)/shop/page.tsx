import { mockProducts } from "@/lib/data";
import { ShopPageClient } from "@/components/product/ShopPageClient";
import type { Product } from "@/types";

export default function ShopPage() {
  // In a real app, this would be a server-side fetch
  // TODO: Fetch products from API: GET /api/products
  const products: Product[] = mockProducts;

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-headline font-bold">Our Collection</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Browse through our curated collection of contemporary and traditional wear.
        </p>
      </div>
      <ShopPageClient products={products} />
    </div>
  );
}
