import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  typography: {
    borderRadius: "50%",
    padding: 20,
    margin: "7px 2px",
  },
}));

export default function Colors(props) {
  const classes = useStyles();

  const open = Boolean(props.anchor);

  return (
    <div>
      <Popover
        className={classes.popover}
        open={open}
        onClose={props.handlePopClose}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 50, left: 250 }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div>
          <Grid container>
            <Grid item sm={3}>
              <Typography
                className={classes.typography}
                style={{
                  backgroundColor: "white",
                  border: "1px solid #DADCE0",
                }}
                onClick={() => {
                  props.handleColorClick("");
                  props.handleEditedColorClick("white");
                  props.handlePopClose();
                }}
              ></Typography>
            </Grid>
            <Grid item sm={3}>
              <Typography
                className={classes.typography}
                style={{ backgroundColor: "#F28B82" }}
                onClick={() => {
                  props.handleColorClick("#F28B82");
                  props.handleEditedColorClick("#F28B82");
                  props.handlePopClose();
                }}
              ></Typography>
            </Grid>
            <Grid item sm={3}>
              <Typography
                className={classes.typography}
                style={{ backgroundColor: "#FBBC0B" }}
                onClick={() => {
                  props.handleColorClick("#FBBC0B");
                  props.handleEditedColorClick("#FBBC0B");
                  props.handlePopClose();
                }}
              ></Typography>
            </Grid>
            <Grid item sm={3}>
              <Typography
                className={classes.typography}
                style={{ backgroundColor: "#FFF475" }}
                onClick={() => {
                  props.handleColorClick("#FFF475");
                  props.handleEditedColorClick("#FFF475");
                  props.handlePopClose();
                }}
              ></Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item sm={3}>
              <Typography
                className={classes.typography}
                style={{ backgroundColor: "#FBBC0B" }}
                onClick={() => {
                  props.handleColorClick("#FBBC0B");
                  props.handleEditedColorClick("#FBBC0B");
                  props.handlePopClose();
                }}
              ></Typography>
            </Grid>
            <Grid item sm={3}>
              <Typography
                className={classes.typography}
                style={{ backgroundColor: "#CCFE90" }}
                onClick={() => {
                  props.handleEditedColorClick("#CCFE90");
                  props.handleColorClick("#CCFE90");
                  props.handlePopClose();
                }}
              ></Typography>
            </Grid>
            <Grid item sm={3}>
              <Typography
                className={classes.typography}
                style={{ backgroundColor: "#A7FEEB" }}
                onClick={() => {
                  props.handleColorClick("#A7FEEB");
                  props.handleEditedColorClick("#A7FEEB");
                  props.handlePopClose();
                }}
              ></Typography>
            </Grid>
            <Grid item sm={3}>
              <Typography
                className={classes.typography}
                style={{ backgroundColor: "#CBF0F8" }}
                onClick={() => {
                  props.handleColorClick("#CBF0F8");
                  props.handleEditedColorClick("#CBF0F8");
                  props.handlePopClose();
                }}
              ></Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item sm={3}>
              <Typography
                className={classes.typography}
                style={{ backgroundColor: "#AECBFA" }}
                onClick={() => {
                  props.handleColorClick("#AECBFA");
                  props.handleEditedColorClick("#AECBFA");
                  props.handlePopClose();
                }}
              ></Typography>
            </Grid>
            <Grid item sm={3}>
              <Typography
                className={classes.typography}
                style={{ backgroundColor: "#D7AEFB" }}
                onClick={() => {
                  props.handleColorClick("#D7AEFB");
                  props.handleEditedColorClick("#D7AEFB");
                  props.handlePopClose();
                }}
              ></Typography>
            </Grid>
            <Grid item sm={3}>
              <Typography
                className={classes.typography}
                style={{ backgroundColor: "#FDCFE8" }}
                onClick={() => {
                  props.handleColorClick("#FDCFE8");
                  props.handleEditedColorClick("#FDCFE8");
                  props.handlePopClose();
                }}
              ></Typography>
            </Grid>
            <Grid item sm={3}>
              <Typography
                className={classes.typography}
                style={{ backgroundColor: "#E8EAED" }}
                onClick={() => {
                  props.handleColorClick("#E8EAED");
                  props.handleEditedColorClick("#E8EAED");
                  props.handlePopClose();
                }}
              ></Typography>
            </Grid>
          </Grid>
        </div>
      </Popover>
    </div>
  );
}
