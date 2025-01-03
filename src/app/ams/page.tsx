"use client";
import { usePageContext } from "@/contexts/PageContext";

import React from "react";
import FellowAMS from "@/components/pages/applicationManager/fellowAMS";
import BusinessAMS from "@/components/pages/applicationManager/businessAMS";

export default function AMS() {
  const { accountType, isLoggedIn } = usePageContext();

  return (
    <div
      className={`AMS flex flex-grow flex-col items-center gap-8 md:pb-12 md:pt-3 ${!isLoggedIn ? "justify-center" : ""}`}
    >
      {accountType === "Fellow" && isLoggedIn && <FellowAMS />}
      {accountType === "Business" && isLoggedIn && <BusinessAMS />}
      {!isLoggedIn && (
        <div className="LogInPrompt max-w-[40vw] text-center">
          <p className="prompt text-olive">{`It looks like you're not logged in. Be sure to set up an account and log in to keep track of your applications with our fantastical application management system!`}</p>
        </div>
      )}
    </div>
  );
}
