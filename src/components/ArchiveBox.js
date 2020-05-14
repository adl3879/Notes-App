import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: "10px 0",
    borderRadius: 10,
    border: "1px solid black",
    padding: 16,
  },
  item: {
    backgroundOpacity: 0.5,
    padding: "2px 10px",
    borderRadius: 20,
    marginRight: 10,
    fontSize: 12,
  },
  title: {
    [theme.breakpoints.down("xs")]: {
      fontSize: 18,
    },
    color: "black",
    fontWeight: 540,
    marginBottom: 11,
  },
  content: {
    [theme.breakpoints.down("xs")]: {
      fontSize: 16,
    },
    fontSize: 20,
    color: "black",
    fontWeight: 300,
    marginBottom: 12,
  },
}));

function ArchiveBox({
  note,
  handleArchiveModalOpen,
  collectArchive,
  openDrawer,
}) {
  const classes = useStyles();

  return (
    <div
      onClick={() => {
        if (!openDrawer) {
          handleArchiveModalOpen();
          collectArchive(note);
        } else {
          return;
        }
      }}
    >
      <Paper
        elevation={0}
        className={classes.paper}
        style={{
          backgroundColor: note.color ? note.color : "white",
          border:
            note.color && note.color !== "white"
              ? "1px solid #fff"
              : "1px solid #DADCE0",
        }}
      >
        {note.title ? (
          <Typography variant="h5" className={classes.title}>
            {note.title}
          </Typography>
        ) : (
          <Typography
            variant="h5"
            className={classes.title}
            style={{ color: "#8C8C8C" }}
          >
            Title
          </Typography>
        )}
        <div className={classes.content}>
          {note.content.split("\n").map((item, i) => {
            return <p key={i}>{item}</p>;
          })}
        </div>
      </Paper>
    </div>
  );
}

export default ArchiveBox;
