import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  h1: {
    textAlign: "center",
    fontSize: 23,
    fontFamily:
      "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;",
  },
  content: {
    wordBreak: "break-word",
    textAlign: "center",
    fontSize: 16.5,
  },
}));

function Settings() {
  const classes = useStyles();

  return (
    <div>
      <p className={classes.h1}>
        Hey there{" "}
        <span role="img" aria-label="waving hand">
          👋
        </span>
        <br /> Settings will be live here soon
      </p>
      <p className={classes.content}>
        Why not take a moment to drop your thoughts on the app email: &nbsp;
        <a
          href="mailto:oluwatoyosiadeleye4@gmail.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          oluwatoyosiadeleye@gmail.com
        </a>
        &nbsp; twitter: &nbsp;
        <a
          href="https://twitter.com/adekanmbitoyosi/with_replies"
          rel="noopener noreferrer"
          target="_blank"
        >
          @adlll
        </a>
      </p>
    </div>
  );
}

export default Settings;
