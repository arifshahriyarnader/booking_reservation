import { useContext} from "react";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import ReservationsListTable from "../../components/reservationslisttable/ReservationsListTable";
import './profile.css';
const Profile = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const { data } = useFetch(`/users/${id}`);
    const {data: reservationData} = useFetch(`/payments/${user.email}`)

  //  console.log({reservationData, user})
  
    return (
      <>
        <Navbar />
        <div className="profile-container">
          <div className="profile-info">
            <div>
              <img src={user.img} alt="" className="rounded" width={200} height={200} />
            </div>
            <h1>{data?.username || user?.username}</h1>
            <h2>{data?.email || user?.email}</h2>
            <p>{data?.country || user?.country}, {data?.city || user?.city}</p>
            <span>{data?.phone || user?.phone}</span>
          </div>
          <div className="mt-5">
             <ReservationsListTable list={reservationData}/>
          </div>
        </div>
      </>
    );
  };
  
  export default Profile;