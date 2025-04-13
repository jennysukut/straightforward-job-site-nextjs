"use client";

import * as z from "zod";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ParamsList } from "@/lib/paramsList";
import { useJob } from "@/contexts/JobContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useBusiness } from "@/contexts/BusinessContext";
import { useMutation } from "@apollo/client";
import { ADD_JOB_LISTING_DETAILS_1_MUTATION } from "@/graphql/mutations";
import { useModal } from "@/contexts/ModalContext";

import SiteButton from "@/components/buttonsAndLabels/siteButton";
import InputComponent from "@/components/inputComponents/inputComponent";
import AddHandler from "@/components/handlers/addHandler";
import DeleteHandler from "@/components/handlers/deleteHandler";
import LabelGeneratorAndDisplayComp from "@/components/buttonsAndLabels/labelGenAndDisplayComponent";

import { capitalizeFirstLetter } from "@/utils/textUtils";

const jobSchema = z.object({
  positionSummary: z
    .string()
    .min(5, { message: "Your Position Summary Must Be More Than 5 Letters" }),
  nonNegParams: z.array(z.string()).max(5, {
    message: "You Must Choose No More Than 5 Non-Negotiable Parameters",
  }),
});

type FormData = z.infer<typeof jobSchema>;

export default function PostAJobStep1() {
  const router = useRouter();
  const { job, setJob } = useJob();
  const { business } = useBusiness();
  const { textColor } = useColorOptions();
  const { hideModal } = useModal();

  const [disabledButton, setDisabledButton] = useState(false);
  const [nonNegParams, setNonNegParams] = useState<string[]>([]);
  const [addJobListingDetailsStep1, { loading, error }] = useMutation(
    ADD_JOB_LISTING_DETAILS_1_MUTATION,
  );

  const {
    handleSubmit,
    setValue,
    register,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: { nonNegParams: nonNegParams },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setDisabledButton(true);

    try {
      const response = await addJobListingDetailsStep1({
        variables: {
          id: job?.id,
          positionSummary: data.positionSummary,
          nonNegParams: nonNegParams,
          location: business?.businessProfile?.location,
          businessName: business?.name,
          country: business?.businessProfile?.country,
          completed: "step1",
        },
      });

      console.log(
        "Details saved successfully, Details:",
        response.data.addJobListingDetailsStep1,
      );

      setJob({
        ...job,
        positionSummary: data.positionSummary,
        nonNegParams: nonNegParams,
        business: {
          name: business?.name,
          businessProfile: {
            location: business?.businessProfile?.location,
            country: business?.businessProfile?.country,
          },
        },
        beingEdited: false,
      });
      if (job?.beingEdited) {
        router.push("/listing");
      } else {
        router.push("/post-a-job/step2");
      }
    } catch (error) {
      console.error("Signup error:", error);
      // Optionally, you can set an error state here to display to the user
    }
  };

  // handlers for adding, updating, and deleting information tied to States
  const handleAdd = (type: "nonNegParams", item: any) => {
    AddHandler({
      item,
      type,
      setFunctions: {
        nonNegParams: setNonNegParams,
      },
      setValue,
      clearErrors,
    });
  };

  const handleDelete = (type: "nonNegParams", item: any) => {
    DeleteHandler({
      item,
      type,
      setFunctions: {
        nonNegParams: setNonNegParams,
      },
      setValue,
      clearErrors,
    });
  };

  useEffect(() => {
    setNonNegParams(Array.isArray(job?.nonNegParams) ? job?.nonNegParams : []);
    hideModal();
  }, []);

  return (
    <div
      className={`PostAJobPage flex w-[95vw] ${textColor} max-w-[1600px] flex-grow flex-col items-center justify-center gap-8 self-center pt-6 md:pb-8 md:pt-8`}
    >
      <div className="PostAJobContainer flex w-[84%] max-w-[1600px] flex-col justify-center gap-10 sm:gap-8 md:w-[75%]">
        <h1 className={`JobName pl-8 tracking-superwide ${textColor}`}>
          {job?.jobTitle}
        </h1>
        {job?.positionType && (
          <p className="PositionTypeDetails -mt-8 pl-8 italic">
            Position Type: {capitalizeFirstLetter(job?.positionType)}
          </p>
        )}

        <form
          className="PostAJobStep1Form xs:pt-8 flex flex-col gap-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* position summary input */}
          <InputComponent
            type="text"
            placeholderText="Position Summary"
            errors={errors.positionSummary}
            register={register}
            registerValue="positionSummary"
            defaultValue={job?.positionSummary}
            size="tall"
            width="full"
          />

          {/* non negotiable skills / parameters input & generator */}
          <LabelGeneratorAndDisplayComp
            handleAdd={handleAdd}
            errors={errors.nonNegParams}
            selectedArray={nonNegParams}
            handleDelete={handleDelete}
            placeholder="Non-Negotiable Parameters: pick 0-5"
            name="nonNegParams"
            variant="functional"
            options
            searchData={ParamsList}
            title="non-negotiable parameters: used to filter applicants"
            subTitle="you can choose from skills, country-of-location, or languages"
            width="full"
            addClassesToResults="pl-8"
            canAddNew
          />
        </form>

        <div className="ButtonContainer -mb-6 mt-6 flex justify-end gap-4 self-end">
          <SiteButton
            variant="hollow"
            colorScheme="f1"
            aria="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={disabledButton}
          >
            {disabledButton && job?.beingEdited === true
              ? "Returning To Listing..."
              : !disabledButton && job?.beingEdited === true
                ? "update"
                : disabledButton && job?.beingEdited === false
                  ? "Saving Information..."
                  : "continue"}{" "}
            {/* {disabledButton ? "Saving Information..." : "continue"} */}
          </SiteButton>
        </div>
      </div>
    </div>
  );
}
