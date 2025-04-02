"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";

import SignupOptionsModal from "./signupModals/signupOptionsModal";
import FormInputComponent from "../inputComponents/formInputComponent";
import FormSubmissionButton from "../buttonsAndLabels/formSubmissionButton";
import ErrorModal from "./errorModal";

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

const LoginSchema = z.object({
  email: z.string().email({ message: "Email Title Required" }),
  password: z.string().min(2),
});

type FormData = z.infer<typeof LoginSchema>;

export default function LoginModal() {
  const router = useRouter();
  const { replaceModalStack, showModal, hideModal } = useModal();
  const { textColor } = useColorOptions();
  const { isLoggedIn, setIsLoggedIn, accountType, setAccountType } =
    usePageContext();
  const { setFellow } = useFellow();
  const { setBusiness } = useBusiness();
  const [disabledButton, setDisabledButton] = useState(false);
  const [id, setId] = useState("");
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

  const [login, { loading, error }] = useMutation(LOGIN);

  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
  } = useQuery(
    fetchProfileType === "fellow" ? GET_PROFILE : GET_BUSINESS_PROFILE,
    {
      variables: { id },
      skip: fetchProfileType === null,
      onCompleted: (data) => {
        console.log("calling GET_PROFILE query");
        if (fetchProfileType === "fellow") {
          console.log("called the GET_PROFILE query inside login Modal");
          setFellow({
            ...data.fellow,
            avatar: data.fellow.profile.avatar,
          });
          console.log(JSON.stringify(data.fellowProfile));
        } else if (fetchProfileType === "business") {
          console.log(
            "called the GET_BUSINESS_PROFILE query inside login Modal",
          );
          setBusiness(data.businessProfile);
          console.log(JSON.stringify(data.businessProfile));
        }
        hideModal();
      },
    },
  );

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setDisabledButton(true);

    try {
      const result = await login({ variables: data });

      if (result.data.login.roles.includes("FELLOW")) {
        setId(result.data.login.id);
        setIsLoggedIn(true);
        setAccountType("Fellow");
        setFetchProfileType("fellow");
      } else if (result.data.login.roles.includes("BUSINESS")) {
        setId(result.data.login.id);
        setIsLoggedIn(true);
        setAccountType("Business");
        setFetchProfileType("business");
      } else if (result.data.login.roles.includes("ADMIN")) {
        setIsLoggedIn(true);
        setAccountType("Admin");
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
