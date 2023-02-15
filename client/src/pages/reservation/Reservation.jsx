import { useLocation } from "react-router-dom";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import ReservationArea from "../../components/reservationArea/ReservationArea";
import "./reservation.css"

const Reservation = () => {
    const location = useLocation();
    
    return (
        <div>
            <Navbar/>
            <Header type="list"/>
            <ReservationArea location={location}/>
        </div>
    );
};

export default Reservation;