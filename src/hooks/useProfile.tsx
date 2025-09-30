// src/hooks/useProfile.ts
"use client";
import { useState } from 'react';

export type OrderStatus = 'ongoing' | 'delivered' | 'closed';

export type Order = {
  id: string;
  orderNumber: string;
  productName: string;
  productImage: string;
  status: OrderStatus;
  price: number;
  deliveryDate: string;
  quantity: number;
};

export type UserProfile = {
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar?: string;
};

// Dummy user data
const dummyUser: UserProfile = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+234 (802) 345 - 6780',
  address: '123, Festac Town, Lagos',
  avatar: '/images/bakery/bakery-logo.jpg'
};

// Dummy orders data
const dummyOrders: Order[] = [
  {
    id: '1',
    orderNumber: '#Order23942',
    productName: 'Cake',
    productImage: '/images/bakery/Product.jpg',
    status: 'ongoing',
    price: 18.98,
    deliveryDate: 'Delivered between Tuesday 23 September and Thursday 25 September',
    quantity: 1
  },
  {
    id: '2',
    orderNumber: '#Order23943',
    productName: 'Muffins',
    productImage: '/images/bakery/Product.jpg',
    status: 'ongoing',
    price: 18.98,
    deliveryDate: 'Delivered between Tuesday 23 September and Thursday 25 September',
    quantity: 2
  },
  {
    id: '3',
    orderNumber: '#Order23944',
    productName: 'Cupcakes',
    productImage: '/images/bakery/Product.jpg',
    status: 'delivered',
    price: 18.98,
    deliveryDate: 'Delivered on 12th September 2025',
    quantity: 3
  },
  {
    id: '4',
    orderNumber: '#Order23945',
    productName: 'Donuts',
    productImage: '/images/bakery/Product.jpg',
    status: 'closed',
    price: 15.50,
    deliveryDate: 'Delivered on 10th September 2025',
    quantity: 2
  }
];

export const useProfile = () => {
  const [user, setUser] = useState<UserProfile>(dummyUser);
  const [orders] = useState<Order[]>(dummyOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [orderFilter, setOrderFilter] = useState<'ongoing' | 'closed'>('ongoing');

  // Filter orders based on search and status
  // const filteredOrders = orders.filter(order => {
  //   const matchesSearch = order.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //                        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
  //   const matchesFilter = orderFilter === 'ongoing' 
  //     ? (order.status === 'ongoing' || order.status === 'delivered')
  //     : order.status === 'closed';
    
  //   return matchesSearch && matchesFilter;
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase());

    // UPDATED LOGIC
    const matchesFilter = orderFilter === 'ongoing'
      ? order.status === 'ongoing'
      : order.status === 'delivered';

    return matchesSearch && matchesFilter;
  });

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const reorder = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      console.log('Reordering:', order);
      // Add reorder logic here
    }
  };

  return {
    user,
    orders: filteredOrders,
    allOrders: orders,
    searchQuery,
    orderFilter,
    setSearchQuery,
    setOrderFilter,
    updateProfile,
    reorder
  };
};