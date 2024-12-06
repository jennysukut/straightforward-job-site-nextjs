"use client";

import React from "react";
import { useEffect, useState } from "react";
import { usePageContext } from "@/contexts/PageContext";
import { useFellow } from "@/contexts/FellowContext";

import FellowProfile from "@/components/fellowProfile";

export default function Home() {
  const { setCurrentPage, setPageType } = usePageContext();
  const { fellow, setFellow } = useFellow();

  useEffect(() => {
    setCurrentPage("Profile");
    setPageType("Individual");
  }, [setCurrentPage, setPageType]);

  return (
    <div className="Profile flex flex-grow flex-col items-center gap-8 pt-14 md:pb-12 md:pt-6">
      <FellowProfile fellow={fellow} isOwn />
    </div>
  );
}
