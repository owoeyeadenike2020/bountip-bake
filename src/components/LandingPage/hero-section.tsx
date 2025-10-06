// import React from 'react';
// import Image from 'next/image';
// import { FaStar } from "react-icons/fa";
// import { FaClock } from "react-icons/fa6";
// import { FaTruck } from "react-icons/fa6";

// export default function Hero() {
//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
//     <div className="overflow-hidden">
//       {/* Main bakery display image */}
//       <div className="relative h-64 sm:h-80 mb-12">
//         <Image
//           src="/images/bakery/heroImage.jpg"
//           alt="Fresh baked goods display at Bob's Bakery"
//           width={800}
//           height={320}
//           className="w-full h-full rounded-lg object-cover"
//         />
        
//         {/* Profile circle overlay */}
//         <div className="absolute -bottom-12 left-4">
//           <div className="w-26 h-26 rounded-full border-6 border-white overflow-hidden shadow-lg">
//             <Image
//               src="/images/bakery/SubImage.jpg"
//               alt="Bob's Bakery"
//                width={500}
//             height={320}
//               className="w-full h-full object-cover"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Content section */}
//       <div className="p-6">
//         {/* Title and rating */}
//         <div className="mb-4">
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Bob&apos;s Bakery</h1>
//           <div className="flex items-center gap-1 text-sm">
//             <FaStar 
//               className="w-4 h-4" 
//               style={{
//                 background: 'linear-gradient(180deg, #FF6F47, #FFCD0F)',
//                 WebkitBackgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent',
//                 backgroundClip: 'text'
//               }}
//             />
//             <span className="font-medium text-gray-900">3.6</span>
//             <span className="text-gray-600">(56 reviews)</span>
//           </div>
//         </div>

//         {/* Business info */}
//         <div className="space-x-6  flex flex-col-2">
//           <div className="flex items-center gap-3">
//             <FaClock className="w-5 h-5 text-[#15BA5C]" />
//             <div>
//               <div className="text-sm font-medium text-gray-900">Opening/Closing Hours</div>
//               <div className="text-sm text-gray-600">8:00 AM - 6:00 PM</div>
//             </div>
//           </div>

//           <div className="flex items-center gap-3">
//             <FaTruck className="w-5 h-5 text-[#15BA5C]" />
//             <div>
//               <div className="text-sm font-medium text-gray-900">Delivery</div>
//               <div className="text-sm text-green-600 font-medium">Available</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// }


'use client';
import React from 'react';
import Image from 'next/image';
import { FaStar, FaClock, FaTruck } from "react-icons/fa";
import { useStore } from '@/hooks/useStore';

export default function Hero() {
  const { 
    storeData, 
    loading, 
    error, 
    getFormattedTodayHours, 
    isStoreOpen 
  } = useStore('sam-s-store');

  // Loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
        <div className="overflow-hidden">
          <div className="relative h-64 sm:h-80 mb-12 bg-gray-200 animate-pulse rounded-lg" />
          <div className="p-6 space-y-4">
            <div className="h-8 w-48 bg-gray-200 animate-pulse rounded" />
            <div className="h-4 w-32 bg-gray-200 animate-pulse rounded" />
            <div className="flex gap-6">
              <div className="h-16 w-48 bg-gray-200 animate-pulse rounded" />
              <div className="h-16 w-48 bg-gray-200 animate-pulse rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">Failed to load store data. Please try again later.</p>
        </div>
      </div>
    );
  }

  // Use store data or fallback
  const storeName = storeData?.name || "Bob's Bakery";
  const storeLogo = storeData?.logoUrl || "/images/bakery/SubImage.jpg";
  const todayHours = getFormattedTodayHours();
  const storeIsOpen = isStoreOpen();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
      <div className="overflow-hidden">
        {/* Main bakery display image */}
        <div className="relative h-64 sm:h-80 mb-12">
          <Image
            src="/images/bakery/heroImage.jpg"
            alt={`Fresh baked goods display at ${storeName}`}
            width={800}
            height={320}
            className="w-full h-full rounded-lg object-cover"
          />
          
          {/* Profile circle overlay */}
          <div className="absolute -bottom-12 left-4">
            <div className="w-26 h-26 rounded-full border-6 border-white overflow-hidden shadow-lg">
              <Image
                src={storeLogo}
                alt={storeName}
                width={500}
                height={320}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="p-6">
          {/* Title and rating */}
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{storeName}</h1>
            <div className="flex items-center gap-1 text-sm">
              <FaStar 
                className="w-4 h-4" 
                style={{
                  background: 'linear-gradient(180deg, #FF6F47, #FFCD0F)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              />
              <span className="font-medium text-gray-900">3.6</span>
              <span className="text-gray-600">(56 reviews)</span>
            </div>
          </div>

          {/* Business info */}
          <div className="space-x-6 flex flex-col-2">
            <div className="flex items-center gap-3">
              <FaClock className="w-5 h-5 text-[#15BA5C]" />
              <div>
                <div className="text-sm font-medium text-gray-900">
                  Opening/Closing Hours
                </div>
                <div className="text-sm text-gray-600">
                  {todayHours}
                </div>
                {storeData && (
                  <div className={`text-xs font-medium mt-1 ${
                    storeIsOpen ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {storeIsOpen ? '● Open Now' : '● Closed'}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaTruck className="w-5 h-5 text-[#15BA5C]" />
              <div>
                <div className="text-sm font-medium text-gray-900">Delivery</div>
                <div className="text-sm text-green-600 font-medium">Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
