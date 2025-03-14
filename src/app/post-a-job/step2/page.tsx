"use client";

import * as z from "zod";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useJob } from "@/contexts/JobContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";

import SiteButton from "@/components/buttonsAndLabels/siteButton";
import InputComponent from "@/components/inputComponents/inputComponent";
import DeleteHandler from "@/components/handlers/deleteHandler";
import AddHandler from "@/components/handlers/addHandler";
import ButtonOptionsComponent from "@/components/buttonsAndLabels/buttonOptionsComponent";

const jobSchema = z.object({
  payscaleMin: z.string().min(2, {
    message: "Payscale Information Required",
  }),
  payscaleMax: z.string().min(2, {
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
  const { errorColor, textColor, titleColor } = useColorOptions();
  const router = useRouter();

  const [disabledButton, setDisabledButton] = useState(false);
  const [locationOption, setLocationOption] = useState<string[]>([]);
  const [payOption, setPayOption] = useState<string[]>([]);
  const {
    handleSubmit,
    setValue,
    register,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {},
  });
  console.log(payOption);

  // handlers for adding, updating, and deleting details
  const handleAdd = (type: "locationOption" | "payOption", data: any) => {
    AddHandler({
      item: data,
      type,
      setFunctions: {
        locationOption: setLocationOption,
        payOption: setPayOption,
      },
      setValue,
      clearErrors,
      oneChoice: { locationOption: true, payOption: true },
    });
  };

  const handleDelete = (type: "locationOption" | "payOption", id: any) => {
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
    const payDifference =
      Number(data.payscaleMax.replace(/[^0-9.-]+/g, "")) -
      Number(data.payscaleMin.replace(/[^0-9.-]+/g, ""));

    console.log(payDifference);
    if (data.payOption === "hourly") {
      if (payDifference > 20) {
        setError("payscaleMin", {
          type: "manual",
          message: "This difference is too much",
        });
        return;
      }
    } else if (data.payOption === "annually") {
      if (payDifference > 50000) {
        setError("payscaleMin", {
          type: "manual",
          message: "This difference is too much",
        });
        return;
      }
    }

    setDisabledButton(true);
    setJob({
      ...job,
      payDetails: {
        payscaleMin: Number(data.payscaleMin.replace(/[^0-9.-]+/g, "")),
        payscaleMax: Number(data.payscaleMax.replace(/[^0-9.-]+/g, "")),
        payOption: String(payOption),
      },
      locationOption: data.locationOption,
      idealCandidate: data.idealCandidate,
      hybridDetails: {
        daysInOffice: data.daysInOffice,
        daysRemote: data.daysRemote,
      },
      // jobIsBeingEdited: false,
    });
    if (job?.jobIsBeingEdited) {
      router.push("/listing");
    } else {
      router.push("/post-a-job/step3");
    }
  };

  useEffect(() => {
    if (job?.payDetails) {
      setPayOption(job?.payDetails.payOption ? [job.payDetails.payOption] : []);
      setValue("payOption", job?.payDetails.payOption || "");
      setValue("payscaleMin", "$" + job?.payDetails.payscaleMin);
      setValue("payscaleMax", "$" + job?.payDetails.payscaleMax);
    }

    if (job?.locationOption) {
      setLocationOption([job.locationOption]);
      setValue("locationOption", job.locationOption);
    }
  }, [job]);

  return (
    <div
      className={`PostAJobPage2 flex w-[95vw] max-w-[1600px] ${textColor} flex-grow flex-col items-center gap-8 self-center pt-6 md:pb-8 md:pt-8`}
    >
      <div className="PostAJobContainer flex w-[84%] max-w-[1600px] flex-col justify-center gap-10 sm:gap-8 md:w-[75%]">
        <h1 className={`JobName pl-8 tracking-superwide ${titleColor}`}>
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
            {/* payscale input - min and max */}
            <InputComponent
              type="text"
              placeholderText="Payscale"
              register={register}
              registerValue="payscaleMin"
              defaultValue={"$"}
              addClasses="-mt-2 min-w-[15vw]"
            />
            <h2 className="Dash -ml-2 -mr-4 text-2xl">{`-`}</h2>
            <InputComponent
              type="text"
              placeholderText="Payscale"
              register={register}
              registerValue="payscaleMax"
              defaultValue={"$"}
              addClasses="-mt-2 min-w-[15vw]"
              required
            />

            {/* hourly/annually option */}
            <ButtonOptionsComponent
              type="payOption"
              buttons={["hourly", "annually"]}
              selectedArray={payOption}
              handleAdd={handleAdd}
              handleDelete={handleDelete}
              classesForButtons="px-[3rem] py-3"
              addClasses="mt-4 -mb-2"
            />
          </div>
          {errors?.payscaleMin?.message && (
            <p className={`m-0 -mt-6 p-0 text-xs font-medium ${errorColor} `}>
              {errors.payscaleMin.message.toString()}
            </p>
          )}

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
              {/* {disabledButton ? "Saving Information..." : "continue"} */}
            </SiteButton>
          </div>
        </form>
      </div>
    </div>
  );
}
