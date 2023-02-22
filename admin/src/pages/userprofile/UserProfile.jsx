import "../single/single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
//import List from "../../components/table/Table";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import profilepic from "../../img/profilepic.png"

const UserProfile = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const navigate = useNavigate();

  const {user} = useContext(AuthContext)

  const handleUpdateUser = () => {
    navigate(`/${path}/update/${user._id}`)
  }

  if (path === "users") {
    return (
      <div className="single">
        <Sidebar />
        <div className="singleContainer">
          <div className="container w-50 top">
            <div className="left">
              <div className="editButton" onClick={handleUpdateUser}>Edit</div>

              <h1 className="title">Information</h1>
              <div className="item d-flex align-items-center justify-content-center">
                <div>
                  {" "}
                  <img src={user.img ? user.img : profilepic} alt="" className="itemImg me-5" />
                </div>
                <div className="details ms-5">
                  <h1 className="itemTitle">{user.username}</h1>
                  <div className="detailItem">
                    <h4 className="itemKey">Email:</h4>
                    <h5 className="itemValue">{user.email}</h5>
                  </div>
                  <div className="detailItem">
                    <h4 className="itemKey">Phone:</h4>
                    <h5 className="itemValue">{user.phone}</h5>
                  </div>
                  <div className="detailItem">
                    <h4 className="itemKey">Address:</h4>
                    <h5 className="itemValue">{user.city}</h5>
                  </div>
                  <div className="detailItem">
                    <h4 className="itemKey">Country:</h4>
                    <h5 className="itemValue">{user.country}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="bottom">
            <h1 className="title">Last Transactions</h1>
            <List />
          </div> */}
        </div>
      </div>
    );
  } 
};

export default UserProfile;
