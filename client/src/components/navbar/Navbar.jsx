import "./navbar.css"
import {Link} from "react-router-dom";
import UserProfileDropdown from "../userProfileDropdown/UserProfileDropdown";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{color:"inherit", textDecoration:"none"}}>
        <span className="logo">Shohoz Booking</span>
        </Link>
        <UserProfileDropdown />
        
      </div>
    </div>
  )
}

export default Navbar