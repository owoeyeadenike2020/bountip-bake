// 'use client';
// import React,{useState} from 'react';
// import { Star, Clock, Plus } from 'lucide-react';
// import Image from 'next/image';
// import { ProductDetailModal } from './ProductDetailModal';
// import { Product } from '@/types/product';


// // type Product = {
// //   id: string | number;
// //   name: string;
// //   description: string;
// //   price: number;
// //   originalPrice?: number;
// //   rating: number;
// //   reviewCount: number;
// //   deliveryTime: string;
// //   image: string;
// //   badge?: string;
// //   badgeColor?: string;
// // };

// type ProductCardProps = {
//   product: Product;
//   onAddToCart: (productId: Product['id']) => void;
// };

// const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
//   // const handleAddToCart = () => {
//   //   onAddToCart(product.id);
//   // };
// const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleAddClick = () => {
//     console.log('Add button clicked');
//     setIsModalOpen(true);
//   };
//   const formatPrice = (price: number) => {
//     return `€ ${price.toFixed(2)}`;
//   };

//   return (
//     <div>
//     <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
//       {/* Product Image */}
//       <div className="relative h-48 bg-gray-200">
//         <Image
//           src={product.image}
//           alt={product.name}
//           width={300}
//           height={200}
//           className="w-full h-full object-cover"
//         />
//         {product.badge && (
//           <div className="absolute top-3 left-3">
//             <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//               product.badge === 'Popular' 
//                 ? 'bg-gray-100 text-gray-800' 
//                 : product.badge === 'Premium' 
//                 ? 'bg-gray-100 text-gray-800' 
//                 : 'bg-orange-100 text-orange-800'
//             }`}>
//               {product.badge}
//             </span>
//           </div>
//         )}
//       </div>

//       {/* Product Details */}
//       <div className="p-4">
//         {/* Product Name */}
//         <h3 className="font-semibold text-lg text-gray-900 mb-2">
//           {product.name}
//         </h3>

//         {/* Product Description */}
//         <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//           {product.description}
//         </p>

//         {/* Rating and Delivery Time Row */}
//         <div className="flex items-center justify-between mb-4">
//           {/* Rating */}
//           <div className="flex items-center gap-1">
//             <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
//             <span className="font-medium text-sm text-gray-900">
//               {product.rating}
//             </span>
//             <span className="text-gray-500 text-sm">
//               ({product.reviewCount})
//             </span>
//           </div>

//           {/* Delivery Time */}
//           <div className="flex items-center gap-1 text-green-600">
//             <Clock className="w-4 h-4" />
//             <span className="text-sm font-medium">
//               {product.deliveryTime}
//             </span>
//           </div>
//         </div>

//         {/* Price and Add Button Row */}
//         <div className="flex items-center justify-between">
//           {/* Price */}
//           <div className="flex items-center gap-2">
//             <span className="font-bold text-lg text-gray-900">
//               {formatPrice(product.price ?? 0)}
//             </span>
//             {product.originalPrice && product.originalPrice > (product.price ?? 0) && (
//               <span className="text-gray-400 text-sm line-through">
//                 €{product.originalPrice}
//               </span>
//             )}
//           </div>

//           {/* Add Button */}
//           <button
//             onClick={handleAddClick}
//             className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors duration-200"
//           >
//             <Plus className="w-4 h-4" />
//             Add
//           </button>
//         </div>
        
//       </div>
//     </div>

//       </div>
//   );
// };

// export default ProductCard;


'use client';
import React from 'react';
import { Star, Clock, Plus } from 'lucide-react';
import Image from 'next/image';
import { Product } from '@/types/product';

// Define the props interface
interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: Product['id']) => void;
  onProductClick?: (product: Product) => void; // Add this prop for modal
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onProductClick 
}) => {

  const handleAddClick = () => {
    console.log('Add button clicked');
    // Open the modal with the product details
    if (onProductClick) {
      onProductClick(product);
    }
  };

  const formatPrice = (price: number) => {
    return `€ ${price.toFixed(2)}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Product Image */}
      <div className="relative h-48 bg-gray-200">
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={200}
          className="w-full h-full object-cover"
        />
        {product.badge && (
          <div className="absolute top-3 left-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              product.badge === 'Popular' 
                ? 'bg-gray-100 text-gray-800' 
                : product.badge === 'Premium' 
                ? 'bg-gray-100 text-gray-800' 
                : 'bg-orange-100 text-orange-800'
            }`}>
              {product.badge}
            </span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="font-semibold text-lg text-gray-900 mb-2">
          {product.name}
        </h3>

        {/* Product Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Rating and Delivery Time Row */}
        <div className="flex items-center justify-between mb-4">
          {/* Rating */}
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
            <span className="font-medium text-sm text-gray-900">
              {product.rating}
            </span>
            <span className="text-gray-500 text-sm">
              ({product.reviewCount})
            </span>
          </div>

          {/* Delivery Time */}
          <div className="flex items-center gap-1 text-green-600">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">
              {product.deliveryTime}
            </span>
          </div>
        </div>

        {/* Price and Add Button Row */}
        <div className="flex items-center justify-between">
          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-gray-900">
              {formatPrice(product.price ?? 0)}
            </span>
            {product.originalPrice && product.originalPrice > (product.price ?? 0) && (
              <span className="text-gray-400 text-sm line-through">
                €{product.originalPrice}
              </span>
            )}
          </div>

          {/* Add Button */}
          <button
            onClick={handleAddClick}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;