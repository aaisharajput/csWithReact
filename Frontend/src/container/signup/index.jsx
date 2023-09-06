import React from "react";
import SignUp from '../../component/signup';
import {signup} from '../../../api/endpoints';
import { useNavigate } from "react-router-dom";

export default function CreateAccount(){
  const navigate=useNavigate();

    const [userDetails,setUserDetails]=React.useState({
        email:"sapnadevi.1610a@gmail.com",
        password:"Sapna@123",
        username:"Sapna",
        last:"Devi",
        cnf:"Sapna@123"
    })

    const [errMsg,setErrMsg]=React.useState('');
    const [disabled, setDisabled] = React.useState(false);
    const {username,password,email,cnf,last}=userDetails
    //higher order function
    function onInputChange(key){
        return function(event){
            setUserDetails({
                ...userDetails,[key]:event.target.value
            })
        }
    }

    async function onSignupPress(){
       const result= await signup(userDetails)
       if(result.status!==200){
        setDisabled(false);
        setErrMsg(result.message);
       }
       else{
        navigate('/verify_first');
       }
    }

    function verify_field(event){
      event.preventDefault();
        if(username==""||password==""||email==""||cnf==""){
            setErrMsg("Empty field is not allowed!!");
            
          }else if(username.trim()==""||password.trim()==""||email.trim()==""||cnf.trim()=="" || last.trim()==""){
            setErrMsg("Spaces are not allowed!!");
            
          }
          else if(username.match(/\d/) || username.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]+/)){
            setErrMsg("First name should have characters only!!");
            
          }else if(last.match(/\d/) || last.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]+/)){
            setErrMsg("Last name should have characters only!!");
            
          }else if(email.match(/^\d+/) || email.match(/[!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]+/)){
            setErrMsg("Email is not valid!!");
            
          }
          else if(password.length<8){
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
            onSignupPress();
          }
    }

    return(
      <>
         <SignUp msg={errMsg} disabled={disabled} last={last} value={username}  cnf={cnf} email={email} pswd={password} onChangeLast={onInputChange("last")} onChangeCnf={onInputChange("cnf")} onChangeEmail={onInputChange("email")} onChangeUser={onInputChange("username")} onChangePswd={onInputChange("password")} onClick={verify_field}/>   
      </>
    )
}
