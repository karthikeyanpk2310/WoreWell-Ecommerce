export type Product = {
  id: string;
  name: string;
  image: string;
  imageHint: string;
  rating: number;
  gender: 'male' | 'female' | 'unisex';
  price: number;
  stock: number;
  sizes: ('XS' | 'S' | 'M' | 'L' | 'XL')[];
  tags?: ('new' | 'trending' | 'best-seller')[];
  createdAt: string;
  description: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  createdAt: string;
};

export type CartItem = {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size: string;
};

export type Order = {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  address: string;
  status: 'Placed' | 'Shipped' | 'Delivered';
  deliveryDate: string;
  createdAt: string;
};
