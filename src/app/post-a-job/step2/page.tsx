"use client";

import * as z from "zod";

import { useState, useEffect } from "react";
import { useFellow } from "@/contexts/FellowContext";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useBusiness } from "@/contexts/BusinessContext";

import SiteButton from "@/components/siteButton";
import InputComponent from "@/components/inputComponent";
import Avatar from "@/components/avatarComponent";
import DeleteHandler from "@/components/deleteHandler";
import AddHandler from "@/components/addHandler";
import ButtonOptionsComponent from "@/components/buttonOptionsComponent";

const fellowSchema = z.object({
  payscale: z.string().min(3, {
    message: "Payscale Information Required",
  }),
  locationOptions: z
    .array(z.string())
    .min(1, { message: "You Must Have At Least 1 Location Type Selected" }),
  idealCandidate: z.string().min(3, {
    message: "Please Provide More Information About Your Ideal Candidate",
  }),
});

type FormData = z.infer<typeof fellowSchema>;

export default function PostAJobStep2() {
  const { business, setBusiness } = useBusiness();
  const router = useRouter();

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
    defaultValues: {},
  });

  const latestArrayIndex = business?.activeJobs.length
    ? business.activeJobs.length - 1
    : -1;

  // handlers for adding, updating, and deleting details
  const handleAdd = (type: "locationType", data: any) => {
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

  const handleDelete = (type: "locationType", id: any) => {
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
    setBusiness({
      ...business,
      activeJobs:
        business?.activeJobs.map((job: any, index: number) => {
          if (index === business.activeJobs.length - 1) {
            return {
              ...job,
              payscale: data.payscale,
              locationType: data.locationOptions,
              idealCandidate: data.idealCandidate,
            };
          }
          return job;
        }) || [],
    });
    router.push("/post-a-job/step3");
  };

  // Setting Details on page from fellowContext
  // useEffect(() => {
  //   setLocationOptions(
  //     Array.isArray(fellow?.locationOptions) ? fellow.locationOptions : [],
  //   );
  //   setValue("locationOptions", fellow?.locationOptions || []);
  // }, []);

  return (
    <div className="PostAJobPage2 flex w-[95vw] max-w-[1600px] flex-grow flex-col items-center gap-8 self-center pt-6 md:pb-8 md:pt-8">
      <div className="PostAJobContainer flex w-[84%] max-w-[1600px] flex-col justify-center gap-10 sm:gap-8 md:w-[75%]">
        <div className="HeaderContainer flex justify-between">
          <h2 className="OptionalTitle text-lg text-midnight">
            {business?.activeJobs[latestArrayIndex].jobTitle ||
              "Test Job Title"}
          </h2>
          <Avatar addClasses="self-end -mt-14" />
        </div>

        <form
          className="PostAJobStep2Form xs:pt-8 flex flex-col gap-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* location options details */}
          <ButtonOptionsComponent
            type="locationOptions"
            title="Location Type:"
            buttons={["remote", "on-site", "hybrid"]}
            selectedArray={locationOptions}
            handleAdd={handleAdd}
            handleDelete={handleDelete}
            errors={errors.locationOptions}
            required
            buttonSize="large"
            classesForButtons="px-8"
            addClasses="mt-4 -mb-2"
          />

          {/*  ideal candidate input */}
          <InputComponent
            type="text"
            placeholderText="What does your ideal candidate look like?"
            errors={errors.idealCandidate}
            register={register}
            registerValue="idealCandidate"
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
              {disabledButton && business?.profileIsBeingEdited === true
                ? "Returning To Profile..."
                : !disabledButton && business?.profileIsBeingEdited === true
                  ? "update"
                  : disabledButton && business?.profileIsBeingEdited === false
                    ? "Saving Information.."
                    : "continue"}
            </SiteButton>
          </div>
        </form>
      </div>
    </div>
  );
}
