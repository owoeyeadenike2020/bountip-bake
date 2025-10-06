
// 'use client';
// import React, { useState, useEffect } from 'react';
// import { X, Plus, MapPin } from 'lucide-react';

// export interface Address {
//   id: string;
//   street: string;
//   city: string;
//   state: string;
//   country: string;
// }

// interface AddressModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSelectAddress: (address: Address) => void;
// }

// export const AddressModal: React.FC<AddressModalProps> = ({ 
//   isOpen, 
//   onClose, 
//   onSelectAddress 
// }) => {
//   const [addresses, setAddresses] = useState<Address[]>([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [isAddingNew, setIsAddingNew] = useState(false);
//   const [error, setError] = useState('');
  
//   // New address form state
//   const [newAddress, setNewAddress] = useState({
//     street: '',
//     city: '',
//     state: '',
//     country: ''
//   });

//   const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://jellyfish-app-dvaxa.ondigitalocean.app';

//   // Fetch addresses on modal open
//   useEffect(() => {
//     if (isOpen) {
//       fetchAddresses();
//     }
//   }, [isOpen]);

//   const fetchAddresses = async () => {
//     setIsLoading(true);
//     setError('');
//     const token = localStorage.getItem('accessToken'); 
//     try {
//       const response = await fetch(`${API_BASE_URL}/customer/auth/addresses`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           // Add authentication token if required
//           'Authorization': `Bearer ${token}`
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch addresses');
//       }

//       const data = await response.json();
//       setAddresses(data);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to load addresses');
//       console.error('Error fetching addresses:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleAddNewAddress = async () => {
//     const token = localStorage.getItem('accessToken'); 
//     // Validate form
//     if (!newAddress.street || !newAddress.city || !newAddress.state || !newAddress.country) {
//       setError('All fields are required');
//       return;
//     }

//     setIsLoading(true);
//     setError('');
    
//     try {
//       const response = await fetch(`${API_BASE_URL}/customer/auth/address-new`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           // Add authentication token if required
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(newAddress),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to add address');
//       }

//       const addedAddress = await response.json();
      
//       // Refresh addresses list
//       await fetchAddresses();
      
//       // Reset form
//       setNewAddress({ street: '', city: '', state: '', country: '' });
//       setIsAddingNew(false);
      
//       // Optionally auto-select the newly added address
//       // onSelectAddress(addedAddress);
//       // onClose();
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to add address');
//       console.error('Error adding address:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const filteredAddresses = addresses.filter(addr => 
//     addr.street.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     addr.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     addr.state.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const formatAddressDisplay = (address: Address) => {
//     return `${address.street}, ${address.city}, ${address.state}, ${address.country}`;
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b">
//           <h2 className="text-xl font-bold">
//             {isAddingNew ? 'Add New Address' : 'Select Address'}
//           </h2>
//           <button
//             onClick={() => {
//               setIsAddingNew(false);
//               setError('');
//               onClose();
//             }}
//             className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//             type="button"
//             aria-label="Close modal"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="flex-1 overflow-y-auto p-6">
//           {error && (
//             <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
//               {error}
//             </div>
//           )}

//           {isAddingNew ? (
//             // Add New Address Form
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Street Address
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="e.g., 123 Estate, 1st Ave, H close"
//                   value={newAddress.street}
//                   onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   City
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="e.g., Festac Town"
//                   value={newAddress.city}
//                   onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   State
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="e.g., Lagos"
//                   value={newAddress.state}
//                   onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Country
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="e.g., Nigeria"
//                   value={newAddress.country}
//                   onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                 />
//               </div>

//               <div className="flex gap-3 pt-4">
//                 <button
//                   onClick={() => {
//                     setIsAddingNew(false);
//                     setNewAddress({ street: '', city: '', state: '', country: '' });
//                     setError('');
//                   }}
//                   className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//                   type="button"
//                   disabled={isLoading}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleAddNewAddress}
//                   className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                   type="button"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? 'Adding...' : 'Add Address'}
//                 </button>
//               </div>
//             </div>
//           ) : (
//             // Address List View
//             <>
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="flex-1">
//                   <input
//                     type="text"
//                     placeholder="Search your addresses..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                   />
//                 </div>
//                 <button
//                   onClick={() => setIsAddingNew(true)}
//                   className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//                   type="button"
//                   aria-label="Add new address"
//                 >
//                   <Plus className="w-5 h-5" />
//                 </button>
//               </div>

//               {/* Address Results */}
//               <div className="space-y-3">
//                 {isLoading ? (
//                   <div className="text-center py-8 text-gray-500">
//                     <p>Loading addresses...</p>
//                   </div>
//                 ) : filteredAddresses.length > 0 ? (
//                   filteredAddresses.map((address) => (
//                     <button
//                       key={address.id}
//                       onClick={() => {
//                         onSelectAddress(address);
//                         onClose();
//                       }}
//                       className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
//                       type="button"
//                     >
//                       <div className="flex items-start justify-between">
//                         <div className="flex-1 flex items-start gap-3">
//                           <MapPin className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
//                           <div>
//                             <h4 className="font-semibold text-gray-900">{address.city}, {address.state}</h4>
//                             <p className="text-gray-600 text-sm mt-1">
//                               {formatAddressDisplay(address)}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="w-5 h-5 border-2 border-green-500 rounded-full flex items-center justify-center ml-3 flex-shrink-0">
//                           <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                         </div>
//                       </div>
//                     </button>
//                   ))
//                 ) : (
//                   <div className="text-center py-8 text-gray-500">
//                     <MapPin className="w-12 h-12 mx-auto mb-3 text-gray-300" />
//                     <p className="font-medium">No addresses found</p>
//                     <p className="text-sm mt-2">
//                       {searchQuery ? 'Try a different search term' : 'Add your first address to get started'}
//                     </p>
//                     {!searchQuery && (
//                       <button
//                         onClick={() => setIsAddingNew(true)}
//                         className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors inline-flex items-center gap-2"
//                         type="button"
//                       >
//                         <Plus className="w-4 h-4" />
//                         Add Address
//                       </button>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

'use client';
import React, { useState } from 'react';
import { X, Plus, MapPin } from 'lucide-react';

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  country: string;
}

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAddress: (address: Address) => void;
  onAddAddress: (address: Address) => void; // New callback for adding address
}

export const AddressModal: React.FC<AddressModalProps> = ({ 
  isOpen, 
  onClose, 
  onSelectAddress,
  onAddAddress
}) => {
  // const [addresses, setAddresses] = useState<Address[]>([]);
  const [addresses] = useState<Address[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  // const [isLoading, setIsLoading] = useState(false);
  const [isLoading] = useState(false);

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [error, setError] = useState('');
  
  // New address form state
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: '',
    country: ''
  });

  // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://jellyfish-app-dvaxa.ondigitalocean.app';

  // Fetch addresses on modal open
  // useEffect(() => {
  //   if (isOpen) {
  //     fetchAddresses();
  //   }
  // }, [isOpen]);

  // const fetchAddresses = async () => {
  //   setIsLoading(true);
  //   setError('');
  //   const token = localStorage.getItem('accessToken'); 
  //   try {
  //     const response = await fetch(`${API_BASE_URL}/customer/auth/addresses`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': token ? `Bearer ${token}` : ''
  //       },
  //     });

  //     // if (!response.ok) {
  //     //   throw new Error('Failed to fetch addresses');
  //     // }

  //     const data = await response.json();
  //     setAddresses(data);
  //   } catch (err) {
  //     setError(err instanceof Error ? err.message : 'Failed to load addresses');
  //     console.error('Error fetching addresses:', err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleAddNewAddress = () => {
    // Validate form
    if (!newAddress.street || !newAddress.city || !newAddress.state || !newAddress.country) {
      setError('All fields are required');
      return;
    }

    // Create a temporary address object with a placeholder ID
    const tempAddress: Address = {
      id: `temp-${Date.now()}`,
      street: newAddress.street,
      city: newAddress.city,
      state: newAddress.state,
      country: newAddress.country
    };

    // Pass the address to the parent component
    onAddAddress(tempAddress);

    // Reset form and close modal
    setNewAddress({ street: '', city: '', state: '', country: '' });
    setIsAddingNew(false);
    setError('');
    onClose();
  };

  const filteredAddresses = addresses.filter(addr => 
    addr.street.toLowerCase().includes(searchQuery.toLowerCase()) ||
    addr.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    addr.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatAddressDisplay = (address: Address) => {
    return `${address.street}, ${address.city}, ${address.state}, ${address.country}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold">
            {isAddingNew ? 'Add New Address' : 'Select Address'}
          </h2>
          <button
            onClick={() => {
              setIsAddingNew(false);
              setError('');
              onClose();
            }}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            type="button"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {isAddingNew ? (
            // Add New Address Form
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  placeholder="e.g., 123 Estate, 1st Ave, H close"
                  value={newAddress.street}
                  onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  placeholder="e.g., Festac Town"
                  value={newAddress.city}
                  onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  placeholder="e.g., Lagos"
                  value={newAddress.state}
                  onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  placeholder="e.g., Nigeria"
                  value={newAddress.country}
                  onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setIsAddingNew(false);
                    setNewAddress({ street: '', city: '', state: '', country: '' });
                    setError('');
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  type="button"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddNewAddress}
                  className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  type="button"
                  disabled={isLoading}
                >
                  {isLoading ? 'Adding...' : 'Add Address'}
                </button>
              </div>
            </div>
          ) : (
            // Address List View
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search your addresses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <button
                  onClick={() => setIsAddingNew(true)}
                  className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  type="button"
                  aria-label="Add new address"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {/* Address Results */}
              <div className="space-y-3">
                {isLoading ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>Loading addresses...</p>
                  </div>
                ) : filteredAddresses.length > 0 ? (
                  filteredAddresses.map((address) => (
                    <button
                      key={address.id}
                      onClick={() => {
                        onSelectAddress(address);
                        onClose();
                      }}
                      className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
                      type="button"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-900">{address.city}, {address.state}</h4>
                            <p className="text-gray-600 text-sm mt-1">
                              {formatAddressDisplay(address)}
                            </p>
                          </div>
                        </div>
                        <div className="w-5 h-5 border-2 border-green-500 rounded-full flex items-center justify-center ml-3 flex-shrink-0">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <MapPin className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="font-medium">No addresses found</p>
                    <p className="text-sm mt-2">
                      {searchQuery ? 'Try a different search term' : 'Add your first address to get started'}
                    </p>
                    {!searchQuery && (
                      <button
                        onClick={() => setIsAddingNew(true)}
                        className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors inline-flex items-center gap-2"
                        type="button"
                      >
                        <Plus className="w-4 h-4" />
                        Add Address
                      </button>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};