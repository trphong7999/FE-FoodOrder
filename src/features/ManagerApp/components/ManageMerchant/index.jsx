import React, { useState } from "react";
import DataTable from "components/DataTable";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import ModalForm from "../ModalForm";

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

function ManageMerchant(props) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="find-group">
        <input type="text" placeholder="Tên cơ sở" />
        <input type="text" placeholder="Tên người đại diện" />
        <Button variant="contained" className="btn">
          Tìm kiếm
        </Button>
        <Button
          variant="contained"
          className="btn"
          onClick={() => handleOpen()}
        >
          Tạo mới
        </Button>
      </div>
      <div className="table-content" style={{ height: 400 }}>
        <DataTable rows={rows} columns={columns} />
      </div>
      <Modal
        open={open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <ModalForm handleClose={handleClose} />
      </Modal>
    </>
  );
}

export default ManageMerchant;
