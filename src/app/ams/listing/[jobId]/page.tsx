"use client";

import JobListing from "@/components/pages/jobListing/jobListing";

export default function ListingPage({ params }: any) {
  return (
    <div className="JobListingPage flex flex-grow flex-col items-center gap-8 md:pb-12">
      <JobListing hasId id={params.jobId} inAms />
    </div>
  );
}
