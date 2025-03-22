"use client";

import { useEffect } from "react";
import { usePageContext } from "@/contexts/PageContext";

import OtherHeaderSection from "./otherHeaderSection";

export default function Home() {
  const { setPageType } = usePageContext();

  useEffect(() => {
    setPageType("main");
  }, []);

  return (
    <div
      className="LandingPageContainer -mb-10 -mt-48 flex h-[140vh] w-[100vw] max-w-[1600px] flex-col items-center justify-center"
      style={{
        backgroundImage: 'url("/BackgroundShapes5.svg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <OtherHeaderSection />
    </div>
  );
}
