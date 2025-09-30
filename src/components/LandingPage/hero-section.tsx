import React from 'react';
import Image from 'next/image';
import { FaStar } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { FaTruck } from "react-icons/fa6";

export default function Hero() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
    <div className="overflow-hidden">
      {/* Main bakery display image */}
      <div className="relative h-64 sm:h-80 mb-12">
        <Image
          src="/images/bakery/heroImage.jpg"
          alt="Fresh baked goods display at Bob's Bakery"
          width={800}
          height={320}
          className="w-full h-full rounded-lg object-cover"
        />
        
        {/* Profile circle overlay */}
        <div className="absolute -bottom-12 left-4">
          <div className="w-26 h-26 rounded-full border-6 border-white overflow-hidden shadow-lg">
            <Image
              src="/images/bakery/SubImage.jpg"
              alt="Bob's Bakery"
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Bob&apos;s Bakery</h1>
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
        <div className="space-x-6  flex flex-col-2">
          <div className="flex items-center gap-3">
            <FaClock className="w-5 h-5 text-[#15BA5C]" />
            <div>
              <div className="text-sm font-medium text-gray-900">Opening/Closing Hours</div>
              <div className="text-sm text-gray-600">8:00 AM - 6:00 PM</div>
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