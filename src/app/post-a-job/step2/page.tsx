"use client";

import * as z from "zod";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useJob } from "@/contexts/JobContext";

import SiteButton from "@/components/siteButton";
import InputComponent from "@/components/inputComponent";
import DeleteHandler from "@/components/deleteHandler";
import AddHandler from "@/components/addHandler";
import ButtonOptionsComponent from "@/components/buttonOptionsComponent";

const jobSchema = z.object({
  payscale: z.string().min(2, {
    message: "Payscale Information Required",
  }),
  payOption: z.string(),
  locationOption: z
    .string()
    .min(1, { message: "You Must Have At Least 1 Location Type Selected" }),
  idealCandidate: z.string().min(3, {
    message: "Please Provide More Information About Your Ideal Candidate",
  }),
  daysInOffice: z.string().optional(),
  daysRemote: z.string().optional(),
});

type FormData = z.infer<typeof jobSchema>;

export default function PostAJobStep2() {
  const { job, setJob } = useJob();
  const router = useRouter();

  const [disabledButton, setDisabledButton] = useState(false);
  const [locationOption, setLocationOption] = useState<string[]>([]);
  const [payOption, setPayOption] = useState<string[]>([]);
  const {
    handleSubmit,
    setValue,
    register,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {},
  });

  // handlers for adding, updating, and deleting details
  const handleAdd = (type: "locationType" | "payOption", data: any) => {
    AddHandler({
      item: data,
      type,
      setFunctions: {
        locationOption: setLocationOption,
        payOption: setPayOption,
      },
      setValue,
      clearErrors,
      oneChoice: true,
    });
  };

  const handleDelete = (type: "locationType" | "payOption", id: any) => {
    DeleteHandler({
      item: id,
      type,
      setFunctions: {
        locationOption: setLocationOption,
        payOption: setPayOption,
      },
    });
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setDisabledButton(true);
    setJob({
      ...job,
      payDetails: {
        payscale: data.payscale,
        payOption: payOption,
      },
      locationType: data.locationOption,
      idealCandidate: data.idealCandidate,
      hybridDetails: {
        daysInOffice: data.daysInOffice,
        daysRemote: data.daysRemote,
      },
    });
    router.push("/post-a-job/step3");
    // router.push("/profile");
  };

  useEffect(() => {
    if (job?.payDetails) {
      setPayOption(job?.payDetails.payOption);
      setValue("payOption", job?.payDetails.payOption);
      setValue("payscale", job?.payDetails.payscale);
    }

    if (job?.locationType) {
      setLocationOption([job.locationType]);
      setValue("locationOption", job.locationType);
    }
  }, [job]);

  return (
    <div className="PostAJobPage2 flex w-[95vw] max-w-[1600px] flex-grow flex-col items-center gap-8 self-center pt-6 md:pb-8 md:pt-8">
      <div className="PostAJobContainer flex w-[84%] max-w-[1600px] flex-col justify-center gap-10 sm:gap-8 md:w-[75%]">
        <h1 className="JobName pl-8 tracking-superwide text-midnight">
          {job?.jobTitle || "Test Job Title"}
        </h1>
        <p className="PositionTypeDetails -mt-8 pl-8 italic">
          Payscale, Location, and Ideal Candidate Details:
        </p>

        <form
          className="PostAJobStep2Form xs:pt-8 flex flex-col gap-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Payscale Details */}
          <div className="PayscaleDetails flex items-center justify-center gap-6">
            <p className="PayscaleTitle">Payscale:</p>
            {/* payscale input */}
            <InputComponent
              type="text"
              placeholderText="Payscale"
              errors={errors.payscale}
              register={register}
              registerValue="payscale"
              defaultValue={"$"}
              addClasses="-mt-2 min-w-[30vw]"
              required
            />

            {/* hourly/annually option */}
            <ButtonOptionsComponent
              type="payOption"
              buttons={["hourly", "annually"]}
              selectedArray={payOption}
              handleAdd={handleAdd}
              handleDelete={handleDelete}
              errors={errors.payscale}
              classesForButtons="px-[3rem] py-3"
              addClasses="mt-4 -mb-2"
            />
          </div>

          {/* location options details */}
          <ButtonOptionsComponent
            type="locationOption"
            title="Location Type:"
            buttons={["remote", "on-site", "hybrid"]}
            selectedArray={locationOption}
            handleAdd={handleAdd}
            handleDelete={handleDelete}
            errors={errors.locationOption}
            required
            classesForButtons="px-[3rem] py-3"
            addClasses="mt-4 -mb-2"
          />

          {locationOption.includes("hybrid") && (
            <div className="HybridDetails mb-6 flex justify-center gap-6">
              <p className="HybridTitle">Hybrid Details:*</p>
              {/* days in office */}
              <InputComponent
                type="text"
                placeholderText="Days In Office"
                errors={errors.daysInOffice}
                register={register}
                registerValue="daysInOffice"
                addClasses="-mt-2"
              />
              {/* days remote */}
              <InputComponent
                type="text"
                placeholderText="Days Remote"
                errors={errors.daysRemote}
                register={register}
                registerValue="daysRemote"
                addClasses="-mt-2"
              />
            </div>
          )}

          {/*  ideal candidate input */}
          <InputComponent
            type="text"
            placeholderText="What does your ideal candidate look like?"
            errors={errors.idealCandidate}
            defaultValue={job?.idealCandidate}
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
              {disabledButton && job?.jobIsBeingEdited === true
                ? "Returning To Listing..."
                : !disabledButton && job?.jobIsBeingEdited === true
                  ? "update"
                  : disabledButton && job?.jobIsBeingEdited === false
                    ? "Saving Information.."
                    : "continue"}
            </SiteButton>
          </div>
        </form>
      </div>
    </div>
  );
}
