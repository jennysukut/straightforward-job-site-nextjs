import "./globals.css";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

import { PageProvider } from "@/contexts/PageContext";
import { ModalProvider } from "@/contexts/ModalContext";
import { Analytics } from "@vercel/analytics/react";
import { FellowProvider } from "@/contexts/FellowContext";
import { BusinessProvider } from "@/contexts/BusinessContext";
import { JobProvider } from "@/contexts/JobContext";
import { ColorProvider } from "@/contexts/ColorContext";
import { JobListingsProvider } from "@/contexts/JobListingsContext";
import { ApplicationProvider } from "@/contexts/ApplicationContext";
import { ApplicationsProvider } from "@/contexts/ApplicationsContext";
import { AppointmentsContextProvider } from "@/contexts/AppointmentsContext";
import { MessagesProvider } from "@/contexts/MessagesContext";
import { ReportsProvider } from "@/contexts/ReportsContext";
import ClientAuthWrapper from "@/components/clientAuthWrapper";

import NavBar from "@/components/navBar";
import Footer from "@/components/footer";
import Image from "next/image";

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
        <PageProvider>
          <ApolloWrapper>
            <AppointmentsContextProvider>
              <MessagesProvider>
                <ReportsProvider>
                  <ApplicationsProvider>
                    <ApplicationProvider>
                      <JobListingsProvider>
                        <JobProvider>
                          <BusinessProvider>
                            <FellowProvider>
                              <ColorProvider>
                                <ModalProvider>
                                  <ClientAuthWrapper>
                                    <NavBar />
                                    <main className="Main flex flex-1 flex-col">
                                      {children}
                                    </main>
                                    <Footer />
                                  </ClientAuthWrapper>
                                </ModalProvider>
                              </ColorProvider>
                            </FellowProvider>
                          </BusinessProvider>
                        </JobProvider>
                      </JobListingsProvider>
                    </ApplicationProvider>
                  </ApplicationsProvider>
                </ReportsProvider>
              </MessagesProvider>
            </AppointmentsContextProvider>
          </ApolloWrapper>
        </PageProvider>
      </body>
    </html>
  );
}
