/* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client';

// import React, {useState} from 'react';
// import CategoryTabs from './CatergoryTabs/CatergoryTabs';
// import ProductGrid from './ProductGrid/ProductGrid';
// import { categories } from "@/data/categories";
// import { useProducts, useCart } from "@/hooks";
// import { ProductDetailModal } from './ProductGrid/ProductDetailModal';
// import { Product } from '@/types/product';

// const BakeryContent: React.FC = () => {
  
//   const { products, selectedCategory, setSelectedCategory } = useProducts();
//   const { addToCart } = useCart();



//    // Modal state management
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   //  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
//   // const [isCartModalOpen, setIsCartModalOpen] = useState(false);
//   // const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);


//   // Handle opening modal with selected product
//   // const handleOpenModal = (product: Product) => {
//   //   setSelectedProduct(product);
//   //   setIsModalOpen(true);
//   // };

//   // Handle closing modal
//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedProduct(null);
//   };
//   // const handleCartClick = () => {
//   //   setIsCartModalOpen(true);
//   // };

//   // const handleProceedToCheckout = () => {
//   //   // Handle checkout logic
//   //   console.log('Proceeding to checkout with items:', cartItems);
//   //   setIsCartModalOpen(false);
//   //   // You can navigate to checkout page or open checkout modal
//   // };

//   // Handle add to cart from modal
//   const handleAddToCart = (productId: number, customization: any) => {
//     console.log('Adding to cart from modal:', { productId, customization });
//     addToCart(productId, customization);
    
//     // Optional: Show success message
//     alert(`Added ${selectedProduct?.name} to cart!`);
//   };
//   return (
//     <>
//       <CategoryTabs 
//         categories={categories}
//         selectedCategory={selectedCategory}
//         onCategoryChange={setSelectedCategory}
//       />

//       <ProductGrid 
//         products={products}
//         onAddToCart={addToCart}
//       />
//         <ProductDetailModal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         product={selectedProduct}
//         onAddToCart={handleAddToCart}
//       />
       
//     </>
//   );
// };

// export default BakeryContent;
'use client';

import React, {useState} from 'react';
import CategoryTabs from './CatergoryTabs/CatergoryTabs';
import ProductGrid from './ProductGrid/ProductGrid';
import { categories } from "@/data/categories";
import { useProducts, useCart } from "@/hooks";
import { ProductDetailModal } from './ProductGrid/ProductDetailModal';
import { Product } from '@/types/product';

const BakeryContent: React.FC = () => {
  
  const { products, selectedCategory, setSelectedCategory } = useProducts();
  const { addToCart } = useCart();

  // Modal state management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Handle opening modal with selected product
  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Handle closing modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Handle add to cart from modal
  const handleAddToCart = (productId: number, customization: any) => {
    console.log('Adding to cart from modal:', { productId, customization });
    addToCart(productId, customization);
    
    // Optional: Show success message
    alert(`Added ${selectedProduct?.name} to cart!`);
  };

  return (
    <>
      <CategoryTabs 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <ProductGrid 
        products={products}
        onAddToCart={addToCart}
        onProductClick={handleOpenModal} // Pass the modal handler
      />
      
      <ProductDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={selectedProduct}
        onAddToCart={handleAddToCart}
      />
    </>
  );
};

export default BakeryContent;