"use client";

import { usePageContext } from "@/contexts/PageContext";
import { useFellow } from "@/contexts/FellowContext";
import { useEffect } from "react";
import FellowProfile from "@/components/pages/fellowProfile/fellowProfile";

export default function Application({ params }: any) {
  const { accountType, setCurrentPage } = usePageContext();
  const { fellow } = useFellow();

  useEffect(() => {
    setCurrentPage("application");
  }, []);

  return (
    <div className="OwnAppProfilePage flex w-[85%] max-w-[1600px] flex-grow flex-col items-center gap-8 self-center md:pb-12 md:pt-3">
      <FellowProfile self={fellow} isOwn isApp appId={params.id} />
    </div>
  );
}
