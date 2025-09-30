'use client';
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface DeliveryInstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentInstructions: string;
  onSave: (instructions: string) => void;
}

export const DeliveryInstructionsModal: React.FC<DeliveryInstructionsModalProps> = ({ 
  isOpen, 
  onClose, 
  currentInstructions,
  onSave 
}) => {
  const [instructions, setInstructions] = useState(currentInstructions);

  const handleSave = () => {
    onSave(instructions);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <h2 className="text-xl font-bold">Delivery Instructions</h2>
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
          <h3 className="text-lg font-medium mb-4">Enter Delivery Instructions</h3>
          
          {/* Textarea Input */}
          <textarea
            placeholder="Enter delivery instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
          />

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors"
            type="button"
          >
            Enter Delivery Instructions
          </button>
        </div>
      </div>
    </div>
  );
};