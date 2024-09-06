import RandomColorButton from "@/components/randomColorButton";
import SiteLabel from "@/components/siteLabel";

export default function TemporaryPage() {
  return (
    <div className="TemporaryPage flex flex-col items-center py-20">
      {" "}
      <h1 className="Title text-3xl text-jade">Straightforward Job Site</h1>
      <p className="Subtitle italic text-lilac">
        testing out some tailwind classes + options
      </p>
      <div className="ButtonContainer my-5 flex flex-col items-center gap-6">
        <RandomColorButton
          aria="this is a test"
          variant="filled"
          colorScheme="f2"
        >
          {" "}
          normal button
        </RandomColorButton>
        <RandomColorButton
          aria="this is a test"
          variant="filled"
          colorScheme="b6"
          addClasses="max-w-72"
          size="large"
        >
          large button!
        </RandomColorButton>
        <RandomColorButton
          aria="this is a test"
          variant="filled"
          colorScheme="b1"
          disabled
        >
          {`disabled :(`}
        </RandomColorButton>

        <div className="LabelGroup flex flex-wrap max-w-lg">

        <SiteLabel
        variant="display"
        aria="test"
        >
          {`testing a label`}
        </SiteLabel>

        <SiteLabel
        variant="display"
        aria="test"
        colorScheme="b1"
        >
          {`testing another label`}
        </SiteLabel>

        <SiteLabel
        variant="display"
        aria="test"
        >
          {`testing a third label`}
        </SiteLabel>

        <SiteLabel
        variant="functional"
        aria="test"
        >
          {`testing a different label`}
        </SiteLabel>
        </div>
      </div>
    </div>
  );
}
