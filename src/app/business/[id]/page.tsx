"use client";
import { useEffect } from "react";
import { usePageContext } from "@/contexts/PageContext";
import { useRouter } from "next/navigation";

import BusinessProfile from "@/components/pages/businessProfile/businessProfile";

export default function ListingPage({ params }: any) {
  const { accountType, setCurrentPage } = usePageContext();
  const router = useRouter();

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     router.push("/"); // Redirect to main page if not logged in
  //   }
  // }, []);

  return (
    <div className="ProfilePage flex w-[85%] max-w-[1600px] flex-grow flex-col items-center justify-center gap-8 self-center md:pb-12">
      {
        // isLoggedIn &&
        <BusinessProfile hasId id={params.id} />
      }
    </div>
  );
}
