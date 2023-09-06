import styles from './style.module.css'

export default function VerifyMsg(props){
    const {msg,disabled,onChange,onClick}=props;
    return(
        <div className={`${styles.container} container text-center`}>
        <div className={`${styles.row} row`}>  
            <div className="col-12 col-md-12 p-0"><h1 className={styles.h1}>Verify Account</h1></div>
            <div className="col-12 col-md-12 p-0"><h2>Recover Password. OTP is send on your email.</h2></div>
            <div className="col-12 col-md-12 p-0"><h2>Enter OTP to verify your account.</h2></div>  
            <div className="col-12 col-md-12 p-0 pt-5 d-flex justify-content-center"><input type="text" onChange={onChange} className={`form-control w-25 ${styles.inp}`} name="otp" placeholder="Enter OTP" required/></div>
            <div className='col-12 col-md-12 pt-3'><button className='btn btn-success' disabled={disabled} onClick={onClick}>Submit</button></div>
            <div className="col-12 col-md-12 p-0"> <p style={{color:'red'}} className="pt-3" id="wrong">{msg}</p></div> 
        </div>
    </div>
    )
}
