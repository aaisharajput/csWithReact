import styles from './style.module.css'
import { useContext } from 'react';
import HomeContext from '../../context/home/Context';
import getRoute from '../../server';
import {setMoreDetailsAlert}  from '../alerts';

export default function Items() {
    const { productDetails,addToCart } = useContext(HomeContext);

    const prodArr = productDetails.map(function (item, i) {
        return (
            <div className="col-12 col-md-4 pt-5" key={item.product_id}>
                <div className={`${styles.card} card`}>
                    <div className="product_name">
                        <h5>{item.p_name}</h5>
                    </div>
                    <div className="img">
                        <img src={getRoute('/images/' + item.img)} className={styles.img} alt={item.p_name} />
                        <div className={`${styles.btnn} d-flex justify-content-around`}>
                          <input type="button" className="btn btn-success" onClick={addToCart(item.product_id)} value="Add To Cart" />
                            <button className={`${styles.btn} btn btn-success`} onClick={setMoreDetailsAlert(item)} >View Details</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    })
    return (
        <div className="row ">
            {prodArr}
        </div>
    )
}
