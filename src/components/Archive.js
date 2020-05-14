import React from "react";
import ArchiveBox from "./ArchiveBox";
import ArchiveModal from "./ArchiveModal";

import NoteIcon from "@material-ui/icons/NoteOutlined";
import Colors from "./Colors";

function Archive({
  archive,
  trash,
  openDrawer,
  handleArchivePop,
  handleArchiveRestore,
  handleArchiveEdit,
  handleNoteRemove,
}) {
  const [archiveModal, setArchiveModal] = React.useState(false);
  const [archived, setArchived] = React.useState([]);
  const [editedColor, setEditedColor] = React.useState("");
  const [anchor, setAnchor] = React.useState(false);
  const [color, setColor] = React.useState("");

  const collectArchive = (archive) => {
    setArchived(archive);
  };

  const handleArchiveModalOpen = () => {
    setArchiveModal(true);
    handleArchivePop(true);
  };

  const handleArchiveModalClose = () => {
    setArchiveModal(false);
  };

  const handleEditedColorClick = (_color) => {
    setEditedColor(_color);
  };

  const handleColorClick = (_color) => {
    setColor(_color);
  };

  const handlePopClick = (event) => {
    setAnchor(event.currentTarget);
  };

  const handlePopClose = () => {
    setAnchor(null);
  };

  return (
    <div style={{ marginTop: 20 }}>
      <div>
        {archive.length ? (
          <div>
            {archive.map((note, index) => {
              return (
                <ArchiveBox
                  note={note}
                  key={index}
                  handleArchiveModalOpen={handleArchiveModalOpen}
                  archiveModal={archiveModal}
                  collectArchive={collectArchive}
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
        <Colors
          handlePopClick={handlePopClick}
          handlePopClose={handlePopClose}
          handleEditedColorClick={handleEditedColorClick}
          anchor={anchor}
          handleColorClick={handleColorClick}
        />
      </div>
      <div>
        {archiveModal ? (
          <ArchiveModal
            handleArchiveModalClose={handleArchiveModalClose}
            archived={archived}
            handleArchivePop={handleArchivePop}
            onArchiveRestore={handleArchiveRestore}
            handlePopClick={handlePopClick}
            archive={archive}
            handleArchiveEdit={handleArchiveEdit}
            editedColor={editedColor}
            handleEditedColorClick={handleEditedColorClick}
            handleNoteRemove={handleNoteRemove}
            handleColorClick={handleColorClick}
            color={color}
            trash={trash}
          />
        ) : null}
      </div>
    </div>
  );
}

export default Archive;
