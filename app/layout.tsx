import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vistar NAI",
  description: "Vistar National Account Information",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
