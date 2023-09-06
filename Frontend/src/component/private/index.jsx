import React from "react";
import { Navigate,Outlet } from "react-router-dom";
// import Login from './login';

export function PrivateComponent(){
    const auth=JSON.parse(localStorage.getItem('tokenDetails'));
    return ((auth!==null && auth.login && auth.token!=null)?<Outlet/>:<Navigate to="/login"/>)
}

export function PublicComponent(){
    const auth=JSON.parse(localStorage.getItem('tokenDetails'));
    return ((auth!==null && auth.login && auth.token!=null)?<Navigate to="/"/>:<Outlet/>)
}