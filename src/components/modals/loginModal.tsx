"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";

import SiteButton from "../siteButton";
import SignupOptionsModal from "./signupModals/signupOptionsModal";
import FormInputComponent from "../formInputComponent";
import FormSubmissionButton from "../formSubmissionButton";

import { useState } from "react";
import { useModal } from "@/contexts/ModalContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginSchema = z.object({
  email: z.string().email({ message: "Email Title Required" }),
  password: z.string().min(2),
});

type FormData = z.infer<typeof LoginSchema>;

export default function LoginModal() {
  const { replaceModalStack, showModal } = useModal();
  const [disabledButton, setDisabledButton] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setDisabledButton(true);
    //Login Details Here!
  };

  return (
    <div className="LoginModal flex flex-col items-center gap-10">
      <Dialog.Title className="Title -mb-2 max-w-[450px] self-center text-center text-xl font-bold">
        login
      </Dialog.Title>
      <form
        className="LoginForm xs:pt-8 flex min-w-[30vw] flex-col gap-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* email input */}
        <FormInputComponent
          type="email"
          title="email*"
          placeholderText="FantasticEmail@email.com"
          register={register}
          registerValue="email"
          errors={errors.email}
        />

        {/* password input */}
        <FormInputComponent
          type="password"
          title="password*"
          placeholderText="**********"
          register={register}
          registerValue="password"
          errors={errors.password}
        />

        {/* form submission buttons */}
        <div className="LoginButtonsContainer flex justify-between">
          <button
            className="SignupOption text-xs text-jade hover:text-darkJade"
            onClick={() => replaceModalStack(<SignupOptionsModal />)}
          >
            or signup
          </button>
          <FormSubmissionButton
            disabledButton={disabledButton}
            handleSubmit={handleSubmit(onSubmit)}
            addText="login"
            addingText="Logging In..."
          />
        </div>
      </form>
    </div>
  );
}
