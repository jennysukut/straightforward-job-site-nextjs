"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";

import SignupOptionsModal from "./signupModals/signupOptionsModal";
import FormInputComponent from "../inputComponents/formInputComponent";
import FormSubmissionButton from "../buttonsAndLabels/formSubmissionButton";
import ErrorModal from "./errorModal";
import Image from "next/image";

import { useState, useEffect } from "react";
import { useModal } from "@/contexts/ModalContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useRouter } from "next/navigation";
import { LOGIN } from "@/graphql/mutations";
import { usePageContext } from "@/contexts/PageContext";
import { useFellow } from "@/contexts/FellowContext";
import { GET_PROFILE, GET_BUSINESS_PROFILE } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { useBusiness } from "@/contexts/BusinessContext";
import { useApplications } from "@/contexts/ApplicationsContext";
const LoginSchema = z.object({
  email: z.string().email({ message: "Email Title Required" }),
  password: z.string().min(2),
});

type FormData = z.infer<typeof LoginSchema>;

export default function LoginModal() {
  const router = useRouter();
  const { replaceModalStack, showModal, hideModal } = useModal();
  const { textColor } = useColorOptions();
  const { setApplications } = useApplications();
  const { isLoggedIn, setIsLoggedIn, accountType, setAccountType } =
    usePageContext();
  const { fellow, setFellow } = useFellow();
  const { business, setBusiness } = useBusiness();
  const [disabledButton, setDisabledButton] = useState(false);
  const [id, setId] = useState("");
  const [login, { loading, error }] = useMutation(LOGIN);
  const [seePassword, setSeePassword] = useState(false);
  const [fetchProfileType, setFetchProfileType] = useState<
    "fellow" | "business" | null
  >(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(LoginSchema),
  });

  // On Login, set the business or fellow based on the login response
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setDisabledButton(true);

    try {
      const result = await login({ variables: data });

      if (result.data.login.roles.includes("FELLOW")) {
        // setId(result.data.login.id);
        setIsLoggedIn(true);
        setAccountType("Fellow");
        setFellow(result.data.login.fellow);
        setApplications(result.data.login.fellow.jobApplications);
      } else if (result.data.login.roles.includes("BUSINESS")) {
        setIsLoggedIn(true);
        setAccountType("Business");
        setBusiness(result.data.login.business);
      } else if (result.data.login.roles.includes("ADMIN")) {
        // setIsLoggedIn(true);
        // setAccountType("Admin");
        console.log("you're an admin?");
      }
      hideModal();
    } catch (err) {
      showModal(<ErrorModal />);
    }
  };

  const viewPassword = () => {
    setSeePassword(!seePassword);
  };

  return (
    <div
      className={`LoginModal flex flex-col items-center gap-10 ${textColor}`}
    >
      <Dialog.Title
        className={`Title -mb-2 max-w-[450px] self-center text-center text-xl font-bold ${textColor}`}
      >
        login
      </Dialog.Title>

      <form
        className="LoginForm xs:pt-8 flex min-w-[30vw] flex-col gap-8"
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault(); // Prevent default form submission
            handleSubmit(onSubmit)(); // Trigger the submit handler
          }
        }}
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

        {/* <div className="PasswordSection flex gap-2"> */}
        <FormInputComponent
          type={`${seePassword ? "text" : "password"}`}
          title="password*"
          placeholderText="**********"
          register={register}
          registerValue="password"
          errors={errors.password}
          viewButton
          viewFunction={viewPassword}
        />

        {/* form buttons */}
        <div className="LoginButtonsContainer flex flex-row-reverse justify-between">
          <FormSubmissionButton
            disabledButton={disabledButton}
            handleSubmit={handleSubmit(onSubmit)}
            addText="login"
            addingText="Logging In..."
          />

          <button
            className="SignupOption text-xs opacity-80 hover:opacity-100"
            onClick={() => replaceModalStack(<SignupOptionsModal />)}
          >
            or signup
          </button>
        </div>
      </form>
    </div>
  );
}
