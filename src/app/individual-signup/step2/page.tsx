"use client";

import { useState, useEffect } from "react";
import { useFellow } from "@/contexts/FellowContext";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { SAVE_PROFILE_PAGE_2_MUTATION } from "@/graphql/mutations";
import { usePageContext } from "@/contexts/PageContext";

import SiteButton from "@/components/buttonsAndLabels/siteButton";
import AddExperienceModal from "@/components/modals/profilePopulationModals/addExperienceModal";
import AddEducationModal from "@/components/modals/profilePopulationModals/addEducationModal";
import PopulateDisplayField from "@/components/informationDisplayComponents/populateDisplayField";
import Avatar from "@/components/avatarComponent";
import DeleteHandler from "@/components/handlers/deleteHandler";
import AddHandler from "@/components/handlers/addHandler";
import UpdateHandler from "@/components/handlers/updateHandler";

export default function IndividualSignupPage2() {
  const { fellow, setFellow } = useFellow();
  const { setCurrentPage } = usePageContext();
  const router = useRouter();

  const [disabledButton, setDisabledButton] = useState(false);
  const [experienceDetails, setExperienceDetails] = useState<any[]>([]);
  const [educationDetails, setEducationDetails] = useState<any[]>([]);

  // we use these counters for setting Ids for our education and experience events
  // there might be a better way to do this, because this doesn't facilitate navigating back to the page and adding new data
  const [experienceCounter, setExperienceCounter] = useState(1);
  const [educationCounter, setEducationCounter] = useState(1);
  const [saveFellowProfilePage2, { loading, error }] = useMutation(
    SAVE_PROFILE_PAGE_2_MUTATION,
  );

  // handlers for adding, updating, and deleting experiences and education details
  const handleAdd = (type: "experience" | "education", data: any) => {
    AddHandler({
      item: data,
      type,
      setFunctions: {
        experience: setExperienceDetails,
        education: setEducationDetails,
      },
      hasId: { experience: true, education: true },
      counterFunctions: {
        experience: setExperienceCounter,
        education: setEducationCounter,
      },
      counterDetails: {
        experience: experienceCounter,
        education: educationCounter,
      },
    });
  };

  const handleUpdate = (
    type: "experience" | "education",
    updatedData: any,
    id: any,
  ) => {
    UpdateHandler({
      item: id,
      updatedData,
      type,
      setFunctions: {
        experience: setExperienceDetails,
        education: setEducationDetails,
      },
    });
  };

  const handleDelete = (type: "experience" | "education", id: number) => {
    DeleteHandler({
      item: id,
      type,
      setFunctions: {
        experience: setExperienceDetails,
        education: setEducationDetails,
      },
      hasId: { experience: true, education: true },
    });
  };

  const handleSubmit = async () => {
    setDisabledButton(true);

    try {
      const response = await saveFellowProfilePage2({
        variables: {
          experience: experienceDetails,
          education: educationDetails,
          profileIsBeingEdited: false,
        },
      });
      console.log(
        "Details saved successfully, Details:",
        response.data.saveFellowProfilePage2,
      );

      // when successful, set the Fellow and push to the next signup page
      setFellow({
        ...fellow,
        profile: {
          ...fellow?.profile,
          experience: experienceDetails,
          education: educationDetails,
        },
        profileUpdate: true,
      });
      if (fellow?.profileIsBeingEdited) {
        router.push("/profile");
      } else {
        router.push("/individual-signup/step3");
      }
    } catch (error) {
      console.error("Signup error:", error);
      // Optionally, you can set an error state here to display to the user
    }
  };

  // Setting Details on page from fellowContext
  useEffect(() => {
    setCurrentPage("2");
    setExperienceDetails(
      Array.isArray(fellow?.profile?.experience)
        ? fellow.profile?.experience
        : [],
    );
    setEducationDetails(
      Array.isArray(fellow?.profile?.education)
        ? fellow.profile?.education
        : [],
    );
  }, []);

  return (
    <div className="IndividualSignupPage2 flex w-[95vw] max-w-[1600px] flex-grow flex-col items-center gap-8 self-center pt-6 md:pb-8 md:pt-8">
      <div className="PopulateProfileContainer flex w-[84%] max-w-[1600px] flex-col justify-center gap-10 sm:gap-8 md:w-[75%]">
        <div className="AvatarContainer self-end pr-6">
          <Avatar
            addClasses="self-end -mt-14"
            avatarType="Fellow"
            avatar={fellow?.profile?.avatar}
          />
        </div>
        {/* Add + Display Experience */}
        <PopulateDisplayField
          handleAdd={handleAdd}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          selectedArray={experienceDetails}
          aria="experienceInfo"
          title={`Your Experience`}
          addModal={<AddExperienceModal />}
          displayOption1="title"
          displayOption2="companyName"
        />

        {/* Add + Display Education */}
        <PopulateDisplayField
          handleAdd={handleAdd}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          selectedArray={educationDetails}
          aria="educationInfo"
          title={`Your Education / Certificates`}
          addModal={<AddEducationModal />}
          displayOption1="degree"
          displayOption2="school"
        />

        <div className="ButtonContainer -mb-6 mt-6 flex justify-end gap-4 self-end">
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
                  : "continue"} */}

            {disabledButton ? "Saving Information" : "continue"}
          </SiteButton>
        </div>
      </div>
    </div>
  );
}
