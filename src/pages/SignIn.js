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
    padding: "5px 12px",
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

function SignIn(props) {
  const classes = useStyles();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [login, setLogin] = React.useState(false);

  const handleSignUp = function () {
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
        if (data.token) {
          props.onRouteChange("notes");
          props.isSignedIn(true);
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", JSON.stringify(data.userId));
          props.setDisplay(data.display);
          props.getNotes();
          setLogin(false);
        } else {
          console.log("login failed");
          props.isSignedIn(false);
          setLogin(true);
        }
      });
  };

  return (
    <div className="SignUp">
      <h1 className={classes.signIn}>Login</h1>
      <br />
      <form className={classes.form}>
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
        <br />
        {login ? (
          <small style={{ fontSize: 15, color: "red" }}>login failed.</small>
        ) : null}
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={handleSignUp}
        >
          LOGIN
        </Button>
        <small style={{ fontSize: 15, marginTop: 7 }}>
          new here?{" "}
          <span
            onClick={() => {
              props.onRouteChange("signUp");
            }}
            style={{ color: "green" }}
          >
            signup
          </span>
        </small>
        <small
          onClick={() => {
            props.onRouteChange("notes");
          }}
          style={{ color: "red" }}
        >
          cancel
        </small>
      </form>
    </div>
  );
}

export default SignIn;
