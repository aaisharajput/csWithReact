import React from "react";
import SignIn from '../../component/login';
import { login } from '../../../api/endpoints';
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = React.useState({
    username: "Guest",
    email: "sapnadevi.1610a@gmail.com",
    password: "Sapna@123",
  })
  const [errorMsg, setErrorMsg] = React.useState('');
  const [disabled, setDisabled] = React.useState(false);
  const { email, password } = userDetails
  //higher order function
  function onInputChange(key) {
    return function (event) {
      setUserDetails({
        ...userDetails, [key]: event.target.value
      })
    }
  }

  async function verify(event) {
    event.preventDefault();
    // event.currentTarget.disabled = false;
    if (password == "" || email == "") {
      setErrorMsg("Empty field is not allowed!!");
    } else if (password.trim() == "" || email.trim() == "") {
      setErrorMsg("Space is not allowed!!");
    }
    else if (password.length < 8) {
      setErrorMsg("Password should be 8 or more characters!!");
    } else {
      setErrorMsg("");
      setDisabled(true);
      await onLoginPress();
    }
  }

  async function onLoginPress() {
    const result = await login(userDetails)
    if (result.status == 200)
      navigate('/');
    else if (result.status == 100) {
      navigate('/verify_first');
    } else {
      setDisabled(false);
      setErrorMsg(result.message);
    }
  }

  return (
    <>
      <SignIn msg={errorMsg} disabled={disabled} value={email} pswd={password} onChange={onInputChange("email")} onChangePswd={onInputChange("password")} onClick={verify} />
    </>
  )
}

