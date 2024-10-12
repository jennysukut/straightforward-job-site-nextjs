import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";

import { useModal } from "@/contexts/ModalContext";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client";
import { BUSINESS_SIGNUP_MUTATION } from "@/graphql/mutations";

import SiteButton from "../../siteButton";
import { sendBusinessSignupEmail } from "@/utils/emailUtils";
import SignupModalBusiness2 from "./signupBusiness2";
import ErrorModal from "../errorModal";

const businessSchema = z.object({
  business: z.string().min(2, { message: "Required" }),
  email: z.string().email(),
  betaTester: z.boolean().optional(),
  earlySignup: z.boolean().optional(),
});

type FormData = z.infer<typeof businessSchema>;

export default function SignupModalBusiness1() {
  const { showModal } = useModal();
  const [earlySignup, setEarlySignup] = useState(false);
  const [betaTester, setBetaTester] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      betaTester: false,
      earlySignup: false,
    },
  });

  const [signUp, { data, loading, error }] = useMutation(
    BUSINESS_SIGNUP_MUTATION,
  );

  // Submission Handler
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setDisabledButton(true);
    try {
      const result = await signUp({
        variables: {
          requestBody: {
            business: data.business,
            email: data.email,
            earlySignup: data.earlySignup,
            betaTester: true,
          },
        },
      })
        .then((result) => {
          sendBusinessSignupEmail(data.email, data.business, betaTester);
          showModal(<SignupModalBusiness2 />);
        })
        .catch((error) => {
          showModal(<ErrorModal />);
        });
    } catch (err) {
      console.error("Signup error:", err);
      showModal(<ErrorModal />);
    }
  };

  return (
    <div className="SignupModal flex max-w-[450px] flex-col gap-4 text-jade">
      <Dialog.Title className="Title w-full text-center text-xl font-bold">
        sign up
      </Dialog.Title>
      <Dialog.Description className="Subtitle w-full text-center">
        to be notified when we launch Straightforward Job Site
      </Dialog.Description>
      <form
        className="BusinessSignupForm flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* businessname input */}
        <label htmlFor="business">business name*</label>
        <input
          type="business"
          placeholder="Your Business"
          className="text-md mb-4 border-b-2 border-jade/50 bg-transparent pb-3 pt-2 text-jade placeholder:text-jade/50 focus:border-jade focus:outline-none"
          {...register("business")}
        />
        {errors.business?.message && (
          <p className="text-xs font-medium text-orange">
            {errors.business.message.toString()}
          </p>
        )}

        {/* business email input  */}
        <label htmlFor="email">business email*</label>
        <input
          type="email"
          placeholder="fantasticemail@mybusiness.org"
          className="text-md border-b-2 border-jade/50 bg-transparent pb-3 pt-2 text-jade placeholder:text-jade/50 focus:border-jade focus:outline-none"
          {...register("email", { required: "Email Address is required" })}
        />
        {errors.email?.message && (
          <p className="text-xs font-medium text-orange">
            {errors.email.message.toString()}
          </p>
        )}

        {/* button options */}
        <div className="EarlySignupButton -mb-4 mt-6 flex items-center gap-2">
          <SiteButton
            variant="hollow"
            colorScheme="f1"
            aria="earlySignup"
            size="smallCircle"
            isSelected={watch("earlySignup")}
            onClick={() => {
              const newValue = !watch("earlySignup");
              setValue("earlySignup", newValue);
              setEarlySignup(newValue);
            }}
          />
          <label htmlFor="betaTester" className="cursor-pointer pl-2 text-sm">
            get in early
          </label>
        </div>

        <div className="BetaTesterButton -mb-4 mt-6 flex items-center gap-2">
          <SiteButton
            variant="hollow"
            colorScheme="c1"
            aria="betaTester"
            size="smallCircle"
            isSelected={watch("betaTester")}
            onClick={() => {
              const newValue = !watch("betaTester");
              setValue("betaTester", newValue);
              setBetaTester(newValue);
            }}
          />
          <label htmlFor="betaTester" className="cursor-pointer pl-2 text-sm">
            sign up to be a beta tester
          </label>
        </div>

        {/* form submission button */}
        <div className="ButtonContainer mt-8 flex justify-end">
          <SiteButton
            variant="hollow"
            colorScheme="c1"
            aria="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={disabledButton}
          >
            {disabledButton ? "Signing up..." : "sign us up!"}
          </SiteButton>
        </div>
      </form>
    </div>
  );
}
