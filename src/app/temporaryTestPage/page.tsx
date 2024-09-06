import RandomColorButton from "@/components/randomColorButton";
import SiteLabel from "@/components/siteLabel";
import InfoBox from "@/components/infoBox";

export default function TemporaryPage() {
  return (
    <div className="TemporaryPage flex flex-col items-center py-20">
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
        <div className="LabelGroupContainer flex h-44 gap-4">
          <div className="LabelGroup max-w-lg flex-wrap">
            <SiteLabel variant="display" aria="test">
              {`testing a label`}
            </SiteLabel>

            <SiteLabel variant="display" aria="test" colorScheme="b1">
              {`label with a set scheme`}
            </SiteLabel>

            <SiteLabel variant="display" aria="test">
              {`testing a third label`}
            </SiteLabel>

            <SiteLabel variant="functional" aria="test">
              {`testing a different label`}
            </SiteLabel>
            <SiteLabel variant="functional" aria="test">
              {`labely label`}
            </SiteLabel>
            <SiteLabel variant="functional" aria="test">
              {`yet another label`}
            </SiteLabel>
          </div>
          <div className="ScrollbarTest h-full overflow-y-scroll">
            <SiteLabel variant="display" aria="test">
              {`an absolute mess of labels`}
            </SiteLabel>
            <SiteLabel variant="display" aria="test" colorScheme="b1">
              {`to test the cutest little`}
            </SiteLabel>
            <SiteLabel variant="display" aria="test">
              {`scrollbar`}
            </SiteLabel>
            <SiteLabel variant="functional" aria="test">
              {`testing a different label`}
            </SiteLabel>
            <SiteLabel variant="functional" aria="test">
              {`labely label`}
            </SiteLabel>
            <SiteLabel variant="functional" aria="test">
              {`yet another label`}
            </SiteLabel>
            <SiteLabel variant="display" aria="test">
              {`testing a label`}
            </SiteLabel>
            <SiteLabel variant="display" aria="test" colorScheme="b1">
              {`label with a set scheme`}
            </SiteLabel>
            <SiteLabel variant="display" aria="test">
              {`testing a third label`}
            </SiteLabel>
            <SiteLabel variant="functional" aria="test">
              {`testing a different label`}
            </SiteLabel>
            <SiteLabel variant="functional" aria="test">
              {`labely label`}
            </SiteLabel>
            <SiteLabel variant="functional" aria="test">
              {`yet another label`}
            </SiteLabel>
            <SiteLabel variant="display" aria="test">
              {`testing a label`}
            </SiteLabel>
            <SiteLabel variant="display" aria="test" colorScheme="b1">
              {`label with a set scheme`}
            </SiteLabel>
            <SiteLabel variant="display" aria="test">
              {`testing a third label`}
            </SiteLabel>
            <SiteLabel variant="functional" aria="test">
              {`testing a different label`}
            </SiteLabel>
            <SiteLabel variant="functional" aria="test">
              {`labely label`}
            </SiteLabel>
            <SiteLabel variant="functional" aria="test">
              {`yet another label`}
            </SiteLabel>
            <SiteLabel variant="display" aria="test">
              {`testing a label`}
            </SiteLabel>
            <SiteLabel variant="display" aria="test" colorScheme="b1">
              {`label with a set scheme`}
            </SiteLabel>
            <SiteLabel variant="display" aria="test">
              {`testing a third label`}
            </SiteLabel>
            <SiteLabel variant="functional" aria="test">
              {`testing a different label`}
            </SiteLabel>
            <SiteLabel variant="functional" aria="test">
              {`labely label`}
            </SiteLabel>
            <SiteLabel variant="functional" aria="test">
              {`yet another label`}
            </SiteLabel>
          </div>
        </div>

        <InfoBox
          aria="test"
          variant="filled"
          colorScheme="b4"
          title="Balanced Title Here"
          textSize="small"
          addClasses="max-w-screen-md"
        >
          <p className="text">{`Our job board is of the honest variety.`}</p>
          <p className="text">
            {" "}
            {`We employ common sense by requiring practical information on all our job listings. Each job post will have details regarding pay, location, hybrid schedule {if applicable}, interview processes, responsibilities, and perks of the position. We also have a job listing pricing plan that makes fake jobs a ridiculous idea.`}{" "}
          </p>
          <p className="text">
            {" "}
            {`Transparency + decency is our bare minimum. `}{" "}
          </p>
        </InfoBox>
      </div>
    </div>
  );
}
