import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";

import { useRouter } from "next/navigation";
import { useModal } from "@/contexts/ModalContext";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFellow } from "@/contexts/FellowContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";

import SiteButton from "../../siteButton";
import FormInputComponent from "@/components/formInputComponent";

const fellowSchema = z.object({
  name: z.string().min(2, { message: "Required" }),
  email: z.string().email({ message: "Email Required" }),
  password: z.string().min(6, { message: "Required" }),
});

type FormData = z.infer<typeof fellowSchema>;

export default function SignupModalIndividual1() {
  const router = useRouter();
  const { showModal, hideModal } = useModal();
  const { fellow, setFellow } = useFellow();
  const { titleColor, textColor } = useColorOptions();

  const [disabledButton, setDisabledButton] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(fellowSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setDisabledButton(true);
    setFellow({
      ...fellow,
      name: data.name,
      email: data.email,
    });
    router.push("/individual-signup/step1");
    setTimeout(() => {
      hideModal();
    }, 1500);
  };

  return (
    <div
      className={`SignupModal flex w-[50vw] max-w-[450px] flex-col gap-4 ${textColor}`}
    >
      <Dialog.Title
        className={`Title max-w-[450px] self-center text-center text-xl font-bold ${titleColor}`}
      >
        sign up
      </Dialog.Title>
      <form
        className="IndividualSignupForm xs:pt-8 flex flex-col gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* name input */}
        <FormInputComponent
          type="name"
          title="your name*"
          placeholderText="first & last name"
          register={register}
          registerValue="name"
          errors={errors.name}
        />

        {/* email input */}
        <FormInputComponent
          type="email"
          title="your email*"
          placeholderText="fantasticemail@emailexample.com"
          register={register}
          registerValue="email"
          errors={errors.email}
        />

        {/* password input */}
        <FormInputComponent
          type="password"
          title="your password*"
          placeholderText="**********"
          register={register}
          registerValue="password"
          errors={errors.password}
        />

        {/* form submission button */}
        <div className="ButtonContainer -mb-6 flex justify-end">
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
