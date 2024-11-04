import "./globals.css";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

import { PageProvider } from "@/contexts/PageContext";
import { ModalProvider } from "@/contexts/ModalContext";
import { Analytics } from "@vercel/analytics/react";
import { FellowProvider } from "@/contexts/FellowContext";

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
      <head></head>
      <Analytics />
      <body className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-cream">
        <ApolloWrapper>
          <FellowProvider>
            <ModalProvider>
              <PageProvider>
                {/* find how to make this navBar change depending on the login status or current page - maybe set some kind of signal that we can update depending on the page to show different types of headers? */}
                <NavBar />
                <main className="Main flex flex-1 flex-col">{children}</main>
                <Footer />
              </PageProvider>
            </ModalProvider>
          </FellowProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
