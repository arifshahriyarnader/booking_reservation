import "./logout.css";
import React, { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";

const Logout = () => {
    const {dispatch} = useContext(AuthContext);

    const handleClick =(e) =>{
        e.preventDefault()
        dispatch({type : "LOGOUT"})
    }
    return (
        <span onClick={handleClick} className="">Logout</span>
    );
};

export default Logout;