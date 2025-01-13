"use client";

import { usePageContext } from "@/contexts/PageContext";

export default function AppMessages({ params }: any) {
  const { accountType } = usePageContext();
  //you'll get an appId sent into this param

  return (
    <div className="MessagePage flex flex-grow flex-col items-center gap-8 md:pb-12">
      MESSAGING PAGE HERE FOR SPECIFIC APPLICATION: {params.appId}
    </div>
  );
}
