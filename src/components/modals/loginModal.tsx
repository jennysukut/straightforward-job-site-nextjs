"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";

import SignupOptionsModal from "./signupModals/signupOptionsModal";
import FormInputComponent from "../inputComponents/formInputComponent";
import FormSubmissionButton from "../buttonsAndLabels/formSubmissionButton";

import { useState } from "react";
import { useModal } from "@/contexts/ModalContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useRouter } from "next/navigation";
import { LOGIN } from "@/graphql/mutations";
import { usePageContext } from "@/contexts/PageContext";
import { useFellow } from "@/contexts/FellowContext";
import { GET_PROFILE } from "@/graphql/queries";
import ErrorModal from "./errorModal";
import { useQuery } from "@apollo/client";

const LoginSchema = z.object({
  email: z.string().email({ message: "Email Title Required" }),
  password: z.string().min(2),
});

type FormData = z.infer<typeof LoginSchema>;

export default function LoginModal() {
  const router = useRouter();
  const { replaceModalStack, showModal, hideModal } = useModal();
  const { textColor } = useColorOptions();
  const { setIsLoggedIn, setAccountType } = usePageContext();
  const [disabledButton, setDisabledButton] = useState(false);
  const { setFellow } = useFellow();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(LoginSchema),
  });

  const [login, { loading, error }] = useMutation(LOGIN);
  // const {
  //   data: profileData,
  //   loading: profileLoading,
  //   error: profileError,
  // } = useQuery(GET_PROFILE);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setDisabledButton(true);

    //Login Details Here!
    try {
      const result = await login({ variables: data });
      console.log(result);
      if (result.data.login.includes("ROLE_FELLOW")) {
        console.log("you're a fellow! and you're logged in! result:", result);

        // setFellow(profileData.getProfile); // Set fellow data
        // console.log(profileData.getProfile);

        //SET PAGE TO LOGGED IN
        setIsLoggedIn(true);
        setAccountType("Fellow");

        hideModal();
      } else if (result.data.login.includes("ROLE_BUSINESS")) {
        console.log("you're a business! and you're logged in!");
        //SET PAGE TO LOGGED IN
        setIsLoggedIn(true);
        setAccountType("Business");
        hideModal();
      } else if (result.data.login.includes("ROLE_ADMIN")) {
        setIsLoggedIn(true);
        setAccountType("Admin");
        hideModal();
      }
    } catch (err) {
      showModal(<ErrorModal />);
    }
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

        {/* form buttons */}
        <div className="LoginButtonsContainer flex justify-between">
          <button
            className="SignupOption text-xs opacity-80 hover:opacity-100"
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
