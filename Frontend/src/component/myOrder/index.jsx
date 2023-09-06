import getRoute from '../../server';
import styles from './style.module.css'
import Footer from '../footer';
export default function Order(prop) {
    const { err, product } = prop

    if (err) {
        return (
            <>
                <div className="row pl-5 pr-5 pb-5 w-100" >
                    <div className="col-12 col-md-12 pt-5">
                    <h2><a href='/'><i className={`${styles.arrow} fa fa-arrow-left`}></i></a>My Orders</h2>
                    </div>
                    <div className="col-12 col-md-12 d-flex justify-content-center p-5 mt-5">
                        <h4 className="p-5 mt-5 mb-5">{err}</h4>
                    </div>
                </div>
                <div className={styles.footer}> <Footer /></div>
            </>
        )
    } else {

        const prodArr = product.map(function (item, i) {
            let date=new Date(item.delivered_date).toDateString();            
            return (
                <span key={i}>
                    <div className="row pt-5 pb-5" >
                        <div className="col-12 col-md-3">
                            <img src={getRoute('/images/' + item.img)} alt={item.img} style={{ width: "60%" }} />
                        </div>
                        <div className="col-12 col-md-4" style={{ color: "black" }}>
                            <div className="row">
                                <div className="col-12">
                                    <h5>Expected Date: {date}</h5>
                                </div>
                                <div className="col-12">
                                    <p>{item.p_name}</p>
                                </div>
                                <div className="col-12">
                                    <p>{item.color}</p>
                                </div>
                                <div className="col-12">
                                    <a href={`/order_list/${item.order_id}/${item.product_id}`}><button className={`${styles.btn} btn`}>view details</button></a>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-md-5'>
                            <p>{item.p_details}</p>
                        </div>
                    </div>
                    <hr />
                </span>
            )
        })
        return (
            <>
                <div className='container'>
                    <div className='row pt-5'>
                        <h2><a href='/'><i className={`${styles.arrow} fa fa-arrow-left`}></i></a>My Orders</h2>
                    </div>
                    {prodArr}
                </div>
                <div className={styles.footer}> <Footer /></div>
            </>
        )
    }

}

