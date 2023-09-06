import getRoute from '../../server';
import styles from './style.module.css'
import Footer from '../footer';
import React from 'react';

export default function OrderList(prop) {
    const {onclick,details,contact}=prop
   console.log(contact)
   const number=contact.map(function(item,i){
    return (< span key={i}>
            {item.phone_no},
        </span>)
   })
    const billArr = details.map(function (item, i) {
        let delivered_date=new Date(item.delivered_date).toDateString();
        let order_date=new Date(item.order_date).toDateString();
        return(
            <span key={i}>
                 <div className="row pt-5 pb-5">
                    <div className="col-12 col-md-9" style={{ color: "black" }}>
                        <div className="row">
                            <div className="col-12">
                                <h3>{item.p_name}</h3>
                            </div>
                            <div className="col-12">
                                <p>{item.color}</p>
                            </div>
                            <div className="col-12">
                                <p>Price: Rs {item.price}</p>
                            </div>
                            <div className="col-12">
                                <p className='text-secondary'>Transaction Id: {item.transaction_id}<br/>
                                Seller: {item.s_name}<br/>
                                Address: {item.s_address}<br/>
                                Phone no.: {item.s_phone}</p>
                            </div>
                            
                        </div>
                    </div>
                    <div className="col-12 col-md-3">
                        <img src={getRoute('/images/' + item.img)} alt={item.img} style={{ width: "60%" }} />
                    </div>
                </div>
                <hr />
                <div className='row pt-5'>
                    <div className="col-12">
                        <p><i className={`fa fa-circle ${styles.circle}`}></i> Confirm order: <br/>&emsp;{order_date}<br/><br/><br/><i className={`fa fa-circle ${styles.circle}`}></i> Delivered date: <br/>&emsp;{delivered_date}</p>
                    </div>
                </div>

                <div className='row pt-5'>
                    <div className="col-12">
                        <h4>Shipping Details</h4>
                        <hr/>
                    </div>
                    <div className="col-12">
                        <p><i className={`fa fa-user ${styles.circle}`}></i>&emsp;{item.username}<br/><i className={`fa fa-home ${styles.circle}`}></i>&ensp;{item.address},<br/>&emsp; {item.city}, <br/>&emsp; {item.state}, {item.zipcode}<br/><i className={`fa fa-phone ${styles.circle}`}></i>&ensp;{number}<br/></p>  
                    </div>
                </div>

                <div className='row pt-5'>
                    <div className="col-12">
                        <h4>Price Details</h4>
                        <hr/>
                    </div>
                    <div className="col-6">
                        <p>list price:</p>  
                    </div>
                    <div className={`col-6 ${styles.bill}`}>
                        <p>Rs. {item.price}</p>  
                    </div>
                    <div className="col-6">
                        <p>selling price:</p>  
                    </div>
                    <div className={`col-6 ${styles.bill}`}>
                        <p>{item.seller_price}</p>  
                    </div>
                    <div className="col-6">
                        <p>quantity:</p>  
                    </div>
                    <div className={`col-6 ${styles.bill}`}>
                        <p>{item.quantity}</p>  
                    </div>
                    <div className="col-6">
                        <p>shipping fee:</p>  
                    </div>
                    <div className={`col-6 ${styles.bill}`}>
                        <p>{item.shipping_charges}</p>  
                    </div>
                    <div className="col-6">
                        <p>seller discount:</p>  
                    </div>
                    <div className={`col-6 ${styles.bill}`}>
                        <p>{item.discount}%</p>  
                    </div>
                    <div className='col-12'><hr/></div>
                    <div className="col-6">
                        <p>total amount:</p>  
                    </div>
                    <div className={`col-6 ${styles.bill}`}>
                        <p>Rs. {item.amount}</p>  
                    </div>
                    <div className='col-12'><hr/></div>
                </div>

                <div className='row pt-5'>
                    <div className="col-12">
                        <p>{item.payment_mode} {(item.payment_status==1)?'Paid':'Unpaid'}</p>
                        <hr/>
                    </div>
                </div>

            </span>
        )
    })
    return (
        <>
            <div className='container'>
                <div className='row pt-5'>
                    <h2><i className={`${styles.arrow} fa fa-arrow-left`} onClick={onclick}></i>Orders Details</h2>
                </div>

               {billArr}
            </div>
            <div className={styles.footer}> <Footer /></div>
        </>
    )
}

