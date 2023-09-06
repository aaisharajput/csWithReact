import React, { useEffect, useState } from "react";
import styles from  "./style.module.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Nav() {
  const location=useLocation();
  // const auth=JSON.parse(localStorage.getItem('tokenDetails'));
  const [auth,setAuth]=useState(JSON.parse(localStorage.getItem('tokenDetails')));
  useEffect(function(){
    setAuth(JSON.parse(localStorage.getItem('tokenDetails')));
  },[location])
 
    return(
<nav className={`${styles.navbar} navbar navbar-expand-md`}>
  <Link to='/' className="navbar-brand">
    <span className={styles.apna}>Apna</span> <span className={styles.bazaar}>Bazaar</span>
  </Link>

  <button
    className={`${styles.navbarToggler} navbar-toggler`}
    type="button"
    data-toggle="collapse" 
    data-target="#collapsibleNavbar"
  >
    <span className={`navbar-toggler-icon ${styles.navbarTogglerIcon}`}><i className={`fa fa-bars ${styles.faBars}`}></i></span>
  </button>

  <div
    className="collapse navbar-collapse pr-3 justify-content-end"
    id="collapsibleNavbar"
  >
   { (auth!=null && auth.login && auth.token!=null)?<UserLogin user={auth.username}/>:<UserLogout/>}
    
    </div>
    </nav>
    )
}

function UserLogin(props){
  const {user}=props;
  return(
<ul className="navbar-nav pt-3">
          <li className="nav-item pr-4">
            <p className="nav-link" style={{color:'rgb(89, 87, 87)'}}>
              Welcome
              <span
                className={`${styles.link2} link2`}
                style={{color:'#951ac9',fontWeight: 600,textTransform: 'uppercase'}}
              > {user}
             </span>
            </p>
          </li>
          <li className="nav-item dropdown">
            <a
              className={`nav-link dropdown-toggle ${styles.dropdownToggle}`}
              href="#"
              id="navbardrop"
              data-toggle="dropdown"
            >
              <i className={`fa fa-user ${styles.faUser}`}></i>
            </a>
            <div className="dropdown-menu">
              <Link className="dropdown-item" to="/change_password">
                Change Password
              </Link>
              <Link className="dropdown-item" to="/cart">
                <i className="fa-sharp fa-solid fa-cart-shopping pr-2"></i>Cart
              </Link>
              <Link className="dropdown-item" to="/order">
              <i className="fa-solid fa-truck pr-2"></i>My Order
              </Link>
              <Link className="dropdown-item" to="/order_history">
                <i className="fa-solid fa-box pr-2"></i>Order History
              </Link>
            </div>
          </li>
          <li className="nav-item pr-4">
            <Link to="/logout">
              <button className="btn" type="submit">
                <span className={`${styles.link2} link2`}>Logout</span>
              </button>
            </Link>
          </li>
        </ul> 
)}

function UserLogout(){
  return(
<ul className="navbar-nav pt-3">
          <li className="nav-item pr-4">
            <Link className="nav-link" to="/cart">
              <span className={`${styles.link2} link2`}>
                <i className="fa-sharp fa-solid fa-cart-shopping pr-1"></i>Cart
              </span>
            </Link>
          </li>
          <li className="nav-item pr-4">
            <Link className="nav-link" to="/login">
              <span className={`${styles.link2} link2`}>Signin</span>
            </Link>
          </li>
          <li className="nav-item pr-4">
            <Link className="nav-link" to="/signup">
              <span className={`${styles.link2} link2`}>Signup</span>
            </Link>
          </li>
        </ul>
  )
}