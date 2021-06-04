import React, { useState } from "react";
import DataTable from "components/DataTable";
import { Link, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import ModalForm from "../ModalRegisterMerchantForm";
import { useEffect } from "react";
import merchantApi from "api/merchantApi";

const columns = [
  { field: "id", headerName: "STT", width: 80 },
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
  // {
  //   field: "deduct",
  //   headerName: "Chiết khấu",
  //   width: 100,
  // },
  {
    field: "action",
    headerName: "Hành động",
    id: "links",
    width: 130,
    renderCell: (params) => {
      return (
        <Link to={{ pathname: `/manager/merchant/${params.getValue("_id")}` }}>
          {"Chi tiết"}
        </Link>
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
    }));
    return final;
  };

  useEffect(() => {
    const fetchMerchantsList = async () => {
      try {
        // const params = {
        //   _page: 1,
        //   _limit: 10,

        // };
        const res = await merchantApi.getAll();
        const data = fetchData(res);
        setMerchantList(data);
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

    setMerchantList(data);
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
