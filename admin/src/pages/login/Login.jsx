import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/navbar/Navbar"
import "./login.scss";

const Login = () => {
    const [credentials, setCredentials] = useState({
        username:undefined,
        password:undefined,
    })

    const {loading, error, dispatch} = useContext(AuthContext)
    const navigate =useNavigate()

    const handleChange=(e) =>{
        setCredentials(prev=>({...prev, [e.target.id]:e.target.value}))
    }

    const handleClick =async (e) =>{
        e.preventDefault()
        dispatch({type:"LOGIN_START"})
        try{
            const res= await axios.post("/auth/login", credentials);
            dispatch({type:"LOGIN_SUCCESS", payload: res.data});
            navigate("/")
        }
        catch(err){
            dispatch({type:"LOGIN_FAILURE", payload:err.response.data})
        }
    }
    
    return (
        <>
        <Navbar />
        <div className="login">
           <div className="lContainer">
            <input type="text" placeholder="Username" id="username" onChange={handleChange} className="lInput" />
            <input type="password" placeholder="Password" id="password" onChange={handleChange} className="lInput"/>
            <button disabled={loading} onClick={handleClick} className="lButton">Login</button>
            {error && <span>{error.message}</span>}
            </div> 
        </div>
        </>
    );
};

export default Login;