import { useContext } from "react";
import Navbar from "../../components/navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";
import './profile.css';

const Profile = (props) => {
    const { user } = useContext(AuthContext);
  
    return (
     <>
     <Navbar />
         <div className="profile-container">
      
      <div className="profile-info">
        <h1>{user?.username}</h1>
        <h2>{user?.email}</h2>
        <p>{user?.country}, {user?.city}</p>
        <span>{user?.phone}</span>
      </div>
    </div>
     </>
    );
  };
  
  export default Profile;
  