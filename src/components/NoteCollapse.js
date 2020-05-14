import React from "react";
import Notes from "./Notes";
import NoteBox from "./NoteBox";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";

import Colors from "./Colors";
import EditNote from "./EditNote";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";

import NoteIcon from "@material-ui/icons/NoteOutlined";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: 17.5,
    padding: "10px 17px 10px 17px",
    borderRadius: 10,
    marginBottom: 23,
  },
  note: {
    color: "#8C8C8C",
    cursor: "default",
    [theme.breakpoints.down("xs")]: {
      fontSize: 18,
    },
    fontSize: 22,
    fontWeight: 300,
  },
  categories: {
    marginBottom: 14,
    marginLeft: 10,
    fontSize: 15,
    color: "#4B4F51",
    [theme.breakpoints.down("xs")]: {
      fontSize: 12.5,
    },
  },
  icon: {
    fontSize: 260,
    color: "#B2B2B2",
    marginTop: 60,
  },
}));

function NoteCollapse({
  notes,
  handleNotes,
  handleNoteRemove,
  handleEdit,
  handleNoteEdit,
  openDrawer,
  route,
  trash,
  archive,
}) {
  const classes = useStyles();

  //states.....
  const [expand, setExpand] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [anchor, setAnchor] = React.useState(false);
  const [color, setColor] = React.useState("");
  const [edit, setEdit] = React.useState(false);
  const [noteCollect, setNoteCollect] = React.useState([]);
  const [editedColor, setEditedColor] = React.useState("");

  const [state] = React.useState({
    open: false,
    Transition: Slide,
  });

  //editing
  const handleEditOpen = () => {
    handleEdit(true);
    setEdit(true);
  };

  const handleEditClose = () => {
    setEdit(false);
  };

  const collectNote = (note) => {
    setNoteCollect(note);
  };

  const handleExpand = () => {
    setExpand(true);
  };

  const handleCollapse = () => {
    setColor("");
    setExpand(false);
  };

  //snackbar
  const handleOpen = (open) => {
    setOpen(open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //popover
  const handlePopClick = (event) => {
    setAnchor(event.currentTarget);
  };

  const handlePopClose = () => {
    setAnchor(null);
  };

  const handleColorClick = (_color) => {
    setColor(_color);
  };

  const handleEditedColorClick = (_color) => {
    setEditedColor(_color);
  };

  let pinnedList = [];
  let unPinnedList = [];

  notes.map((note) => {
    if (note.pinned) {
      pinnedList = [...pinnedList, note];
      return pinnedList;
    } else {
      unPinnedList = [...unPinnedList, note];
      return unPinnedList;
    }
  });

  return (
    <div>
      {expand ? (
        <Notes
          onCollapse={handleCollapse}
          allNotes={notes}
          handleNotes={handleNotes}
          handleOpen={handleOpen}
          handlePopClick={handlePopClick}
          color={color}
        />
      ) : (
        <div onClick={handleExpand}>
          <Paper className={classes.paper} elevation={3}>
            <Typography variant="h6" className={classes.note}>
              Take a note...
            </Typography>
          </Paper>
        </div>
      )}
      {notes.length ? (
        <div>
          {notes.length > 1 && pinnedList.length ? (
            <Typography className={classes.categories}>PINNED</Typography>
          ) : null}
          {pinnedList.map((note, index) => {
            return (
              <NoteBox
                note={note}
                key={index}
                onEdit={handleEditOpen}
                collectNote={collectNote}
                openDrawer={openDrawer}
                route={route}
              />
            );
          })}
          {notes.length > 1 && unPinnedList.length ? (
            <Typography
              className={classes.categories}
              style={{ marginTop: 18 }}
            >
              OTHERS
            </Typography>
          ) : null}
          {unPinnedList.map((note, index) => {
            return (
              <NoteBox
                note={note}
                key={index}
                collectNote={collectNote}
                onEdit={handleEditOpen}
                route={route}
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
          <NoteIcon fontSize="inherit" className={classes.icon} />
        </div>
      )}
      <div>
        <Snackbar
          open={open}
          onClose={handleClose}
          TransitionComponent={state.Transition}
          message="Note saved"
        />
      </div>
      <div>
        <Colors
          handlePopClick={handlePopClick}
          handlePopClose={handlePopClose}
          handleColorClick={handleColorClick}
          handleEditedColorClick={handleEditedColorClick}
          anchor={anchor}
        />
      </div>
      {edit ? (
        <EditNote
          onEditClose={handleEditClose}
          onEdit={setEdit}
          onCollapse={handleCollapse}
          allNotes={notes}
          handleNotes={handleNotes}
          handleNoteRemove={handleNoteRemove}
          handleOpen={handleOpen}
          handlePopClick={handlePopClick}
          handleColorClick={handleColorClick}
          handleEditedColorClick={handleEditedColorClick}
          editedColor={editedColor}
          note={noteCollect}
          handleEdit={handleEdit}
          trash={trash}
          archive={archive}
          handleNoteEdit={handleNoteEdit}
        />
      ) : null}
    </div>
  );
}

export default NoteCollapse;
