import * as Dialog from "@radix-ui/react-dialog";
import SiteButton from "../buttonsAndLabels/siteButton";
import { useModal } from "@/contexts/ModalContext";
import { useRouter } from "next/navigation";
export default function PaymentSuccessfulModal(isJobPost: any, jobId: any) {
  const { hideModal } = useModal();
  const router = useRouter();

  const Continue = () => {
    if (isJobPost) {
      router.push(`/listing/${jobId}`);
    } else {
      router.push(`/profile`);
    }
  };
  return (
    <div className="SignupOptionsModal flex max-w-[35rem] flex-col items-center gap-4">
      <Dialog.Title className="Title w-full text-center text-xl font-bold">
        thank you!
      </Dialog.Title>
      <p className="Subtitle -mt-2 mb-4 w-full text-center italic lg:max-w-[35vw]">
        your payment was successful
      </p>

      <SiteButton
        aria="continue"
        variant="filled"
        colorScheme="b5"
        size="large"
        onClick={Continue}
      >
        {isJobPost ? "view your listing" : "continue to your profile"}
      </SiteButton>
    </div>
  );
}
