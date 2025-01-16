"use client";

import { usePageContext } from "@/contexts/PageContext";
import { useEffect } from "react";

import JobListing from "@/components/pages/jobListing/jobListing";

export default function ListingPage() {
  const { accountType, setCurrentPage } = usePageContext();

  useEffect(() => {
    setCurrentPage("listing");
  }, []);

  return (
    <div className="JobListingPage flex flex-grow flex-col items-center gap-8 md:pb-12">
      {accountType === "Business" && <JobListing isOwn />}
      {accountType === "Fellow" && (
        <div className="Prompt max-w-[40vw] text-center">
          <p className="prompt text-olive">{`You'll need to have a job id to access a listing.`}</p>
        </div>
      )}
    </div>
  );
}
