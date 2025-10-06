// // import React from 'react';
// // import { Minus, Plus, Trash2, CreditCard } from 'lucide-react';
// // import { Modal } from '@/components/UI/Modal/Modal';
// // import Image from 'next/image';
// // import { useRouter } from 'next/navigation';


// // type CartItem = {
// //   id: string | number;
// //   name: string;
// //   description: string;
// //   price: number;
// //   image: string;
// //   quantity: number;
// //   customization?: {
// //     size?: string;
// //     addOns?: Array<{ id: string; name: string; price: number }>;
// //   };
// // };

// // type CartModalProps = {
// //   isOpen: boolean;
// //   onClose: () => void;
// //   cartItems: CartItem[];
// //   onUpdateQuantity: (itemId: string | number, quantity: number) => void;
// //   onRemoveItem: (itemId: string | number) => void;
// //   onClearCart: () => void;
// //   onProceedToCheckout: () => void;
// // };

// // export const CartModal: React.FC<CartModalProps> = ({
// //   isOpen,
// //   onClose,
// //   cartItems,
// //   onUpdateQuantity,
// //   onRemoveItem,
// //   onClearCart,
// //   onProceedToCheckout,
// // }) => {
// //   // Calculate totals
// //   const router = useRouter();
// //   const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
// //   const deliveryFee = 5.09;
// //   const tax = subtotal * 0.089; // Approximately 8.9% tax rate
// //   const totalAmount = subtotal + deliveryFee + tax;
// //   const handleProceedToCheckout = () => {
// //   onClose(); // Close the cart modal first
// //   router.push('/checkout'); // Navigate to checkout page
// // };

// //   const handleQuantityChange = (itemId: string | number, increment: boolean) => {
// //     const item = cartItems.find(item => item.id === itemId);
// //     if (!item) return;

// //     const newQuantity = increment ? item.quantity + 1 : item.quantity - 1;
    
// //     if (newQuantity <= 0) {
// //       onRemoveItem(itemId);
// //     } else {
// //       onUpdateQuantity(itemId, newQuantity);
// //     }
// //   };

// //   const formatPrice = (price: number) => `€ ${price.toFixed(2)}`;

// //   return (
// //     <Modal
// //       isOpen={isOpen}
// //       onClose={onClose}
// //       title="Your Cart"
// //       size="md"
// //     >
// //       <div className="flex flex-col h-full">
// //         {/* Cart Items */}
// //         <div className="flex-1 overflow-y-auto p-4 md:p-6">
// //           {cartItems.length === 0 ? (
// //             <div className="flex flex-col items-center justify-center py-12 text-center">
// //               <div className="text-6xl mb-4">🛒</div>
// //               <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
// //               <p className="text-gray-600">Add some delicious items from our bakery!</p>
// //             </div>
// //           ) : (
// //             <div className="space-y-4">
// //               {cartItems.map((item) => (
// //                 <div key={item.id} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
// //                   {/* Product Image */}
// //                   <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
// //                     <Image
// //                       src={item.image}
// //                       alt={item.name}
// //                       width={80}
// //                       height={80}
// //                       className="w-full h-full object-cover rounded-lg"
// //                     />
// //                   </div>

// //                   {/* Product Details */}
// //                   <div className="flex-1 min-w-0">
// //                     <div className="flex justify-between items-start mb-2">
// //                       <div className="flex-1">
// //                         <h3 className="font-semibold text-gray-900 text-lg">
// //                           {item.name}
// //                         </h3>
// //                         <p className="text-gray-600 text-sm mt-1 line-clamp-2">
// //                           {item.description}
// //                         </p>
                        
// //                         {/* Show customization details */}
// //                         {item.customization && (
// //                           <div className="mt-2 text-xs text-gray-500">
// //                             {item.customization.size && (
// //                               <span className="mr-3">Size: {item.customization.size}</span>
// //                             )}
// //                             {item.customization.addOns && item.customization.addOns.length > 0 && (
// //                               <span>
// //                                 Add-ons: {item.customization.addOns.map(addon => addon.name).join(', ')}
// //                               </span>
// //                             )}
// //                           </div>
// //                         )}
// //                       </div>

// //                       {/* Delete Button */}
// //                       <button
// //                         onClick={() => onRemoveItem(item.id)}
// //                         className="p-1 text-red-500 hover:text-red-700 transition-colors ml-2"
// //                         aria-label="Remove item"
// //                       >
// //                         <Trash2 className="w-5 h-5" />
// //                       </button>
// //                     </div>

