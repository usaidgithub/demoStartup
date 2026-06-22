import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rigzer",
  description: "Demo platform for showcasing our product",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        {/* The Navbar lives inside children (HomePage) to track state cleanly */}
        {children}
      </body>
    </html>
  );
}