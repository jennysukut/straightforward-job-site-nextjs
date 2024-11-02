import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";

import { useRouter } from "next/navigation";
import { useModal } from "@/contexts/ModalContext";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SIGNUP_MUTATION } from "@/graphql/mutations";
import { useMutation } from "@apollo/client";

import SiteButton from "../../siteButton";
import { sendFellowSignupEmail } from "@/utils/emailUtils";
import SignupModalIndividual2 from "./signupIndividual2";
import ErrorModal from "../errorModal";

const fellowSchema = z.object({
  firstName: z.string().min(2, { message: "Required" }),
  lastName: z.string().min(2, { message: "Required" }),
  email: z.string().email(),
  password: z.string().min(6, { message: "Required" }),
});

type FormData = z.infer<typeof fellowSchema>;

export default function SignupModalIndividual1() {
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
    resolver: zodResolver(fellowSchema),
  });

  // const [signUp, { loading, error }] = useMutation(SIGNUP_MUTATION);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setDisabledButton(true);
    //navigate to the next page where you'll put information
    router.push("/individualSignup2");
    hideModal();
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
    <div className="SignupModal flex w-[50vw] max-w-[450px] flex-col gap-4 text-jade">
      <Dialog.Title className="Title max-w-[450px] self-center text-center text-xl font-bold">
        sign up
      </Dialog.Title>
      <form
        className="IndividualSignupForm xs:pt-8 flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* first name input */}
        <label htmlFor="name">first name*</label>
        <input
          type="firstName"
          placeholder="your first name"
          className="text-md mb-0 border-b-2 border-jade/50 bg-transparent pb-2 pt-0 text-jade placeholder:text-jade/50 focus:border-jade focus:outline-none"
          {...register("firstName")}
        />
        {errors.firstName?.message && (
          <p className="m-0 p-0 text-xs font-medium text-orange">
            {errors.firstName.message.toString()}
          </p>
        )}

        {/* last name input */}
        <label htmlFor="name" className="pt-4">
          last name*
        </label>
        <input
          type="lastName"
          placeholder="your last name"
          className="text-md mb-0 border-b-2 border-jade/50 bg-transparent pb-2 pt-0 text-jade placeholder:text-jade/50 focus:border-jade focus:outline-none"
          {...register("lastName")}
        />
        {errors.lastName?.message && (
          <p className="m-0 p-0 text-xs font-medium text-orange">
            {errors.lastName.message.toString()}
          </p>
        )}

        {/* email input */}
        <label htmlFor="email" className="mt-4">
          your email*
        </label>
        <input
          type="email"
          placeholder="fantasticemail@emailexample.com"
          className="text-md border-b-2 border-jade/50 bg-transparent pb-3 pt-0 text-jade placeholder:text-jade/50 focus:border-jade focus:outline-none"
          {...register("email", { required: "Email Address is required" })}
        />
        {errors.email?.message && (
          <p className="m-0 p-0 text-xs font-medium text-orange">
            {errors.email.message.toString()}
          </p>
        )}

        {/* password input */}
        <label htmlFor="password" className="mt-4">
          your password*
        </label>
        <input
          type="password"
          placeholder="secret password here"
          className="text-md border-b-2 border-jade/50 bg-transparent pb-3 pt-0 text-jade placeholder:text-jade/50 focus:border-jade focus:outline-none"
          {...register("password", { required: "Email Address is required" })}
        />
        {errors.password?.message && (
          <p className="m-0 p-0 text-xs font-medium text-orange">
            {errors.password.message.toString()}
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
            {disabledButton ? "Creating Account..." : "create account"}
          </SiteButton>
        </div>
      </form>
    </div>
  );
}
