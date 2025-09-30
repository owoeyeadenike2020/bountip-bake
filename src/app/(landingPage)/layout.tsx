// src/app/(landingPage)/layout.tsx
import ClientLayoutWrapper from "@/components/LandingPage/ClientLayoutWrapper";
export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientLayoutWrapper>
      {children}
    </ClientLayoutWrapper>
  );
}