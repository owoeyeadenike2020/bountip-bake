
// "use client";
// import { useState } from 'react';
// import { products } from '../data';
// import type { Product } from '../types';

// export const useProducts = () => {
//   const [selectedCategory, setSelectedCategory] = useState<string | number>('all');

//   const filteredProducts: Product[] = selectedCategory === 'all' 
//     ? products 
//     : products.filter(product => product.category === selectedCategory);

//   // Update: Accept both string and number
//   const handleCategoryChange = (categoryId: string | number) => {
//     setSelectedCategory(categoryId);
//   };

//   return {
//     products: filteredProducts,
//     selectedCategory,
//     setSelectedCategory: handleCategoryChange,
//   };
// };

// // Alternative approach - modify the hook to directly return the correct function
// export const useProductsAlternative = () => {
//   const [selectedCategory, setSelectedCategory] = useState<string | number>('all');

//   const filteredProducts: Product[] = selectedCategory === 'all' 
//     ? products 
//     : products.filter(product => product.category === selectedCategory);

//   return {
//     products: filteredProducts,
//     selectedCategory,
//     onCategoryChange: setSelectedCategory as (categoryId: string | number) => void,
//   };
// };


////updated version

// import { useState, useEffect, useCallback } from 'react';
// import { Product } from '@/types/product';
// import { productService } from '@/service/productService';
// interface UseProductsReturn {
//   products: Product[];
//   allProducts: Product[];
//   selectedCategory: string;
//   setSelectedCategory: (category: string) => void;
//   loading: boolean;
//   error: string | null;
//   refetch: () => Promise<void>;
// }

// export const useProducts = (storeCode = 'sam-s-store'): UseProductsReturn => {
//   const [allProducts, setAllProducts] = useState<Product[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState<string>('all');
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchProducts = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const products = await productService.getAllProducts(storeCode);
//       setAllProducts(products);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to load products');
//       console.error('Error fetching products:', err);
//     } finally {
//       setLoading(false);
//     }
//   }, [storeCode]);

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   // Filter products based on selected category
//   const filteredProducts = selectedCategory === 'all'
//     ? allProducts
//     : allProducts.filter(product => product.category === selectedCategory);

//   return {
//     products: filteredProducts,
//     allProducts,
//     selectedCategory,
//     setSelectedCategory,
//     loading,
//     error,
//     refetch: fetchProducts,
//   };
// };


import { useState, useEffect, useCallback } from 'react';
import { Product } from '@/types/product';
import { productService } from '@/service/productService';
interface UseProductsReturn {
  products: Product[];
  allProducts: Product[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useProducts = (storeCode = 'sam-s-store'): UseProductsReturn => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const products = await productService.getAllProducts(storeCode);
      setAllProducts(products);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  }, [storeCode]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'all'
    ? allProducts
    : allProducts.filter(product => product.category === selectedCategory);

  return {
    products: filteredProducts,
    allProducts,
    selectedCategory,
    setSelectedCategory,
    loading,
    error,
    refetch: fetchProducts,
  };
};