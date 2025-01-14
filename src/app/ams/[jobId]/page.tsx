"use client";
import { usePageContext } from "@/contexts/PageContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useEffect } from "react";

import React from "react";
import ApplicationManager from "@/components/pages/applicationManager/applicationManager";

export default function AMSJobPage({ params }: any) {
  const { accountType, isLoggedIn, setCurrentPage } = usePageContext();
  const { textColor } = useColorOptions();

  useEffect(() => {
    setCurrentPage("application manager");
  }, []);

  // Here, we'll need to check to make sure the jobId listed is owned by the business that's currently logged in.
  // If it is, we'll show the AMS page for the job. If not, we can throw an error message.

  return (
    <div
      className={`AMS flex ${textColor} flex-grow flex-col items-center gap-8 md:pb-12 md:pt-3 ${!isLoggedIn ? "justify-center" : ""}`}
    >
      <ApplicationManager jobId={params.jobId} />
      {!isLoggedIn && (
        <div className="LogInPrompt max-w-[40vw] text-center">
          <p className="prompt text-olive">{`It looks like you're not logged in. Be sure to set up an account and log in to keep track of your applications with our fantastical application management system!`}</p>
        </div>
      )}
    </div>
  );
}
