"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";

import { useRouter } from "next/navigation";
import { useModal } from "@/contexts/ModalContext";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Image from "next/image";
import SiteButton from "../../siteButton";
import ErrorModal from "../errorModal";
import DeleteConfirmationModal from "../deleteConfirmationModal";

const ExperienceSchema = z.object({
  title: z.string().min(2, { message: "Job Title Required" }),
  companyName: z.string().min(2, { message: "Company Name Required" }),
  yearDetails: z.string().optional(),
  details: z.string().optional(),
});

type FormData = z.infer<typeof ExperienceSchema>;

export default function AddExperienceModal({ addExperience, canDelete }: any) {
  const router = useRouter();
  const { showModal, hideModal } = useModal();
  const [disabledButton, setDisabledButton] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(ExperienceSchema),
  });

  // const [signUp, { loading, error }] = useMutation(SIGNUP_MUTATION);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setDisabledButton(true);
    addExperience(data);
    console.log(data);
    //navigate to the next page where you'll put information
    // router.push("/individual-signup/step1");
    setTimeout(() => {
      hideModal();
    }, 1500);

    //send details to the server to be saved and rendered on the next page
    try {
      // const result = await signUp({ variables: data })
      //   .then((result) => {
      //     sendFellowSignupEmail(data.email, data.name, betaTester);
      //     showModal(<SignupModalIndividual2 />);
      //   })
      //   .catch((error) => {
      //     showModal(<ErrorModal />);
      //   });
    } catch (err) {
      showModal(<ErrorModal />);
    }
  };

  const handleDelete = () => {
    console.log("handling deletion");
  };

  const deleteExperience = () => {
    console.log("deleting - will need confirmation");
    // make a confirmation modal and insert here
    showModal(
      <DeleteConfirmationModal
        handleDelete={handleDelete}
        item="this experience"
      />,
    );
  };

  return (
    <div className="AddExperienceModal flex w-[50vw] max-w-[450px] flex-col gap-4 text-jade">
      <Dialog.Title className="Title max-w-[450px] self-center text-center text-xl font-bold">
        experience
      </Dialog.Title>
      <form
        className="AddExperienceForm xs:pt-8 flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* title input */}
        <label htmlFor="title">title*</label>
        <input
          type="text"
          placeholder="Job Title"
          className="text-md mb-0 border-b-2 border-jade/50 bg-transparent pb-2 pt-0 text-jade placeholder:text-jade/50 focus:border-jade focus:outline-none"
          {...register("title")}
        />
        {errors.title?.message && (
          <p className="m-0 p-0 text-xs font-medium text-orange">
            {errors.title.message.toString()}
          </p>
        )}

        {/* company name input */}
        <label htmlFor="companyName" className="pt-4">
          company*
        </label>
        <input
          type="text"
          placeholder="Company Name"
          className="text-md mb-0 border-b-2 border-jade/50 bg-transparent pb-2 pt-0 text-jade placeholder:text-jade/50 focus:border-jade focus:outline-none"
          {...register("companyName")}
        />
        {errors.companyName?.message && (
          <p className="m-0 p-0 text-xs font-medium text-orange">
            {errors.companyName.message.toString()}
          </p>
        )}

        {/* year/years input */}
        <label htmlFor="years" className="mt-4">
          year/years
        </label>
        <input
          type="text"
          placeholder="Optional: Time You Held Position"
          className="text-md border-b-2 border-jade/50 bg-transparent pb-3 pt-0 text-jade placeholder:text-jade/50 focus:border-jade focus:outline-none"
          {...register("yearDetails")}
        />
        {errors.yearDetails?.message && (
          <p className="m-0 p-0 text-xs font-medium text-orange">
            {errors.yearDetails.message.toString()}
          </p>
        )}

        {/* details input */}
        <label htmlFor="details" className="mt-4">
          details
        </label>
        <input
          type="text"
          placeholder="Details Describing Your Experience / Role"
          className="text-md border-b-2 border-jade/50 bg-transparent pb-3 pt-0 text-jade placeholder:text-jade/50 focus:border-jade focus:outline-none"
          {...register("details")}
        />
        {errors.details?.message && (
          <p className="m-0 p-0 text-xs font-medium text-orange">
            {errors.details.message.toString()}
          </p>
        )}

        {/* form submission button */}
        {canDelete ? (
          <div className="ButtonContainer -mb-6 mt-6 flex justify-between">
            <button onClick={deleteExperience}>
              <Image
                className="DeleteButton opacity-75 hover:opacity-100"
                src="/delete-icon.svg"
                width={18}
                height={18}
                alt="delete"
              />
            </button>
            <SiteButton
              variant="hollow"
              colorScheme="f1"
              aria="submit"
              onClick={handleSubmit(onSubmit)}
              disabled={disabledButton}
              addClasses="px-8"
            >
              {disabledButton ? "Updating..." : "update"}
            </SiteButton>
          </div>
        ) : (
          <div className="ButtonContainer -mb-6 mt-6 flex justify-end">
            <SiteButton
              variant="hollow"
              colorScheme="f1"
              aria="submit"
              onClick={handleSubmit(onSubmit)}
              disabled={disabledButton}
            >
              {disabledButton ? "Adding Experience..." : "add experience"}
            </SiteButton>
          </div>
        )}
      </form>
    </div>
  );
}
