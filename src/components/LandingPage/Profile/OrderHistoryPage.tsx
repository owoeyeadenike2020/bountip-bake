import React from 'react';
import { Search, ArrowUpDown } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useProfile } from '@/hooks/useProfile';

export default function MobileOrderHistoryPage() {
  const router = useRouter();
  const { 
    orders, 
    searchQuery, 
    orderFilter, 
    setSearchQuery, 
    setOrderFilter,
  } = useProfile();

  const formatPrice = (price: number) => `€ ${price.toFixed(2)}`;

  
  const handleOrderClick = (orderId: string) => {
    router.push(`/orderTracking?id=${orderId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Orders</h1>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowUpDown className="w-5 h-5" />
            <span className="sr-only">Sort</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search ....."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
          />
        </div>

        {/* Order Status Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setOrderFilter('ongoing')}
            className={`flex-1 px-4 py-3 font-medium text-sm transition-colors ${
              orderFilter === 'ongoing'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-600'
            }`}
          >
            ONGOING / DELIVERED 
          </button>
          <button
            onClick={() => setOrderFilter('closed')}
            className={`flex-1 px-4 py-3 font-medium text-sm transition-colors ${
              orderFilter === 'closed'
                ? 'text-gray-600 border-b-2 border-gray-600'
                : 'text-gray-600'
            }`}
          >
            CLOSED ORDERS
          </button>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-500">No orders found</p>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg p-4 border border-gray-200"
              onClick={() => handleOrderClick(order.id)}>
                <div className="flex gap-3">
                  <div className="w-16 h-16 flex-shrink-0">
                    <Image
                      src={order.productImage}
                      alt={order.productName}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{order.productName}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-gray-600 text-xs">{order.orderNumber}</span>
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
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
                      <span className="text-green-600 font-bold">
                        {formatPrice(order.price)}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-xs">
                      {order.deliveryDate}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}