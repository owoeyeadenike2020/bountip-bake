'use client';
import React,{useState} from 'react';
import { Search, ChevronRight, ArrowUpDown } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useProfile } from '@/hooks/useProfile';
import { FaRegUser } from "react-icons/fa";
import { PiClockCounterClockwiseBold } from "react-icons/pi";
import { TbLogout } from "react-icons/tb";
import { useCart } from '@/hooks';
import { CartModal } from '../Cart/CartModal';

export default function ProfilePage() {
  const router = useRouter();
   const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const { 
    orders, 
    searchQuery, 
    orderFilter, 
    setSearchQuery, 
    setOrderFilter,
    reorder 
  } = useProfile();
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
  } = useCart();


  const formatPrice = (price: number) => `€ ${price.toFixed(2)}`;

  const handleLogout = () => {
    console.log('Logging out...');
    router.push('/');
  };

  const handleReorder = (orderId: string) => {
    reorder(orderId);
    setIsCartModalOpen(true);
  };

  const handleOrderClick = (orderId: string) => {
    router.push(`/orderTracking?id=${orderId}`);
  };
  const handleProceedToCheckout = () => {
    console.log('Proceeding to checkout with items:', cartItems);
    setIsCartModalOpen(false);
    router.push('/checkout');
  };

  return (
    <div>
    <div className="min-h-screen bg-gray-50">
      {/* Mobile View */}
      <div className="lg:hidden">
        <div className="p-4 space-y-6">
          <h1 className="text-2xl font-bold">My Profile</h1>

          {/* Profile Menu Items */}
          <div className="space-y-3">
            <button 
              onClick={() => router.push('/profile/account')}
              className="w-full bg-white rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <FaRegUser  className="w-5 h-5 text-gray-600" />
                <span className="font-medium">Account Details</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button 
              onClick={() => router.push('/profile/orders')}
              className="w-full bg-white rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <PiClockCounterClockwiseBold  className="w-5 h-5 text-gray-600" />
                <span className="font-medium">Order History</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button 
              onClick={handleLogout}
              className="w-full bg-white rounded-lg p-4 flex items-center justify-between hover:bg-red-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <TbLogout className="w-5 h-5 text-red-500" />
                <span className="font-medium text-red-500">Log Out</span>
              </div>
              <ChevronRight className="w-5 h-5 text-red-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden  lg:block">
        <div className="max-w-7xl mx-auto p-8">
          <h1 className="text-3xl font-bold mb-8">My Profile</h1>

          <div className="grid grid-cols-3 gap-8">
            {/* Left Sidebar */}
            <div className="space-y-6 bg-white border border-gray-200  rounded-lg p-2">
              {/* Account Details */}
              <div className="rounded-lg p-6">
                <button 
                  onClick={() => router.push('/profile')}
                  className="flex items-center gap-3 w-full hover:text-green-600 transition-colors"
                >
                  <FaRegUser  className="w-5 h-5" />
                  <span className="font-medium">Account Details</span>
                </button>
              </div>

              {/* Order History - Active */}
              <div className="bg-green-50 rounded-lg p-6 border-2 border-green-500">
                <button 
                  className="flex items-center gap-3 w-full text-green-600"
                >
                  <PiClockCounterClockwiseBold  className="w-5 h-5" />
                  <span className="font-medium">Order History</span>
                </button>
              </div>

              {/* Log Out */}
              <button 
                onClick={handleLogout}
                className="bg-white rounded-lg p-6 w-full flex items-center gap-3 hover:bg-red-50 transition-colors text-red-500"
              >
                <TbLogout className="w-5 h-5" />
                <span className="font-medium">Log Out</span>
              </button>
            </div>

            {/* Right Content Area */}
            <div className="col-span-2 space-y-6">
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6">My Orders</h2>

                {/* Search and Sort Bar */}
                <div className="flex justify-between gap-4 mb-6">
                  <div className="w-1/2 flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search ....."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <button className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50">
                    <ArrowUpDown className="w-4 h-4" />
                    <span>Sort by</span>
                  </button>
                </div>

                {/* Order Status Tabs */}
                <div className="flex border-b border-gray-200 mb-6">
                  <button
                    onClick={() => setOrderFilter('ongoing')}
                    className={`px-4 py-3 font-medium transition-colors ${
                      orderFilter === 'ongoing'
                        ? 'text-green-600 border-b-2 border-green-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    ONGOING / DELIVERED 
                  </button>
                  <button
                    onClick={() => setOrderFilter('closed')}
                    className={`px-4 py-3 font-medium transition-colors ${
                      orderFilter === 'closed'
                        ? 'text-green-600 border-b-2 border-green-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    CLOSED ORDERS
                  </button>
                </div>

                {/* Orders List */}
                <div className="space-y-4">
                  {orders.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-gray-500">No orders found</p>
                    </div>
                  ) : (
                    orders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex gap-4"
                        onClick={() => handleOrderClick(order.id)}>
                          <div className="w-20 h-20 flex-shrink-0">
                            <Image
                              src={order.productImage}
                              alt={order.productName}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold text-lg">{order.productName}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-gray-600 text-sm">{order.orderNumber}</span>
                                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                                    order.status === 'ongoing' 
                                      ? 'bg-orange-100 text-orange-600'
                                      : order.status === 'delivered'
                                      ? 'bg-green-100 text-green-600'
                                      : 'bg-gray-100 text-gray-600'
                                  }`}>
                                    {order.status === 'ongoing' ? 'Ongoing' : 
                                     order.status === 'delivered' ? 'Delivered' : 'Closed'}
                                  </span>
                                </div>
                              </div>
                              <span className="text-green-600 font-bold text-lg">
                                {formatPrice(order.price)}
                              </span>
                            </div>
                            
                            <p className="text-gray-600 text-sm mb-3">
                              {order.deliveryDate}
                            </p>

                            
                          </div>
                        </div>
                        {order.status === 'delivered' && (
                              <button
                                onClick={() => handleReorder(order.id)}
                                className="w-full bg-green-500 mt-2 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors"
                              >
                                Re Order
                              </button>
                            )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
     <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        onProceedToCheckout={handleProceedToCheckout}
      />
      </div>
  );
}