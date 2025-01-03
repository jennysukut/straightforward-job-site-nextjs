"use client";

import { usePageContext } from "@/contexts/PageContext";
import JobListing from "@/components/pages/jobListing/jobListing";

export default function ListingPage() {
  const { accountType } = usePageContext();

  return (
    <div className="JobListingPage flex flex-grow flex-col items-center gap-8 md:pb-12">
      {accountType === "Business" && <JobListing isOwn />}
      {accountType === "Fellow" && <JobListing />}
    </div>
  );
}
