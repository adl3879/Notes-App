import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";

import AlarmIcon from "@material-ui/icons/Alarm";
import PaletteIcon from "@material-ui/icons/Palette";
import ImageIcon from "@material-ui/icons/Image";
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";
import StarIcon from "@material-ui/icons/Star";
import StarOutlineIcon from "@material-ui/icons/StarBorder";

import Typography from "@material-ui/core/Typography";

//import Thumbtack from "../thumbtack.svg";

const styles = (theme) => ({
  title: {
    border: "none",
    fontSize: 22,
    [theme.breakpoints.down("xs")]: {
      fontSize: 17,
    },
    width: "85%",
    outline: "none",
  },
  note: {
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
    justifyContent: "space-around",
  },
  iconMargin: {
    marginLeft: 55,
    [theme.breakpoints.down("xs")]: {
      marginLeft: 17,
    },
  },
  dialog: {
    marginBottom: 360,
  },
  star: {
    color: "#4B4F51",
    padding: 12,
    marginLeft: 35,
    [theme.breakpoints.down("xs")]: {
      marginLeft: 2,
    },
  },
});

//let labelList = [];
let reducedLabel = [];
let image = null;

class Notes extends React.Component {
  constructor() {
    super();
    this.state = {
      notes: {
        title: "",
        content: "",
        pinned: false,
        labels: [],
        color: "",
      },
      openDialog: false,
      suggestions: [],
      checkedBox: [],
    };
  }

  UNSAFE_componentWillReceiveProps() {
    this.setState({
      notes: {
        ...this.state.notes,
        color: this.props.color,
      },
    });
  }

  handleChange = (e) => {
    this.setState({
      notes: {
        ...this.state.notes,
        [e.target.name]: e.target.value,
      },
    });
  };

  handlePinned = () => {
    const { notes } = this.state;
    this.setState({
      notes: {
        ...notes,
        pinned: !notes.pinned,
      },
    });
  };

  handleLabel = () => {
    const { notes } = this.state;
    this.setState({
      notes: {
        ...notes,
        labels: [...notes.labels, "testing"],
      },
      openDialog: true,
    });
  };

  handleSave = () => {
    const { handleNotes, onCollapse, handleOpen } = this.props;
    const { notes } = this.state;
    if (notes.content) {
      handleNotes(notes);
      handleOpen(true);
    }
    onCollapse();
  };

  handleLabelSearch = (e) => {
    const value = e.target.value;
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions = reducedLabel.sort().filter((v) => regex.test(v));
    }
    this.setState({
      suggestions,
    });
  };

  //Dialog box
  handleClose = () => {
    this.setState({
      openDialog: false,
    });
  };

  handleCheckBox = (label) => {
    const { checkedBox } = this.state;
    this.setState({
      checkedBox: [...checkedBox, label],
    });
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

  render() {
    const { classes } = this.props;

    const { notes } = this.state;
    const paperStyle = {
      paper: {
        marginTop: 23,
        marginBottom: 23,
        padding: "5px 17px 8px 17px",
        borderRadius: 10,
        backgroundColor: this.props.color ? this.props.color : "white",
      },
    };

    return (
      <div>
        <Paper style={paperStyle.paper} elevation={9}>
          {/* {image ? <img src={image.name} alt="header" /> : null} */}
          <div>
            <InputBase
              className={classes.title}
              placeholder="Title"
              multiline
              name="title"
              onChange={this.handleChange}
            />
            <IconButton className={classes.star} onClick={this.handlePinned}>
              {notes.pinned ? (
                <StarIcon fontSize="inherit" className={classes.iconSize} />
              ) : (
                <StarOutlineIcon
                  fontSize="inherit"
                  className={classes.iconSize}
                />
              )}
            </IconButton>
          </div>
          <br />
          <div>
            <InputBase
              className={classes.note}
              placeholder="Take a note..."
              multiline
              name="content"
              onChange={this.handleChange}
            />
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
            <IconButton className={classes.iconMargin}>
              <UndoIcon
                fontSize="inherit"
                style={{
                  fontSize: 20,
                  opacity: 0.5,
                }}
              />
            </IconButton>
            <IconButton className={classes.iconMargin}>
              <RedoIcon
                fontSize="inherit"
                style={{ fontSize: 20, opacity: 0.5 }}
              />
            </IconButton>
          </div>
          <br />
          <Typography className={classes.save} onClick={this.handleSave}>
            Save
          </Typography>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Notes);
