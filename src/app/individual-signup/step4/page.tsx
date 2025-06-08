"use client";

import * as z from "zod";

import { useState, useEffect } from "react";
import { useFellow } from "@/contexts/FellowContext";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useMutation } from "@apollo/client";
import { SAVE_PROFILE_PAGE_4_MUTATION } from "@/graphql/mutations";
import { usePageContext } from "@/contexts/PageContext";

import SiteButton from "@/components/buttonsAndLabels/siteButton";
import InputComponent from "@/components/inputComponents/inputComponent";
import Avatar from "@/components/avatarComponent";
import DeleteHandler from "@/components/handlers/deleteHandler";
import AddHandler from "@/components/handlers/addHandler";
import ButtonOptionsComponent from "@/components/buttonsAndLabels/buttonOptionsComponent";

const fellowSchema = z.object({
  passions: z.string().optional(),
  lookingFor: z.string().optional(),
  locationOptions: z
    .array(z.string())
    .min(1, { message: "You Must Have At Least 1 Location Type Selected" }),
});

type FormData = z.infer<typeof fellowSchema>;

export default function IndividualSignupPage4() {
  const { fellow, setFellow } = useFellow();
  const { setCurrentPage } = usePageContext();
  const router = useRouter();
  const { textColor, titleColor } = useColorOptions();

  const [disabledButton, setDisabledButton] = useState(false);
  const [locationOptions, setLocationOptions] = useState<string[]>([]);
  const [saveFellowProfilePage4, { loading, error }] = useMutation(
    SAVE_PROFILE_PAGE_4_MUTATION,
  );

  const {
    handleSubmit,
    setValue,
    register,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(fellowSchema),
    defaultValues: {
      locationOptions: locationOptions,
    },
  });

  // handlers for adding, updating, and deleting details
  const handleAdd = (type: "locationOptions", data: any) => {
    AddHandler({
      item: data,
      type,
      setFunctions: {
        locationOptions: setLocationOptions,
      },
      setValue,
      clearErrors,
    });
  };

  const handleDelete = (type: "locationOptions", id: any) => {
    DeleteHandler({
      item: id,
      type,
      setFunctions: {
        locationOptions: setLocationOptions,
      },
    });
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setDisabledButton(true);

    try {
      const response = await saveFellowProfilePage4({
        variables: {
          passions: data.passions,
          lookingFor: data.lookingFor,
          locationOptions: locationOptions,
        },
      });
      console.log(
        "Details saved successfully, Details:",
        response.data.saveFellowProfilePage4,
      );

      setFellow({
        ...fellow,
        profile: {
          ...fellow?.profile,
          passions: data.passions,
          lookingFor: data.lookingFor,
          locationOptions: locationOptions,
        },
        // profileIsBeingEdited: false,
      });
      // if (fellow?.profileIsBeingEdited) {
      //   router.push("/profile");
      // } else {
      router.push("/individual-signup/step5");
      // }
    } catch (error) {
      console.error("Signup error:", error);
      // Optionally, you can set an error state here to display to the user
    }
  };

  // Setting Details on page from fellowContext
  useEffect(() => {
    setCurrentPage("4");

    setLocationOptions(
      Array.isArray(fellow?.profile?.locationOptions)
        ? fellow.profile?.locationOptions
        : [],
    );
    setValue("locationOptions", fellow?.profile?.locationOptions || []);
  }, []);

  return (
    <div
      className={`IndividualSignupPage4 ${textColor} flex w-[95vw] max-w-[1600px] flex-grow flex-col items-center gap-8 self-center pt-6 md:pb-8 md:pt-8`}
    >
      <div className="PopulateProfileContainer flex w-[84%] max-w-[1600px] flex-col justify-center gap-10 sm:gap-8 md:w-[75%]">
        <div className="HeaderContainer flex justify-between">
          <h2 className={`OptionalTitle text-lg ${titleColor}`}>
            work-related details
          </h2>
          <div className="AvatarContainer self-end pr-6">
            <Avatar
              addClasses="self-end -mt-14"
              avatarType="Fellow"
              avatar={fellow?.profile?.avatar}
            />
          </div>
        </div>

        {/*  looking for input */}
        <InputComponent
          type="text"
          placeholderText="What are you looking for in a job / company?"
          errors={errors.lookingFor}
          register={register}
          registerValue="lookingFor"
          defaultValue={fellow?.profile?.lookingFor}
          width="full"
          size="medium"
        />

        {/* location options details */}
        <ButtonOptionsComponent
          type="locationOptions"
          title="Which location type/s do you prefer?"
          buttons={["remote", "on-site", "hybrid"]}
          selectedArray={locationOptions}
          handleAdd={handleAdd}
          handleDelete={handleDelete}
          errors={errors.locationOptions}
          required
          classesForButtons="px-8"
          addClasses="mt-4 -mb-2"
        />

        {/* passionate-about input */}
        <InputComponent
          type="text"
          placeholderText="What are you passionate about?"
          errors={errors.passions}
          register={register}
          registerValue="passions"
          defaultValue={fellow?.profile?.passions}
          size="medium"
          width="full"
        />

        <div className="ButtonContainer -mb-6 mt-6 flex justify-end self-end">
          <SiteButton
            variant="hollow"
            colorScheme="f1"
            aria="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={disabledButton}
          >
            {/* {disabledButton && fellow?.profileIsBeingEdited === true
              ? "Returning To Profile..."
              : !disabledButton && fellow?.profileIsBeingEdited === true
                ? "update"
                : disabledButton && fellow?.profileIsBeingEdited === false
                  ? "Saving Information.."
                  : "continue"} */}

            {disabledButton ? "Saving Information..." : "continue"}
          </SiteButton>
        </div>
      </div>
    </div>
  );
}
