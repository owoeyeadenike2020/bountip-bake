// File: lib/api/authService.ts
import toast from 'react-hot-toast';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://jellyfish-app-dvaxa.ondigitalocean.app';

// Token management utilities
export const TokenManager = {
  setAccessToken: (token: string): void => {
    try {
      localStorage.setItem('accessToken', token);
      console.log('[TokenManager] Access token stored successfully');
    } catch (error) {
      console.error('[TokenManager] Failed to store access token:', error);
      toast.error('Failed to save session. Please try again.');
    }
  },

  getAccessToken: (): string | null => {
    try {
      return localStorage.getItem('accessToken');
    } catch (error) {
      console.error('[TokenManager] Failed to retrieve access token:', error);
      return null;
    }
  },

  removeAccessToken: (): void => {
    try {
      localStorage.removeItem('accessToken');
      console.log('[TokenManager] Access token removed successfully');
    } catch (error) {
      console.error('[TokenManager] Failed to remove access token:', error);
    }
  },
  setCustomerId: (customerId: string): void => {
    try {
      localStorage.setItem('customerId', customerId);
      localStorage.setItem('userId', customerId);
      console.log('[TokenManager] Customer ID stored successfully');
    } catch (error) {
      console.error('[TokenManager] Failed to store customerId:', error);
      toast.error('Failed to save customer ID. Please try again.');
    }
  },

  getCustomerId: (): string | null => {
    try {
      return localStorage.getItem('customerId');
    } catch (error) {
      console.error('[TokenManager] Failed to retrieve customerId:', error);
      return null;
    }
  },

  removeCustomerId: (): void => {
    try {
      localStorage.removeItem('customerId');
      console.log('[TokenManager] Customer ID removed successfully');
    } catch (error) {
      console.error('[TokenManager] Failed to remove customerId:', error);
    }
  },

  isAuthenticated: (): boolean => {
    return !!TokenManager.getAccessToken();
  }
};

// API Response Types
interface ApiError {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}

interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

interface SignupResponse {
  accessToken: string;
  userId: string;
  email: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

// Request Types
interface LoginRequest {
  email: string;
  password: string;
}

interface SignupRequest {
  email: string;
  name: string;
  password: string;
  phoneNumber: string;
  orderId?: string;
}

// Custom error class for API errors
class ApiServiceError extends Error {
  statusCode: number;
  errors?: Record<string, string[]>;

  constructor(message: string, statusCode: number, errors?: Record<string, string[]>) {
    super(message);
    this.name = 'ApiServiceError';
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

// Base API fetch wrapper with error handling
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  console.log(`[API] Request: ${options.method || 'GET'} ${url}`);
  console.log('[API] Request body:', options.body);

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    console.log(`[API] Response status: ${response.status} ${response.statusText}`);

    // Parse response body
    const data = await response.json().catch(() => null);
    console.log('[API] Response data:', data);

    if (!response.ok) {
      const errorMessage = data?.message || data?.error || 'An error occurred';
      const errors = data?.errors;
      
      console.error(`[API] Error ${response.status}:`, errorMessage, errors);
      throw new ApiServiceError(errorMessage, response.status, errors);
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiServiceError) {
      throw error;
    }

    // Network or other errors
    console.error('[API] Network or fetch error:', error);
    throw new ApiServiceError(
      'Network error. Please check your connection and try again.',
      0
    );
  }
}

// Authentication Service
export const AuthService = {
  /**
   * Login user with email and password
   */
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    console.log('[AuthService] Login attempt for:', credentials.email);
    const loadingToast = toast.loading('Signing in...');

    try {
      const response = await apiFetch<LoginResponse>('/customer/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });

      // Store access token
      TokenManager.setAccessToken(response.accessToken);

      toast.success('Login successful! Welcome back.', { id: loadingToast });
    //   console.log('[AuthService] Login successful for user:', response.user.email);

      return response;
    } catch (error) {
      toast.dismiss(loadingToast);

      if (error instanceof ApiServiceError) {
        // Handle specific error cases
        if (error.statusCode === 401) {
          toast.error('Invalid email or password. Please try again.');
        } else if (error.statusCode === 422 && error.errors) {
          // Validation errors
          const firstError = Object.values(error.errors)[0]?.[0];
          toast.error(firstError || 'Validation error. Please check your input.');
        } else {
          toast.error(error.message);
        }
        
        console.error('[AuthService] Login failed:', error);
        throw error;
      }

      toast.error('Login failed. Please try again.');
      console.error('[AuthService] Unexpected error during login:', error);
      throw error;
    }
  },

  /**
   * Register new customer
   */
  signup: async (userData: SignupRequest): Promise<SignupResponse> => {
    console.log('[AuthService] Signup attempt for:', userData.email);
    const loadingToast = toast.loading('Creating your account...');

    try {
      const response = await apiFetch<SignupResponse>('/customer/auth/signup', {
        method: 'POST',
        body: JSON.stringify(userData),
      });

      // Store access token
      console.log('[AuthService] Signup response:', response.userId, response.accessToken);
      TokenManager.setCustomerId(response.userId);
      TokenManager.setAccessToken(response.accessToken);


      toast.success('Account created successfully! Welcome to Bountip.', { id: loadingToast });
      // console.log('[AuthService] Signup successful for user:', response.user.email);

      return response;
    } catch (error) {
      toast.dismiss(loadingToast);

      if (error instanceof ApiServiceError) {
        // Handle specific error cases
        if (error.statusCode === 409) {
          toast.error('An account with this email already exists.');
        } else if (error.statusCode === 422 && error.errors) {
          // Validation errors
          const firstError = Object.values(error.errors)[0]?.[0];
          toast.error(firstError || 'Validation error. Please check your input.');
        } else {
          toast.error(error.message);
        }
        
        console.error('[AuthService] Signup failed:', error);
        throw error;
      }

      toast.error('Signup failed. Please try again.');
      console.error('[AuthService] Unexpected error during signup:', error);
      throw error;
    }
  },

  /**
   * Logout user and clear token
   */
  logout: (): void => {
    console.log('[AuthService] Logging out user');
    TokenManager.removeAccessToken();
    toast.success('Logged out successfully');
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return TokenManager.isAuthenticated();
  }
};

// Export types for use in components
export type { LoginRequest, SignupRequest, LoginResponse, SignupResponse, ApiError };