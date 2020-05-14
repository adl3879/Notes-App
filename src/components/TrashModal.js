import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  title: {
    border: "none",
    fontSize: 22,
    [theme.breakpoints.down("xs")]: {
      fontSize: 17,
    },
    width: "85%",
    fontWeight: 300,
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

class TrashModal extends React.Component {
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

  handleDelete = () => {
    const { onTrashDelete } = this.props;
    onTrashDelete(this.props.trashed);
    this.props.handleTrashModalClose();
    this.props.handleTrashPop(false);
  };

  handleRestore = () => {
    const { onTrashRestore } = this.props;
    onTrashRestore(this.props.trashed);
    this.props.handleTrashModalClose();
    this.props.handleTrashPop(false);
  };

  render() {
    const { classes } = this.props;
    const paperStyle = {
      paper: {
        padding: "5px 17px 8px 17px",
        borderRadius: 7,
        backgroundColor: this.props.trashed.color
          ? this.props.trashed.color
          : "white",
      },
    };

    return (
      <div className={classes.editOverlay}>
        <section className={classes.mainModal}>
          <Paper style={paperStyle.paper} elevation={9}>
            <div style={{ display: "flex" }}>
              {this.props.trashed.title ? (
                <h3 className={classes.title}>{this.props.trashed.title}</h3>
              ) : (
                <Typography
                  variant="h5"
                  className={classes.title}
                  style={{ color: "#8C8C8C" }}
                >
                  Title
                </Typography>
              )}
            </div>

            <div style={{ outline: "none" }} className={classes.content}>
              {this.props.trashed.content.split("\n").map((item, i) => {
                return <p key={i}>{item}</p>;
              })}
            </div>
            <br />
            <div className={classes.options}>
              <Typography
                className={classes.save}
                onClick={this.handleDelete}
                style={{ color: "red" }}
              >
                Delete
              </Typography>
              <Typography className={classes.save} onClick={this.handleRestore}>
                Restore
              </Typography>
              <Typography
                className={classes.save}
                onClick={() => {
                  this.props.handleTrashModalClose();
                  this.props.handleTrashPop(false);
                }}
              >
                Close
              </Typography>
            </div>
          </Paper>
        </section>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(TrashModal);
