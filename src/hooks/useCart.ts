// "use client";
// import { useState } from 'react';

// export const useCart = () => {
//   const [cart, setCart] = useState<number[]>([]);

//   const addToCart = (productId:number) => {
//     setCart(prev => [...prev, productId]);
//     // You can add more logic here like showing toast notification
//     console.log(`Added product ${productId} to cart`);
//   };

//   const removeFromCart = (productId:number) => {
//     setCart(prev => prev.filter(id => id !== productId));
//   };

//   const getCartCount = () => cart.length;

//   return {
//     cart,
//     addToCart,
//     removeFromCart,
//     getCartCount,
//   };
// };


//advanced
// "use client";
// import { useState } from 'react';

// export type CartItem = {
//   id: string | number;
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

// export const useCart = () => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const addToCart = (productId: string | number, customization?: any) => {
//     // You'll need to get the full product details here
//     // This could come from a products context or be passed as parameters
    
//     setCartItems(prev => {
//       const existingItemIndex = prev.findIndex(item => 
//         item.id === productId && 
//         JSON.stringify(item.customization) === JSON.stringify(customization)
//       );

//       if (existingItemIndex > -1) {
//         // If item with same customization exists, increment quantity
//         const updated = [...prev];
//         updated[existingItemIndex].quantity += 1;
//         return updated;
//       } else {
//         // Add new item to cart
//         const newItem: CartItem = {
//           id: productId,
//           name: `Product ${productId}`, // You'll need to get this from your product data
//           description: "Fresh romaine lettuce with grilled chicken, parmesan cheese, and caesar dressing", // Default description
//           price: customization?.totalPrice || 18.98, // Use customized price or default
//           image: "/api/placeholder/80/80", // You'll need to get this from your product data
//           quantity: 1,
//           customization
//         };
//         return [...prev, newItem];
//       }
//     });

//     console.log(`Added product ${productId} to cart with customization:`, customization);
//   };

//   const updateQuantity = (itemId: string | number, quantity: number) => {
//     setCartItems(prev => 
//       prev.map(item => 
//         item.id === itemId ? { ...item, quantity } : item
//       )
//     );
//   };

//   const removeFromCart = (itemId: string | number) => {
//     setCartItems(prev => prev.filter(item => item.id !== itemId));
//   };

//   const clearCart = () => {
//     setCartItems([]);
//   };

//   const getCartCount = () => cartItems.reduce((total, item) => total + item.quantity, 0);

//   const getCartTotal = () => cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

//   return {
//     cartItems,
//     addToCart,
//     updateQuantity,
//     removeFromCart,
//     clearCart,
//     getCartCount,
//     getCartTotal,
//   };
// };


//working version

// src/hooks/useCart.ts
// "use client";
// import { useState, useEffect } from 'react';

// export type CartItem = {
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

// // Default product data
// const defaultProducts = {
//   1: {
//     name: "Cupcakes",
//     description: "Delicious cupcakes filled with the best icing flavor, and waffles, here to satisfy your deep cravings",
//     image: "/images/bakery/Product.jpg"
//   },
//   2: {
//     name: "Cookies",
//     description: "Fresh chocolate cookies with premium chocolate chips, baked to perfection",
//     image: "/images/bakery/Product2.jpg"
//   },
//   3: {
//     name: "English Breakfast",
//     description: "Juicy beef patty with lettuce, tomato, cheese, and our special sauce",
//     image: "/images/bakery/Product3.jpg"
//   },
//   4: {
//     name: "Croissants",
//     description: "Buttery, flaky croissants baked fresh daily with premium butter",
//     image: "/images/bakery/Product2.jpg"
//   },
//   5: {
//     name: "Donuts",
//     description: "Glazed donuts made fresh every morning with our signature glaze",
//     image: "/images/bakery/Product1.jpg"
//   }
// };

// // Global cart state (simple solution)
// let globalCartItems: CartItem[] = [];
// let cartListeners: Array<(items: CartItem[]) => void> = [];

// // Function to notify all listeners
// const notifyListeners = () => {
//   cartListeners.forEach(listener => listener(globalCartItems));
// };

// export const useCart = () => {
//   const [cartItems, setCartItems] = useState<CartItem[]>(globalCartItems);

//   useEffect(() => {
//     // Subscribe to global cart changes
//     const listener = (items: CartItem[]) => {
//       setCartItems([...items]);
//     };
//     cartListeners.push(listener);

//     // Cleanup subscription
//     return () => {
//       cartListeners = cartListeners.filter(l => l !== listener);
//     };
//   }, []);

//   const addToCart = (productId: number, customization?: any) => {
//     console.log('Adding to cart:', { productId, customization });
    
//     const productData = defaultProducts[productId as keyof typeof defaultProducts];
    
//     if (!productData) {
//       console.error('Product not found:', productId);
//       return;
//     }

//     const newItem: CartItem = {
//       id: productId,
//       name: productData.name,
//       description: productData.description,
//       price: customization?.totalPrice || 18.98,
//       image: productData.image,
//       quantity: customization?.quantity || 1,
//       customization: customization ? {
//         size: customization.size,
//         addOns: customization.addOns,
//         totalPrice: customization.totalPrice
//       } : undefined
//     };
    
//     globalCartItems = [...globalCartItems, newItem];
//     console.log('Global cart updated:', globalCartItems);
//     notifyListeners();
//   };

//   const updateQuantity = (itemId: number, quantity: number) => {
//     globalCartItems = globalCartItems.map(item => 
//       item.id === itemId ? { ...item, quantity } : item
//     );
//     notifyListeners();
//   };

//   const removeFromCart = (itemIndex: number) => {
//     globalCartItems = globalCartItems.filter((_, index) => index !== itemIndex);
//     notifyListeners();
//   };

//   const clearCart = () => {
//     globalCartItems = [];
//     notifyListeners();
//   };

//   const getCartCount = () => cartItems.reduce((total, item) => total + item.quantity, 0);

//   const getCartTotal = () => cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

//   return {
//     cartItems,
//     addToCart,
//     updateQuantity,
//     removeFromCart,
//     clearCart,
//     getCartCount,
//     getCartTotal,
//   };
// };




"use client";
import { useState, useEffect } from 'react';

export interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  customization?: {
    size?: string;
    addOns?: Array<{ id: string; name: string; price: number }>;
    totalPrice?: number;
  };
}

interface ProductData {
  name: string;
  description: string;
  image: string;
}

// Default product data with proper typing
const defaultProducts: Record<number, ProductData> = {
  1: {
    name: "Cupcakes",
    description: "Delicious cupcakes filled with the best icing flavor, and waffles, here to satisfy your deep cravings",
    image: "/images/bakery/Product.jpg"
  },
  2: {
    name: "Cookies",
    description: "Fresh chocolate cookies with premium chocolate chips, baked to perfection",
    image: "/images/bakery/Product2.jpg"
  },
  3: {
    name: "English Breakfast",
    description: "Juicy beef patty with lettuce, tomato, cheese, and our special sauce",
    image: "/images/bakery/Product3.jpg"
  },
  4: {
    name: "Croissants",
    description: "Buttery, flaky croissants baked fresh daily with premium butter",
    image: "/images/bakery/Product2.jpg"
  },
  5: {
    name: "Donuts",
    description: "Glazed donuts made fresh every morning with our signature glaze",
    image: "/images/bakery/Product1.jpg"
  }
};

// Global cart state (simple solution)
let globalCartItems: CartItem[] = [];
let cartListeners: Array<(items: CartItem[]) => void> = [];

// Function to notify all listeners
const notifyListeners = (): void => {
  cartListeners.forEach(listener => listener([...globalCartItems]));
};

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([...globalCartItems]);

  useEffect(() => {
    // Subscribe to global cart changes
    const listener = (items: CartItem[]) => {
      setCartItems([...items]);
    };
    cartListeners.push(listener);

    // Cleanup subscription
    return () => {
      cartListeners = cartListeners.filter(l => l !== listener);
    };
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addToCart = (productId: number, customization?: any): void => {
    console.log('Adding to cart:', { productId, customization });
    
    const productData = defaultProducts[productId];
    
    if (!productData) {
      console.error('Product not found:', productId);
      return;
    }

    const newItem: CartItem = {
      id: productId,
      name: productData.name,
      description: productData.description,
      price: customization?.totalPrice || 18.98,
      image: productData.image,
      quantity: customization?.quantity || 1,
      customization: customization ? {
        size: customization.size,
        addOns: customization.addOns,
        totalPrice: customization.totalPrice
      } : undefined
    };
    
    globalCartItems = [...globalCartItems, newItem];
    console.log('Global cart updated:', globalCartItems);
    notifyListeners();
  };

  const updateQuantity = (itemId: number, quantity: number): void => {
    // Find and update by index since we might have duplicate product IDs with different customizations
    let updated = false;
    globalCartItems = globalCartItems.map(item => {
      if (item.id === itemId && !updated) {
        updated = true;
        return { ...item, quantity };
      }
      return item;
    });
    notifyListeners();
  };

  const removeFromCart = (itemIndex: number): void => {
    if (itemIndex >= 0 && itemIndex < globalCartItems.length) {
      globalCartItems = globalCartItems.filter((_, index) => index !== itemIndex);
      notifyListeners();
    }
  };

  const clearCart = (): void => {
    globalCartItems = [];
    notifyListeners();
  };

  const getCartCount = (): number => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = (): number => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartCount,
    getCartTotal,
  };
};