// 'use client';
// import React, { useState, useRef } from 'react';
// import { ChevronRight } from 'lucide-react';
// import Image from 'next/image';
// import { useCart } from '@/hooks/useCart';
// import { HiTruck } from "react-icons/hi";
// import { FiEdit3 } from "react-icons/fi";
// import { IoMdLock } from 'react-icons/io';
// import { LuNut } from 'react-icons/lu';
// import { RiTodoLine } from 'react-icons/ri';
// import { AddressModal, type Address } from './AddressModal';
// import { useRouter } from 'next/navigation';
// import { MdOutlineDelete } from 'react-icons/md';
// import { DeliveryInstructionsModal } from './DeliveryInstructionsModal';
// import { OrderSuccessModal } from '../PaymentDetailPage/OrderSuccessModal';
// import { FaLocationDot} from 'react-icons/fa6';

// type DeliveryMethod = 'delivery' | 'pickup';
// type PaymentMethod = 'pay-on-delivery' | 'pay-now' | 'installments';

// export default function CheckoutPage() {
//   const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
//   const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('delivery');
//   const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pay-on-delivery');
//   const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
//   const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
//   const [isDeliveryInstructionsModalOpen, setIsDeliveryInstructionsModalOpen] = useState(false);
//   const router = useRouter();
//   const [upfrontAmount, setUpfrontAmount] = useState('');
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [formErrors, setFormErrors] = useState({
//     fullName: false,
//     email: false,
//     phoneNumber: false,
//     // address: false,
//     upfrontAmount: false
//   });

//   // Ref for the form to trigger native validation
//   const formRef = useRef<HTMLFormElement>(null);

//   // Validation function
//   const validateForm = (): boolean => {
//     const errors = {
//       fullName: !formData.fullName.trim(),
//       email: !formData.email.trim() || !formData.email.includes('@'),
//       phoneNumber: !formData.phoneNumber.trim() || formData.phoneNumber === '+234',
//       // address: !selectedAddress,
//       upfrontAmount: paymentMethod === 'installments' && !upfrontAmount.trim()
//     };
    
//     setFormErrors(errors);

//     // Trigger native HTML5 validation
//     if (formRef.current) {
//       formRef.current.reportValidity();
//     }

//     return !Object.values(errors).some(error => error);
//   };

//   // Updated handleConfirmOrder
//   const handleConfirmOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault(); // Prevent default form submission if wrapped in a form
//     if (!validateForm()) {
//       return;
//     }

//     if (paymentMethod === 'pay-on-delivery') {
//       setShowSuccessModal(true);
//     } else {
//       router.push('/payment');
//     }
//   };

//   const handleSuccessModalClose = () => {
//     setShowSuccessModal(false);
//     router.push('/profile');
//   };

//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phoneNumber: '+234',
//     address: '',
//     deliveryInstructions: 'Please leave at the gate, knock on arrival'
//   });

//   // Calculate totals
//   const subtotal = getCartTotal();
//   const deliveryFee = 5.09;
//   const tax = subtotal * 0.089;
//   const total = subtotal + deliveryFee + tax;

//   const handleInputChange = (field: string, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//     setFormErrors(prev => ({ ...prev, [field]: false }));
//   };

//   const handleQuantityChange = (itemId: number, increment: boolean, currentQuantity: number) => {
//     const newQuantity = increment ? currentQuantity + 1 : currentQuantity - 1;
//     if (newQuantity <= 0) {
//       const itemIndex = cartItems.findIndex(item => item.id === itemId);
//       removeFromCart(itemIndex);
//     } else {
//       updateQuantity(itemId, newQuantity);
//     }
//   };

//   const handleSelectAddress = (address: Address) => {
//     setSelectedAddress(address);
//     setFormData(prev => ({ ...prev, address: address.subtitle }));
//     setFormErrors(prev => ({ ...prev, address: false }));
//   };

//   const handleSaveDeliveryInstructions = (instructions: string) => {
//     setFormData(prev => ({ ...prev, deliveryInstructions: instructions }));
//   };

//   const formatPrice = (price: number) => `€ ${price.toFixed(2)}`;

//   return (
//     <div className="min-h-screen">
//       {/* Mobile Layout */}
//       <div className="lg:hidden">
//         <div className="p-4 space-y-6">
//           <div className='flex justify-between items-center'>
//             <div>
//               <p className='text-black font-bold text-xl'>Delivery Details</p>
//             </div>
//             {/* Delivery Method Toggle */}
//             <div className="flex bg-gray-100 rounded-full p-1">
//               <button
//                 onClick={() => setDeliveryMethod('delivery')}
//                 className={`flex-1 py-3 px-6 rounded-full text-sm font-medium transition-colors ${
//                   deliveryMethod === 'delivery' 
//                     ? 'bg-white text-green-600 shadow-sm' 
//                     : 'text-gray-600'
//                 }`}
//                 type="button"
//               >
//                 Delivery
//               </button>
//               <button
//                 onClick={() => setDeliveryMethod('pickup')}
//                 className={`flex-1 py-3 px-6 rounded-full text-sm font-medium transition-colors ${
//                   deliveryMethod === 'pickup' 
//                     ? 'bg-white text-green-600 shadow-sm' 
//                     : 'text-gray-600'
//                 }`}
//                 type="button"
//               >
//                 Pick up
//               </button>
//             </div>
//           </div>

//           {/* Address Section */}
//           <div>
//             <div className="flex items-center justify-between mb-3">
//               <h3 className="font-semibold text-lg text-gray-900">Enter Your Address</h3>
//               <button
//                 onClick={() => setIsAddressModalOpen(true)}
//                 className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
//                 type="button"
//               >
//                 <ChevronRight className="w-4 h-4 text-white" />
//               </button>
//             </div>
//             <p className="text-gray-500 text-sm mb-4">select all your location information</p>
            
//             {/* Map or Address Display */}
//             {selectedAddress ? (
//               <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
//                 <div className="flex items-center gap-3">
//                   <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
//                     <div className="w-3 h-3 bg-white rounded-full"></div>
//                   </div>
//                   <div>
//                     <p className="font-medium text-red-500">{selectedAddress.location}</p>
//                     <button
//                       onClick={() => setIsAddressModalOpen(true)}
//                       className="text-green-500 text-sm flex items-center gap-1 mt-1"
//                       type="button"
//                     >
//                       <FiEdit3 className="w-3 h-3" />
//                       Edit
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="relative h-24 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
//                 <div className="flex items-center space-x-4">
//                   <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
//                   <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
//                     <FiEdit3 className="w-4 h-4 text-white" />
//                   </div>
//                   <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
//                 </div>
//               </div>
//             )}

//             {/* Delivery Instructions */}
//             <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
//               <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
//                 <HiTruck className="w-4 h-4 text-white" />
//               </div>
//               <div className="flex-1">
//                 <div className="flex items-center justify-between">
//                   <h4 className="font-medium text-gray-900">Delivery Instructions</h4>
//                   <button
//                     onClick={() => setIsDeliveryInstructionsModalOpen(true)}
//                     className="text-green-500 text-sm flex items-center gap-1"
//                     type="button"
//                   >
//                     <FiEdit3 className="w-4 h-4" />
//                     Edit
//                   </button>
//                 </div>
//                 <p className="text-gray-500 text-sm">{formData.deliveryInstructions}</p>
//               </div>
//             </div>
//           </div>

//           {/* Customer Information Form */}
//           <form ref={formRef}>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-bold text-gray-900 mb-2">
//                   FULL NAME<span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.fullName}
//                   onChange={(e) => handleInputChange('fullName', e.target.value)}
//                   placeholder="Enter your full name"
//                   className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
//                     formErrors.fullName ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-bold text-gray-900 mb-2">
//                   EMAIL<span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) => handleInputChange('email', e.target.value)}
//                   placeholder="Enter your email"
//                   className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
//                     formErrors.email ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-bold text-gray-900 mb-2">
//                   PHONE NUMBER<span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="tel"
//                   value={formData.phoneNumber}
//                   onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
//                   className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
//                     formErrors.phoneNumber ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                   required
//                   pattern="\+234[0-9]{10}" // Example pattern for +234 followed by 10 digits
//                 />
//               </div>

//               <div className="flex items-center gap-2 text-sm text-gray-500">
//                 <span>Your details are safe and secure.</span>
//                 <IoMdLock className='text-gray-500'/>
//               </div>
//             </div>

//             {/* Payment Methods */}
//             <div>
//               <h3 className="font-bold text-sm text-gray-900 mb-4">CHOOSE HOW YOU WANT TO PAY</h3>
//               <div className="flex flex-wrap gap-2">
//                 <button
//                   onClick={() => setPaymentMethod('pay-on-delivery')}
//                   className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
//                     paymentMethod === 'pay-on-delivery' 
//                       ? 'bg-green-100 text-green-700 border border-green-300' 
//                       : 'bg-gray-100 text-gray-700'
//                   }`}
//                   type="button"
//                 >
//                   Pay on Delivery
//                 </button>
                
//                 <button
//                   onClick={() => setPaymentMethod('pay-now')}
//                   className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
//                     paymentMethod === 'pay-now' 
//                       ? 'bg-green-100 text-green-700 border border-green-300' 
//                       : 'bg-gray-100 text-gray-700'
//                   }`}
//                   type="button"
//                 >
//                   Pay Now
//                 </button>
                
//                 <button
//                   onClick={() => setPaymentMethod('installments')}
//                   className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
//                     paymentMethod === 'installments' 
//                       ? 'bg-green-100 text-green-700 border border-green-300' 
//                       : 'bg-gray-100 text-gray-700'
//                   }`}
//                   type="button"
//                 >
//                   Pay in Installments
//                 </button>
//               </div>

//               {paymentMethod === 'installments' && (
//                 <div className="mt-4">
//                   <label className="block text-sm font-bold text-gray-900 mb-2">
//                     ENTER UPFRONT AMOUNT<span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="number"
//                     value={upfrontAmount}
//                     onChange={(e) => {
//                       setUpfrontAmount(e.target.value);
//                       setFormErrors(prev => ({ ...prev, upfrontAmount: false }));
//                     }}
//                     placeholder="Enter amount you would like to pay upfront"
//                     className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
//                       formErrors.upfrontAmount ? 'border-red-500' : 'border-gray-300'
//                     }`}
//                     required
//                   />
//                 </div>
//               )}
//             </div>

//             {/* Confirm Order Button */}
//             <button
//               onClick={handleConfirmOrder}
//               className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-medium text-lg flex items-center justify-center gap-2 transition-colors"
//               type="submit"
//             >
//               Proceed to Payment
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Desktop Layout */}
//       <div className="hidden lg:block">
//         <div className="max-w-7xl mx-auto p-4">
//           <div className="grid grid-cols-2 gap-8">
//             {/* Left Column - Checkout Form */}
//             <div className="space-y-6">
//               {/* Delivery Method Toggle */}
//               <div className="flex items-center justify-between mb-4 rounded-lg p-6">
//                 <div>
//                   <p className="text-black font-bold text-2xl mb-0">Delivery Details</p>
//                 </div>
//                 <div className="flex bg-[#E6E6E6] rounded-full p-1">
//                   <button
//                     onClick={() => setDeliveryMethod('delivery')}
//                     className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors ${
//                       deliveryMethod === 'delivery'
//                         ? 'bg-white text-green-600 shadow-sm'
//                         : 'text-gray-600'
//                     }`}
//                     type="button"
//                   >
//                     Delivery
//                   </button>
//                   <button
//                     onClick={() => setDeliveryMethod('pickup')}
//                     className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors ${
//                       deliveryMethod === 'pickup'
//                         ? 'bg-white text-green-600 shadow-sm'
//                         : 'text-gray-600'
//                     }`}
//                     type="button"
//                   >
//                     Pick up
//                   </button>
//                 </div>
//               </div>

//               {/* Address Section */}
//               {deliveryMethod === 'delivery' ? (
//               <div className="space-y-4">
//                 <div className='bg-white rounded-lg p-6 overflow-hidden' style={{ position: 'relative' }}>
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="font-bold text-black text-xl">Enter Your Address</h3>
//                     <button
//                       onClick={() => setIsAddressModalOpen(true)}
//                       className="w-8 h-8 border border-green-500 rounded-full flex items-center justify-center"
//                       type="button"
//                     >
//                       <ChevronRight className="w-4 h-4 text-green-500" />
//                     </button>
//                   </div>
//                   <p className="text-gray-600 text-sm mb-4">select all your location information</p>
                  
//                   {selectedAddress ? (
//                     <div className="mt-4">
//                       <div className="flex items-center gap-3">
//                         <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
//                           <div className="w-3 h-3 bg-white rounded-full"></div>
//                         </div>
//                         <div>
//                           <p className="font-medium text-red-500">{selectedAddress.location}</p>
//                           <button
//                             onClick={() => setIsAddressModalOpen(true)}
//                             className="text-green-500 text-sm flex items-center gap-1 mt-1"
//                             type="button"
//                           >
//                             <FiEdit3 className="w-3 h-3" />
//                             Edit
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div style={{ position: 'absolute', bottom: -112, right: -18 }}>
//                       <Image
//                         src="/images/bakery/Mappin.png"
//                         alt="Map"
//                         width={148}
//                         height={148}
//                         className="rounded-lg w-auto h-auto"
//                       />
//                     </div>
//                   )}
//                 </div>

//                 {/* Delivery Instructions */}
//                 <div className="border bg-white border-gray-200 rounded-lg p-4">
//                   <div className="flex items-center gap-3">
//                     <div className="w-12 h-12 rounded-lg flex items-center justify-center">
//                       <HiTruck className="w-12 h-12 text-[#15BA5C]" />
//                     </div>
//                     <div className="flex-1">
//                       <div className="flex items-center justify-between">
//                         <h4 className="font-medium text-black text-xl">Delivery Instructions</h4>
//                         <button
//                           onClick={() => setIsDeliveryInstructionsModalOpen(true)}
//                           className="text-green-600 text-sm flex items-center gap-1"
//                           type="button"
//                         >
//                           <FiEdit3 className="w-4 h-4" />
//                           Edit
//                         </button>
//                       </div>
//                       <p className="text-gray-600 text-sm">{formData.deliveryInstructions}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               ) : 
//                <div className=" rounded-lg p-4 space-y-8">
//                {/* <h3 className="font-semibold text-lg mb-4">Store Location</h3> */}
//             <div className="mb-4 w-full">
//                <Image 
//                  src="/images/bakery/Frame.png"                   
//                  alt="Store Location" 
//                   width={200} 
//                   height={200}
//                    className="w-full h-auto rounded-lg"
//                 />
//              </div>             
//                <div className="bg-white flex items-center gap-2 text-gray-700 rounded-lg p-4 border border-gray-200">
//                <span className="text-lg">Store location:</span>
//                <FaLocationDot className='text-red-500 w-5 h-5'/>
//                <span>Festac Town, Lagos</span>
//              </div>
//             </div>
              
              
//               }
//               {/* Customer Information Form */}
//               <form ref={formRef}>
//                 <div className="bg-white rounded-lg p-6 space-y-4">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-900 mb-2">
//                       FULL NAME<span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       value={formData.fullName}
//                       onChange={(e) => handleInputChange('fullName', e.target.value)}
//                       placeholder="Enter your full name"
//                       className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
//                         formErrors.fullName ? 'border-red-500' : 'border-gray-300'
//                       }`}
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold text-gray-900 mb-2">
//                       EMAIL<span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="email"
//                       value={formData.email}
//                       onChange={(e) => handleInputChange('email', e.target.value)}
//                       placeholder="Enter your email address"
//                       className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
//                         formErrors.email ? 'border-red-500' : 'border-gray-300'
//                       }`}
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold text-gray-900 mb-2">
//                       PHONE NUMBER<span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="tel"
//                       value={formData.phoneNumber}
//                       onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
//                       className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
//                         formErrors.phoneNumber ? 'border-red-500' : 'border-gray-300'
//                       }`}
//                       required
//                       pattern="\+234[0-9]{10}"
//                     />
//                   </div>

//                   <div className="flex items-center gap-2 text-sm text-gray-600">
//                     <span>Your details are safe and secure.</span>
//                     <IoMdLock className="w-4 h-4" />
//                   </div>
//                 </div>

//                 {/* Payment Methods */}
//                 <div className="bg-white rounded-lg p-6">
//                   <h3 className="font-semibold text-lg mb-4">CHOOSE HOW YOU WANT TO PAY</h3>
//                   <div className="grid grid-cols-3 gap-4">
//                     <button
//                       onClick={() => setPaymentMethod('pay-on-delivery')}
//                       className={`p-3 font-medium border rounded-lg text-center transition-colors ${
//                         paymentMethod === 'pay-on-delivery' 
//                           ? 'border-green-500 bg-green-50' 
//                           : 'border-gray-300 hover:border-green-300'
//                       }`}
//                       type="button"
//                     >
//                       Pay on Delivery
//                     </button>
                    
//                     <button
//                       onClick={() => setPaymentMethod('pay-now')}
//                       className={`p-3 border font-medium rounded-lg text-center transition-colors ${
//                         paymentMethod === 'pay-now' 
//                           ? 'border-green-500 bg-green-50' 
//                           : 'border-gray-300 hover:border-green-300'
//                       }`}
//                       type="button"
//                     >
//                       Pay Now
//                     </button>
                    
//                     <button
//                       onClick={() => setPaymentMethod('installments')}
//                       className={`p-3 font-medium border rounded-lg text-center transition-colors ${
//                         paymentMethod === 'installments' 
//                           ? 'border-green-500 bg-green-50' 
//                           : 'border-gray-300 hover:border-green-300'
//                       }`}
//                       type="button"
//                     >
//                       Pay in Installments
//                     </button>
//                   </div>
//                   {paymentMethod === 'installments' && (
//                     <div className="mt-4">
//                       <label className="block text-sm font-bold text-gray-900 mb-2">
//                         ENTER UPFRONT AMOUNT<span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="number"
//                         value={upfrontAmount}
//                         onChange={(e) => {
//                           setUpfrontAmount(e.target.value);
//                           setFormErrors(prev => ({ ...prev, upfrontAmount: false }));
//                         }}
//                         placeholder="Enter amount you would like to pay upfront"
//                         className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 ${
//                           formErrors.upfrontAmount ? 'border-red-500' : 'border-gray-300'
//                         }`}
//                         required
//                       />
//                     </div>
//                   )}
//                 </div>

//                 {/* Additional Options */}
//                 <div className="bg-white rounded-lg p-6 space-y-4">
//                   <button className="flex items-center justify-between w-full p-4 rounded-lg hover:border-green-300" type="button">
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
//                         <LuNut className="text-black font-bold text-lg" />
//                       </div>
//                       <span className="text-black font-bold">ANY ALLERGIES?</span>
//                     </div>
//                     <ChevronRight className="text-black font-bold" />
//                   </button>

//                   <button className="flex items-center justify-between w-full p-4 rounded-lg hover:border-green-300" type="button">
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
//                         <RiTodoLine className="text-black font-bold text-lg" />
//                       </div>
//                       <span className="text-black font-bold">SPECIAL INSTRUCTIONS</span>
//                     </div>
//                     <ChevronRight className="w-5 h-5 text-black font-bold" />
//                   </button>
//                   {/* Confirm Order Button */}
//                   <button
//                     onClick={handleConfirmOrder}
//                     className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-lg font-medium text-lg flex items-center justify-center gap-2 transition-colors"
//                     type="submit"
//                   >
//                     Confirm Order
//                   </button>
//                 </div>
//               </form>
//             </div>

//             {/* Right Column - Order Summary */}
//             <div className="bg-white rounded-lg p-6 h-fit">
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="font-semibold text-lg">Cart Items</h3>
//                 <button className="text-green-600 text-sm hover:underline" type="button">
//                   Add more items
//                 </button>
//               </div>

//               {/* Cart Items */}
//               <div className="space-y-4 mb-6">
//                 {cartItems.map((item, index) => (
//                   <div key={`${item.id}-${index}`} className="flex gap-4">
//                     <div className="w-16 h-16 flex-shrink-0">
//                       <Image
//                         src={item.image}
//                         alt={item.name}
//                         width={64}
//                         height={64}
//                         className="w-full h-full object-cover rounded-lg"
//                       />
//                     </div>
//                     <div className="flex-1">
//                       <div className="flex justify-between items-start mb-2">
//                         <div>
//                           <h4 className="font-medium">{item.name}</h4>
//                           <p className="text-gray-600 text-sm">{item.description}</p>
//                         </div>
//                         <button
//                           onClick={() => removeFromCart(index)}
//                           className="text-red-500 hover:text-red-700 p-1"
//                           type="button"
//                         >
//                           <MdOutlineDelete className="w-5 h-5"/>
//                         </button>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <span className="text-green-600 font-bold">
//                           {formatPrice(item.price)}
//                         </span>
//                         <div className="flex items-center gap-2">
//                           <button
//                             onClick={() => handleQuantityChange(item.id, false, item.quantity)}
//                             className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
//                             type="button"
//                           >
//                             −
//                           </button>
//                           <span className="w-8 text-center">{item.quantity}</span>
//                           <button
//                             onClick={() => handleQuantityChange(item.id, true, item.quantity)}
//                             className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600"
//                             type="button"
//                           >
//                             +
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Order Totals */}
//               <div className="bg-[#FAFAFC] rounded-lg  border border-gray-200 p-4 space-y-2">
//                 <div className="flex justify-between text-gray-600">
//                   <span>Subtotal</span>
//                   <span>{formatPrice(subtotal)}</span>
//                 </div>
//                 <div className="flex justify-between text-gray-600">
//                   <span>Delivery Fee</span>
//                   <span>{formatPrice(deliveryFee)}</span>
//                 </div>
//                 <div className="flex justify-between text-gray-600">
//                   <span>Tax</span>
//                   <span>{formatPrice(tax)}</span>
//                 </div> 
//                 <div className="border-t border-gray-300 pt-2">
//                   <div className="flex justify-between font-bold text-lg">
//                     <span>Total</span>
//                     <span>{formatPrice(total)}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Terms and Conditions */}
//               <p className="text-xs text-gray-500 mt-4 mb-6">
//                 Please be available when the delivery person arrives, or they&apos;ll leave your order at 
//                 the door. By placing your order, you agree to take full responsibility for it once it&apos;s 
//                 delivered. Orders containing alcohol or other restricted items may not be eligible 
//                 for leave at door and will be returned to the store if you are not available.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Modals */}
//       <AddressModal
//         isOpen={isAddressModalOpen}
//         onClose={() => setIsAddressModalOpen(false)}
//         onSelectAddress={handleSelectAddress}
//       />
//       <DeliveryInstructionsModal
//         isOpen={isDeliveryInstructionsModalOpen}
//         onClose={() => setIsDeliveryInstructionsModalOpen(false)}
//         currentInstructions={formData.deliveryInstructions}
//         onSave={handleSaveDeliveryInstructions}
//       />
//       <OrderSuccessModal
//         isOpen={showSuccessModal}
//         onClose={handleSuccessModalClose}
//       />
//     </div>
//   );
// }



//updated version
// 'use client';
// import React, { useState, useRef, useEffect } from 'react';
// import { ChevronRight, X, Minus, Plus } from 'lucide-react';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import { useCart } from '@/hooks/useCart';
// import { orderService } from '@/service/orderService';
// import { HiTruck } from "react-icons/hi";
// import { FiEdit3 } from "react-icons/fi";
// import { IoMdLock } from 'react-icons/io';
// import { LuNut } from 'react-icons/lu';
// import { RiTodoLine } from 'react-icons/ri';
// import { FaLocationDot } from 'react-icons/fa6';
// import { MdOutlineDelete } from 'react-icons/md';
// import toast from 'react-hot-toast';
// import { DeliveryInstructionsModal } from './DeliveryInstructionsModal';
// import { AddressModal, type Address } from './AddressModal';


// type DeliveryMethod = 'Delivery' | 'Pickup';
// type PaymentMethod = 'pay-on-delivery' | 'pay-now' | 'installments';

// export default function CheckoutPage() {
//   const router = useRouter();
//   const { cartItems, updateQuantity, removeFromCart } = useCart();
//   const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('Delivery');
//   const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pay-on-delivery');
//   const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
//   const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
//   const [isDeliveryInstructionsModalOpen, setIsDeliveryInstructionsModalOpen] = useState(false);
//   const [upfrontAmount, setUpfrontAmount] = useState('');
//   const [isProcessing, setIsProcessing] = useState(false);
  
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phoneNumber: '+234',
//     deliveryInstructions: 'Please leave at the gate, knock on arrival'
//   });

//   const [formErrors, setFormErrors] = useState({
//     fullName: false,
//     email: false,
//     phoneNumber: false,
//     address: false,
//     upfrontAmount: false
//   });

//   const formRef = useRef<HTMLFormElement>(null);

//   useEffect(() => {
//     const orderId = localStorage.getItem('orderId');
//     if (!orderId) {
//       toast.error('No active order found. Please add items to cart first.');
//       router.push('/');
//     }
//   }, [router]);

//   const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
//   const deliveryFee = deliveryMethod === 'Delivery' ? 5.09 : 0;
//   const tax = subtotal * 0.089;
//   const total = subtotal + deliveryFee + tax;

//   const validateForm = (): boolean => {
//     const errors = {
//       fullName: !formData.fullName.trim(),
//       email: !formData.email.trim() || !formData.email.includes('@'),
//       phoneNumber: !formData.phoneNumber.trim() || formData.phoneNumber === '+234',
//       address: deliveryMethod === 'Delivery' && !selectedAddress,
//       upfrontAmount: paymentMethod === 'installments' && (!upfrontAmount.trim() || parseFloat(upfrontAmount) <= 0)
//     };
    
//     setFormErrors(errors);
    
//     if (Object.values(errors).some(error => error)) {
//       if (errors.fullName) toast.error('Please enter your full name');
//       else if (errors.email) toast.error('Please enter a valid email');
//       else if (errors.phoneNumber) toast.error('Please enter a valid phone number');
//       else if (errors.address) toast.error('Please select a delivery address');
//       else if (errors.upfrontAmount) toast.error('Please enter a valid upfront amount');
//       return false;
//     }
    
//     return true;
//   };

//   const handleInputChange = (field: string, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//     setFormErrors(prev => ({ ...prev, [field]: false }));
//   };

//   const handleConfirmOrder = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
    
//     // if (!validateForm()) return;
//     if (isProcessing) return;

//     setIsProcessing(true);
//     const toastId = toast.loading('Processing order...');

//     try {
//       const orderId = localStorage.getItem('orderId');
//       if (!orderId) throw new Error('Order ID not found');

//       const customerId = localStorage.getItem('customerId');
//       // if (!customerId) {
//       //   customerId = `customer-${Date.now()}`;
//       //   localStorage.setItem('customerId', customerId);
//       // }

//       const addressId = selectedAddress?.id || `address-${Date.now()}`;
      
//       localStorage.setItem('addressId', addressId);
//       localStorage.setItem('customerName', formData.fullName);
//       localStorage.setItem('customerEmail', formData.email);
//       localStorage.setItem('customerPhone', formData.phoneNumber);

//       await orderService.checkoutOrder(orderId, {
//         // status: 'Intent',
//         addressId,
//         customerId,
//         deliveryMethod,
//         specialInstructions: formData.deliveryInstructions
//       });

//       toast.success('Order confirmed!', { id: toastId });
//         router.push('/payment');

//       // if (paymentMethod === 'pay-now' || paymentMethod === 'installments') {
//       //   router.push('/payment');
//       // } else {
//       //   toast.success('Order placed successfully! Pay on delivery.');
//       //   setTimeout(() => router.push('/'), 2000);
//       // }
//     } catch (error) {
//       console.error('Checkout error:', error);
//       toast.error(
//         error instanceof Error ? error.message : 'Failed to complete checkout',
//         { id: toastId }
//       );
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const handleSelectAddress = (address: Address) => {
//     setSelectedAddress(address);
//     setFormErrors(prev => ({ ...prev, address: false }));
//   };

//   const handleSaveDeliveryInstructions = (instructions: string) => {
//     setFormData(prev => ({ ...prev, deliveryInstructions: instructions }));
//   };

//   const handleQuantityChange = async (productId: string, increment: boolean, currentQuantity: number) => {
//     const newQuantity = increment ? currentQuantity + 1 : currentQuantity - 1;
//     if (newQuantity <= 0) {
//       await removeFromCart(productId);
//     } else {
//       await updateQuantity(productId, newQuantity);
//     }
//   };

//   const formatPrice = (price: number) => `€${price.toFixed(2)}`;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Mobile Layout */}
//       <div className="lg:hidden">
//         <div className="bg-white p-4 border-b sticky top-0 z-10 shadow-sm">
//           <div className="flex items-center justify-between mb-3">
//             <h1 className="text-xl font-bold">Checkout</h1>
//             <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full">
//               <X className="w-5 h-5" />
//             </button>
//           </div>
          
//           <div className="flex bg-gray-100 rounded-full p-1">
//             <button
//               onClick={() => setDeliveryMethod('Delivery')}
//               className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition ${
//                 deliveryMethod === 'Delivery' 
//                   ? 'bg-white text-green-600 shadow-sm' 
//                   : 'text-gray-600'
//               }`}
//             >
//               Delivery
//             </button>
//             <button
//               onClick={() => setDeliveryMethod('Pickup')}
//               className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition ${
//                 deliveryMethod === 'Pickup' 
//                   ? 'bg-white text-green-600 shadow-sm' 
//                   : 'text-gray-600'
//               }`}
//             >
//               Pick up
//             </button>
//           </div>
//         </div>

//         <div className="p-4 space-y-4 pb-32">
//           {deliveryMethod === 'Delivery' ? (
//             <>
//               <div className="bg-white rounded-lg p-4 shadow-sm">
//                 <div className="flex items-center justify-between mb-3">
//                   <h3 className="font-semibold">Delivery Address</h3>
//                   <button
//                     onClick={() => setIsAddressModalOpen(true)}
//                     className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
//                   >
//                     <ChevronRight className="w-4 h-4 text-white" />
//                   </button>
//                 </div>
                
//                 {selectedAddress ? (
//                   <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//                     <FaLocationDot className="w-5 h-5 text-red-500 flex-shrink-0" />
//                     <div className="flex-1 min-w-0">
//                       <p className="font-medium truncate">{selectedAddress.location}</p>
//                       <p className="text-sm text-gray-600 truncate">{selectedAddress.subtitle}</p>
//                     </div>
//                     <button
//                       onClick={() => setIsAddressModalOpen(true)}
//                       className="text-green-600 flex-shrink-0"
//                     >
//                       <FiEdit3 className="w-4 h-4" />
//                     </button>
//                   </div>
//                 ) : (
//                   <button
//                     onClick={() => setIsAddressModalOpen(true)}
//                     className={`w-full p-4 border-2 rounded-lg text-center ${
//                       formErrors.address ? 'border-red-500 bg-red-50' : 'border-dashed border-gray-300'
//                     }`}
//                   >
//                     <span className={formErrors.address ? 'text-red-600' : 'text-gray-600'}>
//                       + Add delivery address
//                     </span>
//                   </button>
//                 )}
//               </div>

//               <div className="bg-white rounded-lg p-4 shadow-sm">
//                 <div className="flex items-center gap-3">
//                   <HiTruck className="w-6 h-6 text-green-500 flex-shrink-0" />
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center justify-between">
//                       <h4 className="font-medium">Delivery Instructions</h4>
//                       <button
//                         onClick={() => setIsDeliveryInstructionsModalOpen(true)}
//                         className="text-green-600 flex-shrink-0"
//                       >
//                         <FiEdit3 className="w-4 h-4" />
//                       </button>
//                     </div>
//                     <p className="text-sm text-gray-600 line-clamp-2">{formData.deliveryInstructions}</p>
//                   </div>
//                 </div>
//               </div>
//             </>
//           ) : (
//             <div className="bg-white rounded-lg p-4 shadow-sm">
//               <h3 className="font-semibold mb-3">Store Location</h3>
//               <div className="relative h-40 bg-gray-200 rounded-lg mb-3 overflow-hidden">
//                 <Image
//                   src="/images/bakery/Frame.png"
//                   alt="Store location"
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//               <div className="flex items-center gap-2 text-gray-700">
//                 <FaLocationDot className="w-5 h-5 text-red-500" />
//                 <span>Festac Town, Lagos</span>
//               </div>
//             </div>
//           )}

//           <form ref={formRef} className="bg-white rounded-lg p-4 shadow-sm space-y-4">
//             <div>
//               <label className="block text-sm font-semibold mb-2">
//                 FULL NAME<span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 value={formData.fullName}
//                 onChange={(e) => handleInputChange('fullName', e.target.value)}
//                 placeholder="Enter your full name"
//                 className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none ${
//                   formErrors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-300'
//                 }`}
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold mb-2">
//                 EMAIL<span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="email"
//                 value={formData.email}
//                 onChange={(e) => handleInputChange('email', e.target.value)}
//                 placeholder="Enter your email"
//                 className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none ${
//                   formErrors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
//                 }`}
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold mb-2">
//                 PHONE NUMBER<span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="tel"
//                 value={formData.phoneNumber}
//                 onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
//                 className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none ${
//                   formErrors.phoneNumber ? 'border-red-500 bg-red-50' : 'border-gray-300'
//                 }`}
//                 required
//               />
//             </div>

//             <div className="flex items-center gap-2 text-sm text-gray-600">
//               <IoMdLock className="w-4 h-4" />
//               <span>Your details are safe and secure</span>
//             </div>
//           </form>

//           <div className="bg-white rounded-lg p-4 shadow-sm">
//             <h3 className="font-semibold mb-4">Payment Method</h3>
//             <div className="space-y-2">
//               {(['pay-on-delivery', 'pay-now', 'installments'] as PaymentMethod[]).map((method) => (
//                 <button
//                   key={method}
//                   onClick={() => setPaymentMethod(method)}
//                   className={`w-full p-3 border-2 rounded-lg text-left font-medium transition ${
//                     paymentMethod === method 
//                       ? 'border-green-500 bg-green-50 text-green-700' 
//                       : 'border-gray-300 text-gray-700'
//                   }`}
//                 >
//                   {method === 'pay-on-delivery' && 'Pay on Delivery'}
//                   {method === 'pay-now' && 'Pay Now'}
//                   {method === 'installments' && 'Pay in Installments'}
//                 </button>
//               ))}
//             </div>

//             {paymentMethod === 'installments' && (
//               <div className="mt-4">
//                 <label className="block text-sm font-semibold mb-2">
//                   Upfront Amount<span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="number"
//                   value={upfrontAmount}
//                   onChange={(e) => {
//                     setUpfrontAmount(e.target.value);
//                     setFormErrors(prev => ({ ...prev, upfrontAmount: false }));
//                   }}
//                   placeholder="Enter amount"
//                   className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none ${
//                     formErrors.upfrontAmount ? 'border-red-500 bg-red-50' : 'border-gray-300'
//                   }`}
//                 />
//               </div>
//             )}
//           </div>

//           <div className="bg-white rounded-lg p-4 shadow-sm">
//             <h3 className="font-semibold mb-4">Order Summary</h3>
//             <div className="space-y-2 mb-4">
//               <div className="flex justify-between text-gray-600">
//                 <span>Subtotal</span>
//                 <span>{formatPrice(subtotal)}</span>
//               </div>
//               {deliveryMethod === 'Delivery' && (
//                 <div className="flex justify-between text-gray-600">
//                   <span>Delivery Fee</span>
//                   <span>{formatPrice(deliveryFee)}</span>
//                 </div>
//               )}
//               <div className="flex justify-between text-gray-600">
//                 <span>Tax</span>
//                 <span>{formatPrice(tax)}</span>
//               </div>
//               <div className="border-t pt-2">
//                 <div className="flex justify-between font-bold text-lg">
//                   <span>Total</span>
//                   <span className="text-green-600">{formatPrice(total)}</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-lg lg:hidden">
//             <button
//               onClick={handleConfirmOrder}
//               disabled={isProcessing}
//               className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white py-4 rounded-lg font-medium text-lg shadow-lg"
//             >
//               {isProcessing ? 'Processing...' : 'Confirm Order'}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Desktop Layout */}
//       <div className="hidden lg:block">
//         <div className="max-w-7xl mx-auto p-8">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Left Column */}
//             <div className="space-y-6">
//               <div className="flex items-center justify-between bg-white rounded-lg p-6 shadow-sm">
//                 <h1 className="text-2xl font-bold">Delivery Details</h1>
//                 <div className="flex bg-gray-100 rounded-full p-1">
//                   <button
//                     onClick={() => setDeliveryMethod('Delivery')}
//                     className={`py-2 px-6 rounded-full text-sm font-medium transition ${
//                       deliveryMethod === 'Delivery'
//                         ? 'bg-white text-green-600 shadow-sm'
//                         : 'text-gray-600'
//                     }`}
//                   >
//                     Delivery
//                   </button>
//                   <button
//                     onClick={() => setDeliveryMethod('Pickup')}
//                     className={`py-2 px-6 rounded-full text-sm font-medium transition ${
//                       deliveryMethod === 'Pickup'
//                         ? 'bg-white text-green-600 shadow-sm'
//                         : 'text-gray-600'
//                     }`}
//                   >
//                     Pick up
//                   </button>
//                 </div>
//               </div>

//               {deliveryMethod === 'Delivery' ? (
//                 <>
//                   <div className="bg-white rounded-lg p-6 shadow-sm">
//                     <div className="flex items-center justify-between mb-4">
//                       <h3 className="font-bold text-xl">Enter Your Address</h3>
//                       <button
//                         onClick={() => setIsAddressModalOpen(true)}
//                         className="w-10 h-10 border-2 border-green-500 rounded-full flex items-center justify-center hover:bg-green-50"
//                       >
//                         <ChevronRight className="w-5 h-5 text-green-500" />
//                       </button>
//                     </div>
//                     <p className="text-gray-600 text-sm mb-4">Select all your location information</p>
                    
//                     {selectedAddress ? (
//                       <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
//                         <FaLocationDot className="w-6 h-6 text-red-500" />
//                         <div className="flex-1">
//                           <p className="font-medium text-lg">{selectedAddress.location}</p>
//                           <p className="text-gray-600">{selectedAddress.subtitle}</p>
//                         </div>
//                         <button
//                           onClick={() => setIsAddressModalOpen(true)}
//                           className="text-green-600"
//                         >
//                           <FiEdit3 className="w-5 h-5" />
//                         </button>
//                       </div>
//                     ) : (
//                       <button
//                         onClick={() => setIsAddressModalOpen(true)}
//                         className={`w-full p-6 border-2 rounded-lg text-center transition ${
//                           formErrors.address ? 'border-red-500 bg-red-50' : 'border-dashed border-gray-300 hover:border-green-300'
//                         }`}
//                       >
//                         <span className={formErrors.address ? 'text-red-600 font-medium' : 'text-gray-600'}>
//                           + Add delivery address
//                         </span>
//                       </button>
//                     )}
//                   </div>

//                   <div className="bg-white rounded-lg p-6 shadow-sm">
//                     <div className="flex items-center gap-4">
//                       <HiTruck className="w-10 h-10 text-green-500" />
//                       <div className="flex-1">
//                         <div className="flex items-center justify-between">
//                           <h4 className="font-bold text-xl">Delivery Instructions</h4>
//                           <button
//                             onClick={() => setIsDeliveryInstructionsModalOpen(true)}
//                             className="text-green-600"
//                           >
//                             <FiEdit3 className="w-5 h-5" />
//                           </button>
//                         </div>
//                         <p className="text-gray-600">{formData.deliveryInstructions}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </>
//               ) : (
//                 <div className="bg-white rounded-lg p-6 shadow-sm space-y-4">
//                   <h3 className="font-bold text-xl">Store Location</h3>
//                   <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden">
//                     <Image
//                       src="/images/bakery/Frame.png"
//                       alt="Store location"
//                       fill
//                       className="object-cover"
//                     />
//                   </div>
//                   <div className="flex items-center gap-2 text-lg">
//                     <FaLocationDot className="w-6 h-6 text-red-500" />
//                     <span className="font-medium">Festac Town, Lagos</span>
//                   </div>
//                 </div>
//               )}

//               <form ref={formRef} className="bg-white rounded-lg p-6 shadow-sm space-y-4">
//                 <div>
//                   <label className="block text-sm font-semibold mb-2">
//                     FULL NAME<span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.fullName}
//                     onChange={(e) => handleInputChange('fullName', e.target.value)}
//                     placeholder="Enter your full name"
//                     className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none ${
//                       formErrors.fullName ? 'border-red-500' : 'border-gray-300'
//                     }`}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold mb-2">
//                     EMAIL<span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="email"
//                     value={formData.email}
//                     onChange={(e) => handleInputChange('email', e.target.value)}
//                     placeholder="Enter your email"
//                     className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none ${
//                       formErrors.email ? 'border-red-500' : 'border-gray-300'
//                     }`}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold mb-2">
//                     PHONE NUMBER<span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="tel"
//                     value={formData.phoneNumber}
//                     onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
//                     className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none ${
//                       formErrors.phoneNumber ? 'border-red-500' : 'border-gray-300'
//                     }`}
//                     required
//                   />
//                 </div>

// <div>
//                   <label className="block text-sm font-semibold mb-2">
//                     Password<span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="tel"
//                     value={formData.phoneNumber}
//                     onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
//                     className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none ${
//                       formErrors.phoneNumber ? 'border-red-500' : 'border-gray-300'
//                     }`}
//                     required
//                   />
//                 </div>
//                 <div className="flex items-center gap-2 text-sm text-gray-600">
//                   <IoMdLock className="w-4 h-4" />
//                   <span>Your details are safe and secure</span>
//                 </div>
//               </form>

//               <div className="bg-white rounded-lg p-6 shadow-sm">
//                 <h3 className="font-semibold text-lg mb-4">Payment Method</h3>
//                 <div className="grid grid-cols-3 gap-4 mb-4">
//                   {(['pay-on-delivery', 'pay-now', 'installments'] as PaymentMethod[]).map((method) => (
//                     <button
//                       key={method}
//                       onClick={() => setPaymentMethod(method)}
//                       className={`p-4 border-2 rounded-lg text-center font-medium transition ${
//                         paymentMethod === method 
//                           ? 'border-green-500 bg-green-50' 
//                           : 'border-gray-300 hover:border-green-300'
//                       }`}
//                     >
//                       {method === 'pay-on-delivery' && 'Pay on Delivery'}
//                       {method === 'pay-now' && 'Pay Now'}
//                       {method === 'installments' && 'Installments'}
//                     </button>
//                   ))}
//                 </div>
                
//                 {paymentMethod === 'installments' && (
//                   <div>
//                     <label className="block text-sm font-semibold mb-2">
//                       Upfront Amount<span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="number"
//                       value={upfrontAmount}
//                       onChange={(e) => {
//                         setUpfrontAmount(e.target.value);
//                         setFormErrors(prev => ({ ...prev, upfrontAmount: false }));
//                       }}
//                       placeholder="Enter upfront amount"
//                       className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none ${
//                         formErrors.upfrontAmount ? 'border-red-500' : 'border-gray-300'
//                       }`}
//                     />
//                   </div>
//                 )}
//               </div>

//               <div className="bg-white rounded-lg p-6 shadow-sm space-y-4">
//                 <button className="flex items-center justify-between w-full p-4 hover:bg-gray-50 rounded-lg transition">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
//                       <LuNut className="w-5 h-5" />
//                     </div>
//                     <span className="font-semibold">ANY ALLERGIES?</span>
//                   </div>
//                   <ChevronRight className="w-5 h-5" />
//                 </button>

//                 <button className="flex items-center justify-between w-full p-4 hover:bg-gray-50 rounded-lg transition">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
//                       <RiTodoLine className="w-5 h-5" />
//                     </div>
//                     <span className="font-semibold">SPECIAL INSTRUCTIONS</span>
//                   </div>
//                   <ChevronRight className="w-5 h-5" />
//                 </button>

//                 <button
//                   onClick={handleConfirmOrder}
//                   disabled={isProcessing}
//                   className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white py-4 rounded-lg font-medium text-lg transition"
//                 >
//                   {isProcessing ? 'Processing...' : 'Confirm Order'}
//                 </button>
//               </div>
//             </div>

//             {/* Right Column - Order Summary */}
//             <div className="bg-white rounded-lg p-6 shadow-sm h-fit sticky top-8">
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="font-semibold text-lg">Cart Items</h3>
//                 <button 
//                   onClick={() => router.push('/')}
//                   className="text-green-600 text-sm hover:underline"
//                 >
//                   Add more items
//                 </button>
//               </div>

//               <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
//                 {cartItems.map((item) => (
//                   <div key={item.itemId} className="flex gap-4 pb-4 border-b last:border-0">
//                     <Image
//                       src={item.image}
//                       alt={item.name}
//                       width={80}
//                       height={80}
//                       className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
//                     />
//                     <div className="flex-1">
//                       <div className="flex justify-between items-start mb-2">
//                         <div>
//                           <h4 className="font-medium">{item.name}</h4>
//                           {item.description && (
//                             <p className="text-sm text-gray-600 line-clamp-1">{item.description}</p>
//                           )}
//                         </div>
//                         <button
//                           onClick={() => removeFromCart(item.id)}
//                           className="text-red-500 hover:text-red-700 p-1"
//                         >
//                           <MdOutlineDelete className="w-5 h-5" />
//                         </button>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <span className="text-green-600 font-bold">{formatPrice(item.price)}</span>
//                         <div className="flex items-center gap-2">
//                           <button
//                             onClick={() => handleQuantityChange(item.id, false, item.quantity)}
//                             className="w-8 h-8 border rounded-full flex items-center justify-center hover:bg-gray-50"
//                           >
//                             <Minus className="w-4 h-4" />
//                           </button>
//                           <span className="w-8 text-center font-medium">{item.quantity}</span>
//                           <button
//                             onClick={() => handleQuantityChange(item.id, true, item.quantity)}
//                             className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600"
//                           >
//                             <Plus className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="bg-gray-50 rounded-lg p-4 space-y-2">
//                 <div className="flex justify-between text-gray-600">
//                   <span>Subtotal</span>
//                   <span>{formatPrice(subtotal)}</span>
//                 </div>
//                 {deliveryMethod === 'Delivery' && (
//                   <div className="flex justify-between text-gray-600">
//                     <span>Delivery Fee</span>
//                     <span>{formatPrice(deliveryFee)}</span>
//                   </div>
//                 )}
//                 <div className="flex justify-between text-gray-600">
//                   <span>Tax</span>
//                   <span>{formatPrice(tax)}</span>
//                 </div>
//                 <div className="border-t border-gray-300 pt-2">
//                   <div className="flex justify-between font-bold text-xl">
//                     <span>Total</span>
//                     <span className="text-green-600">{formatPrice(total)}</span>
//                   </div>
//                 </div>
//               </div>

//               <p className="text-xs text-gray-500 mt-4">
//                 Please be available when the delivery person arrives. By placing your order, 
//                 you agree to take full responsibility for it once it&apos;s delivered.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <AddressModal
//         isOpen={isAddressModalOpen}
//         onClose={() => setIsAddressModalOpen(false)}
//         onSelectAddress={handleSelectAddress}
//       />
//       <DeliveryInstructionsModal
//         isOpen={isDeliveryInstructionsModalOpen}
//         onClose={() => setIsDeliveryInstructionsModalOpen(false)}
//         currentInstructions={formData.deliveryInstructions}
//         onSave={handleSaveDeliveryInstructions}
//       />
//     </div>
//   );
// }



'use client';
import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, X, Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import { orderService } from '@/service/orderService';
// import { AuthService } from '@/lib/api/authService';
import { AuthService } from '@/service/authService';
import { HiTruck } from "react-icons/hi";
import { FiEdit3 } from "react-icons/fi";
import { IoMdLock } from 'react-icons/io';
import { LuNut } from 'react-icons/lu';
import { RiTodoLine } from 'react-icons/ri';
import { FaLocationDot } from 'react-icons/fa6';
import { MdOutlineDelete } from 'react-icons/md';
import toast from 'react-hot-toast';
import { DeliveryInstructionsModal } from './DeliveryInstructionsModal';
import { AddressModal, type Address } from './AddressModal';

type DeliveryMethod = 'Delivery' | 'Pickup';
type PaymentMethod = 'pay-on-delivery' | 'pay-now' | 'installments';

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('Delivery');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pay-on-delivery');
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [tempAddress, setTempAddress] = useState<Address | null>(null); // Temporary address storage
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isDeliveryInstructionsModalOpen, setIsDeliveryInstructionsModalOpen] = useState(false);
  const [upfrontAmount, setUpfrontAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '+234',
    password: '', // Added password field
    deliveryInstructions: ''
  });

  const [formErrors, setFormErrors] = useState({
    fullName: false,
    email: false,
    phoneNumber: false,
    password: false, // Added password error
    address: false,
    upfrontAmount: false
  });

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const orderId = localStorage.getItem('orderId');
    if (!orderId) {
      toast.error('No active order found. Please add items to cart first.');
      router.push('/');
    }
  }, [router]);

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const deliveryFee = deliveryMethod === 'Delivery' ? 5.09 : 0;
  const tax = subtotal * 0.089;
  const total = subtotal + deliveryFee + tax;

  const validateForm = (): boolean => {
    const errors = {
      fullName: !formData.fullName.trim(),
      email: !formData.email.trim() || !formData.email.includes('@'),
      phoneNumber: !formData.phoneNumber.trim() || formData.phoneNumber === '+234',
      password: !formData.password.trim() || formData.password.length < 6, // Basic password validation
      address: deliveryMethod === 'Delivery' && !selectedAddress && !tempAddress,
      upfrontAmount: paymentMethod === 'installments' && (!upfrontAmount.trim() || parseFloat(upfrontAmount) <= 0)
    };
    
    setFormErrors(errors);
    
    if (Object.values(errors).some(error => error)) {
      if (errors.fullName) toast.error('Please enter your full name');
      else if (errors.email) toast.error('Please enter a valid email');
      else if (errors.phoneNumber) toast.error('Please enter a valid phone number');
      else if (errors.password) toast.error('Please enter a password (minimum 6 characters)');
      else if (errors.address) toast.error('Please select or add a delivery address');
      else if (errors.upfrontAmount) toast.error('Please enter a valid upfront amount');
      return false;
    }
    
    return true;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setFormErrors(prev => ({ ...prev, [field]: false }));
  };

  const handleConfirmOrder = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (isProcessing) return;

    setIsProcessing(true);
    const toastId = toast.loading('Processing order...');

    try {
      // Step 1: Sign up the user
      const signupResponse = await AuthService.signup({
        email: formData.email,
        name: formData.fullName,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        orderId: localStorage.getItem('orderId') || undefined
      });

      // Step 2: Store customer ID from signup response
      const customerId = signupResponse.userId;
      localStorage.setItem('customerId', customerId);

      // Step 3: If there's a temporary address, create it using the access token
      let addressId = selectedAddress?.id;
      if (tempAddress && !selectedAddress) {
        const token = localStorage.getItem('accessToken');
        if (!token) throw new Error('Authentication token not found');

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://jellyfish-app-dvaxa.ondigitalocean.app'}/customer/auth/address-new`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(tempAddress),
        });

        if (!response.ok) {
          throw new Error('Failed to add address');
        }

        const addedAddress = await response.json();
        addressId = addedAddress.id;
        setSelectedAddress(addedAddress); // Update selected address
      }

      // Step 4: Complete checkout
      const orderId = localStorage.getItem('orderId');
      if (!orderId) throw new Error('Order ID not found');
      if (!addressId) throw new Error('Address ID not found');

      await orderService.checkoutOrder(orderId, {
        addressId,
        customerId,
        deliveryMethod,
        specialInstructions: formData.deliveryInstructions
      });

      // Step 5: Store customer details for payment page
      localStorage.setItem('addressId', addressId);
      localStorage.setItem('customerName', formData.fullName);
      localStorage.setItem('customerEmail', formData.email);
      localStorage.setItem('customerPhone', formData.phoneNumber);

      toast.success('Order confirmed!', { id: toastId });
      router.push('/payment');
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to complete checkout',
        { id: toastId }
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSelectAddress = (address: Address) => {
    setSelectedAddress(address);
    setTempAddress(null); // Clear temp address if selecting an existing one
    setFormErrors(prev => ({ ...prev, address: false }));
  };

  const handleAddNewAddress = (address: Address) => {
    setTempAddress(address); // Store address temporarily
    setFormErrors(prev => ({ ...prev, address: false }));
  };

  const handleSaveDeliveryInstructions = (instructions: string) => {
    setFormData(prev => ({ ...prev, deliveryInstructions: instructions }));
  };

  const handleQuantityChange = async (productId: string, increment: boolean, currentQuantity: number) => {
    const newQuantity = increment ? currentQuantity + 1 : currentQuantity - 1;
    if (newQuantity <= 0) {
      await removeFromCart(productId);
    } else {
      await updateQuantity(productId, newQuantity);
    }
  };

  const formatPrice = (price: number) => `€${price.toFixed(2)}`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="bg-white p-4 border-b sticky top-0 z-10 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-bold">Checkout</h1>
            <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setDeliveryMethod('Delivery')}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition ${
                deliveryMethod === 'Delivery' 
                  ? 'bg-white text-green-600 shadow-sm' 
                  : 'text-gray-600'
              }`}
            >
              Delivery
            </button>
            <button
              onClick={() => setDeliveryMethod('Pickup')}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition ${
                deliveryMethod === 'Pickup' 
                  ? 'bg-white text-green-600 shadow-sm' 
                  : 'text-gray-600'
              }`}
            >
              Pick up
            </button>
          </div>
        </div>

        <div className="p-4 space-y-4 pb-32">
          {deliveryMethod === 'Delivery' ? (
            <>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Delivery Address</h3>
                  <button
                    onClick={() => setIsAddressModalOpen(true)}
                    className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                  >
                    <ChevronRight className="w-4 h-4 text-white" />
                  </button>
                </div>
                
                {selectedAddress || tempAddress ? (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <FaLocationDot className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{(selectedAddress || tempAddress)?.street}</p>
                      <p className="text-sm text-gray-600 truncate">{(selectedAddress || tempAddress)?.city}, {(selectedAddress || tempAddress)?.state}, {(selectedAddress || tempAddress)?.country}</p>
                    </div>
                    <button
                      onClick={() => setIsAddressModalOpen(true)}
                      className="text-green-600 flex-shrink-0"
                    >
                      <FiEdit3 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsAddressModalOpen(true)}
                    className={`w-full p-4 border-2 rounded-lg text-center ${
                      formErrors.address ? 'border-red-500 bg-red-50' : 'border-dashed border-gray-300'
                    }`}
                  >
                    <span className={formErrors.address ? 'text-red-600' : 'text-gray-600'}>
                      + Add delivery address
                    </span>
                  </button>
                )}
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <HiTruck className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Delivery Instructions</h4>
                      <button
                        onClick={() => setIsDeliveryInstructionsModalOpen(true)}
                        className="text-green-600 flex-shrink-0"
                      >
                        <FiEdit3 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{formData.deliveryInstructions}</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold mb-3">Store Location</h3>
              <div className="relative h-40 bg-gray-200 rounded-lg mb-3 overflow-hidden">
                <Image
                  src="/images/bakery/Frame.png"
                  alt="Store location"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <FaLocationDot className="w-5 h-5 text-red-500" />
                <span>Festac Town, Lagos</span>
              </div>
            </div>
          )}

          <form ref={formRef} className="bg-white rounded-lg p-4 shadow-sm space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">
                FULL NAME<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="Enter your full name"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none ${
                  formErrors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                EMAIL<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none ${
                  formErrors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                PHONE NUMBER<span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none ${
                  formErrors.phoneNumber ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                PASSWORD<span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Enter your password"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none ${
                  formErrors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                required
              />
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <IoMdLock className="w-4 h-4" />
              <span>Your details are safe and secure</span>
            </div>
          </form>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold mb-4">Payment Method</h3>
            <div className="space-y-2">
              {(['pay-on-delivery', 'pay-now', 'installments'] as PaymentMethod[]).map((method) => (
                <button
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`w-full p-3 border-2 rounded-lg text-left font-medium transition ${
                    paymentMethod === method 
                      ? 'border-green-500 bg-green-50 text-green-700' 
                      : 'border-gray-300 text-gray-700'
                  }`}
                >
                  {method === 'pay-on-delivery' && 'Pay on Delivery'}
                  {method === 'pay-now' && 'Pay Now'}
                  {method === 'installments' && 'Pay in Installments'}
                </button>
              ))}
            </div>

            {paymentMethod === 'installments' && (
              <div className="mt-4">
                <label className="block text-sm font-semibold mb-2">
                  Upfront Amount<span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={upfrontAmount}
                  onChange={(e) => {
                    setUpfrontAmount(e.target.value);
                    setFormErrors(prev => ({ ...prev, upfrontAmount: false }));
                  }}
                  placeholder="Enter amount"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none ${
                    formErrors.upfrontAmount ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                />
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {deliveryMethod === 'Delivery' && (
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>{formatPrice(deliveryFee)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-green-600">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-lg lg:hidden">
            <button
              onClick={handleConfirmOrder}
              disabled={isProcessing}
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white py-4 rounded-lg font-medium text-lg shadow-lg"
            >
              {isProcessing ? 'Processing...' : 'Confirm Order'}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white rounded-lg p-6 shadow-sm">
                <h1 className="text-2xl font-bold">Delivery Details</h1>
                <div className="flex bg-gray-100 rounded-full p-1">
                  <button
                    onClick={() => setDeliveryMethod('Delivery')}
                    className={`py-2 px-6 rounded-full text-sm font-medium transition ${
                      deliveryMethod === 'Delivery'
                        ? 'bg-white text-green-600 shadow-sm'
                        : 'text-gray-600'
                    }`}
                  >
                    Delivery
                  </button>
                  <button
                    onClick={() => setDeliveryMethod('Pickup')}
                    className={`py-2 px-6 rounded-full text-sm font-medium transition ${
                      deliveryMethod === 'Pickup'
                        ? 'bg-white text-green-600 shadow-sm'
                        : 'text-gray-600'
                    }`}
                  >
                    Pick up
                  </button>
                </div>
              </div>

              {deliveryMethod === 'Delivery' ? (
                <>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-xl">Enter Your Address</h3>
                      <button
                        onClick={() => setIsAddressModalOpen(true)}
                        className="w-10 h-10 border-2 border-green-500 rounded-full flex items-center justify-center hover:bg-green-50"
                      >
                        <ChevronRight className="w-5 h-5 text-green-500" />
                      </button>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">Select all your location information</p>
                    
                    {selectedAddress || tempAddress ? (
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                        <FaLocationDot className="w-6 h-6 text-red-500" />
                        <div className="flex-1">
                          <p className="font-medium text-lg">{(selectedAddress || tempAddress)?.street}</p>
                          <p className="text-gray-600">{(selectedAddress || tempAddress)?.city}, {(selectedAddress || tempAddress)?.state}, {(selectedAddress || tempAddress)?.country}</p>
                        </div>
                        <button
                          onClick={() => setIsAddressModalOpen(true)}
                          className="text-green-600"
                        >
                          <FiEdit3 className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setIsAddressModalOpen(true)}
                        className={`w-full p-6 border-2 rounded-lg text-center transition ${
                          formErrors.address ? 'border-red-500 bg-red-50' : 'border-dashed border-gray-300 hover:border-green-300'
                        }`}
                      >
                        <span className={formErrors.address ? 'text-red-600 font-medium' : 'text-gray-600'}>
                          + Add delivery address
                        </span>
                      </button>
                    )}
                  </div>

                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex items-center gap-4">
                      <HiTruck className="w-10 h-10 text-green-500" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-xl">Delivery Instructions</h4>
                          <button
                            onClick={() => setIsDeliveryInstructionsModalOpen(true)}
                            className="text-green-600"
                          >
                            <FiEdit3 className="w-5 h-5" />
                          </button>
                        </div>
                        <p className="text-gray-600">{formData.deliveryInstructions}</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-white rounded-lg p-6 shadow-sm space-y-4">
                  <h3 className="font-bold text-xl">Store Location</h3>
                  <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden">
                    <Image
                      src="/images/bakery/Frame.png"
                      alt="Store location"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-lg">
                    <FaLocationDot className="w-6 h-6 text-red-500" />
                    <span className="font-medium">Festac Town, Lagos</span>
                  </div>
                </div>
              )}

              <form ref={formRef} className="bg-white rounded-lg p-6 shadow-sm space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    FULL NAME<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Enter your full name"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none ${
                      formErrors.fullName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    EMAIL<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none ${
                      formErrors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    PHONE NUMBER<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none ${
                      formErrors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    PASSWORD<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Enter your password"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none ${
                      formErrors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <IoMdLock className="w-4 h-4" />
                  <span>Your details are safe and secure</span>
                </div>
              </form>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-4">Payment Method</h3>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {(['pay-on-delivery', 'pay-now', 'installments'] as PaymentMethod[]).map((method) => (
                    <button
                      key={method}
                      onClick={() => setPaymentMethod(method)}
                      className={`p-4 border-2 rounded-lg text-center font-medium transition ${
                        paymentMethod === method 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-300 hover:border-green-300'
                      }`}
                    >
                      {method === 'pay-on-delivery' && 'Pay on Delivery'}
                      {method === 'pay-now' && 'Pay Now'}
                      {method === 'installments' && 'Installments'}
                    </button>
                  ))}
                </div>
                
                {paymentMethod === 'installments' && (
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Upfront Amount<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={upfrontAmount}
                      onChange={(e) => {
                        setUpfrontAmount(e.target.value);
                        setFormErrors(prev => ({ ...prev, upfrontAmount: false }));
                      }}
                      placeholder="Enter upfront amount"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none ${
                        formErrors.upfrontAmount ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                )}
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm space-y-4">
                <button className="flex items-center justify-between w-full p-4 hover:bg-gray-50 rounded-lg transition">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <LuNut className="w-5 h-5" />
                    </div>
                    <span className="font-semibold">ANY ALLERGIES?</span>
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </button>

                <button className="flex items-center justify-between w-full p-4 hover:bg-gray-50 rounded-lg transition">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <RiTodoLine className="w-5 h-5" />
                    </div>
                    <span className="font-semibold">SPECIAL INSTRUCTIONS</span>
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </button>

                <button
                  onClick={handleConfirmOrder}
                  disabled={isProcessing}
                  className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white py-4 rounded-lg font-medium text-lg transition"
                >
                  {isProcessing ? 'Processing...' : 'Confirm Order'}
                </button>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="bg-white rounded-lg p-6 shadow-sm h-fit sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg">Cart Items</h3>
                <button 
                  onClick={() => router.push('/')}
                  className="text-green-600 text-sm hover:underline"
                >
                  Add more items
                </button>
              </div>

              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.itemId} className="flex gap-4 pb-4 border-b last:border-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          {item.description && (
                            <p className="text-sm text-gray-600 line-clamp-1">{item.description}</p>
                          )}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <MdOutlineDelete className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-green-600 font-bold">{formatPrice(item.price)}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, false, item.quantity)}
                            className="w-8 h-8 border rounded-full flex items-center justify-center hover:bg-gray-50"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, true, item.quantity)}
                            className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {deliveryMethod === 'Delivery' && (
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span>{formatPrice(deliveryFee)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="border-t border-gray-300 pt-2">
                  <div className="flex justify-between font-bold text-xl">
                    <span>Total</span>
                    <span className="text-green-600">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-4">
                Please be available when the delivery person arrives. By placing your order, 
                you agree to take full responsibility for it once it&apos;s delivered.
              </p>
            </div>
          </div>
        </div>
      </div>

      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onSelectAddress={handleSelectAddress}
        onAddAddress={handleAddNewAddress}
      />
      <DeliveryInstructionsModal
        isOpen={isDeliveryInstructionsModalOpen}
        onClose={() => setIsDeliveryInstructionsModalOpen(false)}
        currentInstructions={formData.deliveryInstructions}
        onSave={handleSaveDeliveryInstructions}
      />
    </div>
  );
}