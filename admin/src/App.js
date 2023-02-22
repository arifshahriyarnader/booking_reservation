import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { hotelColumns, roomColumns, userColumns } from "./datatablesource";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom";
import ReservationsList from "./pages/reservationsList/ReservationsList";
import UpdateHotel from "./pages/updateHotel/UpdateHotel";
import Update from "./pages/update/Update";
import UserProfile from "./pages/userprofile/UserProfile";
//import HotelList from "./pages/hotelList/HotelList";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route path="users">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={userColumns} type={"user"} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":userId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <New inputs={userInputs} title="Add New User" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="update/:id"
                element={
                  <ProtectedRoute>
                    <Update inputs={userInputs} title="Update User" />
                  </ProtectedRoute>
                }
              />
               <Route
                path="userprofile"
                element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="hotels">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={hotelColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":productId"
                element={
                  <ProtectedRoute>
                    {" "}
                    <Single />{" "}
                  </ProtectedRoute>
                }
              />
               <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewHotel />
                  </ProtectedRoute>
                }
              />
               <Route
                path="update/:id"
                element={
                  <ProtectedRoute>
                    <UpdateHotel />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="rooms">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={roomColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":productId"
                element={
                  <ProtectedRoute>
                    {" "}
                    <Single />{" "}
                  </ProtectedRoute>
                }
              />
               <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewRoom/>
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="payments">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <ReservationsList/>
                  </ProtectedRoute>
                }
              />
              <Route
                path=":paymentId"
                element={
                  <ProtectedRoute>
                    {" "}
                    <Single />{" "}
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
