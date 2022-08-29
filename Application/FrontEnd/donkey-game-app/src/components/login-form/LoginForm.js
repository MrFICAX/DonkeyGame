import React from "react";
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import "../../style/style.css";
// import RaisedButton from "material-ui/RaisedButton";
// import TextField from "material-ui/TextField";
import "./loginForm.css"
const LoginForm = ({
  history,
  onSubmit,
  onChange,
  errors,
  user,
  type,
  onPwChange
}) => {
  return (
    <div className="loginBox">
      <h1 className="DonkeyGameTitle">DonkeyGame</h1>
      <h2>Login</h2>
      {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}

      <form onSubmit={onSubmit}>
        <TextField
          name="username"
          label="UserName"
          className="textfield"
          value={user.username}
          onChange={onChange}
        />
        <TextField
          type={type}
          name="password"
          label="Password"
          className="textfield"
          value={user.password}
          onChange={onPwChange}
        />
        <br />
        <br />
        <Button variant="contained"
          className="loginSubmit"
          color="primary"
          primary={true.toString()}
          type="submit"
          label="submit"
        >LOG IN
        </Button>
      </form>
      <h4>
        Don't have an account? <br />
        <a href="/signup" >Sign up here</a>
      </h4>
    </div>
  );
};

export default LoginForm;
