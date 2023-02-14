import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/navbar/Navbar"
import { axiosInstance } from '../../config';
import { AuthContext } from '../../context/AuthContext';
import "./register.css"

const Register = () => {
    const [credentials, setCredentials] = useState({
        username:undefined,
        email:undefined,
        password:undefined,
    })

    const {loading, error, dispatch} = useContext(AuthContext)
    const navigate= useNavigate()

    const handleChange=(e) =>{
        setCredentials(prev=>({...prev, [e.target.id]:e.target.value}))
    }

    const handleClick =async (e) => {
        e.preventDefault()
        dispatch({type: "REGISTER_START"})
        try{
            const res = await axiosInstance.post("/auth/register", credentials)
            dispatch({type: "REGISTER_SUCCESS", payload: res.data})
            navigate("/login")
        }
        catch(error){
            dispatch({type:"REGISTER_FAILURE", payload: error.res})
        }
    }

    let errMsg=""
    if(error?.status === 400) { errMsg = "Please enter a valid email"}
    else{errMsg = "Sorry username or Email Already in use"}

    return (
        <>
            <Navbar />
            <div className='register'>
                <div className='regContainer'>
                    <input 
                    type="text" 
                    placeholder='Username' 
                    id="username"
                    onChange={handleChange}
                    className="regInput"
                     />
                     <input 
                    type="email" 
                    placeholder='Email' 
                    id="email"
                    onChange={handleChange}
                    className="regInput"
                     />
                      <input 
                    type="text" 
                    placeholder='Country' 
                    id="country"
                    onChange={handleChange}
                    className="regInput"
                     />
                      <input 
                    type="text" 
                    placeholder='City' 
                    id="city"
                    onChange={handleChange}
                    className="regInput"
                     />
                     <input 
                    type="tel" 
                    placeholder='Phone' 
                    id="phone"
                    onChange={handleChange}
                    className="regInput"
                     />
                     <input 
                    type="password" 
                    placeholder='Password' 
                    id="password"
                    onChange={handleChange}
                    className="regInput"
                     />
                     <button disabled={loading} onClick={handleClick} className="regBtn">Register</button>
                </div>
            </div>

        </>
    );
};

export default Register;