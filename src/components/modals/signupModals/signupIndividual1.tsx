import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";

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
  name: z.string().min(2, { message: "Required" }),
  email: z.string().email(),
  betaTester: z.boolean().optional(),
});

type FormData = z.infer<typeof fellowSchema>;

export default function SignupModalIndividual1() {
  const { showModal } = useModal();
  const [betaTester, setBetaTester] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(fellowSchema),
    defaultValues: {
      betaTester: false,
    },
  });

  const handleBetaTesterChange = () => {
    const newValue = !watch("betaTester");
    setValue("betaTester", newValue);
    setBetaTester(newValue);
  };

  const [signUp, { loading, error }] = useMutation(SIGNUP_MUTATION);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setDisabledButton(true);
    try {
      const result = await signUp({ variables: data })
        .then((result) => {
          sendFellowSignupEmail(data.email, data.name, betaTester);
          showModal(<SignupModalIndividual2 />);
        })
        .catch((error) => {
          showModal(<ErrorModal />);
        });
    } catch (err) {
      showModal(<ErrorModal />);
    }
  };

  return (
    <div className="SignupModal flex max-w-[450px] flex-col gap-4 text-jade">
      <Dialog.Title className="Title max-w-[450px] self-center text-center text-xl font-bold">
        hello there!
      </Dialog.Title>
      <Dialog.Description className="Subtitle w-full text-center text-xs sm:text-sm">
        sign up to be notified when we launch this Straightforward Job Site
      </Dialog.Description>
      <form
        className="IndividualSignupForm xs:pt-8 flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* name input */}
        <label htmlFor="name">your name*</label>
        <input
          type="name"
          placeholder="Fantastic Human"
          className="text-md mb-0 border-b-2 border-jade/50 bg-transparent pb-2 pt-2 text-jade placeholder:text-jade/50 focus:border-jade focus:outline-none"
          {...register("name")}
        />
        {errors.name?.message && (
          <p className="text-xs font-medium text-orange">
            {errors.name.message.toString()}
          </p>
        )}

        {/* email input */}
        <label htmlFor="email" className="mt-6">
          your email*
        </label>
        <input
          type="email"
          placeholder="fantasticemail@emailexample.com"
          className="text-md border-b-2 border-jade/50 bg-transparent pb-3 pt-2 text-jade placeholder:text-jade/50 focus:border-jade focus:outline-none"
          {...register("email", { required: "Email Address is required" })}
        />
        {errors.email?.message && (
          <p className="text-xs font-medium text-orange">
            {errors.email.message.toString()}
          </p>
        )}

        {/* beta tester option */}
        <div className="BetaTesterButton mt-6 flex items-center gap-2">
          <SiteButton
            variant="hollow"
            colorScheme="f1"
            aria="betaTester"
            size="smallCircle"
            isSelected={watch("betaTester")}
            onClick={handleBetaTesterChange}
          />
          <label htmlFor="betaTester" className="cursor-pointer pl-2 text-sm">
            sign up to be a beta tester
          </label>
        </div>

        {/* form submission button */}
        <div className="ButtonContainer mt-8 flex justify-end">
          <SiteButton
            variant="hollow"
            colorScheme="f1"
            aria="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={disabledButton}
          >
            {disabledButton ? "Signing up..." : "sign me up!"}
          </SiteButton>
        </div>
      </form>
    </div>
  );
}
