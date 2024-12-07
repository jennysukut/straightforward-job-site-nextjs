"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";

import { useModal } from "@/contexts/ModalContext";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import SiteButton from "../siteButton";
import FormSubmissionButton from "@/components/formSubmissionButton";
import FormInputComponent from "@/components/formInputComponent";
import InputComponent from "../inputComponent";

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

export default function PaymentModal({ subscriptionAmount }: any) {
  const { showModal, hideModal } = useModal();
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

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (agree) {
      setDisabledButton(true);
      console.log(data, agree);
    } else {
    }
  };

  console.log(errors?.agreeToTerms);

  return (
    <div className="PaymentModal flex w-[50vw] max-w-[450px] flex-col gap-4 text-jade">
      <Dialog.Title className="Title max-w-[450px] self-center text-center text-xl font-bold">
        your payment info
      </Dialog.Title>
      <p className="CurrentPayment -mt-2 text-center font-medium italic">{`your current payment: $${subscriptionAmount}`}</p>
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
        <div className="AgreeContainer mt-2 flex gap-4">
          <SiteButton
            variant="hollow"
            colorScheme="f1"
            aria="agree"
            size="smallCircle"
            isSelected={agree}
            onClick={clickAgree}
          />
          <label htmlFor="agree" className="cursor-pointer pl-2 text-sm">
            {`I agree to this purchase and the recurring monthly rate of $${subscriptionAmount}.`}
          </label>
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