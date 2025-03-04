"use client";

import * as z from "zod";

import { useState, useEffect } from "react";
import { usePageContext } from "@/contexts/PageContext";
import { rejectionOptions } from "@/lib/rejectionOptions";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useApplications } from "@/contexts/ApplicationsContext";
import { useRouter } from "next/navigation";

import ButtonOptionsComponent from "@/components/buttonsAndLabels/buttonOptionsComponent";
import AddHandler from "@/components/handlers/addHandler";
import DeleteHandler from "@/components/handlers/deleteHandler";
import InfoBox from "@/components/informationDisplayComponents/infoBox";
import InputComponent from "@/components/inputComponents/inputComponent";
import SiteButton from "@/components/buttonsAndLabels/siteButton";
import MessageCenter from "../pages/messagingCenter/messagingCenter";

type RejectionOptionKey = keyof typeof rejectionOptions;
const rejectionSchema = z.object({
  details: z.string(),
});

type FormData = z.infer<typeof rejectionSchema>;

// maybe instead of making this a whole other page, it'd be best to make this a component and we can plug it into the ams page where we're looking at the application,
// that way we can grab all the relevant info in one place?
export default function RejectionMessageOptionsComponent({
  jobTitle,
  applicant,
  businessName,
  interviewer,
  chosenMessage,
  currentApp,
}: any) {
  const router = useRouter();
  const { textColor } = useColorOptions();
  const { applications, setApplications } = useApplications();
  const [title, setTitle] = useState("kindGeneral" as RejectionOptionKey);
  const [rejectionMessage, setRejectionMessage] = useState({});
  const [applicantInfo, setApplicantInfo] = useState({
    firstName: applicant,
    jobTitle: jobTitle,
    businessName: businessName,
    interviewer: interviewer,
    skillOrExp: "___________",
    qualityOrExp: "_____________",
    expArea: "_______________",
  });
  const {
    handleSubmit,
    setValue,
    register,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(rejectionSchema),
  });

  let placeholderText = "";

  useEffect(() => {
    if (
      title === "kindGeneral" ||
      title === "postInterview" ||
      title === "promisingCandidate" ||
      title === "underqualifiedSuggestion"
    ) {
      // No action needed, title is valid
    } else {
      setTitle("kindGeneral" as RejectionOptionKey);
    }
  }, [title]);

  useEffect(() => {
    setTitle(chosenMessage);
  }, [chosenMessage]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (title === "kindGeneral") {
      setRejectionMessage({ title: title, note: "" });
    } else if (title === "postInterview" && data.details) {
      setApplicantInfo({ ...applicantInfo, qualityOrExp: data.details });
      setRejectionMessage({ title: title, note: data.details });
    } else if (title === "promisingCandidate" && data.details) {
      setApplicantInfo({ ...applicantInfo, skillOrExp: data.details });
      setRejectionMessage({ title: title, note: data.details });
    } else if (title === "underqualifiedSuggestion" && data.details) {
      setApplicantInfo({ ...applicantInfo, expArea: data.details });
      setRejectionMessage({ title: title, note: data.details });
    }
    setValue("details", "");
  };

  const reject = () => {
    router.push(`/messages/${currentApp.id}`);
    // if (applications) {
    //   setApplications(
    //     applications.map((app) =>
    //       app.id === currentApp.id
    //         ? {
    //             ...app,
    //             appStatus: "closed",
    //             appIsBeingRejected: "false",
    //             rejectionMessage: rejectionMessage,
    //           }
    //         : app,
    //     ),
    //   );
    // }
  };

  const sendRejection = () => {
    if (title === "kindGeneral") {
      reject();
    } else if (
      title === "postInterview" &&
      applicantInfo.qualityOrExp !== "_____________"
    ) {
      reject();
    } else if (
      title === "promisingCandidate" &&
      applicantInfo.skillOrExp !== "___________"
    ) {
      reject();
    } else if (
      title === "underqualifiedSuggestion" &&
      applicantInfo.expArea !== "_______________"
    ) {
      reject();
    } else {
      setError("details", {
        type: "manual",
        message: "please fill out details to send.",
      });
    }
  };

  // Function to generate rejection messages
  const generateRejectionMessages = (
    optionKey: keyof typeof rejectionOptions,
    applicantInfo: {
      firstName: string;
      jobTitle: string;
      businessName: string;
      interviewer: string;
      qualityOrExp: string;
      skillOrExp: string;
      expArea: string;
    },
  ) => {
    const option = rejectionOptions[optionKey];
    if (title === "kindGeneral") {
      return option.message({
        firstName: applicantInfo.firstName,
        jobTitle: applicantInfo.jobTitle,
        businessName: applicantInfo.businessName,
        interviewer: applicantInfo.interviewer,
      });
    } else if (title === "postInterview") {
      placeholderText = "quality or experience";
      return option.message({
        firstName: applicantInfo.firstName,
        jobTitle: applicantInfo.jobTitle,
        businessName: applicantInfo.businessName,
        interviewer: applicantInfo.interviewer,
        qualityOrExp: applicantInfo.qualityOrExp,
      });
    } else if (title === "promisingCandidate") {
      placeholderText = "skill or experience";
      return option.message({
        firstName: applicantInfo.firstName,
        jobTitle: applicantInfo.jobTitle,
        businessName: applicantInfo.businessName,
        interviewer: applicantInfo.interviewer,
        skillOrExp: applicantInfo.skillOrExp,
      });
    } else if (title === "underqualifiedSuggestion") {
      placeholderText = "experience area";
      return option.message({
        firstName: applicantInfo.firstName,
        jobTitle: applicantInfo.jobTitle,
        businessName: applicantInfo.businessName,
        interviewer: applicantInfo.interviewer,
        expArea: applicantInfo.expArea,
      });
    }
  };

  // Generate messages for the 'kindGeneral' option
  let messages = generateRejectionMessages(title, applicantInfo);

  // handlers for adding, updating, and deleting details
  const handleAdd = (type: "title", data: any) => {
    AddHandler({
      item: data,
      type,
      setFunctions: {
        title: setTitle,
      },
      oneChoice: { title: true },
    });
  };

  const handleDelete = (type: "title", id: any) => {
    DeleteHandler({
      item: id,
      type,
      setFunctions: {
        title: setTitle,
      },
    });
  };

  useEffect(() => {
    messages = generateRejectionMessages(title, applicantInfo);
    setValue("details", "");
  }, [title, applicantInfo]);

  return (
    <div
      className={`RejectionMessageOptions flex flex-grow flex-col items-center gap-8 self-center md:pb-12 ${textColor} w-[90%] max-w-[1600px]`}
    >
      <div className="ButtonOptions">
        <ButtonOptionsComponent
          type="title"
          buttons={[
            { tag: "kindGeneral", text: "kind + general message" },
            { tag: "postInterview", text: "friendly post-interview note" },
            { tag: "promisingCandidate", text: "promising candidate message" },
            {
              tag: "underqualifiedSuggestion",
              text: "underqualified suggestion note",
            },
          ]}
          selectedArray={title}
          handleAdd={handleAdd}
          handleDelete={handleDelete}
          addClasses="mt-4 -mb-6"
          buttonContainerClasses="flex-wrap gap-4 items-center justify-center"
        />
      </div>
      <div className="Message mt-4 flex flex-col gap-4 overflow-y-visible font-medium">
        <InfoBox
          variant="hollow"
          aria="rejectionMessage"
          width="full"
          size="large"
        >
          <div className="MessageLines flex flex-col gap-4">
            {messages?.map((message: string, index: number) => {
              return (
                <p className="messageLine leading-6 text-emerald" key={index}>
                  {message}
                </p>
              );
            })}
          </div>
        </InfoBox>
      </div>
      {title === "underqualifiedSuggestion" && (
        <p className="Detail -mt-2 text-right text-xs font-medium italic text-olive">
          {`*this rejection does offer suggestions on your behalf - be sure you're
          prepared to follow through with feedback if you choose this response.`}
        </p>
      )}

      {title !== "kindGeneral" && (
        <form
          className="Form flex items-center gap-3 self-start"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="Details">customize:</p>
          <InputComponent
            type="string"
            placeholderText={placeholderText}
            required
            register={register}
            registerValue="details"
            addClasses="w-[25vw]"
            errors={errors.details}
          />
          <SiteButton
            variant="filled"
            colorScheme="d4"
            aria="submit"
            onClick={handleSubmit(onSubmit)}
            addClasses="ml-3 mt-4 px-8"
          >
            add
          </SiteButton>
        </form>
      )}
      <div
        className={`FinalButton ${title !== "kindGeneral" ? "-my-14" : "-mb-14"} self-end`}
      >
        <SiteButton
          variant="filled"
          colorScheme="b6"
          aria="reject"
          addClasses="px-6 py-3"
          onClick={sendRejection}
        >
          send message and reject application
        </SiteButton>
      </div>
    </div>
  );
}
