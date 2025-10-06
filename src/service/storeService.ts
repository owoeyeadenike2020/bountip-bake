import axios from 'axios';
import { StoreData } from '@/types/store';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://jellyfish-app-dvaxa.ondigitalocean.app';

export class StoreService {
  private static instance: StoreService;

  private constructor() {}

  public static getInstance(): StoreService {
    if (!StoreService.instance) {
      StoreService.instance = new StoreService();
    }
    return StoreService.instance;
  }

  async getStoreByCode(storeCode: string): Promise<StoreData> {
    try {
      const response = await axios.get<StoreData>(`${API_BASE_URL}/stores/${storeCode}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to fetch store data');
      }
      throw new Error('An unexpected error occurred');
    }
  }
}

export const storeService = StoreService.getInstance();