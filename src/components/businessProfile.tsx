import { useState, useEffect } from "react";
import { useBusiness } from "@/contexts/BusinessContext";
import { useRouter } from "next/navigation";
import { usePageContext } from "@/contexts/PageContext";
import { useModal } from "@/contexts/ModalContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useBusinessList } from "@/contexts/BusinessListContext";

import InfoBox from "./infoBox";
import SiteButton from "./siteButton";
import Avatar from "./avatarComponent";
import PostAJobModal from "./modals/postAJobModals/postAJobModal";

export default function BusinessProfile({ isOwn, business, hasId, id }: any) {
  const { setBusiness } = useBusiness();
  const { businessList } = useBusinessList();
  const { setPageType } = usePageContext();
  const { showModal } = useModal();
  const { textColor, titleColor, secondaryTextColor } = useColorOptions();
  const router = useRouter();
  const [canEdit, setCanEdit] = useState(false);

  const handleEditClick = (url: any) => {
    setBusiness({ ...business, profileIsBeingEdited: true });
    // We should make a loading element or screen, since there's no way of telling when this button is clicked & you're being redirected
    console.log("edit button was clicked, redirecting to: ", url);
    router.push(url);
  };

  useEffect(() => {
    setPageType("Business");
  }, []);

  let thisBusiness;
  if (hasId) {
    thisBusiness = businessList?.find((business: any) => id === id);
    console.log("current Business details:", thisBusiness);
  } else {
    thisBusiness = business;
  }

  return (
    <div className="BusinessProfileContainer flex w-[84%] max-w-[1600px] flex-col gap-8 md:w-[75%]">
      {/* PROFILE DETAILS */}
      <div className="ProfileDetails flex gap-8">
        <div className="ProfileLeftColumn mt-32 flex flex-col gap-8">
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
              {thisBusiness.business.missionVision}
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
            <p
              className={`BusinessField ml-8 font-medium ${secondaryTextColor}`}
            >
              {thisBusiness.business.businessField}
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
          {/* NAME AND SMALL BIO */}
          <div className="BusinessName mr-8">
            <InfoBox
              aria="business"
              variant="hollow"
              size="profile"
              canEdit={canEdit}
              editClick={() => handleEditClick("/business-signup/step1")}
            >
              <div className="NameBioAvatarContainer flex items-center gap-8">
                <Avatar addClasses="self-start min-w-[60px]" />
                <div className="NameBioContainer">
                  <h1 className="BusinessName">
                    {thisBusiness?.business.businessName}
                  </h1>
                  <p className="SmallBio pt-4 leading-6">
                    {thisBusiness?.business.smallBio ||
                      "Small Bio Placeholder - When filled out, the small bio & details for the fellow will go here!"}
                  </p>
                </div>
              </div>
            </InfoBox>
          </div>

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
              <p className={`Location ml-2 ${titleColor}`}>
                Location: {thisBusiness?.business.location},{" "}
                {thisBusiness?.business.country}
              </p>
              <p className={`Website -mb-2 ml-2 flex gap-2 ${titleColor}`}>
                Website:
                <a
                  href={thisBusiness?.business.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${secondaryTextColor} text-sm font-medium italic`}
                >
                  {` `} {thisBusiness?.business.website}
                </a>
              </p>
              <p className={`Email ml-2 ${titleColor}`}>
                Email: {thisBusiness?.business.email}
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
            <h2 className="MoreAboutBusinessTitle pb-4 pl-2 pt-2">{`More About ${thisBusiness.business.businessName}:`}</h2>
            <p
              className={`MoreAboutBusiness pl-8 pt-4 font-medium leading-8 ${titleColor}`}
            >
              {thisBusiness.business.moreAboutBusiness}
            </p>
          </InfoBox>
        </div>
      </div>
    </div>
  );
}
