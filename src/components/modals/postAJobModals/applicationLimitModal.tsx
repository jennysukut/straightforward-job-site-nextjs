import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@/contexts/ModalContext";
import { useBusiness } from "@/contexts/BusinessContext";
import { usePageContext } from "@/contexts/PageContext";

import SiteButton from "@/components/siteButton";
import SiteLabel from "@/components/siteLabel";

export default function ApplicationLimitModal(isBeingUpdated: any) {
  const { business, setBusiness } = useBusiness();
  const { setPageType } = usePageContext();
  const { hideModal } = useModal();
  const [applicationLimit, setApplicationLimit] = useState("25");

  const handleSubmit = () => {
    setBusiness({
      ...business,
      activeJobs:
        business?.activeJobs.map((job: any, index: number) => {
          if (index === business.activeJobs.length - 1) {
            return {
              ...job,
              applicationLimit: applicationLimit,
            };
          }
          return job;
        }) || [],
    });
    hideModal();
  };

  useEffect(() => {
    setPageType("Business");
  }, []);

  return (
    <div className="SubscriptionModal flex flex-col items-center gap-10">
      <Dialog.Title className="Title max-w-[450px] self-center text-center text-xl font-bold">
        application limit
      </Dialog.Title>
      <p className="SubscriptionSubtitle -mt-10 text-center font-medium italic">
        per round{" "}
      </p>
      <input
        type="range"
        min="10"
        max="50"
        step="5"
        value={applicationLimit}
        className="ScaleInput custom-range w-[85%]"
        onChange={(e) => setApplicationLimit(e.target.value)}
      />
      <p className="Details text-md">
        max applications per round: {applicationLimit}
      </p>
      <p className="Details -mt-4 text-sm italic text-olive">we recommend 25</p>
      <div className="ButtonContainer m-0 -my-4 self-end">
        <SiteButton
          addClasses="w-32"
          variant="hollow"
          aria="Enter"
          colorScheme="b6"
          onClick={handleSubmit}
        >
          select
        </SiteButton>
      </div>
    </div>
  );
}