// //                     {/* Price and Quantity */}
// //                     <div className="flex items-center justify-between">
// //                       <span className="text-green-600 font-bold text-lg">
// //                         {formatPrice(item.price)}
// //                       </span>

// //                       {/* Quantity Controls */}
// //                       <div className="flex items-center gap-3">
// //                         <button
// //                           onClick={() => handleQuantityChange(item.id, false)}
// //                           className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
// //                         >
// //                           <Minus className="w-4 h-4" />
// //                         </button>
// //                         <span className="text-lg font-medium w-8 text-center">
// //                           {item.quantity}
// //                         </span>
// //                         <button
// //                           onClick={() => handleQuantityChange(item.id, true)}
// //                           className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
// //                         >
// //                           <Plus className="w-4 h-4" />
// //                         </button>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </div>

// //         {/* Cart Summary - Only show if cart has items */}
// //         {cartItems.length > 0 && (
// //           <div className="border-t border-gray-200 p-4 md:p-6 bg-gray-50">
// //             {/* Order Summary */}
// //             <div className="space-y-3 mb-6">
// //               <div className="flex justify-between text-gray-600">
// //                 <span>Subtotal</span>
// //                 <span>{formatPrice(subtotal)}</span>
// //               </div>
// //               <div className="flex justify-between text-gray-600">
// //                 <span>Delivery Fee</span>
// //                 <span>{formatPrice(deliveryFee)}</span>
// //               </div>
// //               <div className="flex justify-between text-gray-600">
// //                 <span>Tax</span>
// //                 <span>{formatPrice(tax)}</span>
// //               </div>
// //               <div className="border-t border-gray-300 pt-3">
// //                 <div className="flex justify-between font-bold text-lg">
// //                   <span>Total</span>
// //                   <span>{formatPrice(totalAmount)}</span>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Action Buttons */}
// //             <div className="space-y-3">
// //               <button
// //                 onClick={handleProceedToCheckout}
// //                 className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-lg font-medium text-lg flex items-center justify-center gap-2 transition-colors"
// //                 type="button"
// //               >
// //                 <CreditCard className="w-5 h-5" />
// //                 Proceed to Checkout
// //               </button>
              
// //               <button
// //                 onClick={onClearCart}
// //                 className="w-full bg-red-50 hover:bg-red-100 text-red-600 py-3 rounded-lg font-medium transition-colors"
// //                 type="button"
// //               >
// //                 Clear Orders
// //               </button>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </Modal>
// //   );
// // };


// import React from 'react';
// import { Minus, Plus, Trash2, CreditCard } from 'lucide-react';
// import { Modal } from '@/components/UI/Modal/Modal';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';

// type CartItem = {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
//   quantity: number;
//   customization?: {
//     size?: string;
//     addOns?: Array<{ id: string; name: string; price: number }>;
//     totalPrice?: number;
//   };
// };

// interface CartModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   cartItems: CartItem[];
//   onUpdateQuantity: (itemId: number, quantity: number) => void;
//   onRemoveItem: (itemIndex: number) => void;
//   onClearCart: () => void;
//   onProceedToCheckout: () => void;
// }

// export const CartModal: React.FC<CartModalProps> = ({
//   isOpen,
//   onClose,
//   cartItems,
//   onUpdateQuantity,
//   onRemoveItem,
//   onClearCart,
//   onProceedToCheckout,
// }) => {
//   const router = useRouter();
  
//   // Calculate totals
//   const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
//   const deliveryFee = 5.09;
//   const tax = subtotal * 0.089; // Approximately 8.9% tax rate
//   const totalAmount = subtotal + deliveryFee + tax;

//   const handleProceedToCheckout = () => {
//     onClose(); // Close the cart modal first
//     router.push('/checkout'); // Navigate to checkout page
//   };

//   const handleQuantityChange = (itemIndex: number, increment: boolean) => {
//     const item = cartItems[itemIndex];
//     if (!item) return;

//     const newQuantity = increment ? item.quantity + 1 : item.quantity - 1;
    
//     if (newQuantity <= 0) {
//       onRemoveItem(itemIndex);
//     } else {
//       onUpdateQuantity(item.id, newQuantity);
//     }
//   };

//   const formatPrice = (price: number): string => `€ ${price.toFixed(2)}`;

