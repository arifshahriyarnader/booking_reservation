import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";
import "./reserve.css";

const Reserve = ({ setOpen, hotelId, location, days }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [openModal, setOpenModal] = useState(true);
  const { data: hotelData } = useFetch(`/hotels/find/${hotelId}`);
  const { data: roomData } = useFetch(`/hotels/room/${hotelId}`);
  const { user } = useContext(AuthContext);
  const { dates, options } = useContext(SearchContext);

  let totalBill = 0;

  const calculateTotalBill = (data, days) => {
    data.map((data) => {
      totalBill = totalBill + parseInt(data.price) * days;
    //  console.log(totalBill);
    });
  };

  calculateTotalBill(selectedRooms, days);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());

    const dates = [];
    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };
  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    if (!roomNumber || !roomNumber.unavailableDates) {
      return false;
    }

    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value.split(",");
    const parsedValue = {
      _id: value[0],
      number: value[1],
      price: value[2],
    };
    setSelectedRooms(
      checked
        ? [...selectedRooms, parsedValue]
        : selectedRooms.filter((item) => item._id !== parsedValue._id)
    );
  };
  const navigate = useNavigate();

  const handleClick = () => {
    try {
        setOpen(false);
        navigate("/reservation", {
          state: {
            destination: location.state.destination,
            user,
            dates,
            alldates,
            options,
            days,
            data: hotelData,
            roomData: selectedRooms,
            totalBill: totalBill,
          },
        });
    } catch (err) {}
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  console.log(alldates, "reserve")

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {roomData.map((item) => (
          <div className="rItem">
            {item && (
              <div className="rItemInfo">
                <div className="rTitle">{item.title}</div>
                <div className="rDesc">{item.desc}</div>
                <div className="rMax">
                  Max People: <b>{item.maxPeople}</b>
                </div>
                <div className="rPrice">{item.price}</div>
              </div>
            )}
            <div className="rSelectRooms">
              {item &&
                item.roomNumbers.map((roomNumber) => (
                  <div className="room">
                    <label>{roomNumber.number}</label>
                    <input
                      type="checkbox"
                      value={`${roomNumber._id},${roomNumber.number},${roomNumber.price}`}
                      onChange={handleSelect}
                      disabled={!isAvailable(roomNumber)}
                    />
                  </div>
                ))}
            </div>
          </div>
        ))}

        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
