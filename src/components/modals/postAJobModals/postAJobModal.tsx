import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";

import { useRouter } from "next/navigation";
import { useModal } from "@/contexts/ModalContext";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBusiness } from "@/contexts/BusinessContext";
import { useJob } from "@/contexts/JobContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useMutation } from "@apollo/client";
import { CREATE_JOB_LISTING_MUTATION } from "@/graphql/mutations";

import SiteButton from "@/components/buttonsAndLabels/siteButton";
import ButtonOptionsComponent from "@/components/buttonsAndLabels/buttonOptionsComponent";
import FormInputComponent from "@/components/inputComponents/formInputComponent";

import DeleteHandler from "@/components/handlers/deleteHandler";
import AddHandler from "@/components/handlers/addHandler";
import { create } from "lodash";

const jobSchema = z.object({
  jobTitle: z
    .string()
    .min(2, { message: "Job Title Required" })
    .max(50, { message: "Whoa There, That's An Interestingly Long Title" }),
  positionType: z.string().min(2, { message: "Position Type Required" }),
});

type FormData = z.infer<typeof jobSchema>;

export default function PostAJobModal() {
  const router = useRouter();
  const { showModal, hideModal } = useModal();
  const { business, setBusiness } = useBusiness();
  const { job, setJob } = useJob();
  const { textColor } = useColorOptions();

  const [positionType, setPositionType] = useState("");
  const [disabledButton, setDisabledButton] = useState(false);
  const [createJobListing, { loading, error }] = useMutation(
    CREATE_JOB_LISTING_MUTATION,
  );
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(jobSchema),
  });

  // handlers for adding, updating, and deleting details
  const handleAdd = (type: "positionType", data: any) => {
    AddHandler({
      item: data,
      type,
      setFunctions: {
        positionType: setPositionType,
      },
      setValue,
      clearErrors,
      oneChoice: { positionType: true },
    });
  };

  const handleDelete = (type: "positionType", id: any) => {
    DeleteHandler({
      item: id,
      type,
      setFunctions: {
        positionType: setPositionType,
      },
    });
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setDisabledButton(true);
    try {
      const response = await createJobListing({
        variables: {
          jobTitle: data.jobTitle,
          positionType: data.positionType,
          beingEdited: false,
          published: false,
          completed: "create",
        },
      });

      // console.log(
      //   "Details saved successfully, Details:",
      //   response.data.createJobListing,
      // );

      setJob({
        id: response.data.createJobListing,
        jobTitle: data.jobTitle,
        positionType: data.positionType,
      });

      router.push("/post-a-job/step1");
    } catch (error) {
      console.error("Signup error:", error);
      // Optionally, you can set an error state here to display to the user
    }
  };

  return (
    <div
      className={`SignupModal flex w-[50vw] max-w-[450px] flex-col gap-4 ${textColor}`}
    >
      <Dialog.Title className="Title max-w-[450px] self-center text-center text-xl font-bold">
        post a job
      </Dialog.Title>
      <form
        className="IndividualSignupForm xs:pt-8 mt-4 flex flex-col gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* job title input */}
        <FormInputComponent
          type="text"
          register={register}
          registerValue="jobTitle"
          placeholderText="Your New Job Title"
          title="job title*"
        />

        {/* position type buttons */}
        <ButtonOptionsComponent
          type="positionType"
          title="position type:"
          required
          selectedArray={positionType}
          handleAdd={handleAdd}
          handleDelete={handleDelete}
          buttons={["full-time", "part-time", "contract"]}
          classesForButtons="px-8 py-3 mt-4"
          errors={errors.positionType}
          flexOpt="flex-col"
        />

        {/* form submission button */}
        <div className="ButtonContainer -mb-6 -mt-2 flex justify-end">
          <SiteButton
            variant="hollow"
            colorScheme="f1"
            aria="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={disabledButton}
          >
            {disabledButton ? "Continuing..." : "continue"}
          </SiteButton>
        </div>
      </form>
    </div>
  );
}
