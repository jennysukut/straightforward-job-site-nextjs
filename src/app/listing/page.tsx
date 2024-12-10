"use client";

import { usePageContext } from "@/contexts/PageContext";
import JobListing from "@/components/jobListing";

export default function ListingPage() {
  const { setPageType } = usePageContext();

  // for this page, we can pass in the particular Job Listing and use it to set the Page type and fill in the details
  return (
    <div className="JobListingPage flex flex-grow flex-col items-center gap-8 pt-14 md:pb-12 md:pt-6">
      <JobListing isOwn />
    </div>
  );
}
