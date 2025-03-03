"use client";

import OtherHeaderSection from "./otherHeaderSection";

export default function Home() {
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
