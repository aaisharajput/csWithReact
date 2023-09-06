import React, { useEffect, useState } from "react";
import HomeContext from "../Context";
import { useNavigate } from "react-router-dom";
import { AddToCart, fetchProduct } from "../../../../api/endpoints";

export default function HomeState(props) {
    const {children} =props;
	const navigate=useNavigate();

	const [productDetails, setproductDetails] = useState([]);
	const [count, setCount] = useState(0);
	const [err,setErr]=useState('');
	useEffect(function () {
		onMorePress();
	}, []);

	async function onMorePress() {

		const newProducts = await fetchProduct(count);
		if (newProducts.Status==200) {
			setproductDetails([...productDetails, ...newProducts.Data]);
			setCount(count + 6);
		}else{
			setErr(newProducts.Message);

		}
	}	

	async function addCart(index){
		const result=await AddToCart(index);
		if(result.status==200){
			Swal.fire(
				'Added!!',
				'Item has been added successfully in cart.',
				'success',
			 )
		}else if(result.status==440){
			navigate('/login');
		}else{
			Swal.fire(
				'Error!!',
				"err: "+result.message,
				'error',
			 )
		}
	}

	function addToCart(index) {
		return _ => {
			addCart(index);
		}
	}

	return <HomeContext.Provider value={{err,onMorePress,productDetails,addToCart}} >{children}</HomeContext.Provider>;
}
