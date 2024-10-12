import "./globals.css";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

import { ModalProvider } from "@/contexts/ModalContext";
import { Analytics } from "@vercel/analytics/react";

import NavBar from "@/components/navBar";
import Footer from "@/components/footer";

const ApolloWrapper = dynamic(() => import("@/app/apolloClient"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Straightforward Job Site",
  description: "the human-focused place for job searching",
  openGraph: {
    images: [
      {
        url: "/metadata-image.jpg",
        width: 1200,
        height: 626,
        alt: "Straightforward Job Site. The simple, human-focused, epic job platform.",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Analytics />
      <body className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-cream">
        <ApolloWrapper>
          <ModalProvider>
            <NavBar />
            <main className="Main flex flex-1 flex-col">{children}</main>
            <Footer />
          </ModalProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
