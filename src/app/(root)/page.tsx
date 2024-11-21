"use client";

import SiteButton from "@/components/siteButton";
import HeaderSection from "./headerSection";

export default function Home() {
  return (
    <div className="HomePage flex flex-grow flex-col items-center gap-8 pt-14 md:pb-12 md:pt-20">
      <div className="HomeContainer flex w-[84%] max-w-[1600px] flex-col gap-20 sm:gap-32 md:w-[75%]">
        <HeaderSection />
      </div>
    </div>
  );
}
