import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";

import { useRouter } from "next/navigation";
import { useModal } from "@/contexts/ModalContext";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFellow } from "@/contexts/FellowContext";
import { useBusiness } from "@/contexts/BusinessContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useMutation } from "@apollo/client";
import { BUSINESS_SIGNUP_MUTATION } from "@/graphql/mutations";

import SiteButton from "../../buttonsAndLabels/siteButton";
import FormInputComponent from "@/components/inputComponents/formInputComponent";

const businessSchema = z.object({
  businessName: z.string().min(2, { message: "Required" }),
  email: z.string().email({ message: "Email Required" }),
  password: z.string().min(6, { message: "Required" }),
});

type FormData = z.infer<typeof businessSchema>;

export default function SignupModalBusiness1() {
  const router = useRouter();
  const { showModal, hideModal } = useModal();
  const { business, setBusiness } = useBusiness();
  const { textColor } = useColorOptions();

  const [disabledButton, setDisabledButton] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(businessSchema),
  });

  const [signupBusiness, { loading, error }] = useMutation(
    BUSINESS_SIGNUP_MUTATION,
  );

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setDisabledButton(true);

    try {
      const response = await signupBusiness({
        variables: {
          email: data.email,
          password: data.password,
          name: data.businessName,
          isBetaTester: false,
          contactName: "",
          isEarlySignup: false,
          referral: "",
        },
      });
      // when successful, set the Felow and push to the signup pages
      console.log("Signup successful, ID:", response.data.signupBusiness); // Adjust based on your mutation response
      setBusiness({
        ...business,
        businessName: data.businessName,
        email: data.email,
        password: data.password,
      });
      router.push("/business-signup/step1");
      setTimeout(() => {
        hideModal();
      }, 500);
    } catch (error) {
      console.error("Signup error:", error);
      // Optionally, you can set an error state here to display to the user
    }
  };

  return (
    <div
      className={`SignupModal flex w-[50vw] max-w-[450px] flex-col gap-4 ${textColor}`}
    >
      <Dialog.Title className="Title max-w-[450px] self-center text-center text-xl font-bold">
        sign up
      </Dialog.Title>
      <form
        className="IndividualSignupForm xs:pt-8 flex flex-col gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* business name input */}
        <FormInputComponent
          type="text"
          title="business name*"
          placeholderText="the best business"
          register={register}
          registerValue="businessName"
          errors={errors.businessName}
        />

        {/* email input */}
        <FormInputComponent
          type="email"
          title="business email*"
          placeholderText="fantasticbusinessemail@emailexample.com"
          register={register}
          registerValue="email"
          errors={errors.email}
        />

        {/* password input */}
        <FormInputComponent
          type="password"
          title="your password*"
          placeholderText="***********"
          register={register}
          registerValue="password"
          errors={errors.password}
        />

        {/* form submission button */}
        <div className="ButtonContainer -mb-6 mt-6 flex justify-end">
          <SiteButton
            variant="hollow"
            colorScheme="f1"
            aria="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={disabledButton}
          >
            {disabledButton ? "Creating Account..." : "create account"}
          </SiteButton>
        </div>
      </form>
    </div>
  );
}
