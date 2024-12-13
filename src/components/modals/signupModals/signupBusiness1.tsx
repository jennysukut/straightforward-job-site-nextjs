import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";

import { useRouter } from "next/navigation";
import { useModal } from "@/contexts/ModalContext";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFellow } from "@/contexts/FellowContext";
import { useBusiness } from "@/contexts/BusinessContext";

import SiteButton from "../../siteButton";

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

  const [disabledButton, setDisabledButton] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(businessSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setDisabledButton(true);
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
        {/* business name input */}
        <label htmlFor="name">business name*</label>
        <input
          type="text"
          placeholder="the best business"
          className="text-md mb-0 border-b-2 border-jade/50 bg-transparent pb-2 pt-0 text-jade placeholder:text-jade/50 focus:border-jade focus:outline-none"
          {...register("businessName")}
        />
        {errors.businessName?.message && (
          <p className="m-0 p-0 text-xs font-medium text-orange">
            {errors.businessName.message.toString()}
          </p>
        )}

        {/* email input */}
        <label htmlFor="email" className="mt-4">
          business email*
        </label>
        <input
          type="email"
          placeholder="fantasticbusinessemail@emailexample.com"
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
          {...register("password", { required: "Password is required" })}
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
