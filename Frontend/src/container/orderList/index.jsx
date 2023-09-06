import React from "react";
import OrderList from "../../component/order_list";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useEffect } from "react";
import {orderBillDetails,contactDetails} from '../../../api/endpoints'

export default function MyOrder(){
    const navigate=useNavigate();
    const [billDetails, setBillDetails] = React.useState([]);
    const [contactNumber, setContactDetails] = React.useState([]);
    const [err,setErr]=React.useState(false);

    const { oid,pid } = useParams();
    console.log(oid,pid)

    useEffect(function () {
		BillDetails();
	}, []);

    function goBack(){
        navigate(-1);
    }
    
    async function BillDetails() {
		const result = await orderBillDetails(oid,pid);
		if (result.status==200) {
            setBillDetails(result.data);
            const contact=await contactDetails(oid);
            if(contact.status==200)
                setContactDetails(contact.data);
            else
                setContactDetails();

            setErr(false);
		}else if(result.status==440){
			navigate("/login");
		}
		else{
			setErr(result.message);
		}
	}

    

    return(
        <OrderList onclick={goBack} details={billDetails} contact={contactNumber}/>
        )
}