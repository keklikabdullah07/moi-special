export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  imageUrl: string;
  isSpecialty?: boolean;
  tags?: string[];
  isAvailable?: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
