import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";

import AlarmIcon from "@material-ui/icons/Alarm";
import PaletteIcon from "@material-ui/icons/Palette";
import ImageIcon from "@material-ui/icons/Image";
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";
import StarIcon from "@material-ui/icons/Star";
import StarOutlineIcon from "@material-ui/icons/StarBorder";
import ArchiveIcon from "@material-ui/icons/Archive";
import TrashIcon from "@material-ui/icons/Delete";

import Typography from "@material-ui/core/Typography";
import ContentEditable from "../ContentEditable";

const styles = (theme) => ({
  title: {
    border: "none",
    fontSize: 22,
    [theme.breakpoints.down("xs")]: {
      fontSize: 18,
    },
    width: "85%",
    fontWeight: 500,
    outline: "none",
    height: "100%",
  },
  content: {
    border: "none",
    fontSize: 18,
    [theme.breakpoints.down("xs")]: {
      fontSize: 16,
    },
    outline: "none",
    overFlowY: "auto",
    width: "100%",
    height: "100%",
  },
  save: {
    textAlign: "end",
    color: "#4B4F51",
    cursor: "pointer",
    fontSize: 20,
    marginBottom: 10,
    [theme.breakpoints.down("xs")]: {
      marginTop: -12,
      fontSize: "inherit",
      marginBottom: 5,
    },
  },
  iconSize: {
    fontSize: 25,
    [theme.breakpoints.down("xs")]: {
      fontSize: 19,
    },
  },
  flex: {
    display: "flex",
    justifyContent: "center",
  },
  iconMargin: {
    marginLeft: 55,
    [theme.breakpoints.down("xs")]: {
      marginLeft: 10,
    },
  },
  dialog: {
    marginBottom: 360,
  },
  star: {
    color: "#4B4F51",
    padding: 0,
    marginLeft: 55,
    [theme.breakpoints.down("xs")]: {
      marginLeft: 28,
    },
  },
  //modal box
  editOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "hsla(0, 0%, 89.8%, 0.52)",
  },
  mainModal: {
    width: "45%",
    height: "auto",
    margin: "auto",
    marginTop: "10%",
    zIndex: 10,
    [theme.breakpoints.down("sm")]: {
      marginTop: "37px",
      width: "100%",
    },
  },
});

let image = null;

class EditNote extends React.Component {
  constructor() {
    super();
    this.state = {
      updatedNote: {
        title: "",
        content: "",
        pinned: false,
        color: "",
      },
      openDialog: false,
      suggestions: [],
      checkedBox: [],
    };
  }

  UNSAFE_componentWillMount() {
    this.setState({
      updatedNote: {
        ...this.state.updatedNote,
        pinned: this.props.note.pinned,
        color: this.props.editedColor,
      },
    });
  }

  UNSAFE_componentWillReceiveProps() {
    this.setState({
      updatedNote: {
        ...this.state.updatedNote,
        color: this.props.editedColor
          ? this.props.editedColor
          : this.props.note.color,
      },
    });
  }

  handlePinned = () => {
    const { updatedNote } = this.state;
    this.setState({
      updatedNote: {
        ...updatedNote,
        pinned: !updatedNote.pinned,
      },
    });
  };

  handleClose = () => {
    let title = document.getElementById("title").innerText;
    let content = document.getElementById("content").innerText;

    this.props.handleNoteEdit(this.props.note, {
      title: title,
      content: content,
      pinned: this.state.updatedNote.pinned,
      color: this.state.updatedNote.color,
    });

    this.props.handleEdit(false);
    this.props.onEdit(false);

    this.props.handleEditedColorClick("");
    this.props.handleColorClick("");
  };

  //image handling
  handleImageInput = (e) => {
    image = e.target.files[0];
    console.log(image);
  };
  handlePicturePost = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  //trash
  handleTrash = (note) => {
    if (note.content) {
      this.props.handleNoteRemove("notes", "trash", note);
      this.props.handleEdit(false);
      this.props.onEdit(false);
    }
    this.props.trash.push(note);
  };

  //archive
  handleArchive = (note) => {
    if (note.content) {
      this.props.handleNoteRemove("notes", "archive", note);
      this.props.handleEdit(false);
      this.props.onEdit(false);
    }
    this.props.archive.push(note);
  };

  render() {
    const { updatedNote } = this.state;
    const { classes } = this.props;

    const paperStyle = {
      paper: {
        padding: "5px 17px 8px 17px",
        borderRadius: 2,
        backgroundColor: !this.state.updatedNote.color
          ? this.props.note.color
          : this.state.updatedNote.color,
      },
    };

    return (
      <div className={classes.editOverlay}>
        <section className={classes.mainModal}>
          <Paper style={paperStyle.paper} elevation={9}>
            <div style={{ display: "flex" }}>
              <h3 className={classes.title} id="title">
                <ContentEditable>
                  {this.props.note.title ? this.props.note.title : "Title"}
                </ContentEditable>
              </h3>
              <IconButton
                style={{
                  color: "#4B4F51",
                  padding: 0,
                  marginLeft: "auto",
                }}
                onClick={this.handlePinned}
              >
                {updatedNote.pinned ? <StarIcon /> : <StarOutlineIcon />}
              </IconButton>
            </div>

            <div className={classes.content} id="content">
              <ContentEditable>
                {this.props.note.content.split("\n").map((item, i) => {
                  return <p key={i}>{item}</p>;
                })}
              </ContentEditable>
            </div>
            <br />
            <div className={classes.flex}>
              <IconButton>
                <AlarmIcon fontSize="inherit" className={classes.iconSize} />
              </IconButton>
              <IconButton
                className={classes.iconMargin}
                onClick={this.props.handlePopClick}
              >
                <PaletteIcon fontSize="inherit" className={classes.iconSize} />
              </IconButton>
              <input
                type="file"
                id="imageInput"
                hidden="hidden"
                onChange={this.handleImageInput}
              />
              <IconButton
                className={classes.iconMargin}
                onClick={this.handlePicturePost}
              >
                <ImageIcon fontSize="inherit" className={classes.iconSize} />
              </IconButton>
              <IconButton
                className={classes.iconMargin}
                onClick={() => {
                  this.handleArchive(this.props.note);
                }}
              >
                <ArchiveIcon fontSize="inherit" className={classes.iconSize} />
              </IconButton>
              <IconButton
                className={classes.iconMargin}
                onClick={() => {
                  this.handleTrash(this.props.note);
                }}
              >
                <TrashIcon fontSize="inherit" className={classes.iconSize} />
              </IconButton>
              <IconButton className={classes.iconMargin}>
                <UndoIcon
                  fontSize="inherit"
                  style={{ opacity: 0.5, fontSize: 20 }}
                />
              </IconButton>
              <IconButton className={classes.iconMargin}>
                <RedoIcon
                  fontSize="inherit"
                  style={{ opacity: 0.5, fontSize: 20 }}
                />
              </IconButton>
            </div>
            <br />
            <Typography className={classes.save} onClick={this.handleClose}>
              Close
            </Typography>
          </Paper>
        </section>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(EditNote);
