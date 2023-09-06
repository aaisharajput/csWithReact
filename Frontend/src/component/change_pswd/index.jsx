import style from './style.module.css'


export default function ChangePassword(props){
  const {success,disabled,msg,onChangeCnf,onChangePswd,onClick}=props;

    return(
        <div className="container">
        <div className="row d-flex justify-content-center pt-5 mt-5">
            <h1 className={style.h1}>Change Password</h1>
        </div>
        <div className="row d-flex justify-content-center"> 
          {/* <% if(route=='1'){%>    */}
            {/* <form  method="post" onsubmit="return change_password();" action="/change_password_forgot" className="form p-4 text-center"> */}
          {/* <% }else{%> */}
            <form>
            {/* <form  method="post" onsubmit="return change_password();" action="/user/change_password" className={`${style.form} p-4 text-center`}> */}
            {/* <%}%> */}
                <div className="form-group form-inline justify-content-center">
                    <label htmlFor="pswd">New Password:</label>
                    <input type="password" className={`form-control ml-5 ${style.inp}`} onChange={onChangePswd} name="pwd" placeholder="Enter Password" id="pswd" required/>
                    <i className="fa-sharp fa-solid fa-eye pl-3" id="eye"></i>
                  </div> 
                <div className="form-group form-inline pt-4 justify-content-center">
                  <label htmlFor="cnf_pswd">Confirm Password:</label>
                  <input type="password" className={`form-control ml-5 ${style.inp}`} onChange={onChangeCnf} name="conf" placeholder="Enter Confirm password" id="cnf_pswd" required/>
                </div>
                 {/* <input type="email" name="email" value="<%=email%>" hidden /> */}
                  <a className={style.a} href="/">Go Back</a><br/>
                  <button type="submit" onClick={onClick} className={`${style.btn} btn pl-5 pr-5 mt-4`} disabled={disabled}>Change</button>     
                
                <p style={{color:'red'}} className="pt-3" id="error_msg">{(msg!="")?msg:'' }</p>
                 <p className="text-success pt-3">{(success!="")?success:'' }</p> 
              </form>
              <div className="row">
                <div className="col-12 col-md-4"></div>
                <div className="col-12 col-md-8">
                  <div className="row">
                    <div className="col-12 col-md-12"><p className={style.p}>*Password should have 12 or more characters!!</p></div>
                    <div className="col-12 col-md-12"><p className={style.p}>*Password should contain atleast one special symbols!!</p></div>
                    <div className="col-12 col-md-12"><p className={style.p}>*Password should contain atleast one number!!</p></div>
                    <div className="col-12 col-md-12"><p className={style.p}>*Password should contain atleast one Uppercase character!!</p></div>
                    <div className="col-12 col-md-12"><p className={style.p}>*Password should contain atleast one Lowercase character!!</p></div>
                  </div>
                
                </div>
                
              </div>
        </div>
        
    </div>
    )
}




{/* let pwdshow=document.getElementById("pswd");
          let eye=document.getElementById("eye");
          eye.addEventListener("click",function(){
            if(eye.classList.contains("fa-eye")){
              eye.classList.remove("fa-eye");
              eye.classList.add("fa-eye-slash");
              pwdshow.setAttribute("type","text");
            }else{
              eye.classList.remove("fa-eye-slash");
              eye.classList.add("fa-eye");
              pwdshow.setAttribute("type","password");
            }
          });


        function change_password(){
               let pwd=document.getElementById("pswd").value;
               let cnf_pwd=document.getElementById("cnf_pswd").value;
               let error_msg=document.getElementById("error_msg");
               let change=document.getElementById("change");
                error_msg.innerText=" ";
        
            if(pwd==""||cnf_pwd==""){
              error_msg.innerText="Empty field is not allowed!!";
              return false;
            }else if(pwd.trim()==""||cnf_pwd.trim()==""){
              error_msg.innerText="Space is not allowed!!";
              return false;
            }else if(pwd.length<8){
              error_msg.innerText="*Minimum 8 or more characters!!";
              return false;
            }else if(!pwd.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]+/)){
              error_msg.innerText="*atleast one special symbols!!";
              return false;
            }else if(!pwd.match(/\d/)){
              error_msg.innerText="*atleast one number!!";
              return false;
            }else if(!pwd.match(/[A-Z]/)){
              error_msg.innerText="*atleast one Uppercase character!!";
              return false;
            }else if(!pwd.match(/[a-z]/)){
              error_msg.innerText="*atleast one Lowercase character!!";
              return false;
            }else if(pwd!=cnf_pwd){
              error_msg.innerText="Confirm password doesn't match!!";
              return false;
            }else{
              change.disabled=true;
              return true;
            }

        }  */}