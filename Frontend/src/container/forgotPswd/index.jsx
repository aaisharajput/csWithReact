import React from "react";
import ForgotPswd from '../../component/forgotPswd';
import {verifyEmail} from '../../../api/endpoints';
import { useNavigate } from "react-router-dom";

export default function CreateAccount(){
  const navigate=useNavigate();

    const [Email,setEmail]=React.useState("");
    const [disabled, setDisabled] = React.useState(false);
    const [errMsg,setErrMsg]=React.useState('');

    function onInputChange(event){
        setEmail(event.target.value);
    }


    async function onSubmitPress(event){
        event.preventDefault();
        if(Email==""){
            setErrMsg("Empty field is not allowed!!");
        }else if(Email.trim()==""){
          setErrMsg("Space is not allowed!!");
        }else if(Email.match(/^\d+/) || Email.match(/[!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]+/)){
            setErr("Email is not valid!!");
        }else{ 
            setDisabled(true);
            setErrMsg("");
            const result= await verifyEmail(Email);
            if(result.status!==200){
                setDisabled(false);
                setErrMsg(result.message);
            }
            else{
             navigate('/verifyEmailOtp');
            }
        }
    }
    
    return(
      <>
         <ForgotPswd msg={errMsg} disabled={disabled} onChange={onInputChange}  onClick={onSubmitPress}/>   
      </>
    )
}
