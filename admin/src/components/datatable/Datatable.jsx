/* eslint-disable react-hooks/exhaustive-deps */
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const Datatable = ({ columns, type }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname.split("/")[1];

  const [search, setSearch] = useState("");

  const [list, setList] = useState([]);

  const { data } = useFetch(`/${path}`);

  useEffect(() => {
    setList(data);
  }, [data]);

  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(async () => {
    const res = await axios.get(`/${path}/search/${search}`);
    console.log(res);
    setList(res.data);
  }, [search]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (error) {}
  };

  const handleClick = (id) => {
    navigate(`/${path}/${id}`);
  };

  console.log({ path, list });

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {path === "rooms" ? (
              <></>
            ) : (
              <div
                className="viewButton"
                onClick={() => handleClick(params.row._id)}
              >
                View
              </div>
            )}

            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  console.log(search);

  return (
    <div className="datatable">
      {type && (
        <div className="search mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="searchInput"
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchOutlinedIcon />
        </div>
      )}
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
