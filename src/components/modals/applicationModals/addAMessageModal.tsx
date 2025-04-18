import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";

import { useState } from "react";
import { useModal } from "@/contexts/ModalContext";
import { useFellow } from "@/contexts/FellowContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApplication } from "@/contexts/ApplicationContext";
import { useMutation } from "@apollo/client";
import { APPLY_TO_JOB } from "@/graphql/mutations";

import SiteButton from "@/components/buttonsAndLabels/siteButton";
import InputComponent from "@/components/inputComponents/inputComponent";
import SuccessfulApplicationModal from "./successfulAppModal";

const AppMessageSchema = z.object({
  message: z
    .string()
    .min(5, { message: "Message must be more than 5 characters long." }),
});

type FormData = z.infer<typeof AppMessageSchema>;

export default function AddAMessageModal({ business, jobId }: any) {
  const [disabledButton, setDisabledButton] = useState(false);
  const [applyToJob, { loading, error }] = useMutation(APPLY_TO_JOB);

  const { showModal, replaceModalStack, goBack, hideModal } = useModal();
  const { textColor, secondaryTextColor, titleColor } = useColorOptions();
  const { fellow, setFellow } = useFellow();
  const { application, setApplication } = useApplication();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(AppMessageSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setDisabledButton(true);

    try {
      const response = await applyToJob({
        variables: {
          jobId: jobId,
          message: data.message,
        },
      });
      // when successful
      console.log("application successful, details:", response.data.applyToJob); // Adjust based on your mutation response
      setFellow({
        ...fellow,
        dailyApplications: [
          ...(fellow?.dailyApplications || []),
          {
            id: response.data.applyToJob,
            message: data.message,
            status: "submitted",
          },
        ],
        // profile: {
        //   ...fellow?.profile,
        // },
      });
      showModal(<SuccessfulApplicationModal />);
    } catch (error) {
      console.error("application error:", error);
      setDisabledButton(false);

      // Optionally, you can set an error state here to display to the user
    }
  };

  return (
    <div
      className={`AddAMessageModal flex w-[40vw] flex-col items-center gap-4 ${textColor}`}
    >
      <Dialog.Title className="Title w-full text-center text-xl font-bold">
        {`Your Message To ${business}`}
      </Dialog.Title>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="AppMessageForm flex flex-col gap-4"
      >
        <InputComponent
          type="text"
          placeholderText="Your Message Here..."
          size="tall"
          width="medium"
          addClasses="mt-6"
          register={register}
          registerValue="message"
          errors={errors.message}
        ></InputComponent>
        <div className="SignupButtons -mb-3 mt-4 self-end">
          <SiteButton
            type="submit"
            variant="hollow"
            colorScheme="b3"
            aria="go back"
            onClick={handleSubmit(onSubmit)}
            disabled={disabledButton}
          >
            {disabledButton ? "Sending..." : "add + send"}
          </SiteButton>
        </div>
      </form>
    </div>
  );
}
