import React from "react";
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
// import { TextField } from '@mui/material';
// import { Button } from '@mui/material';
import PasswordStr from "./PasswordStr";
import { useNavigate } from 'react-router-dom';
import "../style/style.css";
import "./signUpForm.css"

const SignUpForm = ({
  history,
  onSubmit,
  onChange,
  errors,
  user,
  score,
  btnTxt,
  type,
  pwMask,
  onPwChange
}) => {
  history = useNavigate();
  return (
    <div className="loginBox">
      <h1 className="DonkeyGameTitle">DonkeyGame</h1>
      <h1>Sign Up</h1>
      {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}

      <form onSubmit={onSubmit}>
        <TextField className="textfield"
          name="username"
          label="UserName"
          value={user.username}
          onChange={onChange}
        />
        <TextField className="textfield"
          name="email"
          label="Email"
          value={user.email}
          onChange={onChange}
        />
        <TextField className="textfield"
          type={type}
          name="password"
          label="Password"
          value={user.password}
          onChange={onPwChange}
        />

        <div className="pwStrRow">
          {score >= 1 && (
            <div>
              <PasswordStr score={score} /> 
              <Button 
                className="pwShowHideBtn" 
                label={btnTxt} onClick={pwMask} 
                style={{position: 'relative', left: '50%', transform: 'translateX(-50%)'}} 
              />
            </div>
            )} 
        </div>
        <TextField className="textfield"
          type={type}
          name="pwconfirm"
          label="Confirm Password"
          value={user.pwconfirm}
          onChange={onChange}
        />
        <br />
        <Button color="primary" variant="contained"
          className="signUpSubmit"
          primary={true.toString()}
          type="submit"
          label="submit"
        >SIGN UP</Button>
      </form>
      <p>
        Already have an account? <br />
        <a href="/" >Log in here</a>
      </p>
    </div>
  );
};

export default SignUpForm;
