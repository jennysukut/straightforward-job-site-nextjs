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

const AwardSchema = z.object({
  title: z.string().min(2, { message: "Award Title Required" }),
  givenBy: z.string().min(2),
  awardDetails: z.string().optional(),
});

type FormData = z.infer<typeof AwardSchema>;

export default function AddAwardsModal({ addAward, canDelete }: any) {
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
    resolver: zodResolver(AwardSchema),
  });

  const handleDelete = () => {
    console.log("handling deletion");
  };

  const deleteExperience = () => {
    console.log("deleting - will need confirmation");
    showModal(
      <DeleteConfirmationModal handleDelete={handleDelete} item="this award" />,
    );
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setDisabledButton(true);
    addAward(data);
    console.log(data);

    setTimeout(() => {
      hideModal();
    }, 500);

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

  return (
    <div className="AddExperienceModal flex w-[50vw] max-w-[450px] flex-col gap-4 text-jade">
      <Dialog.Title className="Title max-w-[450px] self-center text-center text-xl font-bold">
        awards / honors
      </Dialog.Title>
      <form
        className="AddExperienceForm xs:pt-8 flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* award / honor input */}
        <label htmlFor="title">award / honor*</label>
        <input
          type="text"
          placeholder="Your Award or Honor"
          className="text-md mb-0 border-b-2 border-jade/50 bg-transparent pb-2 pt-0 text-jade placeholder:text-jade/50 focus:border-jade focus:outline-none"
          {...register("title")}
        />
        {errors.title?.message && (
          <p className="m-0 p-0 text-xs font-medium text-orange">
            {errors.title.message.toString()}
          </p>
        )}

        {/* given by input */}
        <label htmlFor="companyName" className="pt-4">
          given by*
        </label>
        <input
          type="text"
          placeholder="Given By"
          className="text-md mb-0 border-b-2 border-jade/50 bg-transparent pb-2 pt-0 text-jade placeholder:text-jade/50 focus:border-jade focus:outline-none"
          {...register("givenBy")}
        />
        {errors.givenBy?.message && (
          <p className="m-0 p-0 text-xs font-medium text-orange">
            {errors.givenBy.message.toString()}
          </p>
        )}

        {/* details input */}
        <label htmlFor="years" className="mt-4">
          details
        </label>
        <input
          type="text"
          placeholder="Award / Honor Is For"
          className="text-md border-b-2 border-jade/50 bg-transparent pb-3 pt-0 text-jade placeholder:text-jade/50 focus:border-jade focus:outline-none"
          {...register("awardDetails")}
        />
        {errors.awardDetails?.message && (
          <p className="m-0 p-0 text-xs font-medium text-orange">
            {errors.awardDetails.message.toString()}
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
              {disabledButton ? "Updating Details..." : "update"}
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
              addClasses="px-8"
            >
              {disabledButton ? "Adding Details..." : "add"}
            </SiteButton>
          </div>
        )}
      </form>
    </div>
  );
}
