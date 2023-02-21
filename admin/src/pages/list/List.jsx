import "./list.css"
import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Datatable from "../../components/datatable/Datatable"


const List = ({columns, type}) => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Datatable columns={columns} type={type}/>
      </div>
    </div>
  )
}

export default List