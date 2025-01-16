// "use client";

// import { useModal } from "@/contexts/ModalContext";

// const { hideModal } = useModal();

// export const saveClick = ({ setFellow, fellow, jobId }: any) => {
//   if (fellow?.savedJobs?.includes(jobId)) {
//     setFellow({
//       ...fellow,
//       savedJobs: fellow.savedJobs.filter((id: any) => id !== jobId),
//     });
//   } else {
//     setFellow({
//       ...fellow,
//       savedJobs: [...(fellow?.savedJobs || []), jobId],
//     });
//   }
//   hideModal();
// };
