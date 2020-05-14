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
import TrashIcon from "@material-ui/icons/Delete";

import Typography from "@material-ui/core/Typography";
import ContentEditable from "../ContentEditable";

const styles = (theme) => ({
  title: {
    border: "none",
    fontSize: 22,
    [theme.breakpoints.down("xs")]: {
      fontSize: 17,
    },
    width: "85%",
    fontWeight: 500,
    outline: "none",
  },
  content: {
    border: "none",
    fontSize: 18,
    [theme.breakpoints.down("xs")]: {
      fontSize: 15,
    },
    outline: "none",
    overFlowY: "scroll",
    width: "100%",
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
    justifyContent: "space-between",
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
  editOverlay: {
    top: 0,
    left: 0,
    zIndex: 10,
    width: "100vw",
    height: "100vh",
    position: "fixed",
    backgroundColor: "hsla(0, 0%, 89.8%, 0.52)",
  },
  mainModal: {
    width: "45%",
    margin: "auto",
    marginTop: "10%",
    [theme.breakpoints.down("sm")]: {
      marginTop: "37px",
      width: "100%",
    },
  },
  options: {
    display: "flex",
    justifyContent: "space-between",
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
        pinned: this.props.archived.pinned,
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
          : this.props.archived.color,
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
    let title = this.props.archived.title
      ? document.getElementById("title").innerText
      : "";
    let content = document.getElementById("content").innerText;

    this.props.handleArchiveEdit(this.props.archived, {
      title: title,
      content: content,
      pinned: this.state.updatedNote.pinned,
      color: this.state.updatedNote.color,
    });

    this.props.handleArchiveModalClose(false);
    this.props.handleArchivePop(false);

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
      this.props.handleNoteRemove("arc", "trash", note);
      this.props.handleArchiveModalClose(false);
      this.props.handleArchivePop(false);
    }
    this.props.trash.push(note);
  };

  handleRestore = () => {
    const { onArchiveRestore } = this.props;
    onArchiveRestore(this.props.archived);
    this.props.handleArchiveModalClose();
    this.props.handleArchivePop(false);
  };

  render() {
    const { updatedNote } = this.state;
    const { classes } = this.props;
    const paperStyle = {
      paper: {
        padding: "5px 17px 8px 17px",
        borderRadius: 7,
        backgroundColor: !this.state.updatedNote.color
          ? this.props.archived.color
          : this.state.updatedNote.color,
      },
    };

    return (
      <div className={classes.editOverlay}>
        <section className={classes.mainModal}>
          <Paper style={paperStyle.paper} elevation={9}>
            <div style={{ display: "flex" }}>
              {this.props.archived.title ? (
                <h3 className={classes.title} id="title">
                  <ContentEditable>{this.props.archived.title}</ContentEditable>
                </h3>
              ) : (
                <Typography
                  variant="h5"
                  className={classes.title}
                  style={{ color: "#8C8C8C" }}
                >
                  Title
                </Typography>
              )}
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
                {this.props.archived.content.split("\n").map((item, i) => {
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
                  this.handleTrash(this.props.archived);
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
            <div className={classes.options}>
              <Typography className={classes.save} onClick={this.handleRestore}>
                Restore
              </Typography>
              <Typography className={classes.save} onClick={this.handleClose}>
                Close
              </Typography>
            </div>
          </Paper>
        </section>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(EditNote);
