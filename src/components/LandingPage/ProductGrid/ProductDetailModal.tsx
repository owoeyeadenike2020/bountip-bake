import React, { useState } from 'react';
import { Star, Clock, Minus, Plus, ShoppingCart } from 'lucide-react';
import { Modal } from '@/components/UI/Modal/Modal';
import Image from 'next/image';
type SizeOption = {
  name: string;
  price: number;
};

type AddOn = {
  id: string;
  name: string;
  price: number;
  checked: boolean;
};

type Product = {
  id:  number;
  name: string;
  description?: string;
  image: string;
  rating?: number;
  reviewCount?: number;
  deliveryTime?: string;
  allergens?: string[];
  sizes?: SizeOption[];
  addOns?: AddOn[];
};

type ProductDetailModalProps = {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onAddToCart: (productId:  number, customization: unknown) => void;
};

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  isOpen,
  onClose,
  product,
  onAddToCart,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('Small');
  const [addOns, setAddOns] = useState<AddOn[]>([]);
  const [quantity, setQuantity] = useState<number>(1);

  // Initialize add-ons when product changes
  React.useEffect(() => {
    if (product) {
      setAddOns(product.addOns ? product.addOns.map(addon => ({ ...addon, checked: false })) : []);
      setSelectedSize(product.sizes?.[0]?.name || 'Small');
    }
  }, [product]);

  if (!product) return null;

  const selectedSizePrice = product.sizes?.find(size => size.name === selectedSize)?.price || 0;
  const addOnsTotal = addOns.filter(addon => addon.checked).reduce((total, addon) => total + addon.price, 0);
  const totalPrice = (selectedSizePrice + addOnsTotal) * quantity;

  const handleAddOnToggle = (id: string) => {
    setAddOns(prev => prev.map(addon => 
      addon.id === id ? { ...addon, checked: !addon.checked } : addon
    ));
  };

  const handleQuantityChange = (increment: boolean) => {
    if (increment) {
      setQuantity(prev => prev + 1);
    } else if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    const customization = {
      size: selectedSize,
      addOns: addOns.filter(addon => addon.checked),
      quantity,
      totalPrice,
    };
    onAddToCart(product.id, customization);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={product.name}
      size="lg"
    >
      <div className="flex flex-col h-full">
        {/* Product Image */}
        <div className="relative h-64 md:h-80 bg-gray-100 rounded-lg mx-4 mt-4 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 p-4 md:p-6">
          {/* Title and Description */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-gray-600 mb-4">
              {product.description}
            </p>

            {/* Rating and Delivery */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-orange-400 text-orange-400" />
                <span className="font-medium text-gray-900">
                  {product.rating}
                </span>
                <span className="text-gray-500">
                  ({product.reviewCount} Reviews)
                </span>
              </div>
              <div className="flex items-center gap-1 text-green-600">
                <Clock className="w-4 h-4" />
                <span className="font-medium">
                  {product.deliveryTime}
                </span>
              </div>
            </div>

            {/* Allergens */}
            {product.allergens && product.allergens.length > 0 && (
              <div className="mb-6">
                <span className="text-gray-700 font-medium">Allergens: </span>
                <div className="inline-flex items-center gap-2 mt-1">
                  {product.allergens.map((allergen, index) => (
                    <span key={index} className="text-gray-600 flex items-center gap-1">
                      {allergen === 'Peanut' && '🥜'}
                      {allergen === 'Egg' && '🥚'}
                      {allergen}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">
                Size<span className="text-red-500">*</span>
              </h3>
              <span className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded">
                Required
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Single-choice || Choose 1
            </p>
            <div className="flex flex-wrap gap-2">
              {product.sizes?.map((size) => (
                <button
                  key={size.name}
                  onClick={() => setSelectedSize(size.name)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                    selectedSize === size.name
                      ? 'bg-green-500 text-white border-green-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-green-500'
                  }`}
                >
                  {size.name} €{size.price}
                </button>
              ))}
            </div>
          </div>

          {/* Add-ons */}
          {addOns.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Add-ons</h3>
              <p className="text-sm text-gray-600 mb-4">
                Multi-choice || Choose as much as you want
              </p>
              <div className="grid grid-cols-3 gap-3">
                {addOns.map((addon) => (
                  <div key={addon.id} className="flex items-center justify-between border-2 border-gray-100 p-2 rounded-lg">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={addon.checked}
                        onChange={() => handleAddOnToggle(addon.id)}
                        className="w-4 h-4 text-green-500 border-2 border-gray-300 rounded focus:ring-green-500"
                      />
                      <span className="text-gray-900">{addon.name}</span>
                    </label>
                    <span className="text-green-600 font-medium">
                      €{addon.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Price */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <span className="font-medium text-gray-900">Quantity</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleQuantityChange(false)}
                  className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-lg font-medium w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(true)}
                  className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-green-600">
                € {totalPrice.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-lg font-medium text-lg flex items-center justify-center gap-2 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
        </div>
      </div>
    </Modal>
  );
};