import Sidebar from "../../components/sidebar/Sidebar";
import themephoto from "../../img/themephoto.jpg"
//import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
//import Widget from "../../components/widget/Widget";
//import Featured from "../../components/featured/Featured";
//import Chart from "../../components/chart/Chart";
//import Table from "../../components/table/Table";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        {/* <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div> */}
        {/* <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div> */}
        <div className="listContainer text-center mt-5">
          {/* <div className="listTitle">Latest Transactions</div> */}
          {/* <Table /> */}
          <img src={themephoto} alt="" width={1024} height="600vh" className="mt-5"/>
        </div>
      </div>
    </div>
  );
};

export default Home;
