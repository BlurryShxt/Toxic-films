

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Review {
  id: string;
  rating: number; // 1-5 stars
  comment: string;
  timestamp: number;
}