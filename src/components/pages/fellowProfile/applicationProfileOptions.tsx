import SiteButton from "@/components/buttonsAndLabels/siteButton";
import SiteLabel from "@/components/buttonsAndLabels/siteLabel";
import InfoBox from "@/components/informationDisplayComponents/infoBox";

import { ButtonColorOption } from "@/lib/stylingData/buttonColors";

const AppFellowTopButtons = ({}: any) => {
  return (
    <div className="BusinessAppButtonsContainer -mt-28 flex flex-col items-end gap-4 self-end">
      <SiteButton
        variant="filled"
        colorScheme="b5"
        aria="Contact"
        addClasses="px-8"
        // onClick={() => setCanEdit(!canEdit)}
      >
        contact
      </SiteButton>
      <SiteButton
        variant="filled"
        colorScheme="e5"
        aria="edit"
        addClasses="px-8"
        // onClick={addMoreInfo}
      >
        add a note
      </SiteButton>
      <SiteButton
        variant="filled"
        colorScheme="f3"
        aria="edit"
        addClasses="px-8"
        // onClick={addMoreInfo}
      >
        status
      </SiteButton>
    </div>
  );
};

const AppMessage = ({ avatarDetails, currentFellow, currentApp }: any) => {
  if (currentApp.message) {
    return (
      <InfoBox
        variant="filled"
        aria="appMessage"
        size="profile"
        width="medium"
        colorScheme={avatarDetails?.colorScheme as ButtonColorOption}
      >
        <div className="AppMessage flex flex-col gap-2">
          <p className={`MessageTitle mb-2 ml-2`}>
            Message To You From {currentFellow?.name}:
          </p>
          <p className={`Message ml-2 indent-10`}>{currentApp?.message}</p>
        </div>
      </InfoBox>
    );
  }
};

export { AppFellowTopButtons, AppMessage };
