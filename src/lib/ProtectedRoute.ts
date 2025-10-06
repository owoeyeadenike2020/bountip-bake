// 'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/hooks/useAuth';
// interface ProtectedRouteProps {
//   children: React.ReactNode;
//   fallback?: React.ReactNode;
// }

// export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
//   children, 
//   fallback 
// }) => {
//   const { isAuthenticated, isLoading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!isLoading && !isAuthenticated) {
//       console.warn('[ProtectedRoute] Redirecting to login - user not authenticated');
//       router.push('/login');
//     }
//   }, [isAuthenticated, isLoading, router]);

//   if (isLoading) {
//     return <>{fallback}</>;
//   }

//   if (!isAuthenticated) {
//     return null;
//   }

//   return <>{children}</>;
// };
