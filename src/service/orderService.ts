import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://jellyfish-app-dvaxa.ondigitalocean.app';

export interface OrderIntentRequest {
  cartId: string;
  // customerId: string;
  storeId: string;
}

export interface OrderIntentResponse {
  id: string;
  reference: string;
  status: string;
}

export interface CheckoutOrderRequest {
  status?: 'Intent' | 'Pending' | 'Confirmed';
  addressId: string;
  customerId: string;
  deliveryMethod: 'Pickup' | 'Delivery';
  specialInstructions?: string;
}

export interface UploadProofRequest {
  image: File;
  resourceName: 'orderPayment';
  resourceId: string;
}

class OrderService {
  async createOrderIntent(data: OrderIntentRequest): Promise<OrderIntentResponse> {
    try {
      const response = await axios.post<OrderIntentResponse>(
        `${API_BASE_URL}/orders/intent`,
        data
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to create order intent');
      }
      throw error;
    }
  }

  async uploadPaymentProof(data: UploadProofRequest): Promise<{ url: string }> {
    try {
      const formData = new FormData();
      formData.append('image', data.image);
      formData.append('resourceName', data.resourceName);
      formData.append('resourceId', data.resourceId);

      const response = await axios.post(
        `${API_BASE_URL}/media/static/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to upload payment proof');
      }
      throw error;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async checkoutOrder(orderId: string, data: CheckoutOrderRequest): Promise<any> {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/orders/${orderId}/checkout`,
        data
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to checkout order');
      }
      throw error;
    }
  }
}

const orderService = new OrderService();
export { orderService };
