"use client";

import { usePageContext } from "@/contexts/PageContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";

import JobListing from "@/components/jobListing";

export default function JobBoard() {
  const { accountType } = usePageContext();
  const { textColor } = useColorOptions();

  return (
    <div
      className={`JobBoardPage flex flex-grow flex-col items-center gap-8 md:pb-12 ${textColor}`}
    >
      Job Board Here
    </div>
  );
}
