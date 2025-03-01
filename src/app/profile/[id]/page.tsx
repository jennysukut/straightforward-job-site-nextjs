"use client";
import { useEffect } from "react";
import { usePageContext } from "@/contexts/PageContext";

import BusinessProfile from "@/components/pages/businessProfile/businessProfile";
import FellowProfile from "@/components/pages/fellowProfile/fellowProfile";

export default function ListingPage({ params }: any) {
  const { accountType, setCurrentPage } = usePageContext();

  return (
    <div className="ProfilePage flex flex-grow flex-col items-center gap-8 md:pb-12">
      {accountType === "Fellow" && <BusinessProfile hasId id={params.id} />}
      {accountType === "Business" && (
        <FellowProfile hasId id="testId" isApp appId={params.id} />
      )}
    </div>
  );
}
