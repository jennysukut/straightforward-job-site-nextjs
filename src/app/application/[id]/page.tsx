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
    <div className="ProfilePage flex flex-grow flex-col items-center gap-8 md:pb-12">
      {accountType === "Fellow" && (
        <FellowProfile self={fellow} isOwn isApp appId={params.id} />
      )}
      {accountType === "Business" && (
        <FellowProfile hasId id="testId" isApp appId={params.id} />
      )}
    </div>
  );
}
