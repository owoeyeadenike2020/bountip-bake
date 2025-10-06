'use client';
import { useState, useEffect, useCallback } from 'react';
import { StoreData } from '@/types/store';
import { storeService } from '@/service/storeService';
interface UseStoreReturn {
  storeData: StoreData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  getCurrentDayHours: () => { open: string; close: string; isActive: boolean } | null;
  formatTime: (time: string) => string;
  isStoreOpen: () => boolean;
  getFormattedTodayHours: () => string;
}

export const useStore = (storeCode: string): UseStoreReturn => {
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStoreData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await storeService.getStoreByCode(storeCode);
      setStoreData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load store data');
      console.error('Error fetching store data:', err);
    } finally {
      setLoading(false);
    }
  }, [storeCode]);

  useEffect(() => {
    if (storeCode) {
      fetchStoreData();
    }
  }, [storeCode, fetchStoreData]);

  // Get current day's operating hours
  const getCurrentDayHours = useCallback(() => {
    if (!storeData) return null;
    
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = days[new Date().getDay()];
    return storeData.operatingHours[today];
  }, [storeData]);

  // Format time from 24hr to 12hr format
  const formatTime = useCallback((time: string): string => {
    try {
      const [hours, minutes] = time.split(':');
      const hour = parseInt(hours, 10);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes} ${ampm}`;
    } catch {
      return time;
    }
  }, []);

  // Check if store is currently open
  const isStoreOpen = useCallback(() => {
    const todayHours = getCurrentDayHours();
    if (!todayHours || !todayHours.isActive) return false;

    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    return currentTime >= todayHours.open && currentTime <= todayHours.close;
  }, [getCurrentDayHours]);

  // Get formatted string for today's hours
  const getFormattedTodayHours = useCallback((): string => {
    const todayHours = getCurrentDayHours();
    if (!todayHours) return 'Hours not available';
    if (!todayHours.isActive) return 'Closed Today';
    
    return `${formatTime(todayHours.open)} - ${formatTime(todayHours.close)}`;
  }, [getCurrentDayHours, formatTime]);

  return {
    storeData,
    loading,
    error,
    refetch: fetchStoreData,
    getCurrentDayHours,
    formatTime,
    isStoreOpen,
    getFormattedTodayHours,
  };
};
