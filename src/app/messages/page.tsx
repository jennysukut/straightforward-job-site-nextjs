"use client";

import { usePageContext } from "@/contexts/PageContext";

export default function Messages() {
  const { accountType } = usePageContext();

  return (
    <div className="MessagePage flex flex-grow flex-col items-center gap-8 md:pb-12">
      MESSAGING PAGE HERE
    </div>
  );
}
