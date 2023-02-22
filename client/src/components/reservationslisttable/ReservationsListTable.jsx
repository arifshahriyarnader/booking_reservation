import SingleList from "../singlelist/SingleList";

const ReservationsListTable = ({ list }) => {
   

  return (
    <table className="table  table-striped ">
      <thead className="thead-dark">
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Contact</th>
          <th scope="col">Address</th>
          <th scope="col">Destination</th>
          <th scope="col">Adult</th>
          <th scope="col">Child</th>
          <th scope="col">Reservation No</th>
          <th scope="col">Hotel Name</th>
          <th scope="col">Rooms</th>
          <th scope="col">Dates</th>
          <th scope="col">Paid Amount</th>
          <th scope="col">Bank Transaction</th>
          <th scope="col">Payment Method</th>
        </tr>
      </thead>
      <tbody>
        {list.map((data) => (
         <SingleList data={data} key={data._id}/>
        ))}
      </tbody>
    
    </table>
  );
};

export default ReservationsListTable;
