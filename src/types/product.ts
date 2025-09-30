// src/types/product.ts
export interface SizeOption {
  name: string;
  price: number;
};
export interface AddOn {
  id: string;
  name: string;
  price: number;
  checked: boolean;
}
export interface Product {
  id: number;
  name: string;
  description?: string;
  originalPrice: number;
  image: string;
  rating?: number;
  reviewCount?: number;
  deliveryTime?: string;
  allergens?: string[];
  sizes?: SizeOption[];
  addOns?: AddOn[];
  price?: number;
  badge?: string;

}

export interface Category {
  id: string;
  name: string;
  icon: string ;
}