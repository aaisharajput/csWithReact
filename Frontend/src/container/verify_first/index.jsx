import React from "react";
import VerifingOTP from '../../component/verify_first';
import {verifyOTP} from '../../../api/endpoints';
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
       const result= await verifyOTP(OTP)
       if(result.status!==200){
        setDisabled(false);
        setErrMsg(result.message);
       }
       else{
        navigate('/login');
       }
    }    
    
    return(
      <>
         <VerifingOTP msg={errMsg} disabled={disabled} onChange={onInputChange}  onClick={onVerifyPress}/>   
      </>
    )
}
