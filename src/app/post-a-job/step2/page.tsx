"use client";

import * as z from "zod";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useBusiness } from "@/contexts/BusinessContext";

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
  const { business, setBusiness } = useBusiness();
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

  const latestArrayIndex = business?.activeJobs.length
    ? business.activeJobs.length - 1
    : -1;

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
    setBusiness({
      ...business,
      activeJobs:
        business?.activeJobs.map((job: any, index: number) => {
          if (index === business.activeJobs.length - 1) {
            return {
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
            };
          }
          return job;
        }) || [],
    });
    router.push("/post-a-job/step3");
    // router.push("/profile");
  };

  useEffect(() => {
    const latestJob = business?.activeJobs[latestArrayIndex];
    // Check if latestJob and its payDetails exist
    if (latestJob?.payDetails) {
      if (latestJob.payDetails.payOption) {
        setPayOption(latestJob.payDetails.payOption);
        setValue("payOption", latestJob.payDetails.payOption || []);
      }
    }

    if (latestJob?.payDetails) {
      if (latestJob.payDetails.payscale) {
        setValue("payscale", latestJob.payDetails.payscale);
      }
    }

    if (latestJob?.locationType) {
      setLocationOption(latestJob?.locationType);
      setValue("locationOption", latestJob?.locationType);
    }
    console.log(latestJob);
  }, [business]);

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="PostAJobPage2 flex w-[95vw] max-w-[1600px] flex-grow flex-col items-center gap-8 self-center pt-6 md:pb-8 md:pt-8">
      <div className="PostAJobContainer flex w-[84%] max-w-[1600px] flex-col justify-center gap-10 sm:gap-8 md:w-[75%]">
        <h1 className="JobName pl-8 tracking-superwide text-midnight">
          {business?.activeJobs[latestArrayIndex].jobTitle || "Test Job Title"}
        </h1>
        <p className="PositionTypeDetails -mt-8 pl-8 italic">
          Position Type:{" "}
          {capitalizeFirstLetter(
            business?.activeJobs[latestArrayIndex].positionType,
          )}
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
            defaultValue={business?.activeJobs[latestArrayIndex].idealCandidate}
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
