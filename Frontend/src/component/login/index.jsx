import styles from './style.module.css'
import shop from '../img/pay.jpg';
export default function Login(props){
    const {msg,disabled,value,onChange,onClick,pswd,onChangePswd}=props;

    return(
        
        <div>
        <section className={`${styles.section} pl-5`}>
            <div className="row">
                <div className="col-12">
                    <div className={`${styles.card} card`} >
                        <div className="p-md-5">
                            <div className="row justify-content-center">
                                <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                    <h1 className={`${styles.h1} text-center mb-5 mt-4`}>LOGIN</h1>
                                    <form >
                                        <div className="row mt-3">
                                            <div className="col text-left">
                                                <label htmlFor="first" className="form-label">
                                                    Email
                                                </label>
                                                <input  value={value} onChange={onChange} name="email" className="form-control" />

                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col text-left">
                                                <label htmlFor="first" className="form-label">
                                                    Password
                                                </label>
                                                <input
                                                   value={pswd} onChange={onChangePswd}
                                                    name="password"
                                                    className="form-control"

                                                    type="password"
                                                />

                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <br />
                                            <div className="col text-right">
                                            New Member? <a href="/signup">Sign up</a>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                        <div className='col-6 d-flex justify-content-center'><p className={`${styles.msg}`}>{msg}</p></div>

                                            <div className="col-6 text-right actionButtons">
                                                <input type='button' onClick={onClick} className={`${styles.btn} btn`} value='Login' disabled={disabled}/>
                                            </div>
                                            
                                        </div>
                                        <div className="row mt-3">
                                            <br />
                                            <div className="col text-right">
                                            <a href="/forgot_password" className={styles.a}>Forgot Password?</a>
                                            </div>
                                        </div>
                                        
                                    </form>
                                </div>
                                <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                    <img src={shop} className="img-fluid" alt="" />
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
        
    </div>
        
    )
}
