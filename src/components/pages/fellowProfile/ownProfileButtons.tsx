import SiteButton from "@/components/buttonsAndLabels/siteButton";
import SiteLabel from "@/components/buttonsAndLabels/siteLabel";

import { ButtonColorOption } from "@/lib/stylingData/buttonColors";

const OwnFellowTopButtons = ({ setCanEdit, canEdit, addMoreInfo }: any) => {
  return (
    <div className="EditButtonContainer -mt-28 flex flex-col items-end gap-4 self-end">
      <SiteButton
        variant="filled"
        colorScheme="b6"
        aria="edit"
        addClasses="px-8"
        onClick={() => setCanEdit(!canEdit)}
        isSelected={canEdit}
      >
        edit details
      </SiteButton>
      <SiteButton
        variant="filled"
        colorScheme="c4"
        aria="edit"
        addClasses="px-8"
        onClick={addMoreInfo}
      >
        add more info
      </SiteButton>
    </div>
  );
};

const OwnFellowBottomButtons = ({ setCanEdit, canEdit, addMoreInfo }: any) => {
  return (
    <div className="EditButtonContainer flex flex-col items-end gap-4 self-end">
      <SiteButton
        variant="filled"
        colorScheme="b6"
        aria="edit"
        addClasses="px-8"
        onClick={() => setCanEdit(!canEdit)}
        isSelected={canEdit}
      >
        edit details
      </SiteButton>
      <SiteButton
        variant="filled"
        colorScheme="c4"
        aria="edit"
        addClasses="px-8"
        onClick={addMoreInfo}
      >
        add more info
      </SiteButton>
    </div>
  );
};

const OwnFellowAppTopButtons = ({ currentApp, currentJob }: any) => {
  return (
    <div className="AppInfoContainer -mt-28 flex flex-col items-end gap-4 self-end">
      <div className="AppDetails -mt-4 mb-4 max-w-[30vw] text-end">
        <h2 className="Title mb-1">Your Application:</h2>
        <p className="Title">{currentJob?.job.jobTitle}</p>
        <p className="Title italic">with {currentJob?.job.businessName}</p>
      </div>
      <SiteLabel
        variant="display"
        aria="appDate"
        addClasses="-mr-1 mt-0 -mb-2"
        colorScheme="f3"
      >
        applied on: {currentApp?.dateOfApp}
      </SiteLabel>
      <SiteLabel
        variant="display"
        aria="appStage"
        addClasses="-mr-1 mt-1 -mb-2"
        colorScheme="b6"
      >
        status: {currentApp?.appStatus}
      </SiteLabel>
    </div>
  );
};

const OwnFellowAppBottomButtons = ({
  avatarDetails,
  router,
  viewJobDetails,
}: any) => {
  return (
    <div className="EditButtonContainer flex flex-col items-end gap-4 self-end">
      <SiteButton
        variant="filled"
        colorScheme={avatarDetails?.colorScheme as ButtonColorOption}
        aria="edit"
        addClasses="px-8"
        onClick={viewJobDetails}
      >
        view job details
      </SiteButton>
      <SiteButton
        variant="filled"
        colorScheme="f3"
        aria="edit"
        addClasses="px-8"
        onClick={() => router.push(`/profile/1b23i`)}
      >
        business info
      </SiteButton>
      <SiteButton
        variant="filled"
        colorScheme="d4"
        aria="edit"
        addClasses="px-8"
        // onClick={addMoreInfo}
      >
        send a message
      </SiteButton>
      <SiteButton
        variant="filled"
        colorScheme="f5"
        aria="edit"
        addClasses="px-8"
        // onClick={addMoreInfo}
      >
        retract
      </SiteButton>
    </div>
  );
};

export {
  OwnFellowTopButtons,
  OwnFellowBottomButtons,
  OwnFellowAppTopButtons,
  OwnFellowAppBottomButtons,
};
