import type { Metadata } from "next";
import "./globals.css";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Vistar NAI",
  description: "Vistar National Account Information",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
