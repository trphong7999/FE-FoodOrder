import React, { useState } from "react";
import DataTable from "components/DataTable";
import { Link, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import ModalForm from "../ModalRegisterMerchantForm";
import { useEffect } from "react";
import merchantApi from "api/merchantApi";

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

const block = async (id, status) => {
  const res = await merchantApi.blockMerchant({ id, status });
  if (res.status !== 400) alert("Thành công");
  else alert("Không thành công");
  window.location.reload();
};

const columns = [
  { field: "id", headerName: "STT", width: 80, align: "center" },
  { field: "name", headerName: "Tên cơ sở", width: 230 },
  { field: "representative", headerName: "Người đại diện", width: 220 },
  {
    field: "email",
    headerName: "Tài khoản cấp",
    width: 200,
  },
  {
    field: "address",
    headerName: "Địa chỉ",
    width: 320,
  },
  {
    field: "deduct",
    headerName: "Chiết khấu",
    width: 130,
    align: "center",
  },
  {
    field: "action",
    headerName: "Hành động",
    id: "links",
    width: 185,
    renderCell: (params) => {
      return (
        <div>
          <Link
            to={{ pathname: `/manager/merchant/${params.getValue("_id")}` }}
            style={style}
          >
            {"Chi tiết"}
          </Link>
          <span
            style={style}
            onClick={() =>
              block(params.getValue("_id"), params.getValue("status"))
            }
          >
            {params.getValue("status") === "suspend" ? "Bỏ chặn" : "Chặn"}
          </span>
        </div>
      );
    },
  },
];

function ManageMerchant(props) {
  const [open, setOpen] = useState(false);
  const [merchantList, setMerchantList] = useState([]);
  const [allDataMerchant, setAllDataMerchant] = useState([]);
  const [findNameMer, setFindNameMer] = useState("");
  const [findNameRep, setFindNameRep] = useState("");

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

  const fetchData = (listMer) => {
    const final = listMer.map((merchant, index) => ({
      id: index + 1,
      name: merchant.name,
      representative: merchant.representative.name,
      email: merchant.email,
      address: merchant.location.address,
      deduct: merchant.deduct,
      _id: merchant._id,
      status: merchant.status,
    }));
    return final;
  };

  useEffect(() => {
    const fetchMerchantsList = async () => {
      try {
        const res = await merchantApi.getAll();
        const data = fetchData(res);
        setMerchantList(
          data.sort((pre, next) => ("" + pre.status).localeCompare(next.status))
        );
        setAllDataMerchant(res);
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    };

    fetchMerchantsList();
  }, []);

  useEffect(() => {
    const listMer = allDataMerchant;
    const filterMerchant = listMer.filter((mer) =>
      removeAccents(mer.representative.name)
        .toLowerCase()
        .match(removeAccents(findNameRep).toLowerCase())
    );

    const data = fetchData(filterMerchant);

    setMerchantList(
      data.sort((pre, next) => ("" + pre.status).localeCompare(next.status))
    );
  }, [findNameRep]);

  useEffect(() => {
    const listMer = allDataMerchant;
    const filterMerchant = listMer.filter((mer) =>
      removeAccents(mer.name)
        .toLowerCase()
        .match(removeAccents(findNameMer).toLowerCase())
    );

    const data = fetchData(filterMerchant);

    setMerchantList(data);
  }, [findNameMer]);

  return (
    <>
      <div className="find-group">
        <input
          type="text"
          placeholder="Tên cơ sở"
          onChange={(e) => setFindNameMer(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tên người đại diện"
          onChange={(e) => setFindNameRep(e.target.value)}
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
        <DataTable rows={merchantList} columns={columns} />
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
