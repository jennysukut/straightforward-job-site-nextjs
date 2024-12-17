"use client";

import { usePageContext } from "@/contexts/PageContext";
import JobListing from "@/components/jobListing";
import { useJobListings } from "@/contexts/JobListingsContext";

export default function ListingPage({ params }: any) {
  const { accountType } = usePageContext();
  const { jobListings } = useJobListings();

  // for this page, we can pass in the particular Job Listing and use it to set the Page type and fill in the details
  // const jobId = String(Number(params.jobId) - 1);

  return (
    <div className="JobListingPage flex flex-grow flex-col items-center gap-8 md:pb-12">
      {accountType === "Business" && (
        <JobListing isOwn hasId id={params.jobId} />
      )}
      {accountType === "Fellow" && <JobListing hasId id={params.jobId} />}
    </div>
  );
}
