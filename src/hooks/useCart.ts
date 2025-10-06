




// "use client";
// import { useState, useEffect } from 'react';

// export interface CartItem {
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
// }

// interface ProductData {
//   name: string;
//   description: string;
//   image: string;
// }

// // Default product data with proper typing
// const defaultProducts: Record<number, ProductData> = {
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
// const notifyListeners = (): void => {
//   cartListeners.forEach(listener => listener([...globalCartItems]));
// };

// export const useCart = () => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([...globalCartItems]);

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

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const addToCart = (productId: number, customization?: any): void => {
//     console.log('Adding to cart:', { productId, customization });
    
//     const productData = defaultProducts[productId];
    
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

//   const updateQuantity = (itemId: number, quantity: number): void => {
//     // Find and update by index since we might have duplicate product IDs with different customizations
//     let updated = false;
//     globalCartItems = globalCartItems.map(item => {
//       if (item.id === itemId && !updated) {
//         updated = true;
//         return { ...item, quantity };
//       }
//       return item;
//     });
//     notifyListeners();
//   };

//   const removeFromCart = (itemIndex: number): void => {
//     if (itemIndex >= 0 && itemIndex < globalCartItems.length) {
//       globalCartItems = globalCartItems.filter((_, index) => index !== itemIndex);
//       notifyListeners();
//     }
//   };

//   const clearCart = (): void => {
//     globalCartItems = [];
//     notifyListeners();
//   };

//   const getCartCount = (): number => {
//     return cartItems.reduce((total, item) => total + item.quantity, 0);
//   };

//   const getCartTotal = (): number => {
//     return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
//   };

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


//updated version
// "use client";
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { CartItem, AddToCartRequest, RemoveFromCartRequest, ApiCartResponse } from '@/types/product';

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://jellyfish-app-dvaxa.ondigitalocean.app';
// const STORE_CODE = 'sam-s-store';

// let globalCartItems: CartItem[] = [];
// let cartListeners: Array<(items: CartItem[]) => void> = [];

// const notifyListeners = (): void => {
//   cartListeners.forEach(listener => listener([...globalCartItems]));
// };

// const getCartId = (): string | null => {
//   return localStorage.getItem('cartId');
// };

// const setCartId = (cartId: string): void => {
//   localStorage.setItem('cartId', cartId);
// };

// const transformApiCartToItems = (apiCart: ApiCartResponse): CartItem[] => {
//   console.log('transformApiCartToItems - API response:', JSON.stringify(apiCart, null, 2));

//   return apiCart.items.map(item => {
//     const basePrice = parseFloat(item.unitPrice || '0');
//     const modifierTotal = item.modifiers.reduce((sum, m) => sum + parseFloat(m.unitAmount || '0'), 0);
//     const totalPerUnit = basePrice + modifierTotal;

//     const hasValidModifiers = item.modifiers.some(m => m.modifier && m.modifier.modifierType);
//     let customization;
//     if (hasValidModifiers) {
//       const sizeMod = item.modifiers.find(m => m.modifier?.modifierType === 'VARIANCE');
//       const addOnMods = item.modifiers.filter(m => m.modifier?.modifierType === 'ADD_ON');
//       customization = {
//         size: sizeMod?.modifierOptionName,
//         addOns: addOnMods.map(m => ({
//           id: m.modifierOptionId,
//           name: m.modifierOptionName,
//           price: parseFloat(m.unitAmount || '0')
//         })),
//         totalPrice: totalPerUnit
//       };
//     }

//     return {
//       id: item.productId,
//       itemId: item.id,
//       name: item.product?.name || 'Unknown Product',
//       description: item.product?.description || 'No description available',
//       price: totalPerUnit,
//       image: item.product?.logoUrl || '/images/bakery/Product.jpg',
//       quantity: item.quantity,
//       customization: customization && Object.keys(customization).some(k => (customization as any)[k]) ? customization : undefined
//     };
//   });
// };

// const fetchCart = async (cartId: string): Promise<void> => {
//   try {
//     const response = await axios.get<ApiCartResponse>(`${API_BASE_URL}/${STORE_CODE}/cart/${cartId}`);
//     globalCartItems = transformApiCartToItems(response.data);
//     notifyListeners();
//   } catch (error) {
//     console.error('Failed to fetch cart:', error);
//     // Only clear cart if it's a 404 (cart not found)
//     if (axios.isAxiosError(error) && error.response?.status === 404) {
//       localStorage.removeItem('cartId');
//       globalCartItems = [];
//       notifyListeners();
//     }
//   }
// };

// export const useCart = () => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([...globalCartItems]);

//   useEffect(() => {
//     const listener = (items: CartItem[]) => {
//       setCartItems([...items]);
//     };
//     cartListeners.push(listener);

//     const cartId = getCartId();
//     if (cartId) {
//       fetchCart(cartId);
//     }

//     return () => {
//       cartListeners = cartListeners.filter(l => l !== listener);
//     };
//   }, []);

//   const addToCart = async (productId: string, quantity: number = 1, modifiers: AddToCartRequest['modifiers'] = []): Promise<void> => {
//     try {
//       const cartId = getCartId();
//       const requestBody: AddToCartRequest = {
//         ...(cartId && { cartId }),
//         productId,
//         quantity,
//         modifiers
//       };

//       console.log('addToCart request body:', JSON.stringify(requestBody, null, 2));
//       const response = await axios.post<ApiCartResponse>(`${API_BASE_URL}/${STORE_CODE}/cart/add`, requestBody);

//       const newCartId = response.data.id;
//       if (!cartId) {
//         setCartId(newCartId);
//       }

//       await fetchCart(newCartId);
//       console.log('Added to cart successfully:', response.data);
//     } catch (error) {
//       console.error('Failed to add to cart:', error);
//       if (axios.isAxiosError(error)) {
//         throw new Error(error.response?.data?.message || 'Failed to add to cart');
//       }
//       throw new Error('An unexpected error occurred');
//     }
//   };

//   const updateQuantity = async (productId: string, newQuantity: number): Promise<void> => {
//     const cartId = getCartId();
//     if (!cartId) return;

//     const currentItem = globalCartItems.find(item => item.id === productId);
//     if (!currentItem) return;

//     const quantityToRemove = currentItem.quantity - newQuantity;
//     if (quantityToRemove <= 0) return;

//     try {
//       const requestBody: RemoveFromCartRequest = {
//         cartId,
//         productId,
//         quantity: quantityToRemove
//       };

//       console.log('updateQuantity request body:', JSON.stringify(requestBody, null, 2));
//       await axios.post(`${API_BASE_URL}/${STORE_CODE}/cart/remove`, requestBody);
//       await fetchCart(cartId);
//     } catch (error) {
//       console.error('Failed to update quantity:', error);
//     }
//   };

//   const removeFromCart = async (productId: string): Promise<void> => {
//     const cartId = getCartId();
//     if (!cartId) return;

//     const currentItem = globalCartItems.find(item => item.id === productId);
//     if (!currentItem) return;

//     try {
//       const requestBody: RemoveFromCartRequest = {
//         cartId,
//         productId,
//         quantity: currentItem.quantity
//       };

//       console.log('removeFromCart request body:', JSON.stringify(requestBody, null, 2));
//       await axios.post(`${API_BASE_URL}/${STORE_CODE}/cart/remove`, requestBody);
//       await fetchCart(cartId);
//     } catch (error) {
//       console.error('Failed to remove from cart:', error);
//     }
//   };

//   const clearCart = async (): Promise<void> => {
//     const cartId = getCartId();
//     if (!cartId) return;

//     try {
//       await axios.post(`${API_BASE_URL}/${STORE_CODE}/cart/${cartId}/clear`);
//       localStorage.removeItem('cartId');
//       globalCartItems = [];
//       notifyListeners();
//     } catch (error) {
//       console.error('Failed to clear cart:', error);
//     }
//   };

//   const getCartCount = (): number => {
//     return cartItems.reduce((total, item) => total + item.quantity, 0);
//   };

//   const getCartTotal = async (): Promise<number> => {
//     const cartId = getCartId();
//     if (!cartId) return 0;

//     try {
//       const response = await axios.get(`${API_BASE_URL}/${STORE_CODE}/cart/${cartId}/total`);
//       return parseFloat(response.data);
//     } catch (error) {
//       console.error('Failed to get cart total:', error);
//       return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
//     }
//   };

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
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
// import { orderService } from '@/service/orderService';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://jellyfish-app-dvaxa.ondigitalocean.app';
const STORE_CODE = 'sam-s-store';

interface ApiCartItem {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modifiers: any[];
}

interface ApiCartResponse {
  id: string;
  reference: string;
  status: string;
  items: ApiCartItem[];
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  itemId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}

// Global state
let globalCartItems: CartItem[] = [];
let cartListeners: Array<(items: CartItem[]) => void> = [];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const productCache = new Map<string, any>();

const notifyListeners = () => {
  cartListeners.forEach(listener => listener([...globalCartItems]));
};

const getCartId = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('cartId');
};

