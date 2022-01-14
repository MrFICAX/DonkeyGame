import React from "react";
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import "../style/style.css";
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
          floatingLabelText="Username"
          value={user.username}
          onChange={onChange}
          errorText={errors.username}
        />
        <TextField
          type={type}
          name="password"
          label="Password"
          className = "textfield"
          floatingLabelText="Password"
          value={user.password}
          onChange={onPwChange}
          errorText={errors.password}
        />
        <br />
        <br />
        <Button variant = "contained"
          className="loginSubmit"
          primary={true}
          type="submit"
          label="submit"
        >LOG IN
        </Button>
      </form>
      <p>
        Don't have an account? <br />
        <a href="/signup" >Sign up here</a>
      </p>
    </div>
  );
};

export default LoginForm;
