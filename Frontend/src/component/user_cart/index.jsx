import styles from './style.module.css'
import Footer from '../footer';
import CartProduct from "../cart";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import CartContext from '../../context/cart/Context';

export default function Cart(){
  const {err,amount}=useContext(CartContext);
    return(
        <div className="container-fluid">
   <div className="row pt-5 pl-5 pt-3">
      <div className="col-12 col-md-12">
         <h3><a href="/"><i className={`${styles.i} fa-sharp fa-solid fa-arrow-left text-dark`}></i></a><span className={styles.myCart}>My Cart</span></h3>
      </div>
   </div>
   <div className="row pl-5 pr-5 pb-5" >
   {(err)?<div className="col-12 col-md-12 d-flex justify-content-center p-5 mt-5">
               <h4 className="p-5 mt-5 mb-5">{err}</h4>      
            </div>:<CartProduct/>
   }

   </div>
   <div className="row" style={{backgroundColor: '#f3edf6'}}>
      <div className="col text-center p-3 d-flex justify-content-around" >
          <h4><b>Payment Details</b></h4>
          <h5>Items: <span id="item">{amount[0].item}</span></h5>
          <h5>Total amount: Rs. <span>{(amount[0].amount!=null)?amount[0].amount:0}</span></h5>
         <Link to="/address"><button className={`btn ${styles.pay}`} disabled={(amount[0].amount==null)?true:false}>Pay Now</button></Link>
      </div>
  </div>
    <Footer/>
  </div>
    )
}


{/* <nav>
  <div class="nav nav-tabs" id="nav-tab" role="tablist">
    <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Home</a>
    <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Profile</a>
    <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Contact</a>
  </div>
</nav>
<div class="tab-content" id="nav-tabContent">
  <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">...</div>
  <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">...</div>
  <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">...</div>
</div> */}