const setCartId = (cartId: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('cartId', cartId);
};

// Fetch single product details
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetchProductDetails = async (productId: string): Promise<any> => {
  if (productCache.has(productId)) {
    return productCache.get(productId);
  }

  try {
    const response = await axios.get(
      `${API_BASE_URL}/${STORE_CODE}/products/${productId}`
    );
    
    // API returns { status, message, data: { product details } }
    const product = response.data.data;
    productCache.set(productId, product);
    return product;
  } catch (error) {
    console.error('Failed to fetch product details:', productId, error);
    return null;
  }
};

// Transform cart items and fetch product details
const transformAndEnrichCartItems = async (apiCart: ApiCartResponse): Promise<CartItem[]> => {
  if (!apiCart?.items || apiCart.items.length === 0) return [];

  // Fetch all product details in parallel
  const productPromises = apiCart.items.map(item => fetchProductDetails(item.productId));
  const products = await Promise.all(productPromises);

  // Transform with product details
  return apiCart.items.map((item, index) => {
    const product = products[index];
    const price = parseFloat(item.unitPrice || '0');

    return {
      id: item.productId,
      itemId: item.id,
      name: product?.name || 'Unknown Product',
      description: product?.description || '',
      price: price,
      image: product?.logoUrl || '/images/bakery/Product.jpg',
      quantity: item.quantity
    };
  });
};

