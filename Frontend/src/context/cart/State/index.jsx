import React from "react";
import { useEffect } from "react";
import CartContext from "../Context";
import { cartItems,deleteProducts,amountPay,IncDescQuantity,sellerList } from "../../../../api/endpoints";
import { useNavigate } from "react-router-dom";

export default function CartState(props){
	const navigate=useNavigate();
    const {children} =props;
    
    const [productDetails, setproductDetails] = React.useState([]);
	const [seller, setsellerDetails] = React.useState([]);
	const [amount, setAmount] = React.useState([{item:0,amount:0}]);
    const [err,setErr]=React.useState(false);

	useEffect(function () {
		loadCartProduct();
		amountToPay();
		sellerListDetails();
	}, []);

	async function loadCartProduct() {
		const newProducts = await cartItems();
		if (newProducts.Status==200) {
			setproductDetails(newProducts.Data);
			setErr(false);
		}else if(newProducts.Status==440){
			navigate("/login");
		}
		else{
			setErr(newProducts.Message);
		}
	}	

	async function amountToPay() {
		const amountDetails = await amountPay();
		if (amountDetails.Status==200) {
			setAmount(amountDetails.Data);
		}else if(amountDetails.Status==440){
			navigate("/login");
		}
		else{
			setErr(amountDetails.Message);
		}
	}

	async function sellerListDetails() {
		const sellerDetails = await sellerList();
		if (sellerDetails.status==200) {
			setsellerDetails(sellerDetails.data);
		}else if(sellerDetails.status==440){
			navigate("/login");
		}
		else{
			setErr(sellerDetails.message);
		}
	}

    function deleteCart(index,key){

		Swal.fire({
            title: 'Are you sure?',
            text: "You want to delete it!!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
         }).then(async(result) => {
            if (result.isConfirmed) {
				const result=await deleteProducts(index);
				if(result.status==200){
					Swal.fire(
						'Deleted!',
						'Item has been deleted successfully.',
						'success',
					 )
					setproductDetails(productDetails.filter(function(item,i){
						return i!==key;
					}));
		
					if(productDetails.length==1)
						setErr("Cart is Empty!!");
					amountToPay();
				}else if(result.status==440){
					navigate("/login");
				}
				else{
					Swal.fire({
                        title: "Error Occured!!",
                        text: result.message,
                        icon: 'error',
                     })
				}
            }
            })
	}

    function deleteFromCart(index,key) {
		return _ => {
			deleteCart(index,key);
		}
	}

	async function changeQuantity(cart_id,operation){
		const result=await IncDescQuantity(cart_id,operation);
		if(result.status==200 || result.status==100){
			loadCartProduct();
			amountToPay();
		}else if(result.status==440){
			navigate("/login");
		}else{
			Swal.fire({
				title: 'Error',
        	    text: result.message,
            	icon: 'error',
			})
		}
	}

	function updateQuantity(index,operation){
		return _=>{
			changeQuantity(index,operation)
		}
	}

    return(
        <CartContext.Provider value={{err,amount,productDetails,deleteFromCart,updateQuantity,seller}}>{children}</CartContext.Provider>
        )

} 
