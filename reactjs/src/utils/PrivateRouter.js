import {Router, Routes, Outlet, Navigate } from "react-router-dom";
import {useSelector} from "react-redux";
import * as React from "react";

const PrivateRouter = () => {
    const {login} = useSelector(state => state.loginReducer )
    return login ? <Outlet/> : <Navigate to='/login'/>

};

export default PrivateRouter;