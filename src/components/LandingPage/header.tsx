

'use client';
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { MdOutlineShoppingCart } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { CartModal } from './Cart/CartModal';
import { useRouter } from 'next/navigation';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState<boolean>(false);
  const router = useRouter();
  
  // Get cart data from your cart hook
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    getCartCount 
  } = useCart();

  const cartCount = getCartCount();

  const handleCartClick = () => {
    console.log('Cart button clicked. Cart count:', cartCount);
    console.log('Current cart items:', cartItems);
    setIsCartModalOpen(true);
  };
  const handleUserClick = () => {
  router.push('/profile');
};


  const handleProceedToCheckout = () => {
    console.log('Proceeding to checkout with items:', cartItems);
    setIsCartModalOpen(false);
    // Add your checkout logic here
    alert('Proceeding to checkout! (This would navigate to checkout page)');
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Header */}
          <div className="hidden md:flex items-center justify-between h-20">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-4">
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src="/images/bakery/bakery-logo.jpg"
                  alt="Bob's Bakery Logo"
                  width={48}
                  height={48}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome to Bob&apos;s Bakery
              </h1>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search ....."
                  className="block w-full pr-12 pl-4 py-3 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:bg-white text-base"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              {/* Cart Button with Count */}
              <button 
                onClick={handleCartClick}
                className="relative p-3 text-white bg-green-500 rounded-full hover:bg-green-600 transition-colors shadow-lg"
                type="button"
                aria-label={`Shopping cart with ${cartCount} items`}
                title="View cart"
              >
                <MdOutlineShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </button>
              
              <button 
                onClick={handleUserClick}
                className="p-3 text-white bg-green-500 rounded-full hover:bg-green-600 transition-colors shadow-lg"
                type="button"
                aria-label="User account"
                title="View profile"
              >
                <CiUser className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image
                  src="/images/bakery/bakery-logo.jpg"
                  alt="Bob's Bakery Logo"
                  width={40}
                  height={40}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2.5 text-green-500 bg-green-50 rounded-full hover:bg-green-100 transition-colors"
                type="button"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
              
              {/* Mobile Cart Button with Count */}
              <button 
                onClick={handleCartClick}
                className="relative p-2.5 text-white bg-green-500 rounded-full hover:bg-green-600 transition-colors"
                type="button"
                title="View cart"
                aria-label={`Shopping cart with ${cartCount} items`}
              >
                <MdOutlineShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium text-[10px]">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </button>
              
              <button 
              onClick={handleUserClick}
                className="p-2.5 text-white bg-green-500 rounded-full hover:bg-green-600 transition-colors"
                type="button"
                aria-label="User account"
                title="View profile"
              >
                <CiUser className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Mobile Search Bar (when search is tapped) */}
          {isMobileMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="relative">
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search ....."
                  className="block w-full pr-12 pl-4 py-3 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:bg-white text-base"
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Cart Modal */}
      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        onProceedToCheckout={handleProceedToCheckout}
      />
    </>
  );
};

export default Header;