// src/app/(landingPage)/layout.tsx
import ClientLayoutWrapper from "@/components/LandingPage/ClientLayoutWrapper";
import { ToastProvider } from "@/components/ToastProvider/ToastProvider";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientLayoutWrapper>
      {children}
      <ToastProvider />
    </ClientLayoutWrapper>
  );
}