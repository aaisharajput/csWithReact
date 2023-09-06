import React from "react";
import { useState } from "react";

import { useCallback } from "react";
import useRazorpay from "react-razorpay";

import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import CartContext from '../../context/cart/Context';
import AddressComponent from '../../component/address';
import {deliveryLocation, updatePaymentStatus} from '../../../api/endpoints';

export default function AddAddress(){
  const navigate=useNavigate();
  const { amount } = useContext(CartContext);
    const [addressDetails,setAddress]=useState({
        hno:'',
        city:'',
        address:'',
        state:'',
        pincode:'',
        phoneNo:'',
        alter_phoneNo:'',
    });
    const [errorMsg,setErrorMsg]=useState('');

    const {hno,city,address,state,pincode, phoneNo,alter_phoneNo}=addressDetails;

    function onInputChange(key){
        return function(event){
            setAddress({
                ...addressDetails,[key]:event.target.value
            })
        }
    }

    async function verify(event){
        event.preventDefault();
        if(city==""||address==""||state==""||pincode==""||phoneNo==""){
            setErrorMsg("Enter the required field");
        }else if(city.trim()==""||address.trim()==""||state.trim()==""||pincode.trim()==""||phoneNo.trim()==""){
          setErrorMsg("Space is not allowed!!");
          }
          else if(phoneNo.length!=10 ){
            setErrorMsg("Enter a valid 10 digit phone number!!");
          }else if(phoneNo.match(/[a-zA-Z]/)){
            setErrorMsg("Enter a valid phone number!!");
          }else{ 
            setErrorMsg("");
           await onAddPress();
          }
    }

    async function onAddPress(){
       const result= await deliveryLocation(addressDetails)
       if(result.status==200){
        handlePayment(parseInt(result.message));
      }else if(result.status==440){
        navigate("/login");
      }
       else{
        setErrorMsg(result.message);
       }
    }

    async function UpdatePaymentDetails(details){
      const response=await updatePaymentStatus(details);
      if(response.status==200){
        Swal.fire({
          title: "Order placed",
          text: "Order Transaction Id: "+details.transactionID,
          icon: 'success',
        }).then(() => {
            navigate("/order");
          })
      }else if(response.status==440){
        navigate("/login");
      }
      else{
        Swal.fire({
          title: "Error",
          text: response.message,
          icon: 'error',
        });
      }
    }

  const [Razorpay] = useRazorpay();

  const handlePayment = useCallback((addressID) => {

    const user=JSON.parse(localStorage.getItem("tokenDetails"));
    var options = {
        "key": "rzp_test_KKft3rAtwVj4hA",
        "amount": "10000", // 2000 paise = INR 20
        "name": "sapna",
        "description": "Total Amount",
        "image": "../img/default.svg",
        "handler": function(response) {
          const transactionDetails={
            transactionID:response.razorpay_payment_id,
            addressID:addressID,
            paymentStatus:1,
            paymentMode:"Online",
            amount:amount[0].amount
          }

          UpdatePaymentDetails(transactionDetails);

        },
        "prefill": {
            "name": "Sapna Devi",
            "email": "sapnadevi.1610a@gmail.com"
        },
        "notes": {
            "address": "Hello World"
        },  
        "theme": {
            "color": "#149f92"
        }
    };
    options.amount = amount[0].amount*100;
    options.name = user.username;
    options.prefill.name = user.username;
    options.prefill.email = user.email;
    const rzpay = new Razorpay(options);
    rzpay.open();
  }, [Razorpay]);

    return(
        <>
           <AddressComponent amount={amount} msg={errorMsg} hno={hno} city={city} address={address} state={state} pincode={pincode} phoneNo={phoneNo} alter_phoneNo={alter_phoneNo} onChangeHno={onInputChange("hno")} onChangeadd1={onInputChange("address")} onChangeCity={onInputChange("city")} onChangeState={onInputChange("state")} onChangePincode={onInputChange("pincode")} onChangePhone={onInputChange("phoneNo")} onChangePhone1={onInputChange("alter_phoneNo")} onClick={verify}/>   
        </>
      )
}