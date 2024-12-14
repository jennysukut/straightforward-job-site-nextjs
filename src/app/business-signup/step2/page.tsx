"use client";

import * as z from "zod";

import { useState } from "react";
import { useBusiness } from "@/contexts/BusinessContext";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useColorOptions } from "@/lib/stylingData/colorOptions";

import SiteButton from "@/components/siteButton";
import InputComponent from "@/components/inputComponent";
import Avatar from "@/components/avatarComponent";

const businessSchema = z.object({
  businessField: z.string().min(3, { message: "Business Field Required" }),
  missionVision: z.string().min(3, { message: "Mission & Vision Required" }),
  moreAboutBusiness: z
    .string()
    .min(3, { message: "Please Provide More Details" }),
});

type FormData = z.infer<typeof businessSchema>;

export default function BusinessSignupPage2() {
  const { business, setBusiness } = useBusiness();
  const { textColor } = useColorOptions();
  const router = useRouter();
  const [disabledButton, setDisabledButton] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(businessSchema),
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setDisabledButton(true);
    setBusiness({
      ...business,
      businessField: data.businessField,
      missionVision: data.missionVision,
      moreAboutBusiness: data.moreAboutBusiness,
    });
    router.push("/profile");
  };

  return (
    <div
      className={`BusinessSignupPage2 flex w-[95vw] ${textColor} max-w-[1600px] flex-grow flex-col items-center gap-8 self-center pt-6 md:pb-8 md:pt-8`}
    >
      <div className="PopulateProfileContainer flex w-[84%] max-w-[1600px] flex-col justify-center gap-10 sm:gap-8 md:w-[75%]">
        <div className="HeaderContainer flex justify-between">
          <h2 className="OptionalTitle text-lg">all about your business</h2>
          <Avatar addClasses="self-end -mt-14" />
        </div>

        {/* business field input */}
        <InputComponent
          type="text"
          placeholderText="Your Business Field"
          errors={errors.businessField}
          register={register}
          registerValue="businessField"
          defaultValue={business?.businessField}
          addClasses="-mt-2"
          width="full"
          required
        />

        {/* mission vision input */}
        <InputComponent
          type="text"
          placeholderText="Your Mission & Vision"
          errors={errors.missionVision}
          register={register}
          registerValue="missionVision"
          defaultValue={business?.missionVision}
          addClasses="-mt-2"
          width="full"
          required
        />

        {/*  more about your business input */}
        <InputComponent
          type="text"
          placeholderText="More About Your Business..."
          errors={errors.moreAboutBusiness}
          register={register}
          registerValue="moreAboutBusiness"
          defaultValue={business?.moreAboutBusiness}
          width="full"
          size="medium"
        />

        <div className="ButtonContainer -mb-6 mt-6 flex justify-end self-end">
          <SiteButton
            variant="hollow"
            colorScheme="f1"
            aria="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={disabledButton}
          >
            {disabledButton && business?.profileIsBeingEdited === true
              ? "Returning To Profile..."
              : !disabledButton && business?.profileIsBeingEdited === true
                ? "update"
                : disabledButton && business?.profileIsBeingEdited === false
                  ? "Saving Information.."
                  : "continue"}
          </SiteButton>
        </div>
      </div>
    </div>
  );
}
