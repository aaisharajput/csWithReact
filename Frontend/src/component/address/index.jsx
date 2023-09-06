import styles from './style.module.css'
import Footer from '../footer';

export default function Address(props) {
    const { amount, msg, hno, city, address, state, pincode, phoneNo, alter_phoneNo, onClick,
        onChangeHno, onChangeadd1, onChangeCity, onChangeState, onChangePincode, onChangePhone, onChangePhone1 } = props;
    return (
        <>
            <section>
                <div className={`${styles.section} row pl-5`}>
                    <div className="col-12">
                        <div className={`${styles.card} card`} >
                            <div className="card-body p-md-5">
                                <div className='row'>
                                    <h2 className="text-center pb-3 pl-5 ml-5"><a href='/cart'><i className='fa fa-arrow-left text-dark'></i></a>Add Address</h2>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5">
                                        <form >
                                            <div className="row">
                                                <div className="col text-left">
                                                    <label htmlFor="houseNo" className="form-label">
                                                        House No.
                                                    </label>
                                                    <input type="text" value={hno} onChange={onChangeHno} name="houseNo" className="form-control" />

                                                </div>
                                                <div className="col text-left">
                                                    <label htmlFor="city" className="form-label">
                                                        City *
                                                    </label>
                                                    <input type="text" name="city" onChange={onChangeCity} value={city} className="form-control" />
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col text-left">
                                                    <label htmlFor="address1" className="form-label">
                                                        Present Address *
                                                    </label>
                                                    <input type="text" name="address1" onChange={onChangeadd1} value={address} className="form-control" />

                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col text-left">
                                                    <label htmlFor="state" className="form-label">
                                                        State *
                                                    </label>
                                                    <input type="text" name="state" value={state} onChange={onChangeState} className="form-control" />

                                                </div>
                                                <div className="col text-left">
                                                    <label htmlFor="zincode" className="form-label">
                                                        Pincode *
                                                    </label>
                                                    <input type="text" name="zincode" value={pincode} onChange={onChangePincode} className="form-control" />
                                                </div>
                                            </div>

                                        </form>
                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-5">
                                        <form >
                                            <div className="row mt-3">
                                                <div className="col text-left">
                                                    <label htmlFor="phone1" className="form-label">
                                                        Phone number *
                                                    </label>
                                                    <input type="tel" name="phone1" value={phoneNo} onChange={onChangePhone} className="form-control" />

                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col text-left">
                                                    <label htmlFor="phone1" className="form-label">
                                                        Alternate Phone number
                                                    </label>
                                                    <input name="phone1" value={alter_phoneNo} onChange={onChangePhone1} className="form-control" type="text" />

                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                {/* <div className={`${styles.actionButtons} col-12`} >
                                                    <input type='button' className={`${styles.btn} btn`} onClick={onClick} value='Add' />
                                                </div> */}
                                                <div className="col-12">
                                                    <p className={`${styles.msg}`}>{msg}</p>
                                                    {/* <p className={`${styles.success}`}>{success}</p> */}
                                                </div>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row pt-4" style={{ backgroundColor: '#f3edf6',width:"101%" }}>
                    <div className="col text-center p-3 d-flex justify-content-around" >
                        <h4><b>Payment Details</b></h4>
                        <h5>Items: <span id="item">{amount[0].item}</span></h5>
                        <h5>Total amount: Rs. <span id="amount">{(amount[0].amount != null) ? amount[0].amount : 0}</span></h5>
                        <button className={`btn ${styles.pay}`} onClick={onClick}>Pay Now</button>
                    </div>
                </div>
                <div className={styles.footer}> <Footer /></div>

            </section>

        </>
    )
}
