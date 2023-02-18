import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";
import "./reserve.css";

const Reserve = ({setOpen, hotelId, location, days}) => {
    const [selectedRooms, setSelectedRooms] = useState([])
    const { data: hotelData } = useFetch(`/hotels/find/${hotelId}`);
    const {data}= useFetch(`/hotels/room/${hotelId}`)
    const {user} = useContext(AuthContext)
    const {dates, options} = useContext(SearchContext)

    const getDatesInRange=(startDate,endDate) =>{
        const start = new Date(startDate)
        const end = new Date(endDate)
        const date=new Date(start.getTime());

        const dates=[]
        while(date <= end){
            dates.push(new Date(date).getTime())
            date.setDate(date.getDate()+1)
        }
        return dates;
    }
    const alldates=getDatesInRange(dates[0].startDate, dates[0].endDate);

    const isAvailable = (roomNumber) => {
      if (!roomNumber || !roomNumber.unavailableDates) {
        return false;
      }
    
      const isFound = roomNumber.unavailableDates.some((date) =>
        alldates.includes(new Date(date).getTime())
      );
      return !isFound;
    };
    

    const handleSelect =(e) =>{
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRooms(checked ? [...selectedRooms, value] : 
            selectedRooms.filter((item) =>item !== value))
    }
    const navigate=useNavigate()
    
    const handleClick = async() =>{
      try{
        await Promise.all(
          selectedRooms.map((roomId) =>{
            const res = axios.put(`/rooms/availability/${roomId}`, 
            {dates:alldates,});
            return res.data;
          })
        );
        setOpen(false);
        navigate("/reservation", {
          state: {
            destination: location.state.destination,
            user,
            dates,
            options,
            days,
            data: hotelData,
            roomData: data,
            totalBill: days * hotelData.cheapestPrice * options.room,
          },
        });
      }
      catch(err){}
    }
    return (
        <div className="reserve">
            <div className="rContainer">
                <FontAwesomeIcon icon={faCircleXmark} className="rClose" 
                onClick={() =>setOpen(false)} />
                <span>Select your rooms:</span>
            {data.map((item) =>(
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
      {item && item.roomNumbers.map((roomNumber) =>(
        <div className="room">
          <label>{roomNumber.number}</label>
          <input type="checkbox" 
            value={roomNumber._id} 
            onChange={handleSelect}
            disabled={!isAvailable(roomNumber)}
          />  
        </div>
      ))}
    </div>
  </div>
))}


                <button onClick={handleClick} className="rButton">Reserve Now!</button>
            </div>
        </div>
    );
};

export default Reserve;