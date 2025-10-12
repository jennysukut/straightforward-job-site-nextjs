"use client";

import { useState, useEffect } from "react";
import { useModal } from "@/contexts/ModalContext";
import { useFellow } from "@/contexts/FellowContext";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { SAVE_PROFILE_PAGE_3_MUTATION } from "@/graphql/mutations";
import { usePageContext } from "@/contexts/PageContext";

import Image from "next/image";
import SiteButton from "@/components/buttonsAndLabels/siteButton";
import AddAwardModal from "@/components/modals/profilePopulationModals/addAwardModal";
import PopulateDisplayField from "@/components/informationDisplayComponents/populateDisplayField";
import AddExperienceLevelModal from "@/components/modals/profilePopulationModals/addExperienceLevels";
import AddAccomplishmentModal from "@/components/modals/profilePopulationModals/addAccomplishmentsModal";
import Avatar from "@/components/avatarComponent";
import DeleteHandler from "@/components/handlers/deleteHandler";
import UpdateHandler from "@/components/handlers/updateHandler";
import AddHandler from "@/components/handlers/addHandler";

export default function IndividualSignupPage3() {
  const { fellow, setFellow } = useFellow();
  const { setCurrentPage } = usePageContext();
  const router = useRouter();

  const [disabledButton, setDisabledButton] = useState(false);
  const [awards, setAwards] = useState<any[]>([]);
  const [experienceLevels, setExperienceLevels] = useState<any[]>([]);
  const [accomplishments, setAccomplishments] = useState<any[]>([]);
  const [awardCounter, setAwardCounter] = useState(1);
  const [experienceLevelCounter, setExperienceLevelCounter] = useState(1);
  const [accomplishmentCounter, setAccomplishmentCounter] = useState(1);
  const [saveFellowProfilePage3, { loading, error }] = useMutation(
    SAVE_PROFILE_PAGE_3_MUTATION,
  );

  // handlers for adding, updating, and deleting details
  const handleAdd = (
    type: "award" | "experienceLevel" | "accomplishment",
    data: any,
  ) => {
    AddHandler({
      item: data,
      type,
      setFunctions: {
        award: setAwards,
        experienceLevel: setExperienceLevels,
        accomplishment: setAccomplishments,
      },
      hasId: { award: true, experienceLevel: true, accomplishment: true },
      counterFunctions: {
        award: setAwardCounter,
        experienceLevel: setExperienceLevelCounter,
        accomplishment: setAccomplishmentCounter,
      },
      counterDetails: {
        award: awardCounter,
        experienceLevel: experienceLevelCounter,
        accomplishment: accomplishmentCounter,
      },
    });
  };

  const handleUpdate = (
    type: "award" | "experienceLevel" | "accomplishment",
    updatedData: any,
    id: any,
  ) => {
    UpdateHandler({
      item: id,
      updatedData,
      type,
      setFunctions: {
        award: setAwards,
        experienceLevel: setExperienceLevels,
        accomplishment: setAccomplishments,
      },
    });
  };

  const handleDelete = (
    type: "award" | "experienceLevel" | "accomplishment",
    id: any,
  ) => {
    DeleteHandler({
      item: id,
      type,
      setFunctions: {
        experienceLevel: setExperienceLevels,
        award: setAwards,
        accomplishment: setAccomplishments,
      },
      hasId: { award: true, experienceLevel: true, accomplishment: true },
    });
  };

  const handleSubmit = async () => {
    setDisabledButton(true);

    try {
      const response = await saveFellowProfilePage3({
        variables: {
          awards: awards,
          experienceLevels: experienceLevels,
          accomplishments: accomplishments,
        },
      });
      // console.log(
      //   "Details saved successfully, Details:",
      //   response.data.saveFellowProfilePage3,
      // );

      setFellow({
        ...fellow,
        profile: {
          ...fellow?.profile,
          awards: awards,
          experienceLevels: experienceLevels,
          accomplishments: accomplishments,
        },
        profileUpdate: true,
      });
      if (fellow?.profileIsBeingEdited) {
        router.push("/profile");
      } else {
        router.push("/individual-signup/step4");
      }
    } catch (error) {
      console.error("Signup error:", error);
      // Optionally, you can set an error state here to display to the user
    }
  };

  // Setting Details on page from fellowContext
  useEffect(() => {
    setCurrentPage("3");
    setAwards(
      Array.isArray(fellow?.profile?.awards) ? fellow.profile?.awards : [],
    );
    setExperienceLevels(
      Array.isArray(fellow?.profile?.experienceLevels)
        ? fellow.profile?.experienceLevels
        : [],
    );
    setAccomplishments(
      Array.isArray(fellow?.profile?.accomplishments)
        ? fellow.profile?.accomplishments
        : [],
    );
  }, []);

  return (
    <div className="IndividualSignupPage3 flex w-[95vw] max-w-[1600px] flex-grow flex-col items-center gap-8 self-center pt-6 md:pb-8 md:pt-8">
      <div className="PopulateProfileContainer flex w-[84%] max-w-[1600px] flex-col justify-center gap-10 sm:gap-8 md:w-[75%]">
        <div className="AvatarContainer self-end pr-6">
          <Avatar
            addClasses="self-end -mt-14"
            avatarType="Fellow"
            avatar={fellow?.profile?.avatar}
          />
        </div>

        {/* Add + Display Awards / Honors */}
        <PopulateDisplayField
          handleAdd={handleAdd}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          title={`Your Awards or Honors`}
          aria="awardsInfo"
          addModal={<AddAwardModal />}
          selectedArray={awards}
          displayOption1="awardTitle"
          displayOption2="givenBy"
          displayPunct=": given by"
        />

        {/* Add + Display ExperienceLevels */}
        <PopulateDisplayField
          handleAdd={handleAdd}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          title={`Your Experience Levels`}
          aria="experienceLevelsInfo"
          addModal={<AddExperienceLevelModal />}
          selectedArray={experienceLevels}
          displayOption1="experienceLevel"
          displayOption2="expLevelSkill"
          displayPunct=":"
        />

        {/* Add + Display AdditionalAccomplishments */}
        <PopulateDisplayField
          handleAdd={handleAdd}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          title={`Your Additional Accomplishments`}
          aria="experienceLevelsInfo"
          addModal={<AddAccomplishmentModal />}
          selectedArray={accomplishments}
          displayOption1="accTitle"
        />

        <div className="ButtonContainer -mb-6 mt-6 flex justify-end self-end">
          <SiteButton
            variant="hollow"
            colorScheme="f1"
            aria="submit"
            onClick={handleSubmit}
            disabled={disabledButton}
          >
            {/* {disabledButton && fellow?.profileIsBeingEdited === true
              ? "Returning To Profile..."
              : !disabledButton && fellow?.profileIsBeingEdited === true
                ? "update"
                : disabledButton && fellow?.profileIsBeingEdited === false
                  ? "Saving Information.."
                  : "continue"}{" "} */}

            {disabledButton ? "Saving Information..." : "continue"}
          </SiteButton>
        </div>
      </div>
    </div>
  );
}
