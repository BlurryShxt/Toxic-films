
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
