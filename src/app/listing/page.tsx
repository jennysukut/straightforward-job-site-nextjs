"use client";

import { usePageContext } from "@/contexts/PageContext";
import { useEffect } from "react";

import JobListing from "@/components/pages/jobListing/jobListing";

export default function ListingPage() {
  const { accountType, setCurrentPage, isLoggedIn } = usePageContext();

  useEffect(() => {
    setCurrentPage("listing");
  }, []);

  return (
    <div
      className={`JobListingPage flex flex-grow flex-col items-center gap-8 md:pb-12 ${accountType !== "Business" || !isLoggedIn ? "justify-center align-middle" : ""}`}
    >
      {!isLoggedIn && (
        <div className="Prompt h-full max-w-[40vw] items-center text-center">
          <p className="prompt text-olive">{`You've got to be logged in to access this page.`}</p>
        </div>
      )}
      {isLoggedIn && accountType === "Business" && <JobListing isOwn newPost />}
      {isLoggedIn && accountType === "Fellow" && (
        <div className="Prompt max-w-[40vw] text-center">
          <p className="prompt text-olive">{`You'll need to have a job id to access a listing.`}</p>
        </div>
      )}
    </div>
  );
}
