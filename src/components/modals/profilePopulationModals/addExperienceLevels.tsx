"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";

import { useRouter } from "next/navigation";
import { useModal } from "@/contexts/ModalContext";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Image from "next/image";
import SiteButton from "../../siteButton";
import ErrorModal from "../errorModal";

import DeleteConfirmationModal from "../deleteConfirmationModal";

const ExperienceLevelSchema = z.object({
  experienceLevel: z.string().min(2, { message: "Skill Level Required" }),
  expLevelSkill: z.string().min(2),
  skillYears: z.string().optional(),
});

type FormData = z.infer<typeof ExperienceLevelSchema>;

export default function AddExperienceLevelModal({
  handleAdd,
  canDelete,
  itemInfo,
  handleDelete,
  handleUpdate,
}: any) {
  const router = useRouter();
  const { showModal, hideModal } = useModal();
  const [disabledButton, setDisabledButton] = useState(false);
  const [experienceLevel, setExperienceLevel] = useState("");
  const [expLevelSkill, setExpLevelSkill] = useState("");
  const [skillYears, setSkillYears] = useState("");
  const [id, setId] = useState("");
  const type = "experienceLevel";
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(ExperienceLevelSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setDisabledButton(true);

    if (canDelete) {
      handleUpdate(type, data, id);
    } else {
      handleAdd(type, data);
    }

    setTimeout(() => {
      hideModal();
    }, 500);

    //send details to the server to be saved and rendered on the next page
    //   try {
    //   } catch (err) {
    //     showModal(<ErrorModal />);
    //   }
  };

  const continueDelete = () => {
    console.log("handling deletion");
    handleDelete(type, id);
    hideModal();
  };

  const deleteExperience = () => {
    console.log("deleting - will need confirmation");
    showModal(
      <DeleteConfirmationModal
        continueDelete={continueDelete}
        item="this award"
      />,
    );
  };

  useEffect(() => {
    if (canDelete) {
      setExperienceLevel(itemInfo.experienceLevel);
      setExpLevelSkill(itemInfo.expLevelSkill);
      setSkillYears(itemInfo.skillYears);
      setId(itemInfo.id);
    }
  }, []);

  return (
    <div className="AddExperienceModal flex w-[50vw] max-w-[450px] flex-col gap-4 text-jade">
      <Dialog.Title className="Title max-w-[450px] self-center text-center text-xl font-bold">
        experience level
      </Dialog.Title>
      <form
        className="AddExperienceForm xs:pt-8 flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* experience level input */}
        <label htmlFor="award">experience level*</label>
        <input
          type="text"
          value={experienceLevel}
          placeholder="Entry / Intermediate / Senior / Etc..."
          className="text-md mb-0 border-b-2 border-jade/50 bg-transparent pb-2 pt-0 text-jade placeholder:text-jade/50 focus:border-jade focus:outline-none"
          onChange={(e) => {
            const value = e.target.value;
            setExperienceLevel(value);
            setValue("experienceLevel", value);
          }}
        />
        {errors.experienceLevel?.message && (
          <p className="m-0 p-0 text-xs font-medium text-orange">
            {errors.experienceLevel.message.toString()}
          </p>
        )}

        {/* ExpSkill input */}
        <label htmlFor="companyName" className="pt-4">
          selected skill*
        </label>
        <input
          type="text"
          value={expLevelSkill}
          placeholder="Your Particular Skill"
          className="text-md mb-0 border-b-2 border-jade/50 bg-transparent pb-2 pt-0 text-jade placeholder:text-jade/50 focus:border-jade focus:outline-none"
          onChange={(e) => {
            const value = e.target.value;
            setExpLevelSkill(value);
            setValue("expLevelSkill", value);
          }}
        />
        {errors.expLevelSkill?.message && (
          <p className="m-0 p-0 text-xs font-medium text-orange">
            {errors.expLevelSkill.message.toString()}
          </p>
        )}

        {/* skill years input */}
        <label htmlFor="years" className="mt-4">
          number of years
        </label>
        <input
          type="text"
          value={skillYears}
          placeholder="Years You've Had Said Skill"
          className="text-md border-b-2 border-jade/50 bg-transparent pb-3 pt-0 text-jade placeholder:text-jade/50 focus:border-jade focus:outline-none"
          onChange={(e) => {
            const value = e.target.value;
            setSkillYears(value);
            setValue("skillYears", value);
          }}
        />
        {errors.skillYears?.message && (
          <p className="m-0 p-0 text-xs font-medium text-orange">
            {errors.skillYears.message.toString()}
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
              addClasses="px-8"
            >
              {disabledButton ? "Adding ..." : "add"}
            </SiteButton>
          </div>
        )}
      </form>
    </div>
  );
}
