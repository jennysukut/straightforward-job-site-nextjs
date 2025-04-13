import * as Dialog from "@radix-ui/react-dialog";
import { useModal } from "@/contexts/ModalContext";
import { useRouter } from "next/navigation";
import SiteButton from "@/components/buttonsAndLabels/siteButton";

export default function SuccessfullyPublishedModal(isJobPost: any, jobId: any) {
  const { hideModal } = useModal();
  const router = useRouter();

  const Continue = () => {
    // router.push(`/listing/${jobId}`);
    hideModal();
  };

  const GoToProfile = () => {
    router.push(`/profile`);
    hideModal();
  };

  return (
    <div className="SignupOptionsModal flex max-w-[35rem] flex-col items-center gap-4">
      <Dialog.Title className="Title w-full text-center text-xl font-bold">
        fantastic!
      </Dialog.Title>
      <p className="Subtitle -mt-2 mb-4 w-full text-center italic text-emerald lg:max-w-[35vw]">
        your job post was successfully published
      </p>
      <div className="ButtonContainer flex flex-col items-center justify-center gap-6">
        <SiteButton
          aria="continue"
          variant="filled"
          colorScheme="b4"
          size="large"
          onClick={Continue}
        >
          view your listing
        </SiteButton>

        <SiteButton
          aria="go to profile"
          variant="filled"
          colorScheme="c1"
          size="large"
          onClick={GoToProfile}
        >
          continue to your profile
        </SiteButton>
      </div>
    </div>
  );
}
