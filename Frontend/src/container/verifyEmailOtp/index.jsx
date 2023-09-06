import React from "react";
import VerifingForgotOTP from '../../component/verify_first';
import {verifyEmailOTP} from '../../../api/endpoints';
import { useNavigate } from "react-router-dom";

export default function CreateAccount(){
  const navigate=useNavigate();

    const [OTP,setOTP]=React.useState("");
    const [disabled, setDisabled] = React.useState(false);
    const [errMsg,setErrMsg]=React.useState('');

    function onInputChange(event){
        setOTP(event.target.value);
    }


    async function onVerifyPress(){
      setDisabled(true);

       const result= await verifyEmailOTP(OTP)
       if(result.status!==200){
        setErrMsg(result.message);
        setDisabled(false);
       }
       else{
        navigate('/change_password');
       }
    }    
    
    return(
      <>
         <VerifingForgotOTP disabled={disabled} msg={errMsg} onChange={onInputChange}  onClick={onVerifyPress}/>   
      </>
    )
}
