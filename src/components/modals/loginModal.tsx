import SiteButton from "../siteButton";
import { useModal } from "@/contexts/ModalContext";
import SignupOptionsModal from "./signupModals/signupOptionsModal";

export default function LoginModal() {
  const { replaceModalStack } = useModal();
  return (
    <div className="LoginModal flex flex-col items-center gap-10">
      <h2 className="Title w-full text-center text-2xl font-semibold">login</h2>
      <form className="LoginForm">
        <div className="FormContainer flex flex-col gap-10">
          <div className="FormItem flex flex-col gap-3">
            <label className="FormLabel font-bold">email</label>
            <input
              className="FormInput h-12 w-[460px] border-b-2 border-jade bg-transparent text-jade placeholder:text-jade placeholder:opacity-50"
              type="email"
              placeholder="hello@example.com"
            />
          </div>
          <div className="FormItem flex flex-col gap-3">
            <label className="FormLabel font-bold">password</label>
            <input
              className="FormInput h-12 w-[460px] border-b-2 border-jade bg-transparent text-jade placeholder:text-jade placeholder:opacity-50"
              type="password"
              placeholder="********"
            />
          </div>
        </div>
        <div className="FormButtons mt-6 flex justify-between">
          <SiteButton
            addClasses="w-32"
            variant="hollow"
            aria="Enter"
            colorScheme="c1"
          >
            Enter
          </SiteButton>
          <button
            className="SignupButton text-sm opacity-80 hover:opacity-100"
            aria-label="Sign Up"
            onClick={() => replaceModalStack(<SignupOptionsModal />)}
            type="button"
          >
            Or Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
