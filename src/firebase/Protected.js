import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "./AuthContext";


export function Protected({children}){
    const {user} = useContext(Context);

    if(!user){
        return <Navigate to='/adminIva' replace/>
    }else{
        return children;
    }
}