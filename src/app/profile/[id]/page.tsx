"use client";
import { useEffect } from "react";
import { usePageContext } from "@/contexts/PageContext";
import { useRouter } from "next/navigation";

import BusinessProfile from "@/components/pages/businessProfile/businessProfile";
import FellowProfile from "@/components/pages/fellowProfile/fellowProfile";

export default function ListingPage({ params }: any) {
  const { accountType, setCurrentPage, isLoggedIn } = usePageContext();
  const router = useRouter();

  // how do I tell if this is an app or not?
  return (
    <div className="ProfilePage flex flex-grow flex-col items-center gap-8 md:pb-12">
      {<FellowProfile hasId id={params.id} isApp />}
    </div>
  );
}
