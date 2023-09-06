import styles from './style.module.css'

export default function EnterEmail(props){
    const {msg,disabled,onChange,onClick}=props;
    return(
        <div className={`${styles.container} container text-center`}>
        <div className={`${styles.row} row`}>  
            <div className="col-12 col-md-12 p-0"><h1 className={styles.h1}>Forgot Password</h1></div>
            <div className="col-12 col-md-12 p-0"><h2>Enter Your Register Email</h2></div>  
            <div className="col-12 col-md-12 p-0 pt-5 d-flex justify-content-center">
                <form>
                    <input type="email" onChange={onChange} className={`form-control ${styles.inp}`} name="otp" placeholder="Enter Email" required/>
                    <div className='pt-4'><button className='btn btn-success' onClick={onClick} disabled={disabled}>Submit</button></div>
                </form>
            </div>
           
           <div className='col-12 col-md-12 p-0'><p style={{color:'red'}} className="pt-3 text-center" id="wrong">{msg}</p></div> 
        </div>
    </div>
    )
}
