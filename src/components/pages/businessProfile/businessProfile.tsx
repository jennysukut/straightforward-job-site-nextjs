import { useState, useEffect } from "react";
import { useBusiness } from "@/contexts/BusinessContext";
import { useRouter } from "next/navigation";
import { usePageContext } from "@/contexts/PageContext";
import { useModal } from "@/contexts/ModalContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useQuery } from "@apollo/client";
import { GET_BUSINESS_PROFILE } from "@/graphql/queries";
import {
  OwnBusinessBottomButtons,
  OwnBusinessTopButtons,
} from "./businessProfileButtonOptions";

import InfoBox from "../../informationDisplayComponents/infoBox";
import SiteButton from "../../buttonsAndLabels/siteButton";
import Avatar from "../../avatarComponent";

interface BusinessProfile {
  hasId?: boolean;
  id?: string;
  self?: any;
  isOwn?: boolean;
  logout?: any;
}

interface BusinessProfileData {
  id?: string;
  name?: string;
  businessProfile?: {
    avatar?: string;
    smallBio?: string;
    location?: string;
    country?: string;
    missionVision?: string;
    website?: string;
    moreAboutBusiness?: string;
    businessField?: string;
  };
}

const BusinessProfile: React.FC<BusinessProfile> = ({
  isOwn,
  self,
  hasId,
  id,
  logout,
}) => {
  const { setBusiness } = useBusiness();
  const { setPageType, setCurrentPage } = usePageContext();
  const { showModal } = useModal();
  const { textColor, titleColor, secondaryTextColor } = useColorOptions();
  const router = useRouter();
  const [canEdit, setCanEdit] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [thisBusiness, setThisBusiness] = useState<BusinessProfileData>({});

  useEffect(() => {
    if (isOwn) {
      setThisBusiness(self);
      setLoadingData(false);
    }
  }, []);

  console.log("this business", thisBusiness);
  // make query and have it not run if isOwn?
  const {
    loading: queryLoading,
    error: queryError,
    data: queryData,
  } = useQuery(GET_BUSINESS_PROFILE, {
    variables: {
      id,
    },
    skip: isOwn,
    onCompleted: (data) => {
      setThisBusiness({
        ...data.business,
        avatar: data.business.businessProfile.avatar,
      });
      setLoadingData(false);
    },
  });

  const handleEditClick = (url: any) => {
    setBusiness({ ...self, profileIsBeingEdited: true });
    // We should make a loading element or screen, since there's no way of telling when this button is clicked & you're being redirected
    console.log("edit button was clicked, redirecting to: ", url);
    router.push(url);
  };

  const viewOpenJobs = () => {
    router.push(`/listings/${id}`);
  };

  useEffect(() => {
    setPageType("Business");
    // setCurrentPage("businessProfile");
  }, [setPageType]);

  return (
    <div className="BusinessProfileContainer mr-14 flex w-[80%] max-w-[1600px] flex-col justify-center gap-8 self-center">
      {/* PROFILE DETAILS */}
      {loadingData ? (
        //make loading screen design here
        <div className="LoadingText text-olive">Loading...</div>
      ) : (
        <div className="ProfileDetails flex gap-8">
          <div className="ProfileLeftColumn mt-32 flex flex-col gap-8">
            {/* Edit Buttons */}
            {isOwn && (
              <OwnBusinessTopButtons
                logout={logout}
                canEdit={canEdit}
                setCanEdit={setCanEdit}
              />
            )}
            {!isOwn && (
              <div className="EditButtonContainer -mt-28 flex flex-col items-end gap-4 self-end">
                <SiteButton
                  variant="filled"
                  colorScheme="c4"
                  aria="edit"
                  addClasses="px-8"
                  onClick={viewOpenJobs}
                >
                  view their open jobs
                </SiteButton>
              </div>
            )}

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
              <p className="MissionVision ml-4 font-medium italic text-emerald">
                {thisBusiness?.businessProfile?.missionVision}
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
                {thisBusiness?.businessProfile?.businessField}
              </p>
            </InfoBox>

            {isOwn && (
              <OwnBusinessBottomButtons
                canEdit={canEdit}
                setCanEdit={setCanEdit}
              />
            )}
          </div>

          <div className="ProfileRightColumn flex flex-col gap-8">
            {/* Name And Small Bio */}
            <div className="BusinessName mr-8">
              <InfoBox
                aria="business"
                variant="hollow"
                size="profile"
                canEdit={canEdit}
                editClick={() => handleEditClick("/business-signup/step1")}
              >
                <div className="NameBioAvatarContainer flex items-center gap-8">
                  <Avatar
                    addClasses="self-start min-w-[60px]"
                    business={thisBusiness}
                    avatarType="Business"
                  />
                  <div className="NameBioContainer">
                    <h1 className="BusinessName">{thisBusiness.name}</h1>
                    <p className="SmallBio pt-4 leading-6 text-emerald">
                      {thisBusiness?.businessProfile?.smallBio ||
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
                  Location: {thisBusiness?.businessProfile?.location},{" "}
                  {thisBusiness?.businessProfile?.country}
                </p>
                <p className={`Website ml-2 flex gap-2 ${titleColor}`}>
                  Website:
                  <a
                    href={thisBusiness?.businessProfile?.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${secondaryTextColor} mt-[2px] text-sm font-medium italic`}
                  >
                    {thisBusiness?.businessProfile?.website}
                  </a>
                </p>
                {/* <p className={`Email ml-2 ${titleColor}`}>
                  Email: {thisBusiness?.businessProfile.email}
                </p> */}
              </div>
            </InfoBox>

            {/* More About The Business */}
            {thisBusiness?.businessProfile?.moreAboutBusiness !== undefined && (
              <InfoBox
                variant="hollow"
                aria="moreAboutBusiness"
                size="profile"
                width="medium"
                canEdit={canEdit}
                editClick={() => handleEditClick("/business-signup/step2")}
              >
                <h2 className="MoreAboutBusinessTitle pb-2 pl-2 pt-2 leading-8">{`More About ${thisBusiness.name}:`}</h2>
                <p
                  className={`MoreAboutBusiness pl-8 pt-4 font-medium leading-8 ${titleColor}`}
                >
                  {thisBusiness?.businessProfile?.moreAboutBusiness}
                </p>
              </InfoBox>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessProfile;
