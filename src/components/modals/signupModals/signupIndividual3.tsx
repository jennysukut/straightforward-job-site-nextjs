import * as Dialog from "@radix-ui/react-dialog";

import { useModal } from "@/contexts/ModalContext";

import Link from "next/link";
import SiteButton from "../../siteButton";

export default function SignupModalIndividual3() {
  const { hideModal } = useModal();

  return (
    <div className="SignupModalIndividual2 flex max-w-[450px] flex-col items-center gap-4 text-jade">
      <Dialog.Title className="Title w-full max-w-[50vw] text-center text-xl font-bold">
        how you can help
      </Dialog.Title>
      <Dialog.Description className="SmallText w-full text-center font-normal italic">
        {`watch this quick video to learn more:`}
      </Dialog.Description>
      <video src="" className="aspect-video w-full rounded-3xl bg-peach" />
      <Dialog.Description className="SmallText w-full text-center text-xs italic text-olive sm:text-base">
        {`The biggest help to our startup is getting fellow humans involved! The more people we have using this job site, the more businesses will be inclined to post here. It would be fantastic if you told your friends + family + fellow job-seekers to sign up!`}
      </Dialog.Description>
      <div className="ButtonContainer mt-4 flex flex-col items-center justify-end gap-4 sm:flex-row">
        <Link href={"/support"}>
          <SiteButton
            variant="filled"
            colorScheme="e5"
            aria="submit"
            onClick={hideModal}
            addClasses="px-6"
          >
            support our development
          </SiteButton>
        </Link>
      </div>
    </div>
  );
}
