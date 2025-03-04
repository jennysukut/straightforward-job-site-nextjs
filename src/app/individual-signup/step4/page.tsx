"use client";

import * as z from "zod";

import { useState, useEffect } from "react";
import { useFellow } from "@/contexts/FellowContext";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useColorOptions } from "@/lib/stylingData/colorOptions";

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
  const router = useRouter();
  const { textColor, titleColor } = useColorOptions();

  const [disabledButton, setDisabledButton] = useState(false);
  const [locationOptions, setLocationOptions] = useState<string[]>([]);

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
    setFellow({
      ...fellow,
      passions: data.passions,
      lookingFor: data.lookingFor,
      locationOptions: locationOptions,
      profileIsBeingEdited: false,
    });
    if (fellow?.profileIsBeingEdited) {
      router.push("/profile");
    } else {
      router.push("/individual-signup/step5");
    }
  };

  // Setting Details on page from fellowContext
  useEffect(() => {
    setLocationOptions(
      Array.isArray(fellow?.locationOptions) ? fellow.locationOptions : [],
    );
    setValue("locationOptions", fellow?.locationOptions || []);
  }, []);

  return (
    <div
      className={`IndividualSignupPage4 ${textColor} flex w-[95vw] max-w-[1600px] flex-grow flex-col items-center gap-8 self-center pt-6 md:pb-8 md:pt-8`}
    >
      <div className="PopulateProfileContainer flex w-[84%] max-w-[1600px] flex-col justify-center gap-10 sm:gap-8 md:w-[75%]">
        <div className="HeaderContainer flex justify-between">
          <h2 className={`OptionalTitle text-lg ${titleColor}`}>
            optional: work-related details
          </h2>
          <div className="AvatarContainer self-end pr-6">
            <Avatar
              addClasses="self-end -mt-14"
              avatarType="Fellow"
              fellow={fellow}
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
          defaultValue={fellow?.lookingFor}
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
          defaultValue={fellow?.passions}
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
            {disabledButton && fellow?.profileIsBeingEdited === true
              ? "Returning To Profile..."
              : !disabledButton && fellow?.profileIsBeingEdited === true
                ? "update"
                : disabledButton && fellow?.profileIsBeingEdited === false
                  ? "Saving Information.."
                  : "continue"}
          </SiteButton>
        </div>
      </div>
    </div>
  );
}
