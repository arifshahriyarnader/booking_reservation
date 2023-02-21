import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import Reservation from "./pages/reservation/Reservation";
import ForgetPassword from "./pages/forget password/ForgetPassword";
import Flights from "./pages/flights/Flights";
import CarRentals from "./pages/car rentals/CarRentals";
import Contact  from "./pages/contact/Contact";
import AirportTaxis  from "./pages/airport taxis/AirportTaxis";
import ReservationConfirmed from "./pages/reservation-confirmed/ReservationConfirmed";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/forgot-password" element={<ForgetPassword/>}/>
        <Route path="/flights" element={<Flights/>}/>
        <Route path="/car-rentals" element={<CarRentals/>}/>
        <Route path="/airport-taxis" element={<AirportTaxis/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/users/:id" element={<Profile/>}/>
        <Route path="/reservation" element={<Reservation/>}/>
        <Route path="/reservation-confirmed/payment_success" element={<ReservationConfirmed/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
