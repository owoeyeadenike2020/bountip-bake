// src/app/(landingPage)/layout.tsx
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClientLayoutWrapper from "./ClientLayoutWrapper";
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientLayoutWrapper>
      <ToastContainer position="top-right" autoClose={3000} />
      {children}
    </ClientLayoutWrapper>
  );
}