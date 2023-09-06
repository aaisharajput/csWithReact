import React from "react";
import ChangePswd from '../../component/change_pswd';
import {changePassword} from '../../../api/endpoints';
import { useNavigate } from "react-router-dom";

export default function ChangePassword(){
  const navigate=useNavigate();

    const [pswd,setpswd]=React.useState({
        password:"",
        cnf:""
    })

    const [disabled, setDisabled] = React.useState(false);
    const [errMsg,setErrMsg]=React.useState('');
    const [success,setSuccessMsg]=React.useState('');

    const {password,cnf}=pswd
    //higher order function
    function onInputChange(key){
        return function(event){
            setpswd({
                ...pswd,[key]:event.target.value
            })
        }
    }


    async function onChangePress(){
       const result= await changePassword(password)
       if(result.status==200)
          setSuccessMsg(result.message);
       else if(result.status==440){
          navigate("/login");
       }
       else{
        setErrMsg(result.message);
        setDisabled(false);
       }
    }

    function verify_field(event){
      event.preventDefault();
        if(password==""|| cnf==""){
            setErrMsg("Empty field is not allowed!!");
            
          }else if(password.trim()=="" ||cnf.trim()==""){
            setErrMsg("Spaces are not allowed!!");
            
          }else if(password.length<8){
            setErrMsg("*Password should have 8 or more characters!!");
            
          }else if(!password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]+/)){
            setErrMsg("*Password should contain atleast one special symbols!!");
            
          }else if(!password.match(/\d/)){
            setErrMsg("*Password should contain atleast one number!!");
            
          }else if(!password.match(/[A-Z]/)){
            setErrMsg("*Password should contain atleast one Uppercase character!!");
            
          }else if(!password.match(/[a-z]/)){
            setErrMsg("*Password should contain atleast one Lowercase character!!");
          }
          else if(password!=cnf){
            setErrMsg("Confirm password doesn't match!!");
          }else{
            setErrMsg("");
            setDisabled(true);
            onChangePress();
          }
    }

    return(
      <>
         <ChangePswd msg={errMsg} disabled={disabled} success={success} onChangeCnf={onInputChange("cnf")} onChangePswd={onInputChange("password")} onClick={verify_field}/>   
      </>
    )
}
