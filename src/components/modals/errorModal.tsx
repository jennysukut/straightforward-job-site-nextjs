import * as Dialog from "@radix-ui/react-dialog";

export default function ErrorModal() {
  return (
    <div className="SignupOptionsModal flex max-w-[35rem] flex-col items-center gap-4">
      <Dialog.Title className="Title w-full pb-4 text-center text-xl font-bold">
        {`Hmm, there seems to be an issue...`}
      </Dialog.Title>
      <p className="Subtitle w-full text-center">
        {`I'm sure it's nothing we can't fix!`}
      </p>
      <p className="Subtitle w-full text-center italic text-olive lg:px-12">
        {`You can email our team over at simple@straightforwardjobsite.com and we'll help you get this sorted`}
      </p>
    </div>
  );
}
