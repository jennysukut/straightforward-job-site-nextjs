"use client";

import { usePageContext } from "@/contexts/PageContext";
import FellowProfile from "@/components/fellowProfile";
import { useFellow } from "@/contexts/FellowContext";

export default function ListingPage({ params }: any) {
  const { accountType } = usePageContext();
  const { fellow } = useFellow();

  return (
    <div className="ProfilePage flex flex-grow flex-col items-center gap-8 md:pb-12">
      {/* {accountType === "Business" && <FellowProfile hasId id="testid" />} */}
      {accountType === "Fellow" && (
        // <FellowProfile hasId id="testid" fellow={fellow} />
        <FellowProfile fellow={fellow} />
      )}
    </div>
  );
}
