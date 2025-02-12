"use client";

import { usePageContext } from "@/contexts/PageContext";
import MessageCenter from "@/components/pages/messagingCenter";

export default function Messages() {
  const { accountType } = usePageContext();

  return (
    <div className="MessagePage flex flex-grow flex-col items-center gap-8 text-jade md:pb-12">
      <MessageCenter />
    </div>
  );
}
