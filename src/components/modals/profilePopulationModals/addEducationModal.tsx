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

const EducationSchema = z.object({
  degree: z.string().min(2, { message: "Job Title Required" }),
  school: z.string().min(2, { message: "Company Name Required" }),
  fieldOfStudy: z.string().optional(),
});

type FormData = z.infer<typeof EducationSchema>;

export default function AddEducationModal({
  handleAdd,
  canDelete,
  handleDelete,
  educationInfo,
  handleUpdate,
}: any) {
  const { showModal, hideModal } = useModal();
  const [disabledButton, setDisabledButton] = useState(false);
  const [degree, setDegree] = useState("");
  const [school, setSchool] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [id, setId] = useState("");
  const type = "education";
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(EducationSchema),
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

  const continueDelete = () => {
    console.log("handling deletion");
    handleDelete(type, id);
    hideModal();
  };

  const clickDelete = () => {
    console.log("delete? need confirmation");
    // make a confirmation modal and insert here - send it details necessary to delete exp.
    showModal(
      <DeleteConfirmationModal
        continueDelete={continueDelete}
        item="these education details"
      />,
    );
  };

  useEffect(() => {
    if (canDelete) {
      setDegree(educationInfo.degree);
      setSchool(educationInfo.school);
      setFieldOfStudy(educationInfo.fieldOfStudy);
      setId(educationInfo.id);
    }
  }, []);

  return (
    <div className="AddEducationModal flex w-[50vw] max-w-[450px] flex-col gap-4 text-jade">
      <Dialog.Title className="Title max-w-[450px] self-center text-center text-xl font-bold">
        education
      </Dialog.Title>
      <form
        className="AddExperienceForm xs:pt-8 flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* degree input */}
        <label htmlFor="title">degree / certificate*</label>
        <input
          type="text"
          value={degree}
          placeholder="Your Degree or Certificate"
          className="text-md mb-0 border-b-2 border-jade/50 bg-transparent pb-2 pt-0 text-midnight placeholder:text-jade/50 focus:border-jade focus:outline-none"
          onChange={(e) => {
            const value = e.target.value;
            setDegree(value);
            setValue("degree", value);
          }}
        />
        {errors.degree?.message && (
          <p className="m-0 p-0 text-xs font-medium text-orange">
            {errors.degree.message.toString()}
          </p>
        )}

        {/* school name input */}
        <label htmlFor="companyName" className="pt-4">
          school*
        </label>
        <input
          type="text"
          value={school}
          placeholder="Your School"
          className="text-md mb-0 border-b-2 border-jade/50 bg-transparent pb-2 pt-0 text-midnight placeholder:text-jade/50 focus:border-jade focus:outline-none"
          onChange={(e) => {
            const value = e.target.value;
            setSchool(value);
            setValue("school", value);
          }}
        />
        {errors.school?.message && (
          <p className="m-0 p-0 text-xs font-medium text-orange">
            {errors.school.message.toString()}
          </p>
        )}

        {/* field of study input */}
        <label htmlFor="years" className="mt-4">
          field of study
        </label>
        <input
          type="text"
          value={fieldOfStudy}
          placeholder="Your Field Of Study"
          className="text-md border-b-2 border-jade/50 bg-transparent pb-3 pt-0 text-midnight placeholder:text-jade/50 focus:border-jade focus:outline-none"
          onChange={(e) => {
            const value = e.target.value;
            setFieldOfStudy(value);
            setValue("fieldOfStudy", value);
          }}
        />
        {errors.fieldOfStudy?.message && (
          <p className="m-0 p-0 text-xs font-medium text-orange">
            {errors.fieldOfStudy.message.toString()}
          </p>
        )}

        {/* form submission button */}
        {canDelete ? (
          <div className="ButtonContainer -mb-6 mt-6 flex justify-between">
            <button onClick={clickDelete}>
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
              {disabledButton ? "Adding Education..." : "add education"}
            </SiteButton>
          </div>
        )}
      </form>
    </div>
  );
}
