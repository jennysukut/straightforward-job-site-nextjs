"use client";

import { useEffect } from "react";
import { usePageContext } from "@/contexts/PageContext";

import BouncingDotsLoader from "@/components/loader";

export default function Home() {
  const { setCurrentPage } = usePageContext();

  useEffect(() => {
    setCurrentPage("under construction");
  }, []);

  return (
    <div className="LandingPageContainer -mb-10 -mt-48 flex h-[140vh] w-[100vw] max-w-[1600px] flex-col items-center justify-center text-olive">
      <h2 className="UnderConstruction mb-8">
        This Page Is Currently Under Construction
      </h2>
      <BouncingDotsLoader />
    </div>
  );
}
