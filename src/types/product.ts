// export interface SizeOption {
//   id: string;
//   modifierId: string;
//   name: string;
//   price: number;
//   isFallback?: boolean;
// }

// export interface AddOn {
//   id: string;
//   modifierId: string;
//   name: string;
//   price: number;
//   isFallback?: boolean;
// }

// export interface AllergenList {
//   allergies: string[];
// }

// export interface Store {
//   id: string;
//   name: string;
//   storeCode: string;
//   waPhoneNumber: string | null;
//   webChannel: boolean;
//   address: string | null;
//   waChannel: boolean;
//   emailChannel: boolean;
//   logoUrl: string;
//   customSubDomain: string | null;
//   emailAlias: string | null;
//   status: string;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   operatingHours: any;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   taxSettings: any;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   serviceCharges: any;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   paymentMethods: any;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   priceTier: any;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   receiptSettings: any;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   labelSettings: any;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   invoiceSettings: any;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   generalSettings: any;
//   createdAt: string;
//   updatedAt: string;
//   deletedAt: string | null;
// }

// export interface ApiProduct {
//   id: string;
//   isActive: boolean;
//   name: string;
//   description: string;
//   category: string;
//   price: string;
//   preparationArea: string | null;
//   weight: string;
//   weightScale: string;
//   packagingMethod: string[];
//   priceTierId: string[];
//   allergenList: AllergenList;
//   logoUrl: string;
//   logoHash: string | null;
//   leadTime: number;
//   store: Store;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface ModifierOption {
//   id: string;
//   name: string;
//   amount: string;
//   maximumQuantity: number;
//   limitQuantity: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface Modifier {
//   id: string;
//   modifierType: 'VARIANCE' | 'ADD_ON';
//   modifierMode: 'SINGLE_CHOICE' | 'MULTI_CHOICE';
//   showInPos: boolean;
//   name: string;
//   limitTotalSelection: boolean;
//   maximumQuantity: number;
//   createdAt: string;
//   updatedAt: string;
//   options: ModifierOption[];
// }

// export interface ModifierApiResponse {
//   product?: {
//     id: string;
//     name: string;
//     isActive: boolean;
//     category: string;
//     price: string;
//   };
//   modifiers: Modifier[];
// }

// export interface ApiCartItem {
//   id: string;
//   productId: string;
//   quantity: number;
//   unitPrice: string;
//   product?: ApiProduct | null;
//   modifiers: Array<{
//     id: string;
//     unitAmount: string;
//     modifierOptionId: string;
//     modifierOptionName: string;
//     quantity: number;
//     modifier?: {
//       id: string;
//       modifierType: 'VARIANCE' | 'ADD_ON';
//       modifierMode: 'SINGLE_CHOICE' | 'MULTI_CHOICE';
//       showInPos: boolean;
//       name: string;
//       limitTotalSelection: boolean;
//       maximumQuantity: number;
//       createdAt: string;
//       updatedAt: string;
//     } | null;
//   }>;
// }

// export interface ApiCartResponse {
//   id: string;
//   reference: string;
//   status: string;
//   items: ApiCartItem[];
//   createdAt: string;
//   updatedAt: string;
// }

// export interface Product {
//   id: string;
//   name: string;
//   description?: string;
//   price: number;
//   originalPrice?: number;
//   image: string;
//   rating?: number;
//   reviewCount?: number;
//   deliveryTime?: string;
//   category: string;
//   badge?: string;
//   badgeColor?: string;
//   allergens?: string[];
//   sizes?: SizeOption[];
//   addOns?: AddOn[];
//   isActive: boolean;
//   weight?: string;
//   weightScale?: string;
// }

// export interface CartItem {
//   id: string;
//   itemId?: string;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
//   quantity: number;
//   customization?: {
//     size?: string;
//     addOns?: Array<{ id: string; name: string; price: number }>;
//     totalPrice?: number;
//   };
// }

// export interface ProductsApiResponse {
//   status: boolean;
//   message: string;
//   data: {
//     data: ApiProduct[];
//     meta: {
//       total: number;
//       page: number;
//       limit: number;
//       totalPages: number;
//     };
//   };
// }

// export interface Category {
//   id: string;
//   name: string;
//   icon: string;
// }

// export interface AddToCartRequest {
//   cartId?: string;
//   productId: string;
//   quantity: number;
//   modifiers: Array<{
//     modifierId: string;
//     modifierOptionId: string;
//     quantity: number;
//   }>;
// }

// export interface RemoveFromCartRequest {
//   cartId: string;
//   productId: string;
//   quantity: number;
// }
// export interface CartModifier {
//   id: string;
//   modifierId: string;
//   modifierOptionId: string;
//   modifierOptionName: string;
//   unitAmount: string;
//   quantity: number;
//   modifier?: {
//     id: string;
//     name: string;
//     modifierType: string;
//   };
// }

// export interface ApiCartItem {
//   id: string;
//   productId: string;
//   quantity: number;
//   unitPrice: string;
//   modifiers: CartModifier[];
//   product?: {
//     id: string;
//     name: string;
//     description: string;
//     logoUrl: string;
//     price: string;
//   };
// }

// export interface ApiCartResponse {
//   id: string;
//   storeId: string;
//   status: string;
//   items: ApiCartItem[];
//   totalAmount?: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface CartItem {
//   id: string; // productId
//   itemId?: string; // cart item id
//   name: string;
//   description: string;
//   price: number;
//   image: string;
//   quantity: number;
//   customization?: {
//     size?: string;
//     addOns?: Array<{ id: string; name: string; price: number }>;
//     totalPrice?: number;
//   };
// }

// export interface AddToCartRequest {
//   cartId?: string;
//   productId: string;
//   quantity: number;
//   modifiers: Array<{
//     modifierId: string;
//     modifierOptionId: string;
//     quantity: number;
//   }>;
// }

// export interface RemoveFromCartRequest {
//   cartId: string;
//   productId: string;
//   quantity: number;
// }

// // Update SizeOption to include IDs needed for modifiers
// export interface SizeOption {
//   id: string; // modifierOptionId
//   modifierId: string;
//   name: string;
//   price: number;
// }

// // Update AddOn to include IDs needed for modifiers
// export interface AddOn {
//   id: string; // modifierOptionId
//   modifierId: string;
//   name: string;
//   price: number;
//   checked?: boolean;
// }
// ---------------------------
// Size & AddOn
// ---------------------------
export interface SizeOption {
  id: string; // modifierOptionId
  modifierId: string;
  name: string;
  price: number;
  isFallback?: boolean;
}

export interface AddOn {
  id: string; // modifierOptionId
  modifierId: string;
  name: string;
  price: number;
  checked?: boolean;
  isFallback?: boolean;
}

// ---------------------------
// Store & Product
// ---------------------------
export interface AllergenList {
  allergies: string[];
}
 export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating?: number;
  reviewCount?: number;
  deliveryTime?: string;
  category: string;
  badge?: string;
  badgeColor?: string;
  allergens?: string[];
  sizes?: SizeOption[];
  addOns?: AddOn[];
  isActive: boolean;
  weight?: string;
  weightScale?: string;
}

export interface Store {
  id: string;
  name: string;
  storeCode: string;
  waPhoneNumber: string | null;
  webChannel: boolean;
  address: string | null;
  waChannel: boolean;
  emailChannel: boolean;
  logoUrl: string;
  customSubDomain: string | null;
  emailAlias: string | null;
  status: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  operatingHours: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  taxSettings: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  serviceCharges: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  paymentMethods: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  priceTier: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  receiptSettings: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  labelSettings: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  invoiceSettings: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  generalSettings: any;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ApiProduct {
  id: string;
  isActive: boolean;
  name: string;
  description: string;
  category: string;
  price: string;
  preparationArea: string | null;
  weight: string;
  weightScale: string;
  packagingMethod: string[];
  priceTierId: string[];
  allergenList: AllergenList;
  logoUrl: string;
  logoHash: string | null;
  leadTime: number;
  store: Store;
  createdAt: string;
  updatedAt: string;
}

// ---------------------------
// Modifiers
// ---------------------------
export interface ModifierOption {
  id: string;
  name: string;
  amount: string;
  maximumQuantity: number;
  limitQuantity: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Modifier {
  id: string;
  modifierType: 'VARIANCE' | 'ADD_ON';
  modifierMode: 'SINGLE_CHOICE' | 'MULTI_CHOICE';
  showInPos: boolean;
  name: string;
  limitTotalSelection: boolean;
  maximumQuantity: number;
  createdAt: string;
  updatedAt: string;
  options: ModifierOption[];
}

export interface ModifierApiResponse {
  product: {
    id: string;
    name: string;
    isActive: boolean;
    category: string;
    price: string;
  };
  modifiers: Modifier[];
}

// ---------------------------
// Cart
// ---------------------------
export interface CartModifier {
  id: string;
  modifierId: string;
  modifierOptionId: string;
  modifierOptionName: string;
  unitAmount: string;
  quantity: number;
  modifier?: {
    id: string;
    name: string;
    modifierType: 'VARIANCE' | 'ADD_ON';
  };
}

export interface ApiCartItem {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: string;
  modifiers: CartModifier[];
  product?: ApiProduct | null;
}

export interface ApiCartResponse {
  id: string;
  storeId?: string;
  reference?: string;
  status: string;
  items: ApiCartItem[];
  totalAmount?: string;
  createdAt: string;
  updatedAt: string;
}

// ---------------------------
// Frontend CartItem
// ---------------------------
export interface CartItem {
  id: string; // productId
  itemId?: string; // cart item id (optional to align with backend typing)
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  customization?: {
    size?: string;
    addOns?: Array<{ id: string; name: string; price: number }>;
    totalPrice?: number;
  };
}

// ---------------------------
// Add / Remove Cart Requests
// ---------------------------
export interface AddToCartRequest {
  cartId?: string;
  productId: string;
  quantity: number;
  modifiers: Array<{
    modifierId: string;
    modifierOptionId: string;
    quantity: number;
  }>;
}

export interface RemoveFromCartRequest {
  cartId: string;
  productId: string;
  quantity: number;
}

// ---------------------------
// Misc
// ---------------------------
export interface ProductsApiResponse {
  status: boolean;
  message: string;
  data: {
    data: ApiProduct[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}
