import { TokenManager } from '@/service/authService';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://jellyfish-app-dvaxa.ondigitalocean.app';

export class ProtectedApiService {
  private static getHeaders(): HeadersInit {
    const token = TokenManager.getAccessToken();
    
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }

  static async get<T>(endpoint: string): Promise<T> {
    console.log(`[ProtectedAPI] GET ${endpoint}`);
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (response.status === 401) {
      console.error('[ProtectedAPI] Unauthorized - clearing token');
      TokenManager.removeAccessToken();
      window.location.href = '/login';
      throw new Error('Unauthorized');
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      console.error(`[ProtectedAPI] Error ${response.status}:`, error);
      throw new Error(error.message || 'Request failed');
    }

    return response.json();
  }

  static async post<T>(endpoint: string, data: unknown): Promise<T> {
    console.log(`[ProtectedAPI] POST ${endpoint}`, data);
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (response.status === 401) {
      console.error('[ProtectedAPI] Unauthorized - clearing token');
      TokenManager.removeAccessToken();
      window.location.href = '/login';
      throw new Error('Unauthorized');
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      console.error(`[ProtectedAPI] Error ${response.status}:`, error);
      throw new Error(error.message || 'Request failed');
    }

    return response.json();
  }

  static async put<T>(endpoint: string, data: unknown): Promise<T> {
    console.log(`[ProtectedAPI] PUT ${endpoint}`, data);
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (response.status === 401) {
      console.error('[ProtectedAPI] Unauthorized - clearing token');
      TokenManager.removeAccessToken();
      window.location.href = '/login';
      throw new Error('Unauthorized');
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      console.error(`[ProtectedAPI] Error ${response.status}:`, error);
      throw new Error(error.message || 'Request failed');
    }

    return response.json();
  }

  static async delete<T>(endpoint: string): Promise<T> {
    console.log(`[ProtectedAPI] DELETE ${endpoint}`);
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    if (response.status === 401) {
      console.error('[ProtectedAPI] Unauthorized - clearing token');
      TokenManager.removeAccessToken();
      window.location.href = '/login';
      throw new Error('Unauthorized');
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      console.error(`[ProtectedAPI] Error ${response.status}:`, error);
      throw new Error(error.message || 'Request failed');
    }

    return response.json();
  }
}