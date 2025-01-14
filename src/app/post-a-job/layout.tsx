"use client";

import React from "react";
import { useEffect } from "react";
import { usePageContext } from "@/contexts/PageContext";

export default function PostAJobPages({ children }: any) {
  const { setPageType, setCurrentPage } = usePageContext();

  useEffect(() => {
    setPageType("Job Creation");
    setCurrentPage("jobCreation");
  }, []);

  return <>{children}</>;
}
