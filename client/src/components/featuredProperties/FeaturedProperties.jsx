import {useContext,useState} from "react";
import { Link, useNavigate } from "react-router-dom"
import { SearchContext } from "../../context/SearchContext"
import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const {data, loading, error} = useFetch("/hotels?featured=true&limit=4");
  const [destination, setDestination] = useState("")
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const [options, setOptions] = useState({
        adults: 1,
        children: 0,
    })

    const navigate = useNavigate()

    const { dispatch } = useContext(SearchContext)
    const handleSearch = () => {
        dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } })
        navigate("/")
    }

  console.log(data);
  console.log(`item.photos`);
  return (
    <div className="fp">
      {loading ? ( "Loading" ) : ( 
      <>
      {data.map((item) =>(
          <div className="fpItem" key={item._id}>
          
          <img
            src={item.photos[0]}
            alt=""
            className="fpImg"
          />
          <Link onClick={handleSearch} className="lnk"  to={`/hotels/${item._id}`}>
          <span className="fpName">{item.name}</span>
          </Link>
          <span className="fpCity">{item.city}</span>
          {/* <span className="fpPrice">VIP Rooms Starting from BDT {item.cheapestPrice} Taka</span> */}
          {/* {item.rating && <div className="fpRating">
            <button>{item.rating}</button>
            <span>Excellent</span>
          </div>} */}
        </div>
      ))}
      </> 
      )}
      
    </div>
  );
};

export default FeaturedProperties;
