import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import {logout} from '../../../api/endpoints';

export default function Logout(){
    logout();
    return(
        <Navigate to='/login' />
    )
}

