import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import ReservationsListTable from "../../components/reservationslisttable/ReservationsListTable";
import Sidebar from "../../components/sidebar/Sidebar";
import useFetch from "../../hooks/useFetch";
import "./reservationsList.css";

const ReservationsList = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState();

  const path = location.pathname.split("/")[1];

  const [list, setList] = useState([]);

  const { data } = useFetch(`/${path}`);

  useEffect(() => {
    setList(data);
  }, [data]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if(searchTerm){
      const res = await axios.get(`/payments/getDataByContact/${searchTerm}`);
      console.log(res)
      setList(res.data);
    }
  }, [searchTerm]);

  console.log(list);
  console.log(searchTerm);
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <div className="my-4 ms-4">
          <div className="input-group">
            <div className="form-outline">
              <input
                type="search"
                id="form1"
                className="form-control"
                placeholder="Search"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        <ReservationsListTable list={list} />
      </div>
    </div>
  );
};

export default ReservationsList;
