import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import "./featured.css";

const Featured = () => {
  const [destination, setDestination] = useState("")
  const {data, loading, error} = useFetch("/hotels/countByCity?cities=Sylhet,Dhaka,Chittagong")
  const { reFetch } = useFetch(`hotels?city=${destination.toString().toLowerCase()}`)
  const navigate = useNavigate()
  const {dispatch} = useContext(SearchContext)
  const options = {
    adult: 1,
    children: 0,
}

const dates = [{
    startDate: new Date(),
    endDate: new Date()
}]
  console.log(data);
  const handleClick = (destination) => {
    setDestination(destination)
    reFetch()
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } })
    navigate("/hotels", { state: { destination, dates, options } })
}
  return (
    <div className="featured">
      {loading ? ( 
        "Loading please Wait" ) : (
           <>
           <div onClick={() => handleClick("Sylhet")} className="featuredItem">
        <img
          src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
          alt="Hotel"
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Sylhet</h1>
          <h2>{data[0]} properties</h2>
        </div>
      </div>
      
      <div onClick={() => handleClick("Dhaka")}  className="featuredItem">
        <img
          src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
          alt="Hotel"
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Dhaka</h1>
          <h2>{data[1]} properties</h2>
        </div>
      </div>
      <div onClick={() => handleClick("Chittagong")} className="featuredItem">
        <img
          src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
          alt="Hotel"
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Chittagong</h1>
          <h2>{data[2]} properties</h2>
        </div>
      </div></>)}
    </div>
  );
};

export default Featured;
