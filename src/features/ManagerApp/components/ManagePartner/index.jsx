import React, { useState } from "react";
import DataTable from "components/DataTable";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import ModalForm from "../ModalRegisterPartner";
import { useEffect } from "react";
import merchantApi from "api/merchantApi";
import partnerApi from "api/partnerApi";

const columns = [
  { field: "id", headerName: "STT", width: 80 },
  { field: "name", headerName: "Họ và tên", width: 230 },
  { field: "email", headerName: "Email", width: 220 },
  {
    field: "gender",
    headerName: "Giới tính",
    width: 130,
  },
  {
    field: "address",
    headerName: "Địa chỉ",
    width: 320,
  },
  {
    field: "phone",
    headerName: "Số điện thoại",
    width: 180,
  },
  {
    field: "action",
    headerName: "Hành động",
    id: "links",
    width: 130,
    renderCell: (params) => {
      return (
        <Link to={{ pathname: `/manager/merchant/${params.getValue("id")}` }}>
          {"Chi tiết"}
        </Link>
      );
    },
  },
];

function ManagePartner(props) {
  const [open, setOpen] = useState(false);
  const [partnerList, setPartnerList] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchPartnerList = async () => {
      try {
        // const params = {
        //   _page: 1,
        //   _limit: 10,

        // };
        const res = await partnerApi.getAll();
        const data = res.map((partner, index) => ({
          id: index + 1,
          name: partner.name,
          email: partner.email,
          gender: partner.gender,
          address: partner.address,
          phone: partner.phone,
        }));
        console.log(res.username);
        setPartnerList(data);
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    };

    fetchPartnerList();
  }, []);

  return (
    <div>
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
        <DataTable rows={partnerList} columns={columns} />
      </div>
      <Modal open={open}>
        <ModalForm handleClose={handleClose} />
      </Modal>
    </div>
  );
}

export default ManagePartner;
