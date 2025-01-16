"use client";

import { usePageContext } from "@/contexts/PageContext";
import { useEffect } from "react";
import JobListing from "@/components/pages/jobListing/jobListing";

export default function ListingPage({ params }: any) {
  const { setCurrentPage } = usePageContext();

  useEffect(() => {
    setCurrentPage("listing");
  }, []);

  return (
    <div className="JobListingPage flex flex-grow flex-col items-center gap-8 md:pb-12">
      <JobListing hasId id={params.jobId} inAms />
    </div>
  );
}
