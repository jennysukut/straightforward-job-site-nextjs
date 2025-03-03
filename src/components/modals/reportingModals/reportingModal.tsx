import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";

import { useRouter } from "next/navigation";
import { useModal } from "@/contexts/ModalContext";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBusiness } from "@/contexts/BusinessContext";
import { useJob } from "@/contexts/JobContext";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useReports } from "@/contexts/ReportsContext";

import SiteButton from "@/components/buttonsAndLabels/siteButton";
import ButtonOptionsComponent from "@/components/buttonsAndLabels/buttonOptionsComponent";
import FormInputComponent from "@/components/inputComponents/formInputComponent";

import DeleteHandler from "@/components/handlers/deleteHandler";
import AddHandler from "@/components/handlers/addHandler";
import InputComponent from "@/components/inputComponents/inputComponent";

const reportSchema = z.object({
  reportReason: z.string().optional(),
  otherInfo: z.string().optional(),
});

type FormData = z.infer<typeof reportSchema>;

export default function ReportModal({ id, nameForReport }: any) {
  const router = useRouter();
  const { inputColors, errorColor, textColor } = useColorOptions();
  const { reports, setReports } = useReports();
  const { hideModal } = useModal();

  const [reportReason, setReportReason] = useState("");
  const [otherInfo, setOtherInfo] = useState("");
  const [input, setInput] = useState("");
  const [disabledButton, setDisabledButton] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(reportSchema),
  });

  // handlers for adding, updating, and deleting details
  const handleAdd = (type: "reportReason" | "setOtherInfo", data: any) => {
    AddHandler({
      item: data,
      type,
      setFunctions: {
        reportReason: setReportReason,
        otherInfo: setOtherInfo,
      },
      setValue,
      clearErrors,
      oneChoice: { reportReason: true, otherInfo: true },
    });
  };

  const handleDelete = (type: "reportReason" | "setOtherInfo", id: any) => {
    DeleteHandler({
      item: id,
      type,
      setFunctions: {
        reportReason: setReportReason,
        otherInfo: setOtherInfo,
      },
    });
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setDisabledButton(true);
    setReports([
      ...(reports || []),
      {
        reportReason: data.reportReason,
        otherInfo: data.otherInfo,
        offenderId: id,
        reportedBy: "me",
      },
    ]);

    hideModal();
  };

  return (
    <div
      className={`ReportModal flex w-[50vw] max-w-[450px] flex-col gap-4 ${textColor} items-center`}
    >
      <Dialog.Title className="Title max-w-[450px] self-center text-center text-xl font-bold">
        Submit A Report
      </Dialog.Title>
      <p className="SubTitle -mt-3 text-lg italic">for {nameForReport}</p>
      <form
        className="ReportForm xs:pt-8 mt-4 flex flex-col gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ButtonOptionsComponent
          type="reportReason"
          selectedArray={reportReason}
          buttons={[
            "fraud/scam",
            "inaccurate information",
            "unhealthy conduct",
          ]}
          handleAdd={handleAdd}
          handleDelete={handleDelete}
          classesForButtons="w-[27vw]"
          buttonSize="medium"
          buttonContainerClasses="flex-col gap-3"
        />

        <InputComponent
          type="text"
          addClasses="w-[27vw] text-sm placeholder:text-sm"
          placeholderText="other..."
          defaultValue={input}
          register={register}
          registerValue="otherInfo"
        ></InputComponent>

        <div className="SubmitButton -mb-4 mt-3 self-end">
          <SiteButton
            variant="hollow"
            aria="submit"
            type="submit"
            colorScheme="d1"
            isSelected={disabledButton}
          >
            {disabledButton ? "submitting..." : "submit"}
            {/* submit */}
          </SiteButton>
        </div>
      </form>
    </div>
  );
}
