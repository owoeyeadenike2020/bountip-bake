// import { useState } from 'react';
// import { products } from '../data';

// export const useProducts = () => {
//   const [selectedCategory, setSelectedCategory] = useState('all');

//   const filteredProducts = selectedCategory === 'all' 
//     ? products 
//     : products.filter(product => product.category === selectedCategory);

//   return {
//     products: filteredProducts,
//     selectedCategory,
//     setSelectedCategory,
//   };
// };
"use client";
import { useState } from 'react';
import { products } from '../data';
import type { Product } from '../types';

export const useProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | number>('all');

  const filteredProducts: Product[] = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  // Update: Accept both string and number
  const handleCategoryChange = (categoryId: string | number) => {
    setSelectedCategory(categoryId);
  };

  return {
    products: filteredProducts,
    selectedCategory,
    setSelectedCategory: handleCategoryChange,
  };
};

// Alternative approach - modify the hook to directly return the correct function
export const useProductsAlternative = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | number>('all');

  const filteredProducts: Product[] = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return {
    products: filteredProducts,
    selectedCategory,
    onCategoryChange: setSelectedCategory as (categoryId: string | number) => void,
  };
};