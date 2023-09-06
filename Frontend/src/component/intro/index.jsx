import styles from './style.module.css'
import getRoute from '../../server';

export default function IntroProduct() {

    return (
        <div id="carouselControls" className={` ${styles.carousel} carousel slide`} data-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img className="d-block w-100" src={getRoute('/items/item1.jpg')} alt="First slide" />
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100" src={getRoute('/items/item2.jpg')} alt="Second slide" />
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100" src={getRoute('/items/item3.jpg')} alt="Third slide" />
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100" src={getRoute('/items/item4.jpg')} alt="Third slide" />
                </div>
            </div>
            <a className="carousel-control-prev" href="#carouselControls" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselControls" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
    )
}
