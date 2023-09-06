import styles from './style.module.css'

export default function Footer(){
    
    return(
        <div className="row p-0">
        <footer className={`col ${styles.footer}`}>
          <div className="row">
        <div className="col-md-12 col-lg-5 p-5 text-center">
          <span className={`${styles.apna} p-0`}>Apna</span> <span className={styles.bazaar}>Bazaar</span><br/>
          <p className={styles.p}>All rights reserved 2023.</p>
          <i className={`${styles.i} fa-brands fa-facebook`}></i><i className={`${styles.i} fa-brands fa-square-youtube`}></i>
          <i className={`${styles.i} fa-brands fa-linkedin`}></i><i className={`${styles.i} fa-brands fa-instagram`}></i><i className={`${styles.i} fa-brands fa-twitter`}></i>
        </div>
        <div className="col-md-12 col-lg-7 text-center" style={{paddingTop: '90px'}}>
          <a className={styles.a} href="#" >About</a><a className={styles.a} href="#">Contact</a><a className={styles.a} href="#">Privacy Policy</a><a className={styles.a} href="#">Terms and Conditions</a>
        </div>
      </div>
        </footer>
      </div>
    )
}
