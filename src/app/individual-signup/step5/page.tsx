"use client";

import * as z from "zod";

import { useState, useEffect } from "react";
import { useFellow } from "@/contexts/FellowContext";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

import SiteButton from "@/components/siteButton";
import PopulateDisplayField from "@/components/populateDisplayField";
import AddLinkModal from "@/components/modals/profilePopulationModals/addLinkModal";
import InputComponent from "@/components/inputComponent";
import Avatar from "@/components/avatarComponent";
import AddHandler from "@/components/addHandler";
import UpdateHandler from "@/components/updateHandler";
import DeleteHandler from "@/components/deleteHandler";

const fellowSchema = z.object({
  links: z.array(z.string()).optional(),
  aboutMe: z.string().optional(),
});

type FormData = z.infer<typeof fellowSchema>;

export default function IndividualSignupPage4() {
  const { fellow, setFellow } = useFellow();
  const router = useRouter();

  const [disabledButton, setDisabledButton] = useState(false);
  const [links, setLinks] = useState<any[]>([]);
  const [linkCounter, setLinkCounter] = useState(1);
  const [aboutMe, setAboutMe] = useState("");

  const {
    handleSubmit,
    register,
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
      hasId: true,
      counterFunctions: {
        link: setLinkCounter,
      },
      counterDetails: {
        link: linkCounter,
      },
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
      hasId: true,
    });
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setDisabledButton(true);
    console.log(data.aboutMe);
    setFellow({
      ...fellow,
      links: links,
      aboutMe: data.aboutMe,
    });
    router.push("/individual-signup/step4");
  };

  // Setting Details on page from fellowContext
  useEffect(() => {
    setLinks(Array.isArray(fellow?.links) ? fellow.links : []);
    setAboutMe(fellow?.aboutMe || "");
  }, []);

  return (
    <div className="IndividualSignupPage5 flex w-[95vw] max-w-[1600px] flex-grow flex-col items-center gap-8 self-center pt-6 md:pb-8 md:pt-8">
      <div className="PopulateProfileContainer flex w-[84%] max-w-[1600px] flex-col justify-center gap-10 sm:gap-8 md:w-[75%]">
        <div className="HeaderContainer flex justify-between">
          <h2 className="OptionalTitle text-lg text-jade">
            optional: links + more about you
          </h2>
          <Avatar />
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
            {disabledButton ? "Generating Your Profile..." : "continue"}
          </SiteButton>
        </div>
      </div>
    </div>
  );
}
