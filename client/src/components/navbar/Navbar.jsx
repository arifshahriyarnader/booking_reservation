import "./navbar.css"
import {Link} from "react-router-dom";
import UserProfileDropdown from "../userProfileDropdown/UserProfileDropdown";
//import { AuthContext } from "../../context/AuthContext";
//import { useContext } from "react";
//import Logout from "../logout/Logout";

const Navbar = () => {
  //const {user} = useContext(AuthContext);
  //const navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{color:"inherit", textDecoration:"none"}}>
        <span className="logo">Shohoz Booking</span>
        </Link>
        <UserProfileDropdown />
        {/* {user ? (
          <div>
            {user.username}
            <Logout />
          </div>
        ) : (
          <div className="navItems">
            <button onClick={() => navigate("/register")} className="navButton">Register</button>
            <button onClick={() => navigate("/login")} className="navButton">Sign in</button>
          </div>
        )} */}
      </div>
    </div>
  )
}

export default Navbar