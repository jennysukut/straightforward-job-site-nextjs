import SiteButton from "@/components/buttonsAndLabels/siteButton";
import PostAJobModal from "@/components/modals/postAJobModals/postAJobModal";

import { useModal } from "@/contexts/ModalContext";

const OwnBusinessTopButtons = ({ logout, canEdit, setCanEdit }: any) => {
  const { showModal } = useModal();

  return (
    <div className="EditButtonContainer -mt-24 flex flex-col items-end gap-3 self-end">
      <SiteButton
        variant="filled"
        colorScheme="f3"
        aria="logout"
        addClasses="px-8"
        onClick={logout}
      >
        logout
      </SiteButton>
      <SiteButton
        variant="filled"
        colorScheme="e6"
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
        colorScheme="d4"
        addClasses="px-8"
        onClick={() => showModal(<PostAJobModal />)}
      >
        post a job
      </SiteButton>
    </div>
  );
};

const OwnBusinessBottomButtons = ({ canEdit, setCanEdit }: any) => {
  const { showModal } = useModal();

  return (
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
  );
};

export { OwnBusinessTopButtons, OwnBusinessBottomButtons };
