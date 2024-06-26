import type { Metadata } from "next";
import "./globals.css";
import { getServerSession } from "next-auth";
import {Providers} from "./providers";

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
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
