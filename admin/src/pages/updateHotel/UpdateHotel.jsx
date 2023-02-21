import "../newHotel/newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const UpdateHotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const path = location.pathname.split("/")[1];
  const { data: hotelData } = useFetch(`/${path}/${id}`);
  //const [files, setFiles] = useState("");
  const [info, setInfo] = useState(hotelData);
  //const [rooms, setRooms] = useState([]);
  //const { data, loading, error } = useFetch("/rooms");

  useEffect(() => {
    setInfo(hotelData)
  },[hotelData])

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

//   const handleSelect = (e) => {
//     const selectedRoom = Array.from(
//       e.target.selectedOptions,
//       (option) => option.value
//     );
//     setRooms(selectedRoom);
//   };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
    //   const list = await Promise.all(
    //     Object.values(files).map(async (file) => {
    //       const data = new FormData();
    //       data.append("file", file);
    //       data.append("upload_preset", "upload");
        //   const uploadRes = await axios.post(
        //     `https://api.cloudinary.com/v1_1/alnasimul/image/upload`,
        //     data
        //   );

        //   const { url } = uploadRes.data;

        //   return url;
    //     })
    //   );

      const updateHotel = {
        ...info,
        // rooms,
        // photos: list,
      };

      console.log(updateHotel)


      const res = await axios.put(`/${path}/${id}`, updateHotel);
      console.log(res)
      if(res.status === 200){
        window.location.replace(`/hotels/${id}`)
      }
    } catch (error) {}
  };

  
  console.log({info, hotelData})
 // console.log(Object.values(files));

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div className="top">
          <h1>Update Hotel</h1>
        </div>
        <div className="bottom">
          {/* <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div> */}
          <div className="right">
            <form>
              {/* <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div> */}

              {hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    defaultValue={info[input.id]}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}  defaultValue={info.featured}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              {/* <div className="selectRooms">
                <label>Rooms</label>
                <select id="rooms" multiple onChange={handleSelect} defaultValue={info.rooms}>
                  {
                    // eslint-disable-next-line array-callback-return
                    loading
                      ? "loading"
                      : data &&
                        data.map((room) => (
                          <option value={room._id} key={room._id} >
                            {room.title}
                          </option>
                        ))
                  }
                </select>
              </div> */}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateHotel;
