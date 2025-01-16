import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";

import { useState, useEffect } from "react";
import { useFellow } from "@/contexts/FellowContext";
import { useRouter } from "next/navigation";
import { useModal } from "@/contexts/ModalContext";
import { useColors } from "@/contexts/ColorContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";

import SiteButton from "../buttonsAndLabels/siteButton";
import PaymentModal from "./paymentModal";

export default function SubscriptionModal(isBeingUpdated: any) {
  const { fellow, setFellow } = useFellow();
  const { showModal, hideModal } = useModal();
  const { textColor, secondaryTextColor } = useColorOptions();
  const { colorOption } = useColors();
  const router = useRouter();
  const [selectedAmount, setSelectedAmount] = useState("0");

  console.log(isBeingUpdated);

  const handleSubmit = () => {
    // We should setFellow with the subscription amount only after a successful payment
    // setFellow({ ...fellow, subscriptionAmount: selectedAmount });

    if (selectedAmount !== "0") {
      showModal(<PaymentModal subscriptionAmount={selectedAmount} />);
    } else if (isBeingUpdated === "true") {
      router.push("/settings");
      hideModal();
    } else {
      router.push("/profile");
      hideModal();
    }
  };

  useEffect(() => {
    if (fellow?.subscriptionAmount) {
      setSelectedAmount(fellow.subscriptionAmount);
    }
  }, []);

  return (
    <div className="SubscriptionModal flex flex-col items-center gap-10">
      <Dialog.Title className="Title max-w-[450px] self-center text-center text-xl font-bold">
        your subscription
      </Dialog.Title>
      <p className="SubscriptionSubtitle -mt-10 text-center font-medium italic">
        pay-what-you-want
      </p>
      <input
        type="range"
        min="0"
        max="50"
        step="5"
        value={selectedAmount}
        className={`ScaleInput custom-range w-[85%] ${colorOption === "highContrast" ? "highContrast" : ""}`}
        onChange={(e) => setSelectedAmount(e.target.value)}
      />
      <p className="Details text-md">monthly amount: ${selectedAmount}</p>
      <p
        className={`Details -mt-8 text-sm font-medium italic ${secondaryTextColor}`}
      >
        you can change or update at any time
      </p>
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
