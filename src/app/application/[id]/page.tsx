"use client";

import { usePageContext } from "@/contexts/PageContext";
import FellowProfile from "@/components/pages/fellowProfile/fellowProfile";
import { useFellow } from "@/contexts/FellowContext";

export default function Application({ params }: any) {
  const { accountType } = usePageContext();
  const { fellow } = useFellow();

  return (
    <div className="ProfilePage flex flex-grow flex-col items-center gap-8 md:pb-12">
      {accountType === "Business" && (
        <FellowProfile hasId id="testId" isApp appId={params.id} />
      )}
      {accountType === "Fellow" && (
        <FellowProfile self={fellow} isOwn isApp appId={params.id} />
      )}
    </div>
  );
}
