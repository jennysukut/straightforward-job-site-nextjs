"use client";

import * as z from "zod";

import { useState, useEffect } from "react";
import { useBusiness } from "@/contexts/BusinessContext";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useMutation } from "@apollo/client";
import { SAVE_BUSINESS_PROFILE_PAGE_2_MUTATION } from "@/graphql/mutations";
import { usePageContext } from "@/contexts/PageContext";

import SiteButton from "@/components/buttonsAndLabels/siteButton";
import InputComponent from "@/components/inputComponents/inputComponent";
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
  const { setIsLoggedIn, setCurrentPage } = usePageContext();
  const router = useRouter();
  const [disabledButton, setDisabledButton] = useState(false);
  const [saveBusinessProfilePage2, { loading, error }] = useMutation(
    SAVE_BUSINESS_PROFILE_PAGE_2_MUTATION,
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(businessSchema),
    defaultValues: {},
  });

  useEffect(() => {
    setCurrentPage("2");
  }, []);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setDisabledButton(true);

    try {
      const response = await saveBusinessProfilePage2({
        variables: {
          businessField: data.businessField,
          missionVision: data.missionVision,
          moreAboutBusiness: data.moreAboutBusiness,
        },
      });

      // console.log(
      //   "Details saved successfully, Details:",
      //   response.data.saveBusinessProfilePage2,
      // ); // Adjust based on your mutation response

      setBusiness({
        ...business,
        businessProfile: {
          ...business?.businessProfile,
          businessField: data.businessField,
          missionVision: data.missionVision,
          moreAboutBusiness: data.moreAboutBusiness,
        },
      });
      setIsLoggedIn(true);
      router.push("/profile");
    } catch (error) {
      console.error("Signup error:", error);
      // Optionally, you can set an error state here to display to the user
    }
  };

  return (
    <div
      className={`BusinessSignupPage2 flex w-[95vw] ${textColor} max-w-[1600px] flex-grow flex-col items-center gap-8 self-center pt-6 md:pb-8 md:pt-8`}
    >
      <div className="PopulateProfileContainer flex w-[84%] max-w-[1600px] flex-col justify-center gap-10 sm:gap-8 md:w-[75%]">
        <div className="HeaderContainer flex justify-between">
          <h2 className="OptionalTitle text-lg">all about your business</h2>
          <Avatar
            addClasses="self-end -mt-14"
            avatarType="Business"
            business={business}
          />
        </div>

        {/* business field input */}
        <InputComponent
          type="text"
          placeholderText="Your Business Field"
          errors={errors.businessField}
          register={register}
          registerValue="businessField"
          defaultValue={business?.businessProfile?.businessField}
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
          defaultValue={business?.businessProfile?.missionVision}
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
          defaultValue={business?.businessProfile?.moreAboutBusiness}
          width="full"
          size="medium"
          required
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
