// components/Checkout/AddressModal.tsx
'use client';
import React, { useState } from 'react';
import { X } from 'lucide-react';

export interface Address {
  title: string;
  subtitle: string;
  location: string;
}

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAddress: (address: Address) => void;
}

export const AddressModal: React.FC<AddressModalProps> = ({ 
  isOpen, 
  onClose, 
  onSelectAddress 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const addresses: Address[] = [
    {
      title: 'Festac Town, Lagos',
      subtitle: '123 Estate, 1st Ave, H close, Festac Town, Lagos',
      location: 'Ikeja, plot383, Lagos'
    },
    // {
    //   title: 'Victoria Island, Lagos',
    //   subtitle: '456 Admiralty Way, Lekki Phase 1, Victoria Island, Lagos',
    //   location: 'Victoria Island, Lagos'
    // },
    // {
    //   title: 'Ikeja, Lagos',
    //   subtitle: '789 Allen Avenue, Ikeja GRA, Lagos',
    //   location: 'Ikeja, Lagos'
    // }
  ];

  const filteredAddresses = addresses.filter(addr => 
    addr.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    addr.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <h2 className="text-xl font-bold">Enter Address</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            type="button"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-lg font-medium mb-4">Enter your Address</h3>
          
          {/* Search Input */}
          <input
            type="text"
            placeholder="Enter your address"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 mb-6"
          />

          {/* Address Results */}
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {filteredAddresses.length > 0 ? (
              filteredAddresses.map((address, index) => (
                <button
                  key={index}
                  onClick={() => {
                    onSelectAddress(address);
                    onClose();
                  }}
                  className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
                  type="button"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-green-600">{address.title}</h4>
                      <p className="text-gray-600 text-sm mt-1">{address.subtitle}</p>
                    </div>
                    <div className="w-5 h-5 border-2 border-green-500 rounded-full flex items-center justify-center ml-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No addresses found</p>
                <p className="text-sm mt-2">Try a different search term</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};