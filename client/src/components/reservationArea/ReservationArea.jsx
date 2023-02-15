import {
  faBed,
  faCalendar,
  faCalendarDays,
  faChild,
  faMoneyBill,
  faPerson,
  faPlane,
} from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./reservationArea.scss";
import { useState } from "react";
import aamarpayLogo from "../../img/aamarpay_logo.png";
import axios from "axios";
const ReservationArea = ({ location }) => {
  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const reservationInfo = {
      ...info,
      destination: location.state.destination,
      dates: location.state.dates[0],
      adult: parseInt(location.state.options.adult),
      children: parseInt(location.state.options.children),
      room: parseInt(location.state.options.room),
      totalBill: location.state.totalBill,
      nights:location.state.days 
    }

    try {
      await axios.post("/payments/payment", reservationInfo)
    } catch (error) {
      
    }
    
  };

  console.log(location);
  return (
    <div className="container d-flex align-items-center justify-content-around">
      {" "}
      <div className="new">
        <div className="newContainer">
          <div className="top ">
            <div className="d-flex align-items-center justify-content-around">
              <div className="d-flex text-secondary mx-5">
                <FontAwesomeIcon icon={faPlane} className="me-2 mt-1" />
                <span>{location.state.destination}</span>
              </div>
              <div className="d-flex mx-5 text-secondary">
                <FontAwesomeIcon icon={faCalendarDays} className="me-2 mt-1" />
                <span>{`From ${format(
                  location.state.dates[0].startDate,
                  "MM/dd/yyyy"
                )} to ${format(
                  location.state.dates[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
              </div>
              <div className="mx-5 text-secondary">
                <span>
                  {" "}
                  <FontAwesomeIcon icon={faPerson} className="me-2 mt-1" />
                  Adult {location.state.options.adult} |{" "}
                  <FontAwesomeIcon icon={faChild} /> Children{" "}
                  {location.state.options.children} |{" "}
                  <FontAwesomeIcon icon={faBed} /> Room{" "}
                  {location.state.options.room}
                </span>
              </div>
              <div className="d-flex mx-5 text-secondary">
                <FontAwesomeIcon icon={faCalendar} className="me-2 mt-1" />
                <span>{location.state.days} Nights</span>
              </div>
              <div className="d-flex text-secondary mx-5">
                <FontAwesomeIcon icon={faMoneyBill} className="me-2 mt-1" />
                <span>{location.state.totalBill}</span>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className=""></div>
            <div className="right">
              <form>
                <div className="formInput">
                  <label>First Name</label>
                  <input
                    onChange={handleChange}
                    type={``}
                    placeholder={``}
                    id={"firstName"}
                  />
                </div>
                <div className="formInput">
                  <label>Last Name</label>
                  <input
                    onChange={handleChange}
                    type={``}
                    placeholder={``}
                    id={"lastName"}
                  />
                </div>
                <div className="formInput">
                  <label>Email</label>
                  <input
                    onChange={handleChange}
                    type={``}
                    placeholder={``}
                    defaultValue={location.state.user.email}
                    id={"email"}
                  />
                </div>
                <div className="formInput">
                  <label>Contact Info</label>
                  <input
                    onChange={handleChange}
                    type={``}
                    placeholder={``}
                    id={"contact"}
                  />
                </div>
                <div className="formInput">
                  <label>Billing Address</label>
                  <input
                    onChange={handleChange}
                    type={``}
                    placeholder={``}
                    id={"billingAddress"}
                  />
                </div>
                <div>
                  <img src={aamarpayLogo} width="180" height="70" alt="" className="me-4" />
                  <button onClick={handleClick}>Confirm and pay with aamarpay</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationArea;
