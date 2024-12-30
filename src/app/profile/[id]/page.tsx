"use client";

import { usePageContext } from "@/contexts/PageContext";
import JobListing from "@/components/pages/jobListing/jobListing";
import { useJobListings } from "@/contexts/JobListingsContext";
import BusinessProfile from "@/components/pages/businessProfile/businessProfile";

export default function ListingPage({ params }: any) {
  const { accountType } = usePageContext();
  const { jobListings } = useJobListings();

  return (
    <div className="ProfilePage flex flex-grow flex-col items-center gap-8 md:pb-12">
      <BusinessProfile hasId id={params.id} />
    </div>
  );
}
