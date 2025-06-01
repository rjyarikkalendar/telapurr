
export interface Catalog {
  id: string;
  title: string;
  description?: string;
  parentId?: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: 'tea' | 'teaware' | 'sets' | 'ceremony';
  catalogId: string;
  sizes?: number[];
  quantity?: number;
  selectedWeight?: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: number;
  selectedWeight?: string;
}
