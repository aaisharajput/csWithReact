const URL="https://localhost:44394/api";
// const URL="http://localhost:3000";

// export async function home() {
//     // let result = localStorage.getItem('tokenDetails');
//     //  result = JSON.parse(result);

//     //  const payload = {
//     //      token: result.token,
//     //      login: result.login,
//     //  };
    
//     const response = await fetch(URL+'/User/productList', {
//         method: "POST",
//         headers: {
//             Accept: 'application/json',
//             Authorization: 'Bearer YOUR_TOKEN',
//             "Content-Type": "application/json",
//         },
//         mode:"cors",
//       //  body: JSON.stringify(payload),
//     })

//     let rsult = await response.json();

//     //  localStorage.setItem('tokenDetails', rsult);
//     //  rsult = JSON.parse(rsult);
//     return rsult;
// }

export async function login(data) {
    const payload = {
        username: data.username,
        email:data.email,
        password: data.password,
    };
    const response = await fetch(URL+'/Visitor/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
    let result = await response.json();
    localStorage.setItem('tokenDetails', JSON.stringify({token:result.Token,username:result.Username,login:result.Login,email:result.Email}));

    return {status:result.Status,message:result.Message};
}

// export async function checkAuth() {
//     try {
//         const result = JSON.parse(localStorage.getItem('tokenDetails'));

//         const payload = {
//             token: result.token
//         };

//         const response = await fetch(URL+/visitor/verifytoken', {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(payload),
//         });
//         return response.status;
//     } catch (e) {
//         console.log(e);
//     }

// }

export async function verifyEmail(email){
    const payload = {
        username:"Guest",
        email:email
    };
    const response = await fetch(URL+'/Visitor/forgotPassword', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })

    let result = await response.json();
    localStorage.setItem('tokenDetails', JSON.stringify({token:result.Token,login:result.Login}));
    return {
        status:result.Status,
        message:result.Message
    }
}

export async function signup(data) {
    const payload = {
        username: data.username+" "+data.last,
        email: data.email,
        password: data.password
    };
    const response = await fetch(URL+'/Visitor/signup', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })

    let result = await response.json();
    localStorage.setItem('tokenDetails', JSON.stringify({token:result.Token,login:result.Login}));

    return {
        status: result.Status,
        message:result.Message,
    };
}

export async function verifyOTP(otp){
    const data = JSON.parse(localStorage.getItem('tokenDetails'));
    const payload = {
        token: data.token,
        otp: otp
    };

    const response = await fetch(URL+'/Visitor/verifyOtp', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })

    let result=await response.json();
    return {
            status:result.Status,
            message:result.Message
           }
}

export async function verifyEmailOTP(otp){
    const data = JSON.parse(localStorage.getItem('tokenDetails'));
    const payload = {
        token: data.token,
        otp: otp
    };

    const response = await fetch(URL+'/Visitor/verifyEmailOtp', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })

    let result=await response.json();
    return {
            status:result.Status,
            message:result.Message
           }
}

export function logout() {
    localStorage.removeItem("tokenDetails");
}

export async function fetchProduct(Limit) {
    const payload = { Limit };
    const response = await fetch(URL+'/User/loadProduct', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
    const result = await response.json();    
    console.log(result.Data);
    return result;
}

export async function fetchSingleProduct(id) {
    const payload = {
        id: id
    };
    const response = await fetch(URL+'/User/productDetails', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
    let result = await response.text();
    result = JSON.parse(result);
    return result;
}

export async function changePassword(password) {
    const data = JSON.parse(localStorage.getItem('tokenDetails'));
    const payload = {
        password,
        token:data.token
    };
    const response = await fetch(URL+'/User/changePswd', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
    let result = await response.json();
    return {
        status:result.Status,
        message:result.Message
    };
}

export async function cartItems() {
    
    const tokenDetails = JSON.parse(localStorage.getItem('tokenDetails'));
    const payload = {
        token: tokenDetails.token
    };
    const response = await fetch(URL+'/User/cart', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
    let result = await response.json();
    return result;
}

export async function orderProducts(status) {
    
    const tokenDetails = JSON.parse(localStorage.getItem('tokenDetails'));
    const payload = {
        token: tokenDetails.token,
        orderStatus:status
    };
    const response = await fetch(URL+'/User/myorder', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
    let result = await response.json();
    return {
        status:result.Status,
        message:result.Message,
        data:result.Data
    };
}

export async function orderBillDetails(oid,pid) {
    
    const tokenDetails = JSON.parse(localStorage.getItem('tokenDetails'));
    const payload = {
        token: tokenDetails.token,
        orderId:oid,
        productId:pid
    };
    const response = await fetch(URL+'/User/orderBillDetails', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
    let result = await response.json();
    return {
        status:result.Status,
        message:result.Message,
        data:result.Data
    };
}

export async function contactDetails(oid) {
    
    const tokenDetails = JSON.parse(localStorage.getItem('tokenDetails'));
    const payload = {
        token: tokenDetails.token,
        orderId:oid
        };
    const response = await fetch(URL+'/User/contactDetails', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
    let result = await response.json();
    return {
        status:result.Status,
        message:result.Message,
        data:result.Data
    };
}

export async function amountPay(){
    const tokenDetails = JSON.parse(localStorage.getItem('tokenDetails'));
    const payload = {
        token: tokenDetails.token
    };
    const response = await fetch(URL+'/User/amountToPay', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
    let result = await response.json();
    return result;
}

export async function sellerList(){
    const tokenDetails = JSON.parse(localStorage.getItem('tokenDetails'));
    const payload = {
        token: tokenDetails.token
    };
    const response = await fetch(URL+'/User/sellerList', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
    let result = await response.json();
    return {
        status:result.Status,
        message:result.Message,
        data:result.Data
    };
}

export async function deliveryLocation(data){
    const tokenDetails = JSON.parse(localStorage.getItem('tokenDetails'));
    const payload = {
        token: tokenDetails.token,
        city:data.city,
        address:data.hno+" "+data.address,
        state:data.state,
        pincode:data.pincode,
        phoneNumber:data.phoneNo,
        alterPhoneNumber:data.alter_phoneNo,
    };
    const response = await fetch(URL+'/User/userAddress', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
    let result = await response.json();
    return {
        status:result.Status,
        message:result.Message
    };
}

export async function updatePaymentStatus(data){
    
    const tokenDetails = JSON.parse(localStorage.getItem('tokenDetails'));
    const payload = {
        token: tokenDetails.token,
        transactionId:data.transactionID,
        addressId:data.addressID,
        paymentStatus:data.paymentStatus,
        paymentMode:data.paymentMode,
        amount:data.amount
    };
    const response = await fetch(URL+'/User/orderDetails', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
    let result = await response.json();
    return {
        status:result.Status,
        message:result.Message
    };
}

export async function userDetail(counter) {
    const payload = {
        counter: counter
    };
    const response = await fetch(URL+'/user/user_detail', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
    let result = await response.text();
    result = JSON.parse(result);
    return {
        result,
    };
}

export async function AddToCart(id) {
    const token=JSON.parse(localStorage.getItem('tokenDetails'));
    if(token!=null){
        const payload = {
            productId: id,
            token:token.token
        };
        const response = await fetch(URL+'/User/addToCart', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
        let result = await response.json();
        return {
            status:result.Status,
            message:result.Message
        };
    }else{
        return{
            status:100,
            message:"Token is empty"
        }
    }
    
}

export async function IncDescQuantity(cart_id,operation) {
    const token=JSON.parse(localStorage.getItem('tokenDetails'));
    const payload = {
        token:token.token,
        cartId: cart_id,
        operation:operation
    };
    const response = await fetch(URL+'/user/changeQuantity', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
    let result = await response.json();
    return {
        status:result.Status,
        message:result.Message,
    };
}

export async function deleteProducts(id) {
    const tokenDetails = JSON.parse(localStorage.getItem('tokenDetails'));

    if(tokenDetails!=null){
        const payload = {
            productId: id,
            token: tokenDetails.token
        };
        const response = await fetch(URL+'/User/deleteProduct', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
        let result = await response.json();
        return {
            status:result.Status,
            message:result.Message
        };
    }else{
        return{
            status:400,
            message:"Token is empty"
        }
    }
    
}