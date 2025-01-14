"use client";
import { usePageContext } from "@/contexts/PageContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useEffect } from "react";

import React from "react";
import CalendarComp from "@/components/calendar";

export default function AMSJobPage() {
  const { accountType, isLoggedIn, setCurrentPage } = usePageContext();
  const { textColor } = useColorOptions();

  useEffect(() => {
    setCurrentPage("calendar");
  }, []);
  return (
    <div
      className={`Calendar flex ${textColor} flex-grow flex-col items-center gap-8 md:pb-12 md:pt-3 ${!isLoggedIn ? "justify-center" : ""}`}
    >
      <CalendarComp />
      {!isLoggedIn && (
        <div className="LogInPrompt max-w-[40vw] text-center">
          <p className="prompt text-olive">{`It looks like you're not logged in. Be sure to set up an account and log in to keep track of your applications & appointments with our fantastic application management system!`}</p>
        </div>
      )}
    </div>
  );
}
