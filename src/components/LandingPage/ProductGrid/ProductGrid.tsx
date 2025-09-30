// import React from 'react';
// import ProductCard from './ProductCard';

// const ProductGrid = ({ products, onAddToCart }) => {
//   if (products.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center py-12 text-center">
//         <div className="text-6xl mb-4">🍽️</div>
//         <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
//         <p className="text-gray-600">Try selecting a different category</p>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
//       {products.map((product) => (
//         <ProductCard 
//           key={product.id} 
//           product={product} 
//           onAddToCart={onAddToCart}
//         />
//       ))}
//     </div>
//   );
// };

// export default ProductGrid;


import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types/product';

// Define the props interface
interface ProductGridProps {
  products: Product[];
  onAddToCart: (productId: Product['id']) => void;
  onProductClick?: (product: Product) => void; // Add this for modal functionality
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  onAddToCart, 
  onProductClick 
}) => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-6xl mb-4">🍽️</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-600">Try selecting a different category</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onAddToCart={onAddToCart}
          onProductClick={onProductClick} // Pass the modal handler
        />
      ))}
    </div>
  );
};

export default ProductGrid;