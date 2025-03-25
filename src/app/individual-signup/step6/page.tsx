"use client";

import * as z from "zod";

import { useState, useEffect } from "react";
import { useFellow } from "@/contexts/FellowContext";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useModal } from "@/contexts/ModalContext";
import { usePageContext } from "@/contexts/PageContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useMutation } from "@apollo/client";
import { SAVE_PROFILE_PAGE_6_MUTATION } from "@/graphql/mutations";

import SiteButton from "@/components/buttonsAndLabels/siteButton";
import PopulateDisplayField from "@/components/informationDisplayComponents/populateDisplayField";
import AddLinkModal from "@/components/modals/profilePopulationModals/addLinkModal";
import InputComponent from "@/components/inputComponents/inputComponent";
import Avatar from "@/components/avatarComponent";
import AddHandler from "@/components/handlers/addHandler";
import UpdateHandler from "@/components/handlers/updateHandler";
import DeleteHandler from "@/components/handlers/deleteHandler";
import SubscriptionModal from "@/components/modals/subscriptionModal";

const fellowSchema = z.object({
  links: z.array(z.string()).optional(),
  aboutMe: z.string().optional(),
});

type FormData = z.infer<typeof fellowSchema>;

export default function IndividualSignupPage6() {
  const { fellow, setFellow } = useFellow();
  const { setAccountType, setIsLoggedIn } = usePageContext();
  const { showModal } = useModal();
  const { textColor } = useColorOptions();
  const router = useRouter();

  const [disabledButton, setDisabledButton] = useState(false);
  const [links, setLinks] = useState<any[]>([]);
  const [linkCounter, setLinkCounter] = useState(1);
  const [aboutMe, setAboutMe] = useState("");
  const [saveFellowProfilePage6, { loading, error }] = useMutation(
    SAVE_PROFILE_PAGE_6_MUTATION,
  );

  const {
    handleSubmit,
    register,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(fellowSchema),
  });

  // handlers for adding, updating, and deleting details
  const handleAdd = (type: "link", data: any) => {
    AddHandler({
      item: data,
      type,
      setFunctions: {
        link: setLinks,
      },
      hasId: { link: true },
      counterFunctions: {
        link: setLinkCounter,
      },
      counterDetails: {
        link: linkCounter,
      },
      setValue,
      clearErrors,
    });
  };

  const handleUpdate = (type: "link", updatedData: any, id: any) => {
    UpdateHandler({
      item: id,
      updatedData,
      type,
      setFunctions: {
        link: setLinks,
      },
    });

    setLinks((prevLinks) =>
      prevLinks.map((link) =>
        link.id === id ? { ...link, ...updatedData } : link,
      ),
    );
  };

  const handleDelete = (type: "link", id: any) => {
    DeleteHandler({
      item: id,
      type,
      setFunctions: {
        link: setLinks,
      },
      hasId: { link: true },
    });
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setDisabledButton(true);

    try {
      const response = await saveFellowProfilePage6({
        variables: {
          links: links,
          aboutMe: data.aboutMe,
        },
      });
      console.log(
        "Details saved successfully, Details:",
        response.data.saveFellowProfilePage6,
      );

      // if (
      //   fellow?.profileIsBeingEdited === false &&
      //   fellow?.addMoreInfo === false
      // ) {
      //   showModal(<SubscriptionModal />);
      // }

      setAccountType("Fellow");
      setIsLoggedIn(true);
      setFellow({
        ...fellow,
        links: links,
        aboutMe: data.aboutMe,
        profileIsBeingEdited: false,
        addMoreInfo: false,
      });
      router.push("/profile");
    } catch (error) {
      console.error("Signup error:", error);
      // Optionally, you can set an error state here to display to the user
    }
  };

  // Setting Details on page from fellowContext
  useEffect(() => {
    setLinks(Array.isArray(fellow?.links) ? fellow.links : []);
    setAboutMe(fellow?.aboutMe || "");
  }, []);

  return (
    <div
      className={`IndividualSignupPage5 flex w-[95vw] max-w-[1600px] flex-grow flex-col items-center gap-8 self-center pt-6 md:pb-8 md:pt-8 ${textColor}`}
    >
      <div className="PopulateProfileContainer flex w-[84%] max-w-[1600px] flex-col justify-center gap-10 sm:gap-8 md:w-[75%]">
        <div className="HeaderContainer flex justify-between">
          <h2 className="OptionalTitle text-lg">
            optional: links + more about you
          </h2>
          <div className="AvatarContainer self-end pr-6">
            <Avatar
              addClasses="self-end -mt-14"
              avatarType="Fellow"
              fellow={fellow}
            />
          </div>
        </div>

        {/* Add + Display Links */}
        <PopulateDisplayField
          handleAdd={handleAdd}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          title={`Your Portfolio / Website / Social Media Links`}
          aria="linksInfo"
          addModal={<AddLinkModal />}
          selectedArray={links}
          displayOption1="linkType"
          displayOption2="link"
          displayPunct=":"
        />

        {/* more about me input */}
        <InputComponent
          type="text"
          placeholderText="Optional: Share more about you..."
          errors={errors.aboutMe}
          register={register}
          registerValue="aboutMe"
          defaultValue={fellow?.aboutMe}
          width="full"
          size="tall"
        />

        <div className="ButtonContainer -mb-6 mt-6 flex justify-end self-end">
          <SiteButton
            variant="hollow"
            colorScheme="f1"
            aria="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={disabledButton}
          >
            {disabledButton && fellow?.profileIsBeingEdited === true
              ? "Returning To Profile..."
              : !disabledButton && fellow?.profileIsBeingEdited === true
                ? "update"
                : disabledButton && fellow?.profileIsBeingEdited === false
                  ? "Generating Profile..."
                  : "continue"}
          </SiteButton>
        </div>
      </div>
    </div>
  );
}
