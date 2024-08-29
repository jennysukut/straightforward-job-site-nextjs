import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/navBar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Straightforward Job Site",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative overflow-x-hidden bg-cream">
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
