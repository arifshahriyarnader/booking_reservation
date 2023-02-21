import { useContext} from "react";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import './profile.css';
const Profile = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const { data } = useFetch(`/users/${id}`);
  
    return (
      <>
        <Navbar />
        <div className="profile-container">
          <div className="profile-info">
            <h1>{data?.username || user?.username}</h1>
            <h2>{data?.email || user?.email}</h2>
            <p>{data?.country || user?.country}, {data?.city || user?.city}</p>
            <span>{data?.phone || user?.phone}</span>
          </div>
        </div>
      </>
    );
  };
  
  export default Profile;