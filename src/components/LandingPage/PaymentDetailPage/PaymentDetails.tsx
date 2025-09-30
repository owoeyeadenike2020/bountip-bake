// 'use client';
// import React, { useState } from 'react';
// import { X, Copy, Upload, User, Mail, Tag, MapPin, Clock, Phone, Truck } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import { useCart } from '@/hooks/useCart';
// import { OrderSuccessModal } from './OrderSuccessModal';

// type PaymentStep = 'bank-transfer' | 'upload-proof' | 'confirm';

// export default function PaymentDetailsPage() {
//   const router = useRouter();
//   const { cartItems, getCartTotal } = useCart();
//   const [currentStep, setCurrentStep] = useState<PaymentStep>('bank-transfer');
//   const [uploadedFile, setUploadedFile] = useState<File | null>(null);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);

//   // Mock user and order data
//   const userData = {
//     name: 'John Doe',
//     email: 'John@example.com'
//   };

//   const orderData = {
//     orderNumber: '#00002234III',
//     items: cartItems.map(item => ({
//       name: item.name,
//       quantity: item.quantity,
//       price: item.price
//     })),
//     deliveryMethod: 'Delivery',
//     address: '123, Festac Town, Lagos',
//     deliveryTime: 'Under 30 mins',
//     phone: '+234 (802) 345 - 6780',
//     deliveryService: 'Uber Eats'
//   };

//   const bankDetails = {
//     bankName: 'First Bank of Nigeria',
//     accountNumber: '0001234005',
//     amount: getCartTotal()
//   };

//   const handleCopyToClipboard = (text: string) => {
//     navigator.clipboard.writeText(text);
//     alert('Copied to clipboard!');
//   };

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setUploadedFile(file);
//       setCurrentStep('confirm');
//     }
//   };

//   const handleProceedToPayment = () => {
//     console.log('Processing payment...');
//     // alert('Payment submitted successfully!');
//     setShowSuccessModal(true);
//   };

//   const formatPrice = (price: number) => `£${price.toFixed(2)}`;

//   const progressWidth = currentStep === 'bank-transfer' ? '50%' : currentStep === 'upload-proof' ? '75%' : '100%';

//   function handleSuccessModalClose(): void {
//     setShowSuccessModal(false);
//     router.push('/'); // Redirect to home or another page after closing modal
//   }

//   return (
//     <div>
//     <div className="min-h-screen">
//       {/* Mobile View */}
//       <div className="lg:hidden">
//         <div className="bg-white p-4 border-b border-gray-200">
//           <div className="flex items-center justify-between mb-4">
//             <h1 className="text-xl font-bold">Payment Details</h1>
//             <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full">
//               <X className="w-5 h-5" />
//             </button>
//           </div>
          
//           {/* Progress Bar */}
//           <div className="w-full bg-gray-200 rounded-full h-2">
//             <div 
//               className="bg-green-500 h-2 rounded-full transition-all duration-300"
//               style={{ width: progressWidth }}
//             />
//           </div>
//         </div>

//         <div className="p-4 space-y-6">
//           {/* Bank Transfer Step */}
//           {currentStep === 'bank-transfer' && (
//             <>
//               <div className="bg-white rounded-lg p-6 space-y-4">
//                 <h2 className="font-bold text-lg mb-4">Transfer {formatPrice(bankDetails.amount)} to the account below</h2>
                
//                 <div className="space-y-4">
//                   <div>
//                     <p className="text-xs text-gray-500 mb-1">BANK NAME</p>
//                     <p className="font-medium">{bankDetails.bankName}</p>
//                   </div>

//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-xs text-gray-500 mb-1">ACCOUNT NUMBER</p>
//                       <p className="font-medium">{bankDetails.accountNumber}</p>
//                     </div>
//                     <button 
//                       onClick={() => handleCopyToClipboard(bankDetails.accountNumber)}
//                       className="text-green-600 flex items-center gap-1 text-sm"
//                     >
//                       <Copy className="w-4 h-4" />
//                       Copy
//                     </button>
//                   </div>

//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-xs text-gray-500 mb-1">AMOUNT</p>
//                       <p className="font-medium">{formatPrice(bankDetails.amount)}</p>
//                     </div>
//                     <button 
//                       onClick={() => handleCopyToClipboard(bankDetails.amount.toString())}
//                       className="text-green-600 flex items-center gap-1 text-sm"
//                     >
//                       <Copy className="w-4 h-4" />
//                       Copy
//                     </button>
//                   </div>
//                 </div>

//                 <p className="text-xs text-gray-500 mt-4">
//                   Search for the bank name (first bank) on your bank app. Use this account for this transaction only
//                 </p>

//                 <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
//                   <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mt-0.5">!</div>
//                   <p className="text-red-600 text-sm">Payment must be made 30 mins after order submission</p>
//                 </div>
//               </div>

//               <button
//                 onClick={() => setCurrentStep('upload-proof')}
//                 className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-lg font-medium"
//               >
//                 Continue to Upload Proof
//               </button>
//             </>
//           )}

//           {/* Upload Proof Step */}
//           {currentStep === 'upload-proof' && (
//             <>
//               <div className="bg-white rounded-lg p-6">
//                 <h2 className="font-bold text-lg mb-2">Upload Evidence of Payment</h2>
//                 <p className="text-sm text-gray-500 mb-4">Upload</p>
                
//                 <label className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-green-500 transition-colors">
//                   <input 
//                     type="file" 
//                     accept="image/jpeg,image/png,image/svg+xml"
//                     onChange={handleFileUpload}
//                     className="hidden"
//                   />
//                   <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
//                     <Upload className="w-6 h-6 text-green-600" />
//                   </div>
//                   <p className="text-sm text-center">
//                     <span className="font-medium">Click</span> or <span className="text-green-600">Drag</span> to Upload evidence
//                   </p>
//                   <p className="text-xs text-gray-500 mt-1">jpg, png & svg up to 10mb</p>
//                 </label>
//               </div>

//               <button
//                 onClick={() => setCurrentStep('confirm')}
//                 className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-lg font-medium"
//               >
//                 Upload Proof of Payment
//               </button>
//             </>
//           )}

//           {/* Confirm Payment Step */}
//           {currentStep === 'confirm' && (
//             <>
//               <div className="space-y-4">
//                 <div className="bg-white rounded-lg p-6">
//                   <h3 className="font-bold mb-4">Account Details</h3>
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-3">
//                       <User className="w-5 h-5 text-gray-400" />
//                       <span>{userData.name}</span>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <Mail className="w-5 h-5 text-gray-400" />
//                       <span>{userData.email}</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-white rounded-lg p-6">
//                   <h3 className="font-bold mb-4">Order Details</h3>
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-3">
//                       <Tag className="w-5 h-5 text-gray-400" />
//                       <span>Order no: {orderData.orderNumber}</span>
//                     </div>
//                     {orderData.items.map((item, index) => (
//                       <div key={index} className="flex items-center gap-3">
//                         <Truck className="w-5 h-5 text-gray-400" />
//                         <span>{item.name} x{item.quantity} - {formatPrice(item.price)}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="bg-white rounded-lg p-6">
//                   <h3 className="font-bold mb-4">Delivery Details</h3>
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-3">
//                       <Truck className="w-5 h-5 text-gray-400" />
//                       <span>{orderData.deliveryMethod}</span>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <MapPin className="w-5 h-5 text-gray-400" />
//                       <span>{orderData.address}</span>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <Clock className="w-5 h-5 text-gray-400" />
//                       <span>Delivery Time: {orderData.deliveryTime}</span>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <Phone className="w-5 h-5 text-gray-400" />
//                       <span>{orderData.phone}</span>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <Truck className="w-5 h-5 text-gray-400" />
//                       <span>Delivery Service: {orderData.deliveryService}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <button
//                 onClick={handleProceedToPayment}
//                 className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-lg font-medium"
//               >
//                 Proceed to Make Payment
//               </button>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Desktop View */}
//       <div className="hidden lg:block">
//         <div className="max-w-7xl mx-auto p-8">
//           <div className="flex items-center justify-between mb-8">
//             <h1 className="text-2xl font-bold">Payment Details</h1>
//             <div className="text-right">
//               <p className="text-sm text-gray-600">Total Amount:</p>
//               <p className="text-2xl font-bold text-green-600">{formatPrice(bankDetails.amount)}</p>
//             </div>
//           </div>

//           <div className="grid grid-cols-3 gap-8">
//             {/* Left Column - Account, Order, Delivery Details */}
//             <div className="space-y-6">
//               <div className="bg-white rounded-lg p-6">
//                 <h3 className="font-bold text-lg mb-4">Account Details</h3>
//                 <div className="space-y-3">
//                   <div className="flex items-center gap-3">
//                     <User className="w-5 h-5 text-gray-400" />
//                     <span>{userData.name}</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <Mail className="w-5 h-5 text-gray-400" />
//                     <span>{userData.email}</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-white rounded-lg p-6">
//                 <h3 className="font-bold text-lg mb-4">Order Details</h3>
//                 <div className="space-y-3">
//                   <div className="flex items-center gap-3">
//                     <Tag className="w-5 h-5 text-gray-400" />
//                     <span className="text-sm">Order no: {orderData.orderNumber}</span>
//                   </div>
//                   {orderData.items.map((item, index) => (
//                     <div key={index} className="flex items-center gap-3">
//                       <Truck className="w-5 h-5 text-gray-400" />
//                       <span className="text-sm">{item.name} x{item.quantity} - {formatPrice(item.price)}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="bg-white rounded-lg p-6">
//                 <h3 className="font-bold text-lg mb-4">Delivery Details</h3>
//                 <div className="space-y-3">
//                   <div className="flex items-center gap-3">
//                     <Truck className="w-5 h-5 text-gray-400" />
//                     <span className="text-sm">{orderData.deliveryMethod}</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <MapPin className="w-5 h-5 text-gray-400" />
//                     <span className="text-sm">{orderData.address}</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <Clock className="w-5 h-5 text-gray-400" />
//                     <span className="text-sm">Delivery Time: {orderData.deliveryTime}</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <Phone className="w-5 h-5 text-gray-400" />
//                     <span className="text-sm">{orderData.phone}</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <Truck className="w-5 h-5 text-gray-400" />
//                     <span className="text-sm">Delivery Service: {orderData.deliveryService}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right Column - Payment Section */}
//             <div className="col-span-2">
//               <div className="bg-white rounded-lg p-8">
//                 <h2 className="font-bold text-xl mb-6">Transfer {formatPrice(bankDetails.amount)} to the account below</h2>
                
//                 <div className="bg-gray-50 rounded-lg p-6 space-y-4 mb-6">
//                   <div>
//                     <p className="text-xs text-gray-500 mb-1">BANK NAME</p>
//                     <p className="font-medium text-lg">{bankDetails.bankName}</p>
//                   </div>

//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-xs text-gray-500 mb-1">ACCOUNT NUMBER</p>
//                       <p className="font-medium text-lg">{bankDetails.accountNumber}</p>
//                     </div>
//                     <button 
//                       onClick={() => handleCopyToClipboard(bankDetails.accountNumber)}
//                       className="text-green-600 flex items-center gap-2"
//                     >
//                       <Copy className="w-4 h-4" />
//                       Copy
//                     </button>
//                   </div>

//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-xs text-gray-500 mb-1">AMOUNT</p>
//                       <p className="font-medium text-lg">{formatPrice(bankDetails.amount)}</p>
//                     </div>
//                     <button 
//                       onClick={() => handleCopyToClipboard(bankDetails.amount.toString())}
//                       className="text-green-600 flex items-center gap-2"
//                     >
//                       <Copy className="w-4 h-4" />
//                       Copy
//                     </button>
//                   </div>
//                 </div>

//                 <p className="text-sm text-gray-500 mb-4">
//                   Search for the bank name (first bank) on your bank app. Use this account for this transaction only
//                 </p>

//                 <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3 mb-8">
//                   <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">!</div>
//                   <p className="text-red-600">Payment must be made 30 mins after order submission</p>
//                 </div>

//                 <div className="border-t border-gray-200 pt-8">
//                   <h3 className="font-bold text-lg mb-4">Upload</h3>
                  
//                   <label className="border-2 border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center justify-center cursor-pointer hover:border-green-500 transition-colors">
//                     <input 
//                       type="file" 
//                       accept="image/jpeg,image/png,image/svg+xml"
//                       onChange={handleFileUpload}
//                       className="hidden"
//                     />
//                     <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
//                       <Upload className="w-8 h-8 text-green-600" />
//                     </div>
//                     <p className="text-center mb-2">
//                       <span className="font-medium">Click</span> or <span className="text-green-600">Drag</span> to Upload evidence
//                     </p>
//                     <p className="text-sm text-gray-500">jpg, png & svg up to 10mb</p>
//                   </label>

//                   <button
//                     onClick={handleProceedToPayment}
//                     className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-lg font-medium text-lg mt-6"
//                   >
//                     Upload Proof of Payment
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     <OrderSuccessModal 
//   isOpen={showSuccessModal} 
//   onClose={handleSuccessModalClose}
// />
// </div>
//   );
// }



'use client';
import React, { useState } from 'react';
import { X, Copy, Upload, User, Mail, Tag, MapPin, Clock, Phone, Truck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import { OrderSuccessModal } from './OrderSuccessModal';
import { toast } from 'react-toastify';

type PaymentStep = 'bank-transfer' | 'upload-proof' | 'confirm';

export default function PaymentDetailsPage() {
  const router = useRouter();
  const { cartItems, getCartTotal } = useCart();
  const [currentStep, setCurrentStep] = useState<PaymentStep>('bank-transfer');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Mock user and order data
  const userData = {
    name: 'John Doe',
    email: 'John@example.com'
  };

  const orderData = {
    orderNumber: '#00002234III',
    items: cartItems.map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price
    })),
    deliveryMethod: 'Delivery',
    address: '123, Festac Town, Lagos',
    deliveryTime: 'Under 30 mins',
    phone: '+234 (802) 345 - 6780',
    deliveryService: 'Uber Eats'
  };

  const bankDetails = {
    bankName: 'First Bank of Nigeria',
    accountNumber: '0001234005',
    amount: getCartTotal()
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!', { autoClose: 2000 });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setCurrentStep('confirm');
    }
  };

  const handleProceedToPayment = () => {
    if (!uploadedFile) {
      toast.error('Please upload a file before proceeding.', { autoClose: 3000 });
      return;
    }
    console.log('Processing payment with file:', uploadedFile.name);
    toast.success('Payment proof uploaded successfully!', { autoClose: 3000 });
    setShowSuccessModal(true);
  };

  const formatPrice = (price: number) => `€${price.toFixed(2)}`;

  const progressWidth = currentStep === 'bank-transfer' ? '50%' : currentStep === 'upload-proof' ? '75%' : '100%';

  function handleSuccessModalClose(): void {
    setShowSuccessModal(false);
    router.push('/'); // Redirect to home or another page after closing modal
  }

  return (
    <div className="min-h-screen">
      {/* Mobile View */}
      <div className="lg:hidden">
        <div className="bg-white p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold">Payment Details</h1>
            <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: progressWidth }}
            />
          </div>
        </div>

        <div className="p-4 space-y-6">
          {currentStep === 'bank-transfer' && (
            <>
              <div className="bg-white rounded-lg p-6 space-y-4">
                <h2 className="font-bold text-lg mb-4">Transfer {formatPrice(bankDetails.amount)} to the account below</h2>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">BANK NAME</p>
                    <p className="font-medium">{bankDetails.bankName}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">ACCOUNT NUMBER</p>
                      <p className="font-medium">{bankDetails.accountNumber}</p>
                    </div>
                    <button 
                      onClick={() => handleCopyToClipboard(bankDetails.accountNumber)}
                      className="text-green-600 flex items-center gap-1 text-sm"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">AMOUNT</p>
                      <p className="font-medium">{formatPrice(bankDetails.amount)}</p>
                    </div>
                    <button 
                      onClick={() => handleCopyToClipboard(bankDetails.amount.toString())}
                      className="text-green-600 flex items-center gap-1 text-sm"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </button>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-4">
                  Search for the bank name (first bank) on your bank app. Use this account for this transaction only
                </p>

                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mt-0.5">!</div>
                  <p className="text-red-600 text-sm">Payment must be made 30 mins after order submission</p>
                </div>
              </div>

              <button
                onClick={() => setCurrentStep('upload-proof')}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-lg font-medium"
              >
                Continue to Upload Proof
              </button>
            </>
          )}

          {currentStep === 'upload-proof' && (
            <>
              <div className="bg-gray-300 rounded-lg p-6">
                <h2 className="font-bold text-lg mb-2">Upload Evidence of Payment</h2>
                <p className="text-sm text-gray-500 mb-4">Upload</p>
                
                <label className="bg-gray-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-green-500 transition-colors">
                  <input 
                    type="file" 
                    accept="image/jpeg,image/png,image/svg+xml"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                    <Upload className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-sm text-center">
                    <span className="font-medium">Click</span> or <span className="text-green-600">Drag</span> to Upload evidence
                  </p>
                  <p className="text-xs text-gray-500 mt-1">jpg, png & svg up to 10mb</p>
                  {uploadedFile && (
                    <p className="text-sm text-gray-700 mt-2">Selected: {uploadedFile.name}</p>
                  )}
                </label>
              </div>

              <button
                onClick={handleProceedToPayment}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-lg font-medium"
              >
                Upload Proof of Payment
              </button>
            </>
          )}

          {currentStep === 'confirm' && (
            <>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-6">
                  <h3 className="font-bold mb-4">Account Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-gray-400" />
                      <span>{userData.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <span>{userData.email}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6">
                  <h3 className="font-bold mb-4">Order Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Tag className="w-5 h-5 text-gray-400" />
                      <span>Order no: {orderData.orderNumber}</span>
                    </div>
                    {orderData.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Truck className="w-5 h-5 text-gray-400" />
                        <span>{item.name} x{item.quantity} - {formatPrice(item.price)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6">
                  <h3 className="font-bold mb-4">Delivery Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-gray-400" />
                      <span>{orderData.deliveryMethod}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span>{orderData.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <span>Delivery Time: {orderData.deliveryTime}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <span>{orderData.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-gray-400" />
                      <span>Delivery Service: {orderData.deliveryService}</span>
                    </div>
                  </div>
                </div>
                {uploadedFile && (
                  <div className="bg-white rounded-lg p-6">
                    <h3 className="font-bold mb-4">Uploaded File</h3>
                    <p className="text-sm text-gray-700">Selected: {uploadedFile.name}</p>
                  </div>
                )}
              </div>

              <button
                onClick={handleProceedToPayment}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-lg font-medium"
              >
                Proceed to Make Payment
              </button>
            </>
          )}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">Payment Details</h1>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Amount:</p>
              <p className="text-2xl font-bold text-green-600">{formatPrice(bankDetails.amount)}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8">
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-lg mb-4">Account Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <span>{userData.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span>{userData.email}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-lg mb-4">Order Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Tag className="w-5 h-5 text-gray-400" />
                    <span className="text-sm">Order no: {orderData.orderNumber}</span>
                  </div>
                  {orderData.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-gray-400" />
                      <span className="text-sm">{item.name} x{item.quantity} - {formatPrice(item.price)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-lg mb-4">Delivery Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-gray-400" />
                    <span className="text-sm">{orderData.deliveryMethod}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="text-sm">{orderData.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span className="text-sm">Delivery Time: {orderData.deliveryTime}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span className="text-sm">{orderData.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-gray-400" />
                    <span className="text-sm">Delivery Service: {orderData.deliveryService}</span>
                  </div>
                </div>
              </div>
              {uploadedFile && (
                <div className="bg-white rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-4">Uploaded File</h3>
                  <p className="text-sm text-gray-700">Selected: {uploadedFile.name}</p>
                </div>
              )}
            </div>

            <div className="col-span-2">
              <div className="bg-white rounded-lg p-8">
                <h2 className="font-bold text-xl mb-6">Transfer {formatPrice(bankDetails.amount)} to the account below</h2>
                
                <div className="bg-gray-50 rounded-lg p-6 space-y-4 mb-6">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">BANK NAME</p>
                    <p className="font-medium text-lg">{bankDetails.bankName}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">ACCOUNT NUMBER</p>
                      <p className="font-medium text-lg">{bankDetails.accountNumber}</p>
                    </div>
                    <button 
                      onClick={() => handleCopyToClipboard(bankDetails.accountNumber)}
                      className="text-green-600 flex items-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">AMOUNT</p>
                      <p className="font-medium text-lg">{formatPrice(bankDetails.amount)}</p>
                    </div>
                    <button 
                      onClick={() => handleCopyToClipboard(bankDetails.amount.toString())}
                      className="text-green-600 flex items-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </button>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mb-4">
                  Search for the bank name (first bank) on your bank app. Use this account for this transaction only
                </p>

                <div className="text-center rounded-lg p-4 flex items-start gap-3 mb-8">
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">!</div>
                  <p className="text-red-600">Payment must be made 30 mins after order submission</p>
                </div>

                <div className="border-t border-gray-200 pt-8">
                  <h3 className="font-bold text-lg mb-4">Upload</h3>
                  
                  <label className=" bg-gray-200 rounded-lg p-12 flex flex-col items-center justify-center cursor-pointer hover:border-green-500 transition-colors">
                    <input 
                      type="file" 
                      accept="image/jpeg,image/png,image/svg+xml"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <Upload className="w-8 h-8 text-green-600" />
                    </div>
                    <p className="text-center mb-2">
                      <span className="font-medium">Click</span> or <span className="text-green-600">Drag</span> to Upload evidence
                    </p>
                    <p className="text-sm text-gray-500">jpg, png & svg up to 10mb</p>
                    {uploadedFile && (
                      <p className="text-sm text-gray-700 mt-2">Selected: {uploadedFile.name}</p>
                    )}
                  </label>

                  <button
                    onClick={handleProceedToPayment}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-lg font-medium text-lg mt-6"
                  >
                    Upload Proof of Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <OrderSuccessModal 
        isOpen={showSuccessModal} 
        onClose={handleSuccessModalClose}
      />
    </div>
  );
}