//   return (
//     <Modal
//       isOpen={isOpen}
//       onClose={onClose}
//       title="Your Cart"
//       size="lg"
//     >
//       <div className="flex flex-col h-full">
//         {/* Cart Items */}
//         <div className="flex-1 overflow-y-auto p-4 md:p-6">
//           {cartItems.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-12 text-center">
//               <div className="text-6xl mb-4">🛒</div>
//               <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
//               <p className="text-gray-600">Add some delicious items from our bakery!</p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {cartItems.map((item, index) => (
//                 <div key={`${item.id}-${index}`} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
//                   {/* Product Image */}
//                   <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
//                     <Image
//                       src={item.image}
//                       alt={item.name}
//                       width={80}
//                       height={80}
//                       className="w-full h-full object-cover rounded-lg"
//                     />
//                   </div>

//                   {/* Product Details */}
//                   <div className="flex-1 min-w-0">
//                     <div className="flex justify-between items-start mb-2">
//                       <div className="flex-1">
//                         <h3 className="font-semibold text-gray-900 text-lg">
//                           {item.name}
//                         </h3>
//                         <p className="text-gray-600 text-sm mt-1 line-clamp-2">
//                           {item.description}
//                         </p>
                        
//                         {/* Show customization details */}
//                         {item.customization && (
//                           <div className="mt-2 text-xs text-gray-500">
//                             {item.customization.size && (
//                               <span className="mr-3">Size: {item.customization.size}</span>
//                             )}
//                             {item.customization.addOns && item.customization.addOns.length > 0 && (
//                               <span>
//                                 Add-ons: {item.customization.addOns.map(addon => addon.name).join(', ')}
//                               </span>
//                             )}
//                           </div>
//                         )}
//                       </div>

//                       {/* Delete Button */}
//                       <button
//                         onClick={() => onRemoveItem(index)}
//                         className="p-1 text-red-500 hover:text-red-700 transition-colors ml-2"
//                         aria-label="Remove item"
//                         type="button"
//                       >
//                         <Trash2 className="w-5 h-5" />
//                       </button>
//                     </div>

//                     {/* Price and Quantity */}
//                     <div className="flex items-center justify-between">
//                       <span className="text-green-600 font-bold text-lg">
//                         {formatPrice(item.price)}
//                       </span>

//                       {/* Quantity Controls */}
//                       <div className="flex items-center gap-3">
//                         <button
//                           onClick={() => handleQuantityChange(index, false)}
//                           className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
//                           type="button"
//                           aria-label="Decrease quantity"
//                         >
//                           <Minus className="w-4 h-4" />
//                         </button>
//                         <span className="text-lg font-medium w-8 text-center">
//                           {item.quantity}
//                         </span>
//                         <button
//                           onClick={() => handleQuantityChange(index, true)}
//                           className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
//                           type="button"
//                           aria-label="Increase quantity"
//                         >
//                           <Plus className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Cart Summary - Only show if cart has items */}
//         {cartItems.length > 0 && (
//           <div className="border-t border-gray-200 p-4 md:p-6 bg-gray-50">
//             {/* Order Summary */}
//             <div className="space-y-3 mb-6">
//               <div className="flex justify-between text-gray-600">
//                 <span>Subtotal</span>
//                 <span>{formatPrice(subtotal)}</span>
//               </div>
//               <div className="flex justify-between text-gray-600">
//                 <span>Delivery Fee</span>
//                 <span>{formatPrice(deliveryFee)}</span>
//               </div>
//               <div className="flex justify-between text-gray-600">
//                 <span>Tax</span>
//                 <span>{formatPrice(tax)}</span>
//               </div>
//               <div className="border-t border-gray-300 pt-3">
//                 <div className="flex justify-between font-bold text-lg">
//                   <span>Total</span>
//                   <span>{formatPrice(totalAmount)}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="space-y-3">
//               <button
//                 onClick={handleProceedToCheckout}
//                 className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-lg font-medium text-lg flex items-center justify-center gap-2 transition-colors"
//                 type="button"
//               >
//                 <CreditCard className="w-5 h-5" />
//                 Proceed to Checkout
//               </button>
              
//               <button
//                 onClick={onClearCart}
//                 className="w-full bg-red-50 hover:bg-red-100 text-red-600 py-3 rounded-lg font-medium transition-colors"
//                 type="button"
//               >
//                 Clear Orders
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </Modal>
//   );
// };





//updated
// import React, { useEffect } from 'react';
// import { Minus, Plus, Trash2, CreditCard } from 'lucide-react';
// import { Modal } from '@/components/UI/Modal/Modal';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';

// type CartItem = {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
//   quantity: number;
//   customization?: {
//     size?: string;
//     addOns?: Array<{ id: string; name: string; price: number }>;
//     totalPrice?: number;
//   };
// };

// interface CartModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   cartItems: CartItem[];
//   onUpdateQuantity: (itemId: number, quantity: number) => void;
//   onRemoveItem: (itemIndex: number) => void;
//   onClearCart: () => void;
//   onProceedToCheckout: () => void;
// }

// export const CartModal: React.FC<CartModalProps> = ({
//   isOpen,
//   onClose,
//   cartItems,
//   onUpdateQuantity,
//   onRemoveItem,
//   onClearCart,
//   onProceedToCheckout,
// }) => {
//   const router = useRouter();

//   // Debug logging
//   useEffect(() => {
//     console.log('CartModal render - isOpen:', isOpen);
//     console.log('CartModal render - cartItems:', cartItems);
//     console.log('CartModal render - cartItems.length:', cartItems.length);
//   }, [isOpen, cartItems]);
  
//   // Calculate totals
//   const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
//   const deliveryFee = 5.09;
//   const tax = subtotal * 0.089;
//   const totalAmount = subtotal + deliveryFee + tax;

//   const handleProceedToCheckout = () => {
//     console.log('Proceeding to checkout');
//     onClose();
//     router.push('/checkout');
//   };

//   const handleQuantityChange = (itemIndex: number, increment: boolean) => {
//     const item = cartItems[itemIndex];
//     if (!item) return;

//     const newQuantity = increment ? item.quantity + 1 : item.quantity - 1;
    
//     if (newQuantity <= 0) {
//       onRemoveItem(itemIndex);
//     } else {
//       onUpdateQuantity(item.id, newQuantity);
//     }
//   };

//   const formatPrice = (price: number): string => `€ ${price.toFixed(2)}`;

//   // Add a simple fallback UI for debugging
//   if (!isOpen) {
//     return null;
//   }

//   return (
//     <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] flex flex-col">
//         {/* Header */}
//         <div className="flex items-center justify-between p-4 border-b">
//           <h2 className="text-lg font-semibold">Your Cart ({cartItems.length} items)</h2>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-full"
//             type="button"
//           >
//             ×
//           </button>
//         </div>

//         {/* Content */}
//         <div className="flex-1 overflow-y-auto p-4">
//           <div className="mb-4 p-2 bg-yellow-100 text-yellow-800 text-sm rounded">
//             Debug: Modal is open, cart has {cartItems.length} items
//           </div>

//           {cartItems.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-12 text-center">
//               <div className="text-6xl mb-4">🛒</div>
//               <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
//               <p className="text-gray-600">Add some delicious items from our bakery!</p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {cartItems.map((item, index) => (
//                 <div key={`${item.id}-${index}`} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
//                   {/* Product Image */}
//                   <div className="w-16 h-16 flex-shrink-0 bg-gray-200 rounded-lg flex items-center justify-center">
//                     <Image
//                       src={item.image}
//                       alt={item.name}
//                       width={64}
//                       height={64}
//                       className="w-full h-full object-cover rounded-lg"
//                       onError={(e) => {
//                         console.log('Image failed to load:', item.image);
//                         e.currentTarget.style.display = 'none';
//                       }}
//                     />
//                     <span className="text-gray-500 text-xs">IMG</span>
//                   </div>

//                   {/* Product Details */}
//                   <div className="flex-1 min-w-0">
//                     <div className="flex justify-between items-start mb-2">
//                       <div className="flex-1">
//                         <h3 className="font-semibold text-gray-900">
//                           {item.name}
//                         </h3>
//                         <p className="text-gray-600 text-sm line-clamp-2">
//                           {item.description}
//                         </p>
                        
//                         {/* Customization details */}
//                         {item.customization && (
//                           <div className="mt-1 text-xs text-gray-500">
//                             {item.customization.size && (
//                               <span className="mr-2">Size: {item.customization.size}</span>
//                             )}
//                             {item.customization.addOns && item.customization.addOns.length > 0 && (
//                               <span>
//                                 Add-ons: {item.customization.addOns.map(addon => addon.name).join(', ')}
//                               </span>
//                             )}
//                           </div>
//                         )}
//                       </div>

//                       {/* Delete Button */}
//                       <button
//                         onClick={() => {
//                           console.log('Removing item at index:', index);
//                           onRemoveItem(index);
//                         }}
//                         className="p-1 text-red-500 hover:text-red-700 ml-2"
//                         type="button"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>

//                     {/* Price and Quantity */}
//                     <div className="flex items-center justify-between">
//                       <span className="text-green-600 font-bold">
//                         {formatPrice(item.price)}
//                       </span>

//                       {/* Quantity Controls */}
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={() => handleQuantityChange(index, false)}
//                           className="w-6 h-6 border rounded-full flex items-center justify-center hover:bg-gray-50"
//                           type="button"
//                         >
//                           <Minus className="w-3 h-3" />
//                         </button>
//                         <span className="w-6 text-center">
//                           {item.quantity}
//                         </span>
//                         <button
//                           onClick={() => handleQuantityChange(index, true)}
//                           className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600"
//                           type="button"
//                         >
//                           <Plus className="w-3 h-3" />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Footer - Only show if cart has items */}
//         {cartItems.length > 0 && (
//           <div className="border-t p-4 bg-gray-50">
//             {/* Order Summary */}
//             <div className="space-y-2 mb-4 text-sm">
//               <div className="flex justify-between">
//                 <span>Subtotal</span>
//                 <span>{formatPrice(subtotal)}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Delivery Fee</span>
//                 <span>{formatPrice(deliveryFee)}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Tax</span>
//                 <span>{formatPrice(tax)}</span>
//               </div>
//               <div className="border-t pt-2">
//                 <div className="flex justify-between font-bold">
//                   <span>Total</span>
//                   <span>{formatPrice(totalAmount)}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="space-y-2">
//               <button
//                 onClick={handleProceedToCheckout}
//                 className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
//                 type="button"
//               >
//                 <CreditCard className="w-4 h-4" />
//                 Proceed to Checkout
//               </button>
              
//               <button
//                 onClick={onClearCart}
//                 className="w-full bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded-lg font-medium"
//                 type="button"
//               >
//                 Clear Orders
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };




///new version
// import React, { useEffect } from 'react';
// import { Minus, Plus, Trash2, CreditCard } from 'lucide-react';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';

// type CartItem = {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
//   quantity: number;
//   customization?: {
//     size?: string;
//     addOns?: Array<{ id: string; name: string; price: number }>;
//     totalPrice?: number;
//   };
// };

// interface CartModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   cartItems: CartItem[];
//   onUpdateQuantity: (itemId: number, quantity: number) => void;
//   onRemoveItem: (itemIndex: number) => void;
//   onClearCart: () => void;
//   onProceedToCheckout: () => void;
// }

// export const CartModal: React.FC<CartModalProps> = ({
//   isOpen,
//   onClose,
//   cartItems,
//   onUpdateQuantity,
//   onRemoveItem,
//   onClearCart,
// }) => {
//   const router = useRouter();

//   // Debug logging
//   useEffect(() => {
//     console.log('CartModal render - isOpen:', isOpen);
//     console.log('CartModal render - cartItems:', cartItems);
//     console.log('CartModal render - cartItems.length:', cartItems.length);
//   }, [isOpen, cartItems]);

//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//       document.body.style.paddingRight = '17px'; // Prevent layout shift
//     } else {
//       document.body.style.overflow = '';
//       document.body.style.paddingRight = '';
//     }

//     return () => {
//       document.body.style.overflow = '';
//       document.body.style.paddingRight = '';
//     };
//   }, [isOpen]);
  
//   // Calculate totals
//   const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
//   const deliveryFee = 5.09;
//   const tax = subtotal * 0.089; 
//   const totalAmount = subtotal + deliveryFee + tax;

//   const handleProceedToCheckout = () => {
//     console.log('Proceeding to checkout');
//     onClose();
//     router.push('/checkout');
//   };

//   const handleQuantityChange = (itemIndex: number, increment: boolean) => {
//     const item = cartItems[itemIndex];
//     if (!item) return;

//     const newQuantity = increment ? item.quantity + 1 : item.quantity - 1;
    
//     if (newQuantity <= 0) {
//       onRemoveItem(itemIndex);
//     } else {
//       onUpdateQuantity(item.id, newQuantity);
//     }
//   };

//   const formatPrice = (price: number): string => `€ ${price.toFixed(2)}`;

//   if (!isOpen) return null;

//   return (
//     <div
//       className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-end z-[99999] transition-opacity duration-300 ease-in-out"
//       onClick={(e) => {
//         if (e.target === e.currentTarget) onClose();
//       }}
//     >
//       <div
//         className="bg-white overflow-y-auto shadow-2xl rounded-lg w-full max-w-4xl h-screen overflow-hidden transform transition-all duration-300 ease-in-out flex flex-col scale-100 opacity-100"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Modal Header - Fixed at top */}
//         <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white flex-shrink-0">
//           <div className="flex gap-4 items-center">
//             <div>
//               <h2 className="text-lg font-semibold text-gray-900">Your Cart</h2>
//             </div>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-full transition cursor-pointer flex-shrink-0"
//             aria-label="Close"
//             type="button"
//           >
//             ×
//           </button>
//         </div>

//         {/* Cart Items - Scrollable Area */}
//         <div className="flex-1 p-4 md:p-6">
//           {cartItems.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-12 text-center">
//               <div className="text-6xl mb-4">🛒</div>
//               <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
//               <p className="text-gray-600">Add some delicious items from our bakery!</p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {cartItems.map((item, index) => (
//                 <div key={`${item.id}-${index}`} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
//                   {/* Product Image */}
//                   <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
//                     <Image
//                       src={item.image}
//                       alt={item.name}
//                       width={80}
//                       height={80}
//                       className="w-full h-full object-cover rounded-lg"
//                       onError={() => {
//                         console.log('Image failed to load:', item.image);
//                       }}
//                     />
//                   </div>

//                   {/* Product Details */}
//                   <div className="flex-1 min-w-0">
//                     <div className="flex justify-between items-start mb-2">
//                       <div className="flex-1">
//                         <h3 className="font-semibold text-gray-900 text-lg">
//                           {item.name}
//                         </h3>
//                         <p className="text-gray-600 text-sm mt-1 line-clamp-2">
//                           {item.description}
//                         </p>
                        
//                         {/* Show customization details */}
//                         {item.customization && (
//                           <div className="mt-2 text-xs text-gray-500">
//                             {item.customization.size && (
//                               <span className="mr-3">Size: {item.customization.size}</span>
//                             )}
//                             {item.customization.addOns && item.customization.addOns.length > 0 && (
//                               <span>
//                                 Add-ons: {item.customization.addOns.map(addon => addon.name).join(', ')}
//                               </span>
//                             )}
//                           </div>
//                         )}
//                       </div>

//                       {/* Delete Button */}
//                       <button
//                         onClick={() => {
//                           console.log('Removing item at index:', index);
//                           onRemoveItem(index);
//                         }}
//                         className="p-1 text-red-500 hover:text-red-700 transition-colors ml-2"
//                         aria-label="Remove item"
//                         type="button"
//                       >
//                         <Trash2 className="w-5 h-5" />
//                       </button>
//                     </div>

//                     {/* Price and Quantity */}
//                     <div className="flex items-center justify-between">
//                       <span className="text-green-600 font-bold text-lg">
//                         {formatPrice(item.price)}
//                       </span>

//                       {/* Quantity Controls */}
//                       <div className="flex items-center gap-3">
//                         <button
//                           onClick={() => handleQuantityChange(index, false)}
//                           className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
//                           type="button"
//                           aria-label="Decrease quantity"
//                         >
//                           <Minus className="w-4 h-4" />
//                         </button>
//                         <span className="text-lg font-medium w-8 text-center">
//                           {item.quantity}
//                         </span>
//                         <button
//                           onClick={() => handleQuantityChange(index, true)}
//                           className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
//                           type="button"
//                           aria-label="Increase quantity"
//                         >
//                           <Plus className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Cart Summary - Fixed Footer (only show if cart has items) */}
//         {cartItems.length > 0 && (
//           <div className="border-t border-gray-200 p-4 md:p-6 bg-gray-50 flex-shrink-0">
//             {/* Order Summary */}
//             <div className="space-y-3 mb-6">
//               <div className="flex justify-between text-gray-600">
//                 <span>Subtotal</span>
//                 <span>{formatPrice(subtotal)}</span>
//               </div>
//               <div className="flex justify-between text-gray-600">
//                 <span>Delivery Fee</span>
//                 <span>{formatPrice(deliveryFee)}</span>
//               </div>
//               <div className="flex justify-between text-gray-600">
//                 <span>Tax</span>
//                 <span>{formatPrice(tax)}</span>
//               </div>
//               <div className="border-t border-gray-300 pt-3">
//                 <div className="flex justify-between font-bold text-lg">
//                   <span>Total</span>
//                   <span>{formatPrice(totalAmount)}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="space-y-3">
//               <button
//                 onClick={handleProceedToCheckout}
//                 className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-lg font-medium text-lg flex items-center justify-center gap-2 transition-colors"
//                 type="button"
//               >
//                 <CreditCard className="w-5 h-5" />
//                 Proceed to Checkout
//               </button>
              
//               <button
//                 onClick={onClearCart}
//                 className="w-full bg-red-50 hover:bg-red-100 text-red-600 py-3 rounded-lg font-medium transition-colors"
//                 type="button"
//               >
//                 Clear Orders
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };


import React, { useEffect, useState } from 'react';
import { Minus, Plus, Trash2, CreditCard, X } from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { CartItem } from '@/hooks/useCart';
import { useRouter } from 'next/navigation';
import { orderService } from '@/service/orderService';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => Promise<void>;
  onRemoveItem: (productId: string) => Promise<void>;
  onClearCart: () => Promise<void>;
  onProceedToCheckout: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  // onProceedToCheckout,
}) => {
  // const [processingItemId, setProcessingItemId] = useState<string | null>(null);
  const router = useRouter();
  const [processingItemId, setProcessingItemId] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const deliveryFee = 5.09;
  const tax = subtotal * 0.089;
  const totalAmount = subtotal + deliveryFee + tax;

  const handleIncrement = async (item: CartItem) => {
    setProcessingItemId(item.id);
    const toastId = toast.loading('Updating quantity...');
    
    try {
      await onUpdateQuantity(item.id, item.quantity + 1);
      toast.success(
        `${item.name} quantity increased to ${item.quantity + 1}`,
        { id: toastId }
      );
    } catch (error) {
      console.error('Failed to update quantity:', error);
      toast.error(
        'Failed to update quantity. Please try again.',
        { id: toastId }
      );
    } finally {
      setProcessingItemId(null);
    }
  };

  const handleDecrement = async (item: CartItem) => {
    setProcessingItemId(item.id);
    const toastId = toast.loading('Updating quantity...');
    
    try {
      if (item.quantity === 1) {
        await onRemoveItem(item.id);
        toast.success(
          `${item.name} removed from cart`,
          { id: toastId }
        );
      } else {
        await onUpdateQuantity(item.id, item.quantity - 1);
        toast.success(
          `${item.name} quantity decreased to ${item.quantity - 1}`,
          { id: toastId }
        );
      }
    } catch (error) {
      console.error('Failed to update quantity:', error);
      toast.error(
        'Failed to update quantity. Please try again.',
        { id: toastId }
      );
    } finally {
      setProcessingItemId(null);
    }
  };

  const handleRemove = async (item: CartItem) => {
    setProcessingItemId(item.id);
    const toastId = toast.loading('Removing item...');
    
    try {
      await onRemoveItem(item.id);
      toast.success(
        `${item.name} removed from cart`,
        { id: toastId }
      );
    } catch (error) {
      console.error('Failed to remove item:', error);
      toast.error(
        'Failed to remove item. Please try again.',
        { id: toastId }
      );
    } finally {
      setProcessingItemId(null);
    }
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      const toastId = toast.loading('Clearing cart...');
      
      try {
        await onClearCart();
        toast.success(
          'Cart cleared successfully',
          { id: toastId }
        );
      } catch (error) {
        console.error('Failed to clear cart:', error);
        toast.error(
          'Failed to clear cart. Please try again.',
          { id: toastId }
        );
      }
    }
  };

  // const handleProceedToCheckout = () => {
  //   if (cartItems.length === 0) {
  //     toast.error('Your cart is empty');
  //     return;
  //   }
    
  //   toast.success('Proceeding to checkout...');
  //   onProceedToCheckout();
  // };
//  const handleProceedToCheckout = async () => {
//     if (cartItems.length === 0) {
//       toast.error('Your cart is empty');
//       return;
//     }

//     if (isCheckingOut) return;

//     setIsCheckingOut(true);
//     const toastId = toast.loading('Creating order...');

//     try {
//       const cartId = localStorage.getItem('cartId');
//       if (!cartId) {
//         throw new Error('Cart ID not found');
//       }

//       // Get or create customer ID (you may want to get this from your auth context)
//       let customerId = localStorage.getItem('customerId');
//       if (!customerId) {
//         // Generate a valid UUID v4
//         customerId = crypto.randomUUID();
//         localStorage.setItem('customerId', customerId);
//       }
//       if (!customerId) {
//         customerId = `customer-${Date.now()}`; // Temporary ID
//         localStorage.setItem('customerId', customerId);
//       }

//       // Create order intent
//       const orderIntent = await orderService.createOrderIntent({
//         cartId,
//         customerId,
//         storeId: 'sam-s-store'
//       });

//       // Store order details
//       localStorage.setItem('orderId', orderIntent.id);
//       localStorage.setItem('orderReference', orderIntent.reference);

//       toast.success('Order created successfully!', { id: toastId });
      
//       // Close modal and navigate to checkout
//       onClose();
//       router.push('/checkout');
//     } catch (error) {
//       console.error('Failed to create order:', error);
//       toast.error(
//         error instanceof Error ? error.message : 'Failed to proceed to checkout',
//         { id: toastId }
//       );
//     } finally {
//       setIsCheckingOut(false);
//     }
//   };


const handleProceedToCheckout = async () => {
  if (cartItems.length === 0) {
    toast.error('Your cart is empty');
    return;
  }

  if (isCheckingOut) return;

  setIsCheckingOut(true);
  const toastId = toast.loading('Creating order...');

  try {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) {
      throw new Error('Cart ID not found');
    }

    // Get or create customer ID as a proper UUID
    // const customerId = localStorage.getItem('customerId');
    // const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    // // Check if customerId exists and is invalid (e.g., legacy format)
    // if (customerId && !uuidRegex.test(customerId)) {
    //   console.warn(`Invalid customerId detected: ${customerId}. Generating new UUID.`);
    //   customerId = crypto.randomUUID(); // Replace with valid UUID
    //   localStorage.setItem('customerId', customerId); // Update storage
    // } else if (!customerId) {
    //   // No customerId exists, generate new UUID
    //   customerId = crypto.randomUUID();
    //   localStorage.setItem('customerId', customerId);
    // }

    // console.log('Using customerId:', customerId); // Optional: for debugging

    // Create order intent
    const orderIntent = await orderService.createOrderIntent({
      cartId,
      // customerId,
      storeId: 'sam-s-store' 
    });

    localStorage.setItem('orderId', orderIntent.id);
    localStorage.setItem('orderReference', orderIntent.reference);

    toast.success('Order created successfully!', { id: toastId });
    
    onClose();
    router.push('/checkout');
  } catch (error) {
    console.error('Failed to create order:', error);
    toast.error(
      error instanceof Error ? error.message : 'Failed to proceed to checkout',
      { id: toastId }
    );
  } finally {
    setIsCheckingOut(false);
  }
};
  const formatPrice = (price: number): string => `€${price.toFixed(2)}`;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-end z-[99999]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="bg-white w-full max-w-2xl h-screen overflow-y-auto flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">Your Cart ({cartItems.length})</h2>
          <button
            onClick={onClose}
            className="text-3xl hover:text-gray-600 transition"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 h-full p-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-600">Add some delicious items!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.itemId} className="flex gap-4 p-4 border rounded-lg">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1 pr-2">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        {item.description && (
                          <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                        )}
                      </div>

                      <button
                        onClick={() => handleRemove(item)}
                        disabled={processingItemId === item.id}
                        className="p-1 text-red-500 hover:text-red-700 disabled:opacity-50 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-green-600 font-bold text-lg">
                        {formatPrice(item.price)}
                      </span>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleDecrement(item)}
                          disabled={processingItemId === item.id}
                          className="w-8 h-8 border rounded-full flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-lg font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleIncrement(item)}
                          disabled={processingItemId === item.id}
                          className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-gray-50">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span>{formatPrice(deliveryFee)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(totalAmount)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleProceedToCheckout}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-lg font-medium text-lg flex items-center justify-center gap-2 mb-3 transition-colors"
            >
              <CreditCard className="w-5 h-5" />
              Proceed to Checkout
            </button>

            <button
              onClick={handleClearCart}
              className="w-full bg-red-50 hover:bg-red-100 text-red-600 py-3 rounded-lg font-medium transition-colors"
            >
              Clear Orders
            </button>
          </div>
        )}
      </div>
    </div>
  );
};