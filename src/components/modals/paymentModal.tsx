"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";

import { useModal } from "@/contexts/ModalContext";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFellow } from "@/contexts/FellowContext";
import { useJobListings } from "@/contexts/JobListingsContext";
import { useJob } from "@/contexts/JobContext";

import SiteButton from "../buttonsAndLabels/siteButton";
import FormSubmissionButton from "@/components/buttonsAndLabels/formSubmissionButton";
import InputComponent from "../inputComponents/inputComponent";
import PaymentSuccessfulModal from "./paymentSuccessfulModal";

const PaymentSchema = z.object({
  nameOnCard: z.string().min(2, { message: "Name On Card Required" }),
  cardNumber: z.string().min(5, { message: "Card Number Required" }),
  zipcode: z.string().min(4, { message: "Zip Code Required" }),
  cvc: z.string().min(3, { message: "CVC Required" }),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms.",
  }),
});

type FormData = z.infer<typeof PaymentSchema>;

export default function PaymentModal({ subscriptionAmount, isJobPost }: any) {
  const { showModal, hideModal } = useModal();
  const { fellow, setFellow } = useFellow();
  const { jobListings, setJobListings } = useJobListings();
  const { job } = useJob();
  const [disabledButton, setDisabledButton] = useState(false);
  const [agree, setAgree] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(PaymentSchema),
    defaultValues: {
      agreeToTerms: agree,
    },
  });

  const clickAgree = () => {
    setAgree(!agree);
    setValue("agreeToTerms", !agree);
    clearErrors("agreeToTerms");
  };

  const randomId = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (agree) {
      setDisabledButton(true);
      console.log(data, agree);
      setFellow({
        ...fellow,
        profile: { ...fellow?.profile, subscriptionAmount: subscriptionAmount },
      });
      if (isJobPost && job) {
        setJobListings([
          ...(jobListings || []),
          {
            jobId: randomId,
            job: {
              ...job,
              numberOfApps: String(0),
            },
          },
        ]);
        showModal(<PaymentSuccessfulModal isJobPost />);
      }
      {
        !isJobPost && showModal(<PaymentSuccessfulModal />);
      }
    }
  };

  return (
    <div className="PaymentModal flex w-[50vw] max-w-[450px] flex-col gap-4 text-jade">
      <Dialog.Title className="Title max-w-[450px] self-center text-center text-xl font-bold">
        {isJobPost ? "publish your job listing" : "your payment info"}
      </Dialog.Title>
      {!isJobPost && (
        <p className="CurrentPayment -mt-2 text-center font-medium italic">{`your current payment: $${subscriptionAmount}`}</p>
      )}
      {isJobPost && (
        <p className="JobPostPayment -mt-2 text-center font-medium italic">{`your amount due: $${subscriptionAmount}`}</p>
      )}
      <form
        className="AddExperienceForm mt-4 flex flex-col gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* nameOnCard input */}
        <InputComponent
          type="text"
          placeholderText="Name on Card"
          errors={errors.nameOnCard}
          register={register}
          registerValue="nameOnCard"
        />

        {/* cardNumber input */}
        <InputComponent
          type="text"
          placeholderText="Card Number"
          errors={errors.cardNumber}
          register={register}
          registerValue="cardNumber"
        />

        <div className="ZipCodeCVC flex gap-6">
          {/* cardNumber input */}
          <InputComponent
            type="text"
            placeholderText="Zip Code"
            errors={errors.zipcode}
            register={register}
            registerValue="zipcode"
          />

          {/* cardNumber input */}
          <InputComponent
            type="text"
            placeholderText="CVC"
            errors={errors.cvc}
            register={register}
            registerValue="cvc"
          />
        </div>

        {/* agree to purchase button */}
        <div className="AgreeContainer -mb-2 mt-2 flex gap-4">
          <SiteButton
            variant="hollow"
            colorScheme="f1"
            aria="agree"
            size="smallCircle"
            isSelected={agree}
            onClick={clickAgree}
          />
          {!isJobPost && (
            <label htmlFor="agree" className="cursor-pointer pl-2 text-sm">
              {`I agree to this purchase and the recurring monthly rate of $${subscriptionAmount}.`}
            </label>
          )}
          {isJobPost && (
            <label htmlFor="agree" className="cursor-pointer pl-2 text-sm">
              {`I agree to this purchase and the recurring monthly rate of $${subscriptionAmount} for the duration of this job listing.`}
            </label>
          )}
        </div>
        {errors?.agreeToTerms && errors.agreeToTerms.message && (
          <p className="-mb-6 -mt-4 p-0 text-xs font-medium text-orange">
            {errors.agreeToTerms.message.toString()}
          </p>
        )}

        {/* form submission button */}
        <FormSubmissionButton
          disabledButton={disabledButton}
          handleSubmit={handleSubmit(onSubmit)}
          addText="proceed"
          addingText="Processing Payment..."
        />
      </form>
    </div>
  );
}
