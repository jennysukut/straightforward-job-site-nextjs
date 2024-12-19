"use client";

import { usePageContext } from "@/contexts/PageContext";
import JobListing from "@/components/jobListing";
import { useJobListings } from "@/contexts/JobListingsContext";
import BusinessProfile from "@/components/businessProfile";

export default function ListingPage({ params }: any) {
  const { accountType } = usePageContext();
  const { jobListings } = useJobListings();

  return (
    <div className="ProfilePage flex flex-grow flex-col items-center gap-8 md:pb-12">
      <BusinessProfile hasId id="1b23i" />
    </div>
  );
}
