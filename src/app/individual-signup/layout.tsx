"use client";

import React from "react";
import { useEffect } from "react";
import { usePageContext } from "@/contexts/PageContext";

export default function IndividualSignupPages({ children }: any) {
  const { setPageType, setCurrentPage } = usePageContext();

  useEffect(() => {
    setPageType("Individual Signup");
    setCurrentPage("individualSignup");
  }, []);

  return <>{children}</>;
}
