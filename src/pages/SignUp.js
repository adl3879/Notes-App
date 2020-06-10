import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles((theme) => ({
  signIn: {
    textAlign: "center",
    fontSize: 30,
    fontFamily: "Helvetica",
    marginTop: 20,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 900,
    margin: "0 auto",
    [theme.breakpoints.down("xs")]: {
      maxWidth: 300,
    },
  },
  input: {
    border: "1px solid grey",
    padding: "6px 12px",
    borderRadius: 7,
    [theme.breakpoints.up("sm")]: {
      padding: "8px 16px",
    },
  },
  button: {
    [theme.breakpoints.up("sm")]: {
      height: 50,
    },
    color: "#fff",
  },
}));

function SignUp(props) {
  const classes = useStyles();

  const [userName, setUserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [exists, setExists] = React.useState(false);

  const handleSignUp = function () {
    fetch("http://localhost:3000/api/auth/signup", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: userName,
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "User is added successfully") {
          fetch("http://localhost:3000/api/auth/login", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              props.isSignedIn(true);
              localStorage.setItem("token", data.token);
              props.setDisplay(data.display);
              props.getNotes();
            });

          props.onRouteChange("notes");
          setExists(false);
        } else {
          console.log("user already exists");
          props.isSignedIn(false);
          setExists(true);
        }
      });
  };

  return (
    <div className="SignIn">
      <h1 className={classes.signIn}>SignUp</h1>
      <br />
      <form className={classes.form}>
        <InputBase
          placeholder="username"
          className={classes.input}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <br />
        <InputBase
          placeholder="email"
          type="email"
          className={classes.input}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <InputBase
          placeholder="password"
          type="password"
          className={classes.input}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {exists ? (
          <small style={{ fontSize: 15, color: "red", marginTop: 5 }}>
            user already exists
          </small>
        ) : null}
        <br />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleSignUp}
        >
          SignUp
        </Button>
        <small style={{ fontSize: 15, marginTop: 7 }}>
          already registered?{" "}
          <span
            onClick={() => {
              props.onRouteChange("signIn");
            }}
            style={{ color: "green" }}
          >
            login
          </span>
        </small>
      </form>
    </div>
  );
}

export default SignUp;
