import React, { useState } from "react";
import DataTable from "components/DataTable";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import ModalForm from "../ModalRegisterPartner";
import { useEffect } from "react";
import partnerApi from "api/partnerApi";

const style = {
  textDecoration: "none",
  border: "1px solid #ccc",
  padding: "1rem",
  lineHeight: "1.4rem",
  borderRadius: "6px",
  color: "var(--text-color)",
  marginRight: "1rem",
  cursor: "pointer",
  ":hover": {
    color: "white",
    backgroundColor: "red",
  },
};

// const block = async (id, status) => {
//   const res = await merchantApi.blockMerchant({ id, status });
//   if (res.status !== 400) alert("Thành công");
//   else alert("Không thành công");
//   window.location.reload();
// };

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
        <Link
          style={style}
          to={{ pathname: `/manager/partner/${params.getValue("_id")}` }}
        >
          {"Chi tiết"}
        </Link>
      );
    },
  },
];

function ManagePartner(props) {
  const [open, setOpen] = useState(false);
  const [partnerList, setPartnerList] = useState([]);
  const [allPartner, setAllPartner] = useState([]);
  const [findName, setFindName] = useState("");
  const [findAddress, setFindAddress] = useState("");

  function removeAccents(str) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = (listPartner) => {
    const final = listPartner.map((partner, index) => ({
      id: index + 1,
      name: partner.name,
      email: partner.email,
      gender: partner.gender === "male" ? "Nam" : "Nữ",
      address: partner.address,
      phone: partner.phone,
      _id: partner._id,
    }));
    return final;
  };

  useEffect(() => {
    const fetchPartnerList = async () => {
      try {
        const res = await partnerApi.getAll();
        const data = fetchData(res);
        setAllPartner(res);
        setPartnerList(data);
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    };

    fetchPartnerList();
  }, []);

  useEffect(() => {
    const listMer = allPartner;
    const filterMerchant = listMer.filter((part) =>
      removeAccents(part.name)
        .toLowerCase()
        .match(removeAccents(findName).toLowerCase())
    );

    const data = fetchData(filterMerchant);

    setPartnerList(data);
  }, [findName]);

  useEffect(() => {
    const listMer = allPartner;
    const filterMerchant = listMer.filter((part) =>
      removeAccents(part.address)
        .toLowerCase()
        .match(removeAccents(findAddress).toLowerCase())
    );

    const data = fetchData(filterMerchant);

    setPartnerList(data);
  }, [findAddress]);

  return (
    <div>
      <div className="find-group">
        <input
          type="text"
          placeholder="Tên đối tác"
          onChange={(e) => setFindName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Địa chỉ"
          onChange={(e) => setFindAddress(e.target.value)}
        />
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
