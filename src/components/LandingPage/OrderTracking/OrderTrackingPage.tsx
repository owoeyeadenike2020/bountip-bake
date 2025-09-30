// 'use client';
// import React, { useState, useEffect } from 'react';
// import { Check } from 'lucide-react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import Image from 'next/image';
// import { OrderSuccessModal } from './OrderSuccessModal';
// import { FaCircle } from 'react-icons/fa';

// type OrderActivity = {
//   status: 'Order Received' | 'Order Confirmed' | 'Order Delivered';
//   time: string;
//   completed: boolean;
//     icon?: string; // Optional icon URL
// };

// type OrderItem = {
//   quantity: number;
//   name: string;
// };

// type TrackingData = {
//   orderNumber: string;
//   items: OrderItem[];
//   total: number;
//   deliveryAddress: string;
//   deliveryInstructions: string;
//   activities: OrderActivity[];
// };

// export default function OrderTrackingPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const orderId = searchParams.get('id');
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
  
//   // Mock tracking data - replace with actual API call
//   const trackingData: TrackingData = {
//     orderNumber: '#Order23942',
//     items: [
//       { quantity: 1, name: 'Muffins' },
//       { quantity: 2, name: 'Doughnuts' }
//     ],
//     total: 40.00,
//     deliveryAddress: 'Festac Town, Lagos',
//     deliveryInstructions: 'Please leave at the gate. Knock on arrival',
//     activities: [
//       {
//         status: 'Order Received',
//         time: 'Estimated between 2:55 PM - 3:25 PM',
//         completed: true,
//         icon: '/images/bakery/timeline1.png'
//       },
//       {
//         status: 'Order Confirmed',
//         time: 'Estimated between 2:55 PM - 3:25 PM',
//         completed: true,
//         icon: '/images/bakery/timeline1.png'

//       },
//       {
//         status: 'Order Delivered',
//         time: 'Time to be determined',
//         completed: false,
//         icon: '/images/bakery/timeline1.png'

//       }
//     ]
//   };

//   // Check if all activities are completed
//   const isOrderComplete = trackingData.activities.every(activity => activity.completed);

//   // Show success modal when order is complete
//   useEffect(() => {
//     if (isOrderComplete) {
//       const timer = setTimeout(() => {
//         setShowSuccessModal(true);
//       }, 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [isOrderComplete]);

//   const handleSuccessModalClose = () => {
//     setShowSuccessModal(false);
//     router.push('/profile/orders');
//   };

//   const formatPrice = (price: number) => `£${price.toFixed(2)}`;

//   return (
//     <>
//       <div className="min-h-screen bg-gray-50"
//         style={{
//         backgroundImage: "url('/images/bakery/orderTrackingbg.png')",
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//       }}>
//         {/* Mobile View */}
//         <div className="lg:hidden">
//           <div className="p-4 space-y-6">
//             <h1 className="text-2xl font-bold">Order Activity</h1>

//             {/* Order Activity Timeline */}
//             <div className="bg-white rounded-lg p-6">
//               <div className="space-y-8">
//                 {trackingData.activities.map((activity, index) => (
//                   <div key={index} className="flex gap-4">
//                     {/* Timeline Indicator */}
//                     <div className="flex flex-col items-center">
//                       <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                         activity.completed 
//                           ? 'bg-green-500' 
//                           : 'border-2 border-gray-300 bg-white'
//                       }`}>
//                         {activity.completed && (
//                           <FaCircle className="w-5 h-5 text-white" />
//                         )}
//                       </div>
//                       {index < trackingData.activities.length - 1 && (
//                         <div className={`w-0.2 h-20 ${
//                           activity.completed ? 'bg-green-500' : 'bg-gray-300'
//                         }`} />
//                       )}
//                     </div>

//                     {/* Activity Details */}
//                     <div className="flex-1 pb-8">
//                       <div className="flex items-start justify-between">
//                         <div>
//                           <h3 className={`font-semibold text-lg ${
//                             activity.completed ? 'text-green-600' : 'text-gray-900'
//                           }`}>
//                             {activity.status}
//                           </h3>
//                           <p className="text-gray-500 text-sm mt-1">
//                             {activity.time}
//                           </p>
//                         </div>
//                         {activity.completed && (
//                           <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Desktop View */}
//         <div className="hidden lg:block">
//           <div className="max-w-7xl mx-auto p-8">
//             <div className="grid grid-cols-2 gap-8">
//               {/* Left Column - Summary */}
//               <div className="space-y-6 ">
//                 <div className="rounded-lg">
//                     <div className=" ">
//                   {/* Delivery Details */}
//                   <div className="mb-2 bg-white p-8 rounded-lg shadow">
//                   <h2 className="text-2xl font-bold mb-6">Summary</h2>

//                     <h3 className="font-semibold text-2xl text-black mb-4">Delivery Details</h3>
//                     <div className="space-y-2 text-gray-700">
//                       <p>
//                         <span className="font-semibold text-black text-xl">Address:</span>{' '}
//                         <span className="text-gray-600">{trackingData.deliveryAddress}</span>
//                       </p>
//                       <p>
//                         <span className="font-semibold text-black text-xl">Instructions:</span>{' '}
//                         <span className="text-gray-600">{trackingData.deliveryInstructions}</span>
//                       </p>
//                     </div>
//                   </div>

//                   {/* Order Summary */}
//                   <div className="bg-white p-8 rounded-lg shadow">
//                     <h3 className="font-bold text-2xl text-black mb-4">Order Summary</h3>
//                     <p className="text-gray-600 mb-6">From: Bakery Summary</p>
                    
//                     <div className="space-y-3 mb- h-70 overflow-y-auto">
//                       {trackingData.items.map((item, index) => (
//                         <div key={index} className="flex items-center gap-3">
//                           <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center text-green-600 font-medium">
//                             {item.quantity}
//                           </div>
//                           <span className="text-gray-900">{item.name}</span>
//                         </div>
//                       ))}
//                     </div>

//                     <div className="border-t border-gray-200 pt-4">
//                       <div className="flex justify-between items-center">
//                         <span className="font-bold text-xl">Total</span>
//                         <span className="font-bold text-2xl">{formatPrice(trackingData.total)}</span>
//                       </div>
//                     </div>
//                   </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Right Column - Order Activity */}
//               <div className="bg-white rounded-lg p-6">
//                 <h2 className="text-2xl font-bold mb-8">Order Activity</h2>

//                 {/* Timeline */}
//                 <div className="space-y-8">
//                   {trackingData.activities.map((activity, index) => (
//                     <div key={index} className="flex gap-6">
//                       {/* Timeline Indicator */}
//                     {/* <div className="flex flex-col items-center">
//                         <div
//                             className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
//                                 activity.completed
//                                     ? 'bg-green-500'
//                                     : 'border-2 border-gray-300 bg-white'
//                             }`}
//                         >
//                             {activity.completed && (
//                                 <FaCircle className="w-6 h-6 text-white" />
//                             )}
//                         </div>
//                         {index < trackingData.activities.length - 1 && (
//                             // Make the line start at the bottom of the circle and touch the next one
//                             <div
//                                 className={`w-1 flex-1 min-h-[48px] ${
//                                     activity.completed ? 'bg-green-500' : 'bg-gray-300'
//                                 }`}
//                                 style={{
//                                     marginTop: '-2px', // overlap the border of the circle
//                                     marginBottom: '-2px', // overlap the border of the next circle
//                                 }}
//                             />
//                         )}
//                     </div> */}
// <div className="flex flex-col items-center">
//                       <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${
//                         activity.completed 
//                           ? 'bg-green-500' 
//                           : 'border-2 border-gray-300 bg-white'
//                       }`}>
//                         {activity.icon ? (
//                           <Image 
//                             src={activity.icon} 
//                             alt={activity.status}
//                             width={32}
//                             height={32}
//                             className="w-full h-full object-cover"
//                           />
//                         ) : activity.completed ? (
//                           <FaCircle className="w-5 h-5 text-white" />
//                         ) : null}
//                       </div>
//                       {index < trackingData.activities.length - 1 && (
//                         <div className={`w-1 flex-1 min-h-[60px] ${
//                           activity.completed ? 'bg-green-500' : 'bg-gray-300'
//                         }`} 
//                         style={{
//                           marginTop: '-2px',
//                           marginBottom: '-2px',
//                         }}
//                         />
//                       )}
//                     </div>
//                       {/* Activity Details */}
//                       <div className="flex-1 pb-8">
//                         <div className="flex items-start justify-between">
//                           <div>
//                             <h3 className={`font-semibold text-2xl mb-1 ${
//                               activity.completed ? 'text-green-600' : 'text-gray-900'
//                             }`}>
//                               {activity.status}
//                             </h3>
//                             <p className="text-gray-500">
//                               {activity.time}
//                             </p>
//                           </div>
//                           {activity.completed && (
//                             <Check className="w-6 h-6 text-green-500 flex-shrink-0" />
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Success Modal */}
//       <OrderSuccessModal 
//         isOpen={showSuccessModal} 
//         onClose={handleSuccessModalClose}
//       />
//     </>
//   );
// }


// 'use client';
// import React, { useState, useEffect } from 'react';
// import { Check } from 'lucide-react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import Image from 'next/image';
// import { OrderSuccessModal } from './OrderSuccessModal';
// import { FaCircle } from 'react-icons/fa';

// type OrderActivity = {
//   status: 'Order Received' | 'Order Confirmed' | 'Order Delivered';
//   time: string;
//   completed: boolean;
//   icon?: string; // Optional icon URL
// };

// type OrderItem = {
//   quantity: number;
//   name: string;
// };

// type TrackingData = {
//   orderNumber: string;
//   items: OrderItem[];
//   total: number;
//   deliveryAddress: string;
//   deliveryInstructions: string;
//   activities: OrderActivity[];
// };

// export default function OrderTrackingPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const orderId = searchParams.get('id');
//   const [showSuccessModal, setShowSuccessModal] = useState(false);

//   // Mock tracking data - replace with actual API call
//   const trackingData: TrackingData = {
//     orderNumber: '#Order23942',
//     items: [
//       { quantity: 1, name: 'Muffins' },
//       { quantity: 2, name: 'Doughnuts' },
//     ],
//     total: 40.0,
//     deliveryAddress: 'Festac Town, Lagos',
//     deliveryInstructions: 'Please leave at the gate. Knock on arrival',
//     activities: [
//       {
//         status: 'Order Received',
//         time: 'Estimated between 2:55 PM - 3:25 PM',
//         completed: true,
//         icon: '/images/bakery/timeline1.png',
//       },
//       {
//         status: 'Order Confirmed',
//         time: 'Estimated between 2:55 PM - 3:25 PM',
//         completed: true,
//         icon: '/images/bakery/timeline1.png',
//       },
//       {
//         status: 'Order Delivered',
//         time: 'Time to be determined',
//         completed: false,
//         icon: '/images/bakery/timeline1.png',
//       },
//     ],
//   };

//   // Check if all activities are completed
//   const isOrderComplete = trackingData.activities.every((activity) => activity.completed);

//   // Show success modal when order is complete
//   useEffect(() => {
//     if (isOrderComplete) {
//       const timer = setTimeout(() => {
//         setShowSuccessModal(true);
//       }, 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [isOrderComplete]);

//   const handleSuccessModalClose = () => {
//     setShowSuccessModal(false);
//     router.push('/profile/orders');
//   };

//   const formatPrice = (price: number) => `£${price.toFixed(2)}`;

//   // Find the latest completed activity's icon
//   const latestCompletedIcon = trackingData.activities
//     .filter((activity) => activity.completed)
//     .slice(-1)[0]?.icon || '/images/bakery/default.png';

//   return (
//     <>
//       <div
//         className="min-h-screen bg-gray-50"
//         style={{
//           backgroundImage: "url('/images/bakery/orderTrackingbg.png')",
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//         }}
//       >
//         {/* Mobile View */}
//         <div className="lg:hidden">
//           <div className="p-4 space-y-6">
//             <h1 className="text-2xl font-bold">Order Activity</h1>

//             {/* Order Activity Timeline */}
//             <div className="bg-white rounded-lg p-6">
//               <div className="space-y-8">
//                 {trackingData.activities.map((activity, index) => (
//                   <div key={index} className="flex gap-4">
//                     {/* Timeline Indicator */}
//                     <div className="flex flex-col items-center">
//                       <div
//                         className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                           activity.completed ? 'bg-green-500' : 'border-2 border-gray-300 bg-white'
//                         }`}
//                       >
//                         {activity.completed && <FaCircle className="w-5 h-5 text-white" />}
//                       </div>
//                       {index < trackingData.activities.length - 1 && (
//                         <div
//                           className={`w-0.2 h-20 ${
//                             activity.completed ? 'bg-green-500' : 'bg-gray-300'
//                           }`}
//                         />
//                       )}
//                     </div>

//                     {/* Activity Details */}
//                     <div className="flex-1 pb-8">
//                       <div className="flex items-start justify-between">
//                         <div>
//                           <h3
//                             className={`font-semibold text-lg ${
//                               activity.completed ? 'text-green-600' : 'text-gray-900'
//                             }`}
//                           >
//                             {activity.status}
//                           </h3>
//                           <p className="text-gray-500 text-sm mt-1">{activity.time}</p>
//                         </div>
//                         {activity.completed && (
//                           <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Desktop View */}
//         <div className="hidden lg:block">
//           <div className="max-w-7xl mx-auto p-8">
//             <div className="grid grid-cols-2 gap-8">
//               {/* Left Column - Summary */}
//               <div className="space-y-6">
//                 <div className="rounded-lg">
//                   <div>
//                     {/* Delivery Details */}
//                     <div className="mb-2 bg-white p-8 rounded-lg shadow">
//                       <h2 className="text-2xl font-bold mb-6">Summary</h2>
//                       <h3 className="font-semibold text-2xl text-black mb-4">Delivery Details</h3>
//                       <div className="space-y-2 text-gray-700">
//                         <p>
//                           <span className="font-semibold text-black text-xl">Address:</span>{' '}
//                           <span className="text-gray-600">{trackingData.deliveryAddress}</span>
//                         </p>
//                         <p>
//                           <span className="font-semibold text-black text-xl">Instructions:</span>{' '}
//                           <span className="text-gray-600">{trackingData.deliveryInstructions}</span>
//                         </p>
//                       </div>
//                     </div>

//                     {/* Order Summary */}
//                     <div className="bg-white p-8 rounded-lg shadow">
//                       <h3 className="font-bold text-2xl text-black mb-4">Order Summary</h3>
//                       <p className="text-gray-600 mb-6">From: Bakery Summary</p>
//                       <div className="space-y-3 mb- h-70 overflow-y-auto">
//                         {trackingData.items.map((item, index) => (
//                           <div key={index} className="flex items-center gap-3">
//                             <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center text-green-600 font-medium">
//                               {item.quantity}
//                             </div>
//                             <span className="text-gray-900">{item.name}</span>
//                           </div>
//                         ))}
//                       </div>
//                       <div className="border-t border-gray-200 pt-4">
//                         <div className="flex justify-between items-center">
//                           <span className="font-bold text-xl">Total</span>
//                           <span className="font-bold text-2xl">{formatPrice(trackingData.total)}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Right Column - Order Activity */}
//               <div className="bg-white rounded-lg p-6">
//                 <h2 className="text-2xl font-bold mb-8">Order Activity</h2>

//                 {/* Timeline with Image */}
//                 <div className="flex gap-6">
//                   {/* Left: Single Tall Image */}
//                   <div className="flex-shrink-0">
//                     <Image
//                       src={latestCompletedIcon}
//                       alt="Timeline Image"
//                       width={50} // Adjust width as needed
//                       height={50} // Dynamic height based on number of activities
//                       className="w-auto h-auto rounded"
//                     //   style={{ minHeight: `${trackingData.activities.length * 100}px` }} // Ensure minimum height
//                     />
//                   </div>

//                   {/* Right: Timeline Activities */}
//                   <div className="flex-1 space-y-8">
//                     {trackingData.activities.map((activity, index) => (
//                       <div key={index} className="flex gap-4 items-start">
//                         {/* Timeline Indicator */}
//                      <div className="flex flex-col items-center">
//                       <div
//                         className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
//                           activity.completed ? 'bg-green-500' : 'border-2 border-gray-300 bg-white'
//                         }`}
//                       >
//                         {activity.completed && <FaCircle className="w-5 h-5 text-white" />}
//                       </div>
//                       {index < trackingData.activities.length - 1 && (
//                         <div
//                           className={`w-1 h-full ${
//                             activity.completed ? 'bg-green-500' : 'bg-gray-300'
//                           }`}
//                           style={{
//                             marginTop: '0px',
//                             marginBottom: '0px',
//                             height: 'calc(100% + 50%)', // Extend to touch next circle
//                           }}
//                         />
//                       )}
//                     </div>

//                         {/* Activity Details */}
//                         <div className="flex-1">
//                           <div className="flex items-start justify-between">
//                             <div>
//                               <h3
//                                 className={`font-semibold text-2xl mb-1 ${
//                                   activity.completed ? 'text-green-600' : 'text-gray-900'
//                                 }`}
//                               >
//                                 {activity.status}
//                               </h3>
//                               <p className="text-gray-500">{activity.time}</p>
//                             </div>
//                             {activity.completed && (
//                               <Check className="w-6 h-6 text-green-500 flex-shrink-0" />
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Success Modal */}
//       <OrderSuccessModal isOpen={showSuccessModal} onClose={handleSuccessModalClose} />
//     </>
//   );
// }


'use client';
import React, { useState} from 'react';
// import { Check } from 'lucide-react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import Image from 'next/image';
import {  FaCheckCircle, FaCircle } from 'react-icons/fa';
import OrderSuccessModal from './OrderSuccessModal';
import RatingModal from './RatingModal';
// type OrderActivity = {
//     status: 'Order Received' | 'Order Confirmed' | 'Order Delivered';
//     time: string;
//     completed: boolean;
//     icon?: string; // Optional icon URL
// };

// type OrderItem = {
//     quantity: number;
//     name: string;
// };

// type TrackingData = {
//     orderNumber: string;
//     items: OrderItem[];
//     total: number;
//     deliveryAddress: string;
//     deliveryInstructions: string;
//     activities: OrderActivity[];
// };

// export default function OrderTrackingPage() {
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const orderId = searchParams.get('id');
//     const [showSuccessModal, setShowSuccessModal] = useState(false);

//     // Mobile view state: 'summary' or 'timeline'
//     const [mobileView, setMobileView] = useState<'summary' | 'timeline'>('summary');

//     // Mock tracking data - replace with actual API call
//     const trackingData: TrackingData = {
//         orderNumber: '#Order23942',
//         items: [
//             { quantity: 1, name: 'Muffins' },
//             { quantity: 2, name: 'Doughnuts' },
//         ],
//         total: 40.0,
//         deliveryAddress: 'Festac Town, Lagos',
//         deliveryInstructions: 'Please leave at the gate. Knock on arrival',
//         activities: [
//             {
//                 status: 'Order Received',
//                 time: 'Estimated between 2:55 PM - 3:25 PM',
//                 completed: true,
//                 icon: '/images/bakery/timeline1.png',
//             },
//             {
//                 status: 'Order Confirmed',
//                 time: 'Estimated between 2:55 PM - 3:25 PM',
//                 completed: true,
//                 icon: '/images/bakery/timeline2.png',
//             },
//             {
//                 status: 'Order Delivered',
//                 time: 'Time to be determined',
//                 completed: true,
//                 icon: '/images/bakery/timeline3.png',
//             },
//         ],
//     };

//     // Check if all activities are completed
//     const isOrderComplete = trackingData.activities.every((activity) => activity.completed);

//     // Show success modal when order is complete
//     useEffect(() => {
//         if (isOrderComplete) {
//             const timer = setTimeout(() => {
//                 setShowSuccessModal(true);
//             }, 1000);
//             return () => clearTimeout(timer);
//         }
//     }, [isOrderComplete]);

//     const handleSuccessModalClose = () => {
//         setShowSuccessModal(false);
//         router.push('/profile/orders');
//     };

//     const formatPrice = (price: number) => `£${price.toFixed(2)}`;

//     // Find the latest completed activity's icon
//     const latestCompletedIcon = trackingData.activities
//         .filter((activity) => activity.completed)
//         .slice(-1)[0]?.icon || '/images/bakery/default.png';

//     return (
//         <>
//             <div
//                 className="min-h-screen bg-white"
//             >
//                 {/* Mobile View */}
//                 <div className="lg:hidden bg-white min-h-screen">
//                     {mobileView === 'summary' ? (
//                         <div className="p-4 space-y-6">

//                             {/* Delivery Details */}
//                             <div className="mb-2 bg-white p-6 rounded-lg shadow">
//                             <h1 className="text-2xl font-bold mb-4">Order Summary</h1>

//                                 <h3 className="font-medium text-xl text-black mb-4">Delivery Details</h3>
//                                 <div className="space-y-2 text-gray-700">
//                                     <p>
//                                         <span className="font-medium text-black">Address:</span>{' '}
//                                         <span className="text-gray-600">{trackingData.deliveryAddress}</span>
//                                     </p>
//                                     <p>
//                                         <span className="font-medium text-black">Instructions:</span>{' '}
//                                         <span className="text-gray-600">{trackingData.deliveryInstructions}</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             {/* Order Summary */}
//                             <div className="bg-white p-6 rounded-lg shadow">
//                                 <h3 className="font-bold text-xl text-black mb-4">Order Items</h3>
//                                 <div className="space-y-3 mb-2 overflow-y-auto">
//                                     {trackingData.items.map((item, index) => (
//                                         <div key={index} className="flex items-center gap-3">
//                                             <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center text-green-600 font-medium">
//                                                 {item.quantity}
//                                             </div>
//                                             <span className="text-gray-900">{item.name}</span>
//                                         </div>
//                                     ))}
//                                 </div>
//                                 <div className='bg-white'>
//                                 <div className="border-t border-gray-200 pt-4 mt-4">
//                                     <div className="flex justify-between items-center">
//                                         <span className="font-bold text-lg">Total</span>
//                                         <span className="font-bold text-xl">{formatPrice(trackingData.total)}</span>
//                                     </div>
//                                 </div>
//                             </div>
//                             {/* Button to go to timeline */}
//                             <button
//                                 className="w-full mt-2 py-3 bg-green-600 text-white rounded-lg font-semibold text-lg"
//                                 onClick={() => setMobileView('timeline')}
//                             >
//                                 View Order Timeline
//                             </button>
//                             </div>
//                         </div>
//                     ) : (
//                         <div className="p-4 space-y-6">
//                             <div className="flex items-center justify-between">
//                                 <h1 className="text-2xl font-bold">Order Activity</h1>
//                                 <button
//                                     className="text-green-600 underline text-base"
//                                     onClick={() => setMobileView('summary')}
//                                 >
//                                     Back to Summary
//                                 </button>
//                             </div>
//                             {/* Order Activity Timeline */}
//                             <div className="bg-white rounded-lg p-6">
//                                 <div className="flex">
//                                     {/* Left: Timeline Indicators */}
//                                     <div className="flex flex-col items-center relative" style={{ minHeight: `${trackingData.activities.length * 96}px` }}>
//                                         {trackingData.activities.map((activity, index) => (
//                                             <div key={index} className="flex flex-col items-center relative" style={{ height: '96px' }}>
//                                                 <div
//                                                     className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 bg-green ${
//                                                         activity.completed ? 'bg-green-500' : 'border-2 border-gray-300'
//                                                     }`}
//                                                 >
//                                                     {activity.completed && <FaCircle className="w-5 h-5 text-white" />}
//                                                 </div>
//                                                 {index < trackingData.activities.length - 1 && (
//                                                     <div
//                                                         className={`w-1 absolute left-1/2 -translate-x-1/2 ${
//                                                             activity.completed ? 'bg-green-500' : 'bg-gray-300'
//                                                         }`}
//                                                         style={{
//                                                             top: '32px', // Start at bottom of circle (h-8 = 32px)
//                                                             height: '64px', // Connect to top of next circle (96px - 32px)
//                                                         }}
//                                                     />
//                                                 )}
//                                             </div>
//                                         ))}
//                                     </div>
//                                     {/* Right: Activity Details */}
//                                     <div className="ml-6 flex-1 space-y-1">
//                                         {trackingData.activities.map((activity, index) => (
//                                             <div key={index} className="pb-8" style={{ minHeight: '96px' }}>
//                                                 <div className="flex items-start justify-between">
//                                                     <div>
//                                                         <h3
//                                                             className={`font-semibold text-lg ${
//                                                                 activity.completed ? 'text-green-600' : 'text-gray-900'
//                                                             }`}
//                                                         >
//                                                             {activity.status}
//                                                         </h3>
//                                                         <p className="text-gray-500 text-sm mt-1">{activity.time}</p>
//                                                     </div>
//                                                     {activity.completed && (
//                                                         <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
//                                                     )}
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 {/* Desktop View */}
//                 <div className="hidden lg:block"
//                 style={{
//                     backgroundImage: "url('/images/bakery/orderTrackingbg.png')",
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center',
//                 }}>
//                     <div className="max-w-7xl mx-auto p-8">
//                         <div className="grid grid-cols-2 gap-8">
//                             {/* Left Column - Summary */}
//                             <div className="space-y-6">
//                                 <div className="rounded-lg">
//                                     <div>
//                                         {/* Delivery Details */}
//                                         <div className="mb-2 bg-white p-8 rounded-lg shadow">
//                                             <h2 className="text-2xl font-bold mb-6">Summary</h2>
//                                             <h3 className="font-semibold text-2xl text-black mb-4">Delivery Details</h3>
//                                             <div className="space-y-2 text-gray-700">
//                                                 <p>
//                                                     <span className="font-semibold text-black text-xl">Address:</span>{' '}
//                                                     <span className="text-gray-600">{trackingData.deliveryAddress}</span>
//                                                 </p>
//                                                 <p>
//                                                     <span className="font-semibold text-black text-xl">Instructions:</span>{' '}
//                                                     <span className="text-gray-600">{trackingData.deliveryInstructions}</span>
//                                                 </p>
//                                             </div>
//                                         </div>

//                                         {/* Order Summary */}
//                                         <div className="bg-white p-10 rounded-lg shadow">
//                                             <h3 className="font-bold text-2xl text-black mb-4">Order Summary</h3>
//                                             <p className="text-gray-600 mb-6">From: Bakery Summary</p>
//                                             <div className="space-y-3 mb- h-70 overflow-y-auto">
//                                                 {trackingData.items.map((item, index) => (
//                                                     <div key={index} className="flex items-center gap-3">
//                                                         <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center text-green-600 font-medium">
//                                                             {item.quantity}
//                                                         </div>
//                                                         <span className="text-gray-900">{item.name}</span>
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                             <div className="border-t border-gray-200 pt-4">
//                                                 <div className="flex justify-between items-center">
//                                                     <span className="font-bold text-xl">Total</span>
//                                                     <span className="font-bold text-2xl">{formatPrice(trackingData.total)}</span>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Right Column - Order Activity */}
//                             <div className="bg-white rounded-lg p-8">
//                                 <h2 className="text-2xl font-bold mb-8">Order Activity</h2>

//                                 {/* Timeline with Image */}
//                                 <div className="flex gap-6">
//                                     {/* Left: Single Tall Image and Timeline Indicators */}
//                                     <div className="flex flex-col items-center relative" style={{ minHeight: `${trackingData.activities.length * 96}px` }}>
//                                         {/* <Image
//                                             src={latestCompletedIcon}
//                                             alt="Timeline Image"
//                                             width={100}
//                                             height={trackingData.activities.length * 96}
//                                             className="object-cover rounded"
//                                             style={{ minHeight: `${trackingData.activities.length * 96}px` }}
//                                         /> */}
//                                         <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center w-full h-full">
//                                             {trackingData.activities.map((activity, index) => (
//                                                 <div key={index} className="flex flex-col items-center relative" style={{ height: '200px' }}>
//                                                     <div
//                                                         className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 bg-green ${
//                                                             activity.completed ? 'bg-green-500' : 'border-2 border-gray-300 bg-white'
//                                                         }`}
//                                                     >
//                                                         {activity.completed && <FaCircle className="w-5 h-5 text-white" />}
//                                                     </div>
//                                                     {index < trackingData.activities.length - 1 && (
//                                                         <div
//                                                             className={`w-0.5 absolute left-1/2 -translate-x-1/2 ${
//                                                                 activity.completed ? 'bg-green-500' : 'bg-gray-300'
//                                                             }`}
//                                                             style={{
//                                                                 top: '32px', // Start at bottom of circle (h-8 = 32px)
//                                                                 height: '96px', // Connect to top of next circle (96px - 32px)
//                                                             }}
//                                                         />
//                                                     )}
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>

//                                     {/* Right: Activity Details */}
//                                     <div className="flex-1 space-y-4">
//                                         {trackingData.activities.map((activity, index) => (
//                                             <div key={index} className="pb-8" style={{ minHeight: '96px' }}>
//                                                 <div className="flex items-start justify-between">
//                                                     <div>
//                                                         <h3
//                                                             className={`font-semibold text-xl mb-1 ${
//                                                                 activity.completed ? 'text-green-600' : 'text-gray-900'
//                                                             }`}
//                                                         >
//                                                             {activity.status}
//                                                         </h3>
//                                                         <p className="text-gray-500">{activity.time}</p>
//                                                     </div>
//                                                     {activity.completed && (
//                                                         <FaCheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
//                                                     )}
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Success Modal */}
//             <OrderSuccessModal isOpen={showSuccessModal} onClose={handleSuccessModalClose} />
//         </>
//     );
// }
export default function OrderTrackingPage() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [mobileView, setMobileView] = useState('summary');

  const trackingData = {
    orderNumber: '#Order23942',
    items: [
      { quantity: 1, name: 'Muffins' },
      { quantity: 2, name: 'Doughnuts' },
    ],
    total: 40.0,
    deliveryAddress: 'Festac Town, Lagos',
    deliveryInstructions: 'Please leave at the gate. Knock on arrival',
    activities: [
      {
        status: 'Order Received',
        time: 'Estimated between 2:55 PM - 3:25 PM',
        completed: true,
      },
      {
        status: 'Order Confirmed',
        time: 'Estimated between 2:55 PM - 3:25 PM',
        completed: true,
      },
      {
        status: 'Order Delivered',
        time: 'Time to be determined',
        completed: true,
      },
    ],
  };

  const isOrderComplete = trackingData.activities.every((activity) => activity.completed);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatPrice = (price:any) => `£${price.toFixed(2)}`;

  const handleConfirmOrder = () => {
    setShowSuccessModal(true);
  };

  const handleRateOrder = () => {
    setShowSuccessModal(false);
    setShowRatingModal(true);
  };

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Mobile View */}
        <div className="lg:hidden bg-white min-h-screen">
          {mobileView === 'summary' ? (
            <div className="p-4 space-y-6">
              <div className="mb-2 bg-white p-6 rounded-lg shadow">
                <h1 className="text-2xl font-bold mb-4">Order Summary</h1>
                <h3 className="font-medium text-xl text-black mb-4">Delivery Details</h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <span className="font-medium text-black">Address:</span>{' '}
                    <span className="text-gray-600">{trackingData.deliveryAddress}</span>
                  </p>
                  <p>
                    <span className="font-medium text-black">Instructions:</span>{' '}
                    <span className="text-gray-600">{trackingData.deliveryInstructions}</span>
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-bold text-xl text-black mb-4">Order Items</h3>
                <div className="space-y-3 mb-2">
                  {trackingData.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center text-green-600 font-medium">
                        {item.quantity}
                      </div>
                      <span className="text-gray-900">{item.name}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-xl">{formatPrice(trackingData.total)}</span>
                  </div>
                </div>
                <button
                  className="w-full mt-4 py-3 bg-green-600 text-white rounded-lg font-semibold text-lg"
                  onClick={() => setMobileView('timeline')}
                >
                  View Order Timeline
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Order Activity</h1>
                <button
                  className="text-green-600 underline text-base"
                  onClick={() => setMobileView('summary')}
                >
                  Back to Summary
                </button>
              </div>

              <div className="bg-white rounded-lg p-6">
                <div className="flex">
                  <div className="flex flex-col items-center relative" style={{ minHeight: '288px' }}>
                    {trackingData.activities.map((activity, index) => (
                      <div key={index} className="flex flex-col items-center relative" style={{ height: '96px' }}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${activity.completed ? 'bg-green-500' : 'border-2 border-gray-300 bg-white'}`}>
                          {activity.completed && <FaCircle className="w-5 h-5 text-white" />}
                        </div>
                        {index < trackingData.activities.length - 1 && (
                          <div className={`w-1 absolute left-1/2 -translate-x-1/2 ${activity.completed ? 'bg-green-500' : 'bg-gray-300'}`} style={{ top: '32px', height: '64px' }} />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="ml-6 flex-1 space-y-1">
                    {trackingData.activities.map((activity, index) => (
                      <div key={index} className="pb-8" style={{ minHeight: '96px' }}>
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className={`font-semibold text-lg ${activity.completed ? 'text-green-600' : 'text-gray-900'}`}>
                              {activity.status}
                            </h3>
                            <p className="text-gray-500 text-sm mt-1">{activity.time}</p>
                          </div>
                          {activity.completed && <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {isOrderComplete && (
                  <button
                    onClick={handleConfirmOrder}
                    className="w-full mt-4 py-3 bg-green-600 text-white rounded-lg font-semibold text-lg"
                  >
                    Confirm Order
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Desktop View */}
        <div className="hidden lg:block min-h-screen"
        style={{
                     backgroundImage: "url('/images/bakery/orderTrackingbg.png')",
                     backgroundSize: 'cover',
                     backgroundPosition: 'center',
           }}>
          <div className="max-w-7xl mx-auto p-8">
            <div className="grid grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div className="mb-2 bg-white p-8 rounded-lg shadow">
                  <h2 className="text-2xl font-bold mb-6">Summary</h2>
                  <h3 className="font-semibold text-2xl text-black mb-4">Delivery Details</h3>
                  <div className="space-y-2 text-gray-700">
                    <p>
                      <span className="font-semibold text-black text-xl">Address:</span>{' '}
                      <span className="text-gray-600">{trackingData.deliveryAddress}</span>
                    </p>
                    <p>
                      <span className="font-semibold text-black text-xl">Instructions:</span>{' '}
                      <span className="text-gray-600">{trackingData.deliveryInstructions}</span>
                    </p>
                  </div>
                </div>

                <div className="bg-white p-10 rounded-lg shadow">
                  <h3 className="font-bold text-2xl text-black mb-4">Order Summary</h3>
                  <p className="text-gray-600 mb-6">From: Bakery Summary</p>
                  <div className="space-y-3 mb-6 h-30">
                    {trackingData.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center text-green-600 font-medium">
                          {item.quantity}
                        </div>
                        <span className="text-gray-900">{item.name}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-xl">Total</span>
                      <span className="font-bold text-2xl">{formatPrice(trackingData.total)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="bg-white rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-8">Order Activity</h2>
                <div className="flex gap-6">
                  <div className="flex flex-col items-center relative" style={{ minHeight: '400px' }}>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center w-full h-full">
                      {trackingData.activities.map((activity, index) => (
                        <div key={index} className="flex flex-col items-center relative" style={{ height: '133px' }}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${activity.completed ? 'bg-green-500' : 'border-2 border-gray-300 bg-white'}`}>
                            {activity.completed && <FaCircle className="w-5 h-5 text-white" />}
                          </div>
                          {index < trackingData.activities.length - 1 && (
                            <div className={`w-0.5 absolute left-1/2 -translate-x-1/2 ${activity.completed ? 'bg-green-500' : 'bg-gray-300'}`} style={{ top: '32px', height: '101px' }} />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    {trackingData.activities.map((activity, index) => (
                      <div key={index} className="pb-12" style={{ minHeight: '133px' }}>
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className={`font-semibold text-xl mb-1 ${activity.completed ? 'text-green-600' : 'text-gray-900'}`}>
                              {activity.status}
                            </h3>
                            <p className="text-gray-500">{activity.time}</p>
                          </div>
                          {activity.completed && <FaCheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {isOrderComplete && (
                  <button
                    onClick={handleConfirmOrder}
                    className="w-full mt-6 py-3 bg-green-600 text-white rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors"
                  >
                    Confirm Order
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <OrderSuccessModal 
        isOpen={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)}
        onRateOrder={handleRateOrder}
      />
      <RatingModal 
              isOpen={showRatingModal}
              onClose={() => setShowRatingModal(false)} onRateOrder={function (): void {
                  throw new Error('Function not implemented.');
              } }      />
    </>
  );
}
