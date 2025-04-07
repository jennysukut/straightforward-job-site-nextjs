"use client";

import { useEffect, useState } from "react";
import { useColorOptions } from "@/lib/stylingData/colorOptions";
import { useFellow } from "@/contexts/FellowContext";
import { useModal } from "@/contexts/ModalContext";
import { usePageContext } from "@/contexts/PageContext";
import { useQuery } from "@apollo/client";
import { GET_JOB_LISTINGS } from "@/graphql/queries";
import { useMutation } from "@apollo/client";
import { SAVE_JOB } from "@/graphql/mutations";

import Link from "next/link";
import ShuffleIdealButtonPattern from "@/components/buttonsAndLabels/shuffleIdealButtonPattern";
import JobPost from "@/components/jobBoardComponents/jobPostComponent";

export default function SavedJobs() {
  const { fellow, setFellow } = useFellow();
  const { textColor } = useColorOptions();
  const { hideModal } = useModal();
  const { setCurrentPage } = usePageContext();

  const [colorArray, setColorArray] = useState<[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [saveJob, { loading, error }] = useMutation(SAVE_JOB);

  const {
    loading: queryLoading,
    error: queryError,
    data: { jobListings: jobListingsArray = [] } = {},
  } = useQuery(GET_JOB_LISTINGS, {
    variables: { isSaved: true },
    onCompleted: (data) => {
      console.log(JSON.stringify(data));
      console.log(data);
      setLoadingData(false);
    },
  });

  // make this saveClick function call the like-job thing
  const saveClick = async (id: any) => {
    console.log(id);
    try {
      const result = await saveJob({ variables: { jobId: id } });

      console.log(result);
    } catch (err) {
      console.log(err);
    }
    // if (fellow?.savedJobs?.includes(jobId)) {
    //   setFellow({
    //     ...fellow,
    //     savedJobs: fellow.savedJobs.filter((id) => id !== jobId),
    //   });
    // } else {
    //   setFellow({
    //     ...fellow,
    //     savedJobs: [...(fellow?.savedJobs || []), jobId],
    //   });
    // }
    // hideModal();
  };

  useEffect(() => {
    ShuffleIdealButtonPattern(setColorArray);
    setCurrentPage("saved");
  }, [setCurrentPage]);

  return (
    <div
      className={`SavedJobsPage flex flex-grow flex-col items-center gap-8 md:pb-12 ${textColor} w-[84%] max-w-[1600px] gap-8 self-center`}
    >
      {loadingData ? (
        //make loading screen design here
        <div className="LoadingText text-olive">Loading...</div>
      ) : (
        <div className="SavedJobsContainer">
          <h1 className="SavedJobsTitle -mb-2 mr-20 self-end">
            Your Saved Jobs:
          </h1>
          <div className="JobListings mt-8 flex flex-wrap items-center justify-center gap-8 self-center align-middle">
            {jobListingsArray.length === 0 && (
              <div className="noSavedJobsContainer mt-24 max-w-[50vw] text-center italic text-olive">
                <h2 className="NoSavedJobs">
                  {`You don't have any saved jobs at the moment.`}
                </h2>
                <h2 className="NoSavedJobs">
                  <Link href="/job-board" className="underline">
                    Check out our active jobs
                  </Link>
                  {` to see if there's an exciting
              opportunity for you!`}
                </h2>
              </div>
            )}

            {jobListingsArray?.map((job: any, index: number) => (
              <JobPost
                job={job}
                index={index}
                colorArray={colorArray}
                key={job.id}
                saveClick={() => saveClick(job.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
