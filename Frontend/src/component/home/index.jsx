import styles from './style.module.css'
import Footer from '../footer';
import Intro from '../intro';
import Item from '../items';
import { useContext } from 'react';
import HomeContext from '../../context/home/Context';

export default function Home() {
	const {onMorePress,err}=useContext(HomeContext);
	return (
		<>
			<div className="container-fluid">
				<div className="row pl-5 pt-3">
					<div className="col-2 col-md-2"><p className={styles.p}>Category 1</p></div>
					<div className="col-2 col-md-2"><p className={styles.p}>Category 2</p></div>
					<div className="col-2 col-md-2"><p className={styles.p}>Category 3</p></div>
					<div className="col-2 col-md-2"><p className={styles.p}>Category 4</p></div>
					<div className="col-2 col-md-2"><p className={styles.p}>Category 5</p></div>
					<div className="col-2 col-md-2"><p className={styles.p}>Category 6</p></div>
				</div>
				<section className="item_list">
					<div className="row pt-1 pb-4">
						<Intro />
					</div>
					<div className={`row pt-5 ${styles.title}`}>
						<h3>Products You Love It.</h3>
					</div>
					<div className="row d-flex justify-content-center text-center pl-5 pb-5 pr-5" >
					<Item/>
					
					</div>

					<div className="row d-flex justify-content-center" id="empty" style={{ color: 'red' }}>
						<p>{(err)?err:""}</p>
					</div>
					<div className="row d-flex justify-content-center p-4">
						<button className={`btn ${styles.load}`} onClick={onMorePress}>Load more products</button>
					</div>
				</section>

				<Footer />
			</div>
		</>
	)
}

