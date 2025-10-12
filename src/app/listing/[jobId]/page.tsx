"use client";

import { usePageContext } from "@/contexts/PageContext";

import JobListing from "@/components/pages/jobListing/jobListing";

export default function ListingPage({ params }: any) {
  const { accountType } = usePageContext();

  return (
    <div className="JobListingPage flex flex-grow flex-col items-center gap-8 md:pb-12">
      {/* We'll have to fix this so that it checks if the business is actually the one who posted that job */}
      {accountType === "Business" && (
        <JobListing isOwn hasId id={params.jobId} />
      )}
      {accountType === "Fellow" && <JobListing hasId id={params.jobId} />}
      {accountType !== "Fellow" && accountType !== "Business" && (
        // set not logged in parameters here so we'll know what buttons to show?
        <JobListing hasId id={params.jobId} />
      )}
    </div>
  );
}
