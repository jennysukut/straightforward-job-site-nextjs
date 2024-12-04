"use client";

import React from "react";
import { useEffect } from "react";
import { usePageContext } from "@/contexts/PageContext";

export default function Home() {
  const { setCurrentPage, setPageType } = usePageContext();

  useEffect(() => {
    setCurrentPage("Profile");
    setPageType("Individual");
  }, [setCurrentPage, setPageType]);

  return (
    <div className="HomePage flex flex-grow flex-col items-center gap-8 pt-14 md:pb-12 md:pt-20">
      <div className="HomeContainer flex w-[84%] max-w-[1600px] flex-col gap-20 sm:gap-32 md:w-[75%]">
        PROFILE PAGE
      </div>
    </div>
  );
}
