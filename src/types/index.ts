export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  category: string;
  badge?: string;
  badgeColor?: string;
  image: string;
}

export interface CategoryTabsProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void; // Fixed: only string, not string | number
}

export interface ProductGridProps {
  products: Product[];
  onAddToCart: (productId: number) => void;
}