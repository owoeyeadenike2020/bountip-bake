import React from 'react';
import Image from 'next/image';
interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-md w-full relative overflow-hidden">
        {/* Decorative Background Elements */}
         <div className="w-full flex items-center justify-center">
                        <Image 
                          src="/images/bakery/modalDuccess.png" 
                          alt="Order confirmation" 
                          width={592}
                          height={592}
                          className="w-auto h-auto object-cover"
                        /></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Success Icon */}
          <div className="mb-6 relative">
            
           

          {/* Text Content */}
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Order Received Successfully
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Awesome! Your order has been submitted<br />
            and is being processed.
          </p>

          {/* Button */}
          <button
            onClick={onClose}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-4 rounded-xl transition-colors shadow-lg hover:shadow-xl"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};