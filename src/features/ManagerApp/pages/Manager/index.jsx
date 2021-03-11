import React, { useState } from "react";
import NavbarManage from "components/NavbarManager";
import Sidebar from "../../components/Sidebar";
import "./style.scss";
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Route } from "react-router-dom";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  dataTable: {
    fontSize: "1.6rem",
  },
  headTable: {
    fontWeight: "bold",
    fontSize: "1.8rem",
  },
}));

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue("firstName") || ""} ${
        params.getValue("lastName") || ""
      }`,
  },
  {
    field: "detail",
    headerName: " ",
    id: "links",
    renderCell: (params) => {
      console.log(params);
      return (
        <Link to={{ pathname: `/manager/merchant/${params.getValue("id")}` }}>
          {"Detail"}
        </Link>
      );
    },
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

function Manager(props) {
  const classes = useStyles();
  return (
    <div className="ManagerApp">
      <NavbarManage />
      <div className="main">
        <Sidebar />
        <div className="content">
          <div className="find-group">
            <input type="text" placeholder="Tên cơ sở" />
            <input type="text" placeholder="Tên người đại diện" />
            <Button variant="contained" className="btn">
              Tìm kiếm
            </Button>
          </div>
          <Route>
            <div
              className="table-content"
              style={{ height: 400, width: "80rem" }}
            >
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                className={classes.dataTable}
              />
            </div>
          </Route>
        </div>
      </div>
    </div>
  );
}

export default Manager;
