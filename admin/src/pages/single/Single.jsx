import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
//import List from "../../components/table/Table";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";

const Single = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const path = location.pathname.split("/")[1];
  const { data } = useFetch(`/${path}/${id}`);
  const navigate = useNavigate();

  const handleUpdateHotel = () => {
    navigate(`/${path}/update/${data._id}`)
  }

  const handleUpdateUser = () => {
    navigate(`/${path}/update/${data._id}`)
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
                  <img src={data.img} alt="" className="itemImg me-5" />
                </div>
                <div className="details ms-5">
                  <h1 className="itemTitle">{data.username}</h1>
                  <div className="detailItem">
                    <h4 className="itemKey">Email:</h4>
                    <h5 className="itemValue">{data.email}</h5>
                  </div>
                  <div className="detailItem">
                    <h4 className="itemKey">Phone:</h4>
                    <h5 className="itemValue">{data.phone}</h5>
                  </div>
                  <div className="detailItem">
                    <h4 className="itemKey">Address:</h4>
                    <h5 className="itemValue">{data.city}</h5>
                  </div>
                  <div className="detailItem">
                    <h4 className="itemKey">Country:</h4>
                    <h5 className="itemValue">{data.country}</h5>
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
  } else if (path === "hotels") {
    return (
      <div className="single">
        <Sidebar />
        <div className="singleContainer">
          <div className="container w-50 top">
            <div className="left">
              <Link to={`/${path}/update/${data._id}`}>
                <div className="editButton" onClick={handleUpdateHotel}>Edit</div>
              </Link>
              <div className="item d-flex align-items-center justify-content-center">
                <div>
                  {" "}
                  <img src={data.photos} alt="" className="itemImg me-5" />
                </div>

                <div className="details ms-5 border rounded p-3 mt-3">
                  <div>
                    <div className="">
                      {" "}
                      <h1 className="itemTitle mx-3 mb-3">{data.name}</h1>{" "}
                    </div>

                    {/* {data.rating && (
                      <div className="siRating ms-3 my-4">
                        <span className="text-success">
                          {" "}
                          <strong>Excellent</strong>{" "}
                        </span>
                        <button>{data.rating}</button>
                      </div>
                    )} */}
                  </div>
                  <div className="detailItem d-flex align-items-center">
                    <h4 className="itemKey mx-3">Type:</h4>
                    <h5 className="itemValue">{data.type}</h5>
                  </div>
                  <div className="detailItem d-flex align-items-center ">
                    <h4 className="itemKey mx-3">Address:</h4>
                    <h5 className="itemValue">
                      {data.address}, {data.city}
                    </h5>
                  </div>
                  <div className="detailItem d-flex align-items-center">
                    <h4 className="itemKey mx-3">Country:</h4>
                    <h5 className="itemValue">Bangladesh</h5>
                  </div>
                  {data.featured && (
                    <div className="detailItem d-flex align-items-center  mx-3">
                      <div className="bg-primary w-25 rounded p-2 me-2">
                        <span className="text-white">
                          {" "}
                          <strong>Featured</strong>{" "}
                        </span>
                      </div>
                      <div className="bg-success w-75 rounded p-2 text-center mx-5">
                        <span className="text-white">
                          {" "}
                          <strong>
                            Cheapest Price: {data.cheapestPrice}
                          </strong>{" "}
                        </span>
                      </div>
                    </div>
                  )}
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

export default Single;
