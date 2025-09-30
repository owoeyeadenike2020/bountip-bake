// src/components/ClientLayoutWrapper.tsx
'use client';

import React from 'react';
import Header from "@/components/LandingPage/header";
// import { useCart } from "@/hooks/useCart";

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
}

export default function ClientLayoutWrapper({ children }: ClientLayoutWrapperProps) {
  // const cartHook = useCart();

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        // cartCount={cartHook.getCartCount()}
        // cartItems={cartHook.cartItems}
        // onUpdateQuantity={cartHook.updateQuantity}
        // onRemoveItem={cartHook.removeFromCart}
        // onClearCart={cartHook.clearCart}
        // onAddToCart={cartHook.addToCart}
      />
      <main className="flex-1 bg-gray-100 py-4">{children}</main>
    </div>
  );
}