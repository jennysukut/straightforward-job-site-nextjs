"use client";

import React from "react";
import { useEffect } from "react";
import { usePageContext } from "@/contexts/PageContext";

export default function BusinessSignupPages({ children }: any) {
  const { setPageType } = usePageContext();

  useEffect(() => {
    setPageType("Business Signup");
  }, [setPageType]);

  return <>{children}</>;
}