const fetchCart = async (cartId: string): Promise<void> => {
  try {
    const response = await axios.get<ApiCartResponse>(
      `${API_BASE_URL}/${STORE_CODE}/cart/${cartId}`
    );
    
    globalCartItems = await transformAndEnrichCartItems(response.data);
    notifyListeners();
  } catch (error) {
    console.error('Failed to fetch cart:', error);
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      localStorage.removeItem('cartId');
      globalCartItems = [];
      notifyListeners();
    }
  }
};

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([...globalCartItems]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const listener = (items: CartItem[]) => {
      setCartItems([...items]);
    };
    cartListeners.push(listener);

    const cartId = getCartId();
    if (cartId) {
      fetchCart(cartId);
    }

    return () => {
      cartListeners = cartListeners.filter(l => l !== listener);
    };
  }, []);

  const addToCart = async (productId: string, quantity: number = 1): Promise<void> => {
    try {
      setLoading(true);
      const cartId = getCartId();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const requestBody: any = {
        productId,
        quantity,
        modifiers: []
      };

      if (cartId) {
        requestBody.cartId = cartId;
      }

      const response = await axios.post<ApiCartResponse>(
        `${API_BASE_URL}/${STORE_CODE}/cart/add`,
        requestBody
      );

      const newCartId = response.data.id;
      if (!cartId) {
        setCartId(newCartId);
      }

      await fetchCart(newCartId);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || error.message;
        alert(`Failed to add to cart: ${errorMessage}`);
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };
const updateQuantity = async (productId: string, newQuantity: number): Promise<void> => {
  const cartId = getCartId();
  if (!cartId) {
    console.error('No cart ID found');
    return;
  }

  const currentItem = globalCartItems.find(item => item.id === productId);
  if (!currentItem) {
    console.error('Item not found in cart:', productId);
    return;
  }

  console.log('Updating quantity:', { productId, currentQuantity: currentItem.quantity, newQuantity });

  try {
    setLoading(true);

    if (newQuantity > currentItem.quantity) {
      // INCREASE: Use addToCart endpoint (same as adding new items)
      console.log('new quantity', newQuantity);
      const quantityToAdd = newQuantity;
      console.log('current quantity:', currentItem.quantity);
      console.log('Adding quantity:', quantityToAdd);
      
      // Call the same addToCart function
      await addToCart(productId, quantityToAdd);
      
    } else if (newQuantity < currentItem.quantity) {
      // DECREASE: Use remove endpoint
      const quantityToRemove = currentItem.quantity - newQuantity;
      console.log('Removing quantity:', quantityToRemove);
      
      const removeBody = {
        cartId,
        productId,
        quantity: quantityToRemove
      };

      await axios({
        method: 'delete',
        url: `${API_BASE_URL}/${STORE_CODE}/cart/remove`,
        data: removeBody,
        headers: { 'Content-Type': 'application/json' }
      });
      
      await fetchCart(cartId);
    }
  } catch (error) {
    console.error('Failed to update quantity:', error);
    if (axios.isAxiosError(error)) {
      alert(`Failed to update quantity: ${error.response?.data?.message || error.message}`);
    }
  } finally {
    setLoading(false);
  }
};


  // const updateQuantity = async (productId: string, newQuantity: number): Promise<void> => {
  //   const cartId = getCartId();
  //   if (!cartId) {
  //     console.error('No cart ID found');
  //     return;
  //   }

  //   const currentItem = globalCartItems.find(item => item.id === productId);
  //   if (!currentItem) {
  //     console.error('Item not found in cart:', productId);
  //     return;
  //   }

  //   console.log('Updating quantity:', { productId, currentQuantity: currentItem.quantity, newQuantity });

  //   try {
  //     setLoading(true);

  //     if (newQuantity > currentItem.quantity) {
  //       // Add more items
  //       const quantityToAdd = newQuantity - currentItem.quantity;
  //       console.log('Adding quantity:', quantityToAdd);
  //       await addToCart(productId, quantityToAdd);
  //     } else if (newQuantity < currentItem.quantity) {
  //       // Remove items
  //       const quantityToRemove = currentItem.quantity - newQuantity;
  //       console.log('Removing quantity:', quantityToRemove);
        
  //       const removeBody = {
  //         cartId,
  //         productId,
  //         quantity: quantityToRemove
  //       };

  //       console.log('Remove request:', removeBody);

  //       await axios({
  //       method: 'delete',
  //       url: `${API_BASE_URL}/${STORE_CODE}/cart/remove`,
  //       data: removeBody,
  //       headers: { 'Content-Type': 'application/json' }
  //     });
        
  //       await fetchCart(cartId);
  //     }
  //   } catch (error) {
  //     console.error('Failed to update quantity:', error);
  //     if (axios.isAxiosError(error)) {
  //       alert(`Failed to update quantity: ${error.response?.data?.message || error.message}`);
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const getCartTotalSync = (): number => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

// const proceedToCheckout = async (customerId: string, storeId: string = 'sam-s-store') => {
//   const cartId = getCartId();
//   if (!cartId) {
//     throw new Error('No cart found');
//   }

//   try {
//     setLoading(true);
    
//     // Create order intent
//     const orderIntent = await orderService.createOrderIntent({
//       cartId,
//       customerId,
//       storeId
//     });

//     // Store order ID in localStorage
//     localStorage.setItem('orderId', orderIntent.id);
//     localStorage.setItem('orderReference', orderIntent.reference);

//     return orderIntent;
//   } catch (error) {
//     console.error('Failed to create order intent:', error);
//     throw error;
//   } finally {
//     setLoading(false);
//   }
// };
  const removeFromCart = async (productId: string): Promise<void> => {
    const cartId = getCartId();
    if (!cartId) {
      console.error('No cart ID found');
      return;
    }

    const currentItem = globalCartItems.find(item => item.id === productId);
    if (!currentItem) {
      console.error('Item not found:', productId);
      return;
    }

    console.log('Removing item completely:', { productId, quantity: currentItem.quantity });

    try {
      setLoading(true);
      
      const removeBody = {
        cartId,
        productId,
        quantity: currentItem.quantity
      };

      console.log('Remove request:', removeBody);

      
      await axios({
        method: 'delete',
        url: `${API_BASE_URL}/${STORE_CODE}/cart/remove`,
        data: removeBody,
        headers: { 'Content-Type': 'application/json' }
      });
      
      await fetchCart(cartId);
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      if (axios.isAxiosError(error)) {
        alert(`Failed to remove item: ${error.response?.data?.message || error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async (): Promise<void> => {
    const cartId = getCartId();
    if (!cartId) return;

    try {
      setLoading(true);
      await axios.delete(`${API_BASE_URL}/${STORE_CODE}/cart/${cartId}/clear`);
      localStorage.removeItem('cartId');
      globalCartItems = [];
      notifyListeners();
    } catch (error) {
      console.error('Failed to clear cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCartCount = (): number => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = useCallback(async (): Promise<number> => {
    const cartId = getCartId();
    if (!cartId) return 0;

    try {
      const response = await axios.get(`${API_BASE_URL}/${STORE_CODE}/cart/${cartId}/total`);
      return parseFloat(response.data.total || response.data || '0');
    } catch (error) {
      console.error('Failed to get cart total:', error);
      return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
  }, [cartItems]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cacheProductData = useCallback((products: any[]) => {
    products.forEach(product => {
      productCache.set(product.id, {
        name: product.name,
        description: product.description,
        logoUrl: product.image,
        price: product.price
      });
    });
  }, []);

  return {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartCount,
    getCartTotal,
    getCartTotalSync,
    // proceedToCheckout,
    loading,
    cacheProductData
  };
};