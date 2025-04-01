"use client";
import { useEffect } from "react";
import { usePageContext } from "@/contexts/PageContext";

import BusinessProfile from "@/components/pages/businessProfile/businessProfile";

export default function ListingPage({ params }: any) {
  const { accountType, setCurrentPage } = usePageContext();

  return (
    <div className="ProfilePage flex flex-grow flex-col items-center gap-8 md:pb-12">
      <BusinessProfile hasId id={params.id} />
    </div>
  );
}
