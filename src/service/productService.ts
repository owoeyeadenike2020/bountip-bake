// import axios from 'axios';
// import { ProductsApiResponse, ApiProduct, Product, SizeOption,AddOn } from '@/types/product';

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://jellyfish-app-dvaxa.ondigitalocean.app';

// class ProductService {
//   // Transform API product to frontend product format
//   private transformProduct(apiProduct: ApiProduct): Product {
//     // Calculate delivery time based on lead time
//     const deliveryTime = apiProduct.leadTime === 0 
//       ? '10-15 Mins' 
//       : apiProduct.leadTime === 1 
//       ? '25-30 Mins' 
//       : `${apiProduct.leadTime * 30}-${apiProduct.leadTime * 30 + 15} Mins`;

//     // Generate mock sizes based on price
//     const basePrice = parseFloat(apiProduct.price);
//     const sizes: SizeOption[] = [
//       { name: 'Small', price: Math.round(basePrice * 0.8 * 100) / 100 },
//       { name: 'Medium', price: basePrice },
//       { name: 'Large', price: Math.round(basePrice * 1.3 * 100) / 100 },
//     ];

//     // Generate mock add-ons
//     const addOns: AddOn[] = [
//       { id: 'extra-1', name: 'Extra Portion', price: Math.round(basePrice * 0.3 * 100) / 100 },
//       { id: 'packaging', name: 'Premium Packaging', price: 2.00 },
//       { id: 'express', name: 'Express Delivery', price: 5.00 },
//     ];

//     // Assign badge based on category or lead time
//     let badge: string | undefined;
//     let badgeColor: string | undefined;
    
//     if (apiProduct.leadTime === 0) {
//       badge = 'Fast';
//       badgeColor = 'bg-green-100 text-green-800';
//     } else if (apiProduct.category === 'Bakery') {
//       badge = 'Popular';
//       badgeColor = 'bg-gray-100 text-gray-800';
//     } else if (parseFloat(apiProduct.price) > 15) {
//       badge = 'Premium';
//       badgeColor = 'bg-purple-100 text-purple-800';
//     }

//     return {
//       id: apiProduct.id,
//       name: apiProduct.name,
//       description: apiProduct.description,
//       price: basePrice,
//       originalPrice: Math.round(basePrice * 1.1 * 100) / 100, // 10% higher as "original"
//       image: apiProduct.logoUrl || '/images/bakery/Product.jpg', // Fallback image
//       rating: 4.5 + Math.random() * 0.5, // Mock rating between 4.5-5.0
//       reviewCount: Math.floor(Math.random() * 300) + 50, // Mock reviews 50-350
//       deliveryTime,
//       category: apiProduct.category.toLowerCase(),
//       badge,
//       badgeColor,
//       allergens: apiProduct.allergenList.allergies,
//       sizes,
//       addOns,
//       isActive: apiProduct.isActive,
//       weight: apiProduct.weight,
//       weightScale: apiProduct.weightScale,
//     };
//   }

//   async getProductsByStore(storeCode: string, page = 1, limit = 10): Promise<{
//     products: Product[];
//     meta: ProductsApiResponse['data']['meta'];
//   }> {
//     try {
//       const response = await axios.get<ProductsApiResponse>(
//         `${API_BASE_URL}/${storeCode}/products`,
//         {
//           params: { page, limit }
//         }
//       );

//       const products = response.data.data.data
//         .filter(product => product.isActive) // Only show active products
//         .map(product => this.transformProduct(product));

//       return {
//         products,
//         meta: response.data.data.meta,
//       };
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         throw new Error(error.response?.data?.message || 'Failed to fetch products');
//       }
//       throw new Error('An unexpected error occurred');
//     }
//   }

//   async getAllProducts(storeCode: string): Promise<Product[]> {
//     try {
//       // Fetch all products by requesting a high limit
//       const response = await axios.get<ProductsApiResponse>(
//         `${API_BASE_URL}/${storeCode}/products`,
//         {
//           params: { page: 1, limit: 100 }
//         }
//       );

//       return response.data.data.data
//         .filter(product => product.isActive)
//         .map(product => this.transformProduct(product));
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         throw new Error(error.response?.data?.message || 'Failed to fetch products');
//       }
//       throw new Error('An unexpected error occurred');
//     }
//   }
// }

// const productService = new ProductService();
// export { productService };



// import axios from 'axios';
// import { ProductsApiResponse, ApiProduct, Product, ModifierApiResponse,SizeOption,AddOn } from '@/types/product';

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://jellyfish-app-dvaxa.ondigitalocean.app';

// class ProductService {
//   private transformProduct(apiProduct: ApiProduct): Product {
//     const deliveryTime = apiProduct.leadTime === 0 
//       ? '10-15 Mins' 
//       : apiProduct.leadTime === 1 
//       ? '25-30 Mins' 
//       : `${apiProduct.leadTime * 30}-${apiProduct.leadTime * 30 + 15} Mins`;

//     const basePrice = parseFloat(apiProduct.price);
    
//     // Generate sizes with proper IDs for modifiers
//     const sizes: SizeOption[] = [
//       { 
//         id: `${apiProduct.id}-size-small`,
//         modifierId: `${apiProduct.id}-size-modifier`,
//         name: 'Small', 
//         price: Math.round(basePrice * 0.8 * 100) / 100 
//       },
//       { 
//         id: `${apiProduct.id}-size-medium`,
//         modifierId: `${apiProduct.id}-size-modifier`,
//         name: 'Medium', 
//         price: 0 // Base price, no additional cost
//       },
//       { 
//         id: `${apiProduct.id}-size-large`,
//         modifierId: `${apiProduct.id}-size-modifier`,
//         name: 'Large', 
//         price: Math.round(basePrice * 0.3 * 100) / 100 
//       },
//     ];

//     // Generate add-ons with proper IDs
//     const addOns: AddOn[] = [
//       { 
//         id: `${apiProduct.id}-addon-extra`,
//         modifierId: `${apiProduct.id}-addon-modifier`,
//         name: 'Extra Portion', 
//         price: Math.round(basePrice * 0.3 * 100) / 100 
//       },
//       { 
//         id: `${apiProduct.id}-addon-packaging`,
//         modifierId: `${apiProduct.id}-addon-modifier`,
//         name: 'Premium Packaging', 
//         price: 2.00 
//       },
//       { 
//         id: `${apiProduct.id}-addon-express`,
//         modifierId: `${apiProduct.id}-addon-modifier`,
//         name: 'Express Delivery', 
//         price: 5.00 
//       },
//     ];

//     let badge: string | undefined;
//     let badgeColor: string | undefined;
    
//     if (apiProduct.leadTime === 0) {
//       badge = 'Fast';
//       badgeColor = 'bg-green-100 text-green-800';
//     } else if (apiProduct.category === 'Bakery') {
//       badge = 'Popular';
//       badgeColor = 'bg-gray-100 text-gray-800';
//     } else if (parseFloat(apiProduct.price) > 15) {
//       badge = 'Premium';
//       badgeColor = 'bg-purple-100 text-purple-800';
//     }

//     return {
//       id: apiProduct.id,
//       name: apiProduct.name,
//       description: apiProduct.description,
//       price: basePrice,
//       originalPrice: Math.round(basePrice * 1.1 * 100) / 100,
//       image: apiProduct.logoUrl || '/images/bakery/Product.jpg',
//       rating: 4.5 + Math.random() * 0.5,
//       reviewCount: Math.floor(Math.random() * 300) + 50,
//       deliveryTime,
//       category: apiProduct.category.toLowerCase(),
//       badge,
//       badgeColor,
//       allergens: apiProduct.allergenList.allergies,
//       sizes,
//       addOns,
//       isActive: apiProduct.isActive,
//       weight: apiProduct.weight,
//       weightScale: apiProduct.weightScale,
//     };
//   }


//   // Fetch modifiers for a specific product
//   async getProductModifiers(storeCode: string, productId: string): Promise<ModifierApiResponse['modifiers']> {
//     try {
//       const response = await axios.get<ModifierApiResponse>(
//         `${API_BASE_URL}/${storeCode}/products/${productId}/modifier`
//       );
//       return response.data.modifiers;
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         throw new Error(error.response?.data?.message || 'Failed to fetch modifiers');
//       }
//       throw new Error('An unexpected error occurred');
//     }
//   }

//   async getProductsByStore(storeCode: string, page = 1, limit = 10): Promise<{
//     products: Product[];
//     meta: ProductsApiResponse['data']['meta'];
//   }> {
//     try {
//       const response = await axios.get<ProductsApiResponse>(
//         `${API_BASE_URL}/${storeCode}/products`,
//         {
//           params: { page, limit }
//         }
//       );

//       // Fetch modifiers for each product
//       const products = await Promise.all(
//         response.data.data.data
//           .filter(product => product.isActive)
//           .map(async (apiProduct) => {
//             const modifiers = await this.getProductModifiers(storeCode, apiProduct.id);
//             return this.transformProduct(apiProduct, modifiers);
//           })
//       );

//       return {
//         products,
//         meta: response.data.data.meta,
//       };
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         throw new Error(error.response?.data?.message || 'Failed to fetch products');
//       }
//       throw new Error('An unexpected error occurred');
//     }
//   }

//   async getAllProducts(storeCode: string): Promise<Product[]> {
//     try {
//       const response = await axios.get<ProductsApiResponse>(
//         `${API_BASE_URL}/${storeCode}/products`,
//         {
//           params: { page: 1, limit: 100 }
//         }
//       );

//       // Fetch modifiers for each product
//       const products = await Promise.all(
//         response.data.data.data
//           .filter(product => product.isActive)
//           .map(async (apiProduct) => {
//             const modifiers = await this.getProductModifiers(storeCode, apiProduct.id);
//             return this.transformProduct(apiProduct, modifiers);
//           })
//       );

//       return products;
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         throw new Error(error.response?.data?.message || 'Failed to fetch products');
//       }
//       throw new Error('An unexpected error occurred');
//     }
//   }
// }

// const productService = new ProductService();
// export { productService };



import axios from 'axios';
import { 
  ProductsApiResponse, 
  ApiProduct, 
  Product, 
  ModifierApiResponse,
  SizeOption,
  AddOn,
  Modifier
} from '@/types/product';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://jellyfish-app-dvaxa.ondigitalocean.app';

class ProductService {
  // Transform API modifiers to SizeOption and AddOn formats
  private transformModifiers(modifiers: Modifier[], productId: string, basePrice: number): { 
    sizes: SizeOption[]; 
    addOns: AddOn[] 
  } {
    const sizes: SizeOption[] = [];
    const addOns: AddOn[] = [];

    modifiers.forEach(modifier => {
      if (modifier.modifierType === 'VARIANCE') {
        // These are sizes
        modifier.options.forEach(option => {
          sizes.push({
            id: option.id, // Real UUID from API
            modifierId: modifier.id, // Real modifier UUID
            name: option.name,
            price: parseFloat(option.amount)
          });
        });
      } else if (modifier.modifierType === 'ADD_ON') {
        // These are add-ons
        modifier.options.forEach(option => {
          addOns.push({
            id: option.id, // Real UUID from API
            modifierId: modifier.id, // Real modifier UUID
            name: option.name,
            price: parseFloat(option.amount)
          });
        });
      }
    });

    // If no sizes found in API, create fallback sizes
    if (sizes.length === 0) {
      sizes.push(
        { 
          id: `${productId}-size-small`,
          modifierId: `${productId}-size-modifier`,
          name: 'Small', 
          price: Math.round(basePrice * 0.8 * 100) / 100,
          isFallback: true
        },
        { 
          id: `${productId}-size-medium`,
          modifierId: `${productId}-size-modifier`,
          name: 'Medium', 
          price: 0,
          isFallback: true
        },
        { 
          id: `${productId}-size-large`,
          modifierId: `${productId}-size-modifier`,
          name: 'Large', 
          price: Math.round(basePrice * 0.3 * 100) / 100,
          isFallback: true
        }
      );
    }

    // If no add-ons found in API, create fallback add-ons
    if (addOns.length === 0) {
      addOns.push(
        { 
          id: `${productId}-addon-extra`,
          modifierId: `${productId}-addon-modifier`,
          name: 'Extra Portion', 
          price: Math.round(basePrice * 0.3 * 100) / 100,
          isFallback: true
        },
        { 
          id: `${productId}-addon-packaging`,
          modifierId: `${productId}-addon-modifier`,
          name: 'Premium Packaging', 
          price: 2.00,
          isFallback: true
        }
      );
    }

    return { sizes, addOns };
  }

  private transformProduct(apiProduct: ApiProduct, modifiers: Modifier[]): Product {
    const deliveryTime = apiProduct.leadTime === 0 
      ? '10-15 Mins' 
      : apiProduct.leadTime === 1 
      ? '25-30 Mins' 
      : `${apiProduct.leadTime * 30}-${apiProduct.leadTime * 30 + 15} Mins`;

    const basePrice = parseFloat(apiProduct.price);
    
    // Transform real modifiers from API
    const { sizes, addOns } = this.transformModifiers(modifiers, apiProduct.id, basePrice);

    let badge: string | undefined;
    let badgeColor: string | undefined;
    
    if (apiProduct.leadTime === 0) {
      badge = 'Fast';
      badgeColor = 'bg-green-100 text-green-800';
    } else if (apiProduct.category === 'Bakery') {
      badge = 'Popular';
      badgeColor = 'bg-gray-100 text-gray-800';
    } else if (parseFloat(apiProduct.price) > 15) {
      badge = 'Premium';
      badgeColor = 'bg-purple-100 text-purple-800';
    }

    return {
      id: apiProduct.id,
      name: apiProduct.name,
      description: apiProduct.description,
      price: basePrice,
      originalPrice: Math.round(basePrice * 1.1 * 100) / 100,
      image: apiProduct.logoUrl || '/images/bakery/Product.jpg',
      rating: 4.5 + Math.random() * 0.5,
      reviewCount: Math.floor(Math.random() * 300) + 50,
      deliveryTime,
      category: apiProduct.category.toLowerCase(),
      badge,
      badgeColor,
      allergens: apiProduct.allergenList.allergies,
      sizes,
      addOns,
      isActive: apiProduct.isActive,
      weight: apiProduct.weight,
      weightScale: apiProduct.weightScale,
    };
  }

  // Fetch modifiers for a specific product
  async getProductModifiers(storeCode: string, productId: string): Promise<Modifier[]> {
    try {
      const response = await axios.get<ModifierApiResponse>(
        `${API_BASE_URL}/${storeCode}/products/${productId}/modifier`
      );
      return response.data.modifiers;
    } catch (error) {
      console.log('No modifiers found, using fallback sizes/add-ons',error);
      console.warn(`No modifiers found for product ${productId}, using fallback`);
      return []; // Return empty array, will use fallback modifiers
    }
  }

  async getProductsByStore(storeCode: string, page = 1, limit = 10): Promise<{
    products: Product[];
    meta: ProductsApiResponse['data']['meta'];
  }> {
    try {
      const response = await axios.get<ProductsApiResponse>(
        `${API_BASE_URL}/${storeCode}/products`,
        {
          params: { page, limit }
        }
      );

      // Fetch modifiers for each product
      const products = await Promise.all(
        response.data.data.data
          .filter(product => product.isActive)
          .map(async (apiProduct) => {
            const modifiers = await this.getProductModifiers(storeCode, apiProduct.id);
            return this.transformProduct(apiProduct, modifiers);
          })
      );

      return {
        products,
        meta: response.data.data.meta,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to fetch products');
      }
      throw new Error('An unexpected error occurred');
    }
  }

  async getAllProducts(storeCode: string): Promise<Product[]> {
    try {
      const response = await axios.get<ProductsApiResponse>(
        `${API_BASE_URL}/${storeCode}/products`,
        {
          params: { page: 1, limit: 100 }
        }
      );

      // Fetch modifiers for each product
      const products = await Promise.all(
        response.data.data.data
          .filter(product => product.isActive)
          .map(async (apiProduct) => {
            const modifiers = await this.getProductModifiers(storeCode, apiProduct.id);
            return this.transformProduct(apiProduct, modifiers);
          })
      );

      return products;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to fetch products');
      }
      throw new Error('An unexpected error occurred');
    }
  }
}

const productService = new ProductService();
export { productService };