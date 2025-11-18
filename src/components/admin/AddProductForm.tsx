'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '../ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

const SIZES = ['XS', 'S', 'M', 'L', 'XL'] as const;

const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  imageUrl: z.string().url('Must be a valid URL'),
  rating: z.coerce.number().min(0).max(5, 'Rating must be between 0 and 5'),
  gender: z.enum(['male', 'female', 'unisex']),
  price: z.coerce.number().min(1, 'Price must be greater than 0'),
  stock: z.coerce.number().min(0, 'Stock cannot be negative'),
  sizes: z.array(z.string()).refine(value => value.some(item => item), {
    message: 'You have to select at least one size.',
  }),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

export function AddProductForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      imageUrl: '',
      rating: 4,
      gender: 'female',
      price: 0,
      stock: 0,
      sizes: [],
      description: '',
    },
  });

  function onSubmit(data: z.infer<typeof productSchema>) {
    setIsLoading(true);
    // TODO: POST /api/products
    console.log('Submitting new product:', data);
    
    setTimeout(() => { // Simulate API call
      toast({
        title: 'Product Added!',
        description: `${data.name} has been successfully added to the store.`,
      });
      form.reset();
      setIsLoading(false);
    }, 1000);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Men's Casual Shirt" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the product..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (INR)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 799" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 20" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a gender" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="unisex">Unisex</SelectItem>
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Rating</FormLabel>
                        <FormControl>
                            <Input type="number" step="0.1" min="0" max="5" placeholder="e.g., 4.2" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
        
        <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                    <Input placeholder="https://example.com/image.jpg" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />

        <FormField
          control={form.control}
          name="sizes"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Sizes</FormLabel>
                <FormDescription>
                  Select the available sizes for this product.
                </FormDescription>
              </div>
              <div className="flex flex-wrap gap-4">
              {SIZES.map((item) => (
                <FormField
                  key={item}
                  control={form.control}
                  name="sizes"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" variant="gradient" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Add Product
        </Button>
      </form>
    </Form>
  );
}
