
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: 'tea' | 'teaware' | 'sets' | 'ceremony';
  sizes?: number[];
  quantity?: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: number;
}
