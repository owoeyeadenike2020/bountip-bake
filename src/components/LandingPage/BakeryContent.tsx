// /* eslint-disable @typescript-eslint/no-explicit-any */
// // 'use client';

// // import React, {useState} from 'react';
// // import CategoryTabs from './CatergoryTabs/CatergoryTabs';
// // import ProductGrid from './ProductGrid/ProductGrid';
// // import { categories } from "@/data/categories";
// // import { useProducts, useCart } from "@/hooks";
// // import { ProductDetailModal } from './ProductGrid/ProductDetailModal';
// // import { Product } from '@/types/product';

// // const BakeryContent: React.FC = () => {
  
// //   const { products, selectedCategory, setSelectedCategory } = useProducts();
// //   const { addToCart } = useCart();



// //    // Modal state management
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
// //   //  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
// //   // const [isCartModalOpen, setIsCartModalOpen] = useState(false);
// //   // const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);


// //   // Handle opening modal with selected product
// //   // const handleOpenModal = (product: Product) => {
// //   //   setSelectedProduct(product);
// //   //   setIsModalOpen(true);
// //   // };

// //   // Handle closing modal
// //   const handleCloseModal = () => {
// //     setIsModalOpen(false);
// //     setSelectedProduct(null);
// //   };
// //   // const handleCartClick = () => {
// //   //   setIsCartModalOpen(true);
// //   // };

// //   // const handleProceedToCheckout = () => {
// //   //   // Handle checkout logic
// //   //   console.log('Proceeding to checkout with items:', cartItems);
// //   //   setIsCartModalOpen(false);
// //   //   // You can navigate to checkout page or open checkout modal
// //   // };

// //   // Handle add to cart from modal
// //   const handleAddToCart = (productId: number, customization: any) => {
// //     console.log('Adding to cart from modal:', { productId, customization });
// //     addToCart(productId, customization);
    
// //     // Optional: Show success message
// //     alert(`Added ${selectedProduct?.name} to cart!`);
// //   };
// //   return (
// //     <>
// //       <CategoryTabs 
// //         categories={categories}
// //         selectedCategory={selectedCategory}
// //         onCategoryChange={setSelectedCategory}
// //       />

// //       <ProductGrid 
// //         products={products}
// //         onAddToCart={addToCart}
// //       />
// //         <ProductDetailModal
// //         isOpen={isModalOpen}
// //         onClose={handleCloseModal}
// //         product={selectedProduct}
// //         onAddToCart={handleAddToCart}
// //       />
       
// //     </>
// //   );
// // };

// // export default BakeryContent;
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

//   // Modal state management
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

//   // Handle opening modal with selected product
//   const handleOpenModal = (product: Product) => {
//     setSelectedProduct(product);
//     setIsModalOpen(true);
//   };

//   // Handle closing modal
//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedProduct(null);
//   };

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
//         onProductClick={handleOpenModal} // Pass the modal handler
//       />
      
//       <ProductDetailModal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         product={selectedProduct}
//         onAddToCart={handleAddToCart}
//       />
//     </>
//   );
// };

// export default BakeryContent;

// update version
// 'use client';

// import React, { useState } from 'react';
// import CategoryTabs from './CatergoryTabs/CatergoryTabs';
// import ProductGrid from './ProductGrid/ProductGrid';
// import { categories } from '@/data/categories';
// import { useProducts } from '@/hooks/useProducts';
// import { useCart } from '@/hooks';
// import { ProductDetailModal } from './ProductGrid/ProductDetailModal';
// import { Product } from '@/types/product';

// const BakeryContent: React.FC = () => {
//   const { products, selectedCategory, setSelectedCategory, loading, error } = useProducts();
//   const { addToCart } = useCart();

//   // Modal state management
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

//   // Handle opening modal with selected product
//   const handleOpenModal = (product: Product) => {
//     setSelectedProduct(product);
//     setIsModalOpen(true);
//   };

//   // Handle closing modal
//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedProduct(null);
//   };

//   // Handle add to cart from modal
//   const handleAddToCart = (productId: string, customization: any) => {
//     console.log('Adding to cart from modal:', { productId, customization });
//     addToCart(productId, customization);
//     alert(`Added ${selectedProduct?.name} to cart!`);
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-center min-h-[400px]">
//           <div className="text-center">
//             <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//             <p className="text-gray-600">Loading products...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
//           <h3 className="text-red-800 font-semibold mb-2">Failed to Load Products</h3>
//           <p className="text-red-600">{error}</p>
//         </div>
//       </div>
//     );
//   }

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
//         onProductClick={handleOpenModal}
//       />

//       <ProductDetailModal
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

import React, { useState } from 'react';
import CategoryTabs from './CatergoryTabs/CatergoryTabs';
import ProductGrid from './ProductGrid/ProductGrid';
import { categories } from '@/data/categories';
import { useProducts } from '@/hooks/useProducts';
import toast from 'react-hot-toast';
import { useCart } from '@/hooks/useCart';
import { ProductDetailModal } from './ProductGrid/ProductDetailModal';
import { Product } from '@/types/product';

const BakeryContent: React.FC = () => {
  const { products, selectedCategory, setSelectedCategory, loading, error } = useProducts();
  const { addToCart } = useCart();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  
  // const handleAddToCartFromModal = async (productId: string, quantity: number) => {
  //   try {
  //     await addToCart(productId, quantity);
  //     handleCloseModal();
  //     alert(`Added ${selectedProduct?.name} to cart!`);
  //   } catch (error) {
  //     console.error('Failed to add to cart:', error);
  //     alert('Failed to add to cart. Please try again.');
  //   }
  // };
  const handleAddToCartFromModal = async (
    productId: string,
    quantity: number,
  ) => {
    const toastId = toast.loading('Adding to cart...');
    
    try {
      await addToCart(productId, quantity);
      
      toast.success(
        `${selectedProduct?.name} ${quantity > 1 ? `(x${quantity})` : ''} added to cart!`,
        { id: toastId }
      );
      
      handleCloseModal();
    } catch (error) {
      console.error('Failed to add to cart:', error);
      
      toast.error(
        'Failed to add to cart. Please try again.',
        { id: toastId }
      );
    }
  };


  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h3 className="text-red-800 font-semibold mb-2">Failed to Load Products</h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <CategoryTabs
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={(id) => setSelectedCategory(id as string)}
      />

      <ProductGrid
        products={products}
        onAddToCart={(productId) => addToCart(productId, 1)}
        onProductClick={handleOpenModal}
      />

      <ProductDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={selectedProduct}
        onAddToCart={handleAddToCartFromModal}
      />
    </>
  );
};

export default BakeryContent;
