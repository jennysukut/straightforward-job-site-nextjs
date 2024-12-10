import { useState, useEffect } from "react";
import { useBusiness } from "@/contexts/BusinessContext";
import { useRouter } from "next/navigation";
import { usePageContext } from "@/contexts/PageContext";
import { useModal } from "@/contexts/ModalContext";

import InfoBox from "./infoBox";
import SiteButton from "./siteButton";
import Avatar from "./avatarComponent";
import PostAJobModal from "./modals/postAJobModal";

export default function BusinessProfile({ business }: any, isOwn: boolean) {
  const { setBusiness } = useBusiness();
  const router = useRouter();
  const [canEdit, setCanEdit] = useState(false);
  const { setPageType } = usePageContext();
  const { showModal } = useModal();

  const handleEditClick = (url: any) => {
    setBusiness({ ...business, profileIsBeingEdited: true });
    // We should make a loading element or screen, since there's no way of telling when this button is clicked & you're being redirected
    console.log("edit button was clicked, redirecting to: ", url);
    router.push(url);
  };

  useEffect(() => {
    setPageType("Business");
  }, []);

  console.log(business?.activeJobs);

  return (
    <div className="BusinessProfileContainer flex w-[84%] max-w-[1600px] flex-col gap-8 md:w-[75%]">
      {/* NAME AND SMALL BIO */}
      <div className="BusinessName self-end">
        <InfoBox
          aria="business"
          variant="hollow"
          addClasses="gap-8 justify-evenly mr-14"
          size="profile"
          canEdit={canEdit}
          editClick={() => handleEditClick("/business-signup/step1")}
        >
          <div className="NameBioAvatarContainer flex gap-8 pr-10">
            <Avatar addClasses="self-center" />
            <div className="NameBioContainer">
              <h1 className="BusinessName">{business?.businessName}</h1>
              <p className="SmallBio pt-4 leading-6">
                {business?.smallBio ||
                  "Small Bio Placeholder - When filled out, the small bio & details for the fellow will go here!"}
              </p>
            </div>
          </div>
        </InfoBox>
      </div>

      {/* PROFILE DETAILS */}
      <div className="ProfileDetails flex gap-8">
        <div className="ProfileLeftColumn flex flex-col gap-8">
          {/* Mission & Vision */}
          <InfoBox
            variant="hollow"
            aria="missionVision"
            size="profile"
            width="small"
            canEdit={canEdit}
            editClick={() => handleEditClick("/business-signup/step2")}
          >
            <h2 className="MissionVisionTitle mb-4 pl-2">{`Mission & Vision:`}</h2>
            <p className="MissionVision ml-4 font-medium italic">
              {business.missionVision}
            </p>
          </InfoBox>

          {/* Business Field */}
          <InfoBox
            variant="hollow"
            aria="businessField"
            size="profile"
            width="small"
            canEdit={canEdit}
            editClick={() => handleEditClick("/business-signup/step2")}
          >
            <h2 className="BusinessFieldTitle mb-4 pl-2">{`Industry:`}</h2>
            <p className="BusinessField ml-8 font-medium text-olive">
              {business.businessField}
            </p>
          </InfoBox>

          {/* Edit Buttons */}
          {isOwn && (
            <div className="EditButtonContainer flex flex-col items-end gap-4 self-end">
              <SiteButton
                variant="filled"
                colorScheme="b6"
                aria="edit"
                addClasses="px-8"
                onClick={() => setCanEdit(!canEdit)}
                isSelected={canEdit}
              >
                edit
              </SiteButton>
              <SiteButton
                aria="post a job"
                variant="filled"
                colorScheme="f1"
                addClasses="px-8"
                onClick={() => showModal(<PostAJobModal />)}
              >
                post a job
              </SiteButton>
            </div>
          )}
        </div>
        <div className="ProfileRightColumn flex flex-col gap-8">
          {/* Location, Website, and Email */}
          <InfoBox
            variant="hollow"
            aria="location"
            size="profile"
            width="medium"
            canEdit={canEdit}
            editClick={() => handleEditClick("/business-signup/step1")}
          >
            <div className="LocationWebsiteEmailInfo flex flex-col gap-4">
              <p className="Location ml-2 text-emerald">
                Location: {business?.location}, {business?.country}
              </p>
              <p className="Website ml-2 text-emerald">
                Website:
                <a
                  href={business?.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium italic text-olive"
                >
                  {` `} {business?.website}
                </a>
              </p>
              <p className="Email ml-2 text-emerald">
                Email: {business?.email}
              </p>
            </div>
          </InfoBox>

          {/* More About The Business */}
          <InfoBox
            variant="hollow"
            aria="moreAboutBusiness"
            size="profile"
            width="medium"
            canEdit={canEdit}
            editClick={() => handleEditClick("/business-signup/step2")}
          >
            <h2 className="MoreAboutBusinessTitle pb-4 pl-2 pt-2">{`More About ${business.businessName}:`}</h2>
            <p className="MoreAboutBusiness pl-8 pt-4 font-medium leading-8 text-midnight">
              {business.moreAboutBusiness}
            </p>
          </InfoBox>
        </div>
      </div>
    </div>
  );
}
