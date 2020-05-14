import React from "react";
import TrashBox from "./TrashBox";
import TrashModal from "./TrashModal";

import NoteIcon from "@material-ui/icons/NoteOutlined";

function Trash({
  trash,
  openDrawer,
  handleTrashPop,
  handleTrashDelete,
  handleTrashRestore,
}) {
  const [trashModal, setTrashModal] = React.useState(false);
  const [trashed, setTrashed] = React.useState([]);

  const collectTrash = (trash) => {
    setTrashed(trash);
  };

  const handleTrashModalOpen = () => {
    setTrashModal(true);
    handleTrashPop(true);
  };

  const handleTrashModalClose = () => {
    setTrashModal(false);
  };

  return (
    <div style={{ marginTop: 20 }}>
      <div>
        {trash.length ? (
          <div>
            {trash.map((note, index) => {
              return (
                <TrashBox
                  note={note}
                  key={index}
                  handleTrashModalOpen={handleTrashModalOpen}
                  trashModal={trashModal}
                  collectTrash={collectTrash}
                  openDrawer={openDrawer}
                />
              );
            })}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <NoteIcon
              fontSize="inherit"
              style={{
                fontSize: 260,
                color: "#B2B2B2",
                marginTop: 60,
              }}
            />
          </div>
        )}
      </div>
      <div>
        {trashModal ? (
          <TrashModal
            handleTrashModalClose={handleTrashModalClose}
            trashed={trashed}
            handleTrashPop={handleTrashPop}
            onTrashDelete={handleTrashDelete}
            onTrashRestore={handleTrashRestore}
            trashList={trash}
          />
        ) : null}
      </div>
    </div>
  );
}

export default Trash;
