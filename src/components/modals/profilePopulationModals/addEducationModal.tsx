"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";

import { useRouter } from "next/navigation";
import { useModal } from "@/contexts/ModalContext";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import SiteButton from "../../siteButton";
import ErrorModal from "../errorModal";

const EducationSchema = z.object({
  degree: z.string().min(2, { message: "Job Title Required" }),
  school: z.string().min(2, { message: "Company Name Required" }),
  fieldOfStudy: z.string().optional(),
});

type FormData = z.infer<typeof EducationSchema>;

export default function AddEducationModal() {
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
    resolver: zodResolver(EducationSchema),
  });

  // const [signUp, { loading, error }] = useMutation(SIGNUP_MUTATION);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setDisabledButton(true);
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
          placeholder="Your Degree or Certificate"
          className="text-md mb-0 border-b-2 border-jade/50 bg-transparent pb-2 pt-0 text-jade placeholder:text-jade/50 focus:border-jade focus:outline-none"
          {...register("degree")}
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
          placeholder="Your School"
          className="text-md mb-0 border-b-2 border-jade/50 bg-transparent pb-2 pt-0 text-jade placeholder:text-jade/50 focus:border-jade focus:outline-none"
          {...register("school")}
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
          placeholder="Your Field Of Study"
          className="text-md border-b-2 border-jade/50 bg-transparent pb-3 pt-0 text-jade placeholder:text-jade/50 focus:border-jade focus:outline-none"
          {...register("fieldOfStudy")}
        />
        {errors.fieldOfStudy?.message && (
          <p className="m-0 p-0 text-xs font-medium text-orange">
            {errors.fieldOfStudy.message.toString()}
          </p>
        )}

        {/* form submission button */}
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
      </form>
    </div>
  );
}
