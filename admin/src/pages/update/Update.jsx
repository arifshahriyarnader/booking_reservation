import "../new/new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";

const Update = ({ inputs, title }) => {
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const path = location.pathname.split("/")[1];
  const { data } = useFetch(`/${path}/${id}`);
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});

  useEffect(() => {
    setInfo(data);
  }, [data]);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      const uploadRes = await axios.post(
        `https://api.cloudinary.com/v1_1/alnasimul/image/upload`,
        data
      );

      const { url } = uploadRes.data;

      const updateUser = {
        ...info,
        img: url,
      };

      console.log(updateUser);

        const res =  await axios.put(`/${path}/${id}`, updateUser);
        if(res.status === 200){
            window.location.replace(`/users/${id}`)
        }
    } catch (err) {}
  };

  console.log(info)

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                (input.id === "password" ? null :  <div className="formInput" key={input.id}>
                <label>{input.label}</label>
                <input
                  onChange={handleChange}
                  type={input.type}
                  placeholder={input.placeholder}
                  id={input.id}
                  defaultValue={info[input.id]}
                />
              </div>)
               
              ))}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
