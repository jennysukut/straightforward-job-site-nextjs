"use client";

import React from "react";
import { useEffect } from "react";
import { usePageContext } from "@/contexts/PageContext";

export default function BusinessSignupPages({ children }: any) {
  const { setPageType, setCurrentPage } = usePageContext();

  useEffect(() => {
    setPageType("Business Signup");
  }, []);

  return <>{children}</>;
}
