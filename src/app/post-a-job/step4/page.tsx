"use client";

import * as z from "zod";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useJob } from "@/contexts/JobContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useMutation } from "@apollo/client";
import { ADD_JOB_LISTING_DETAILS_4_MUTATION } from "@/graphql/mutations";

import SiteButton from "@/components/buttonsAndLabels/siteButton";
import DeleteHandler from "@/components/handlers/deleteHandler";
import AddHandler from "@/components/handlers/addHandler";
import LabelGeneratorAndDisplayComp from "@/components/buttonsAndLabels/labelGenAndDisplayComponent";
import PopulateDisplayField from "@/components/informationDisplayComponents/populateDisplayField";
import UpdateHandler from "@/components/handlers/updateHandler";
import AddResponsibilityModal from "@/components/modals/postAJobModals/addResponsibilitiesModal";

const jobSchema = z.object({
  responsibilities: z
    .array(z.string().min(1, { message: "Description is required" }).optional())
    .min(1, { message: "You Must Have At Least 1 Responsibility Listed" }),
  perks: z
    .array(z.string())
    .min(1, { message: "You Must Have At Least 1 Perk Listed" }),
});

type FormData = z.infer<typeof jobSchema>;

// Responsibilities of the position might need to be shown differently - the labels just don't look right - perhaps something that shows as a bullet point or perhaps ads via a modal?

export default function PostAJobStep4() {
  const { job, setJob } = useJob();
  const { textColor, titleColor } = useColorOptions();
  const router = useRouter();

  const [disabledButton, setDisabledButton] = useState(false);
  const [responsibilities, setResponsibilities] = useState<string[]>([]);
  const [perks, setPerks] = useState<string[]>([]);
  const [addJobListingDetailsStep4, { loading, error }] = useMutation(
    ADD_JOB_LISTING_DETAILS_4_MUTATION,
  );
  const {
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      responsibilities: responsibilities,
      perks: perks,
    },
  });

  // handlers for adding, updating, and deleting details
  const handleAdd = (type: "responsibilities" | "perks", data: any) => {
    AddHandler({
      item: data,
      type,
      setFunctions: {
        responsibilities: setResponsibilities,
        perks: setPerks,
      },
      setValue,
      clearErrors,
      hasId: {
        responsibilities: false,
        perks: false,
      },
    });
  };

  const handleDelete = (type: "responsibilities" | "perks", id: any) => {
    DeleteHandler({
      item: id,
      type,
      setFunctions: {
        responsibilities: setResponsibilities,
        perks: setPerks,
      },
      setValue,
      clearErrors,
      hasId: {
        responsibilities: false,
        perks: false,
      },
    });
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setDisabledButton(true);

    try {
      const response = await addJobListingDetailsStep4({
        variables: {
          id: job?.id,
          responsibilities: responsibilities,
          perks: perks,
          completed: "step4",
        },
      });

      console.log(
        "Details saved successfully, Details:",
        response.data.addJobListingDetailsStep4,
      );

      setJob({
        ...job,
        responsibilities: responsibilities,
        perks: perks,
        beingEdited: false,
      });
      if (job?.beingEdited) {
        router.push("/listing");
      } else {
        router.push("/post-a-job/step5");
      }
    } catch (error) {
      console.error("Signup error:", error);
      // Optionally, you can set an error state here to display to the user
    }
  };

  useEffect(() => {
    setResponsibilities(
      Array.isArray(job?.responsibilities) ? job?.responsibilities : [],
    );
    setValue("responsibilities", job?.responsibilities || []);
    setPerks(Array.isArray(job?.perks) ? job?.perks : []);
    setValue("perks", job?.perks || []);
  }, []);

  useEffect(() => {
    setValue("responsibilities", responsibilities);
    setValue("perks", perks);
  }, [responsibilities, perks]);

  return (
    <div
      className={`PostAJobPage2 flex w-[95vw] max-w-[1600px] ${textColor} flex-grow flex-col items-center gap-8 self-center pt-6 md:pb-8 md:pt-8`}
    >
      <div className="PostAJobContainer flex w-[84%] max-w-[1600px] flex-col justify-center gap-10 sm:gap-8 md:w-[75%]">
        <h1 className={`JobName pl-8 tracking-superwide ${titleColor}`}>
          {job?.jobTitle || "Test Job Title"}
        </h1>
        <form
          className="PostAJobStep3Form xs:pt-8 flex flex-col gap-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="PositionTypeDetails -mt-8 pl-8 italic">
            Responsibilities and Perks of the Job:
          </p>

          {/* Add + Display Responsibilities */}
          {/* <PopulateDisplayField
            handleAdd={handleAdd}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
            selectedArray={responsibilities}
            aria="responsibilities"
            title={`Responsibilities Of The Position`}
            addModal={<AddResponsibilityModal />}
            displayOption1="responsibility"
            required
            height="tall"
            errors={errors.responsibilities}
          /> */}

          <LabelGeneratorAndDisplayComp
            handleAdd={handleAdd}
            errors={errors.responsibilities}
            selectedArray={responsibilities}
            handleDelete={handleDelete}
            placeholder="Responsibilities Of The Position"
            name="responsibilities"
            variant="functional"
            required
            width="full"
            addClassesToResults="pl-8"
          />

          {/* perks generator */}
          <LabelGeneratorAndDisplayComp
            handleAdd={handleAdd}
            errors={errors.perks}
            selectedArray={perks}
            handleDelete={handleDelete}
            placeholder="Perks / Benefits Of This Position"
            name="perks"
            variant="functional"
            required
            width="full"
            addClassesToResults="pl-8"
          />

          <div className="ButtonContainer -mb-6 mt-6 flex justify-end self-end">
            <SiteButton
              variant="hollow"
              colorScheme="f1"
              aria="submit"
              type="submit"
              onClick={handleSubmit(onSubmit)}
              disabled={disabledButton}
            >
              {disabledButton && job?.beingEdited === true
                ? "Returning To Listing..."
                : !disabledButton && job?.beingEdited === true
                  ? "update"
                  : disabledButton && job?.beingEdited === false
                    ? "Saving Information.."
                    : "continue"}
            </SiteButton>
          </div>
        </form>
      </div>
    </div>
  );
}
