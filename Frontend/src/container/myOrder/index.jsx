import React from "react";
import { useEffect } from "react";
import Order from "../../component/myOrder";
import { orderProducts } from "../../../api/endpoints";

export default function MyOrder(){
    const [productDetails, setproductDetails] = React.useState([]);
    const [err,setErr]=React.useState(false);

    useEffect(function () {
		loadOrderProduct();
	}, []);

    async function loadOrderProduct() {
		const newProducts = await orderProducts('order placed');
		if (newProducts.status==200) {
			setproductDetails(newProducts.data);
			setErr(false);
		}else if(newProducts.status==440){
			navigate("/login");
		}
		else{
			setErr(newProducts.message);
		}
	}

    
    return(
        <Order product={productDetails} err={err} />
        )
}