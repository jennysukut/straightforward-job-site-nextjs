"use client";

import React from "react";
import { useEffect } from "react";
import { usePageContext } from "@/contexts/PageContext";

export default function IndividualSignupPages({ children }: any) {
  const { setPageType } = usePageContext();

  useEffect(() => {
    setPageType("Individual Signup");
  }, [setPageType]);

  return <>{children}</>;
}