import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ApplyAI",
  description: "AI-powered job application and interview tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}