import Image from 'next/image';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRateOrder: () => void;
}

const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ isOpen, onClose, onRateOrder }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full relative">
      
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Success Icon at Top */}
          
          <div className="w-full flex items-center justify-center">
            <Image 
              src="/images/bakery/modalDuccess.png" 
              alt="Order confirmation" 
              width={192}
              height={192}
              className="w-full h-full object-cover"
            /></div>
          {/* Title */}
          <div className=' p-2'>
          <h2 className="text-2xl font-bold text-gray-900">
            Enjoy your Order!
          </h2>
          
          {/* Subtitle */}
          <p className="text-gray-600 text-center leading-relaxed">
            Thanks for ordering from Bob&apos;s Burgers.<br />
            Hope it was great, let us know
          </p>
          
          </div>
          {/* Tea and cookies image */}
          <div className="mb-2 w-40 h-40 flex items-center justify-center">
            <Image 
              src="/images/bakery/Icon1.png" 
              alt="Order confirmation" 
              width={192}
              height={192}
              className="w-full h-full object-contain"
            />
          </div>
          <div className='w-full p-2'>
          {/* Rate Button */}
          <button
            onClick={onRateOrder}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-xl transition-colors shadow-lg hover:shadow-xl mb-3"
          >
            Rate this Order
          </button>
          
          {/* View History Button */}
          <button
            onClick={onClose}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-2 rounded-xl transition-colors"
          >
            View Order History
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessModal;