import { TokenManager } from "@/service/authService";
export const requireAuth = (): boolean => {
  const isAuthenticated = TokenManager.isAuthenticated();
  
  if (!isAuthenticated) {
    console.warn('[authMiddleware] Unauthorized access attempt');
    return false;
  }
  
  return true;
};

export const getAuthHeaders = (): Record<string, string> => {
  const token = TokenManager.getAccessToken();
  
  if (!token) {
    console.warn('[authMiddleware] No access token available');
    return {};
  }
  
  return {
    'Authorization': `Bearer ${token}`,
  };
};
