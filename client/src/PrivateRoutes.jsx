import React , {useContext} from 'react'
import { Outlet, Navigate } from 'react-router-dom'

import { useSelector,useDispatch } from "react-redux";
// import { signInFailure, signInStart, signInSuccess } from "./redux/user/userSlice";



export default function PrivateRoutes() {

    const user=useSelector((state)=> state.user)

    return (
        <>
            {user?.currentUser ? <Outlet  /> : <Navigate to="/login" />};
        </>

    )

}