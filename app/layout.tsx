import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevFolio — GitHub Portfolio Generator",
  description: "Turn any GitHub profile into a beautiful shareable portfolio in seconds.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
