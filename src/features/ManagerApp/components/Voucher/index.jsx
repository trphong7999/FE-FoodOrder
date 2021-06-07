import React, { useEffect, useState } from "react";
import "./style.scss";
import { Button } from "@material-ui/core";
import DataTable from "components/DataTable";
import Modal from "react-modal";
import voucherApi from "api/voucherApi";
import emoji from "react-emoji";
import axios from "axios";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
  },
};

const columns = [
  { field: "id", headerName: "STT", width: 80 },
  { field: "name", headerName: "Tên Voucher", width: 230 },
  {
    field: "description",
    headerName: "Mô tả",
    width: 500,
  },
  {
    field: "count",
    headerName: "Số lượng",
    width: 130,
  },
  {
    field: "retained",
    headerName: "Còn lại",
    width: 130,
  },
  {
    field: "action",
    headerName: "Hành động",
    id: "links",
    width: 150,
    renderCell: (params) => {
      // const [open, setOpen] = useState(false);
      const removeVoucher = async (params) => {
        const res = await voucherApi.remove({ id: params.row._id });
      };
      const modifyVoucher = (params) => {
        params.row.setVoucherModify(params.row);
        params.row.setOpen(true);
      };
      // const handleClose = () => {
      //   setOpen(false);
      // };
      return (
        <div className="call-to-action-voucher">
          <div onClick={() => modifyVoucher(params)}>{"Sửa"}</div>
          <div onClick={() => removeVoucher(params)}>{"Xóa"}</div>
        </div>
      );
    },
  },
];

function Voucher() {
  const [voucherList, setVoucherList] = useState([]);
  const [voucherListFiltered, setVoucherListFiltered] = useState([]);
  const [voucherModify, setVoucherModify] = useState(null);
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [keyFilter, setKeyFilter] = useState("");
  const [filterBanner, setFilterBanner] = useState(false);
  const voucherListTable = voucherListFiltered.map((vc, idx) => ({
    ...vc,
    id: idx + 1,
    setOpen,
    setVoucherModify,
    setRefresh,
  }));

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setVoucherModify(null);
  };

  useEffect(() => {
    const fetchVoucherList = async () => {
      const res = await voucherApi.getAll();
      setVoucherList(res);
      setVoucherListFiltered(res);
    };

    fetchVoucherList();
  }, [refresh]);

  const filterVoucher = () => {
    const vcs = voucherList.filter((vc) =>
      vc.name.toUpperCase().includes(keyFilter.toUpperCase()) && filterBanner
        ? vc.banner == true
        : true
    );
    setVoucherListFiltered([...vcs]);
  };

  useEffect(() => {
    filterVoucher();
  }, [filterBanner]);

  return (
    <>
      <div className="find-group">
        <input
          type="checkbox"
          checked={filterBanner}
          onChange={(e) => setFilterBanner(e.target.checked)}
        />

        <input
          type="text"
          placeholder="Tên voucher"
          value={keyFilter}
          onChange={(e) => setKeyFilter(e.target.value)}
        />
        <Button
          variant="contained"
          className="btn"
          onClick={() => filterVoucher()}
        >
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
        <DataTable rows={voucherListTable} columns={columns} />
      </div>
      <Modal isOpen={open} onRequestClose={handleClose} style={customStyles}>
        <ModalCreateVoucher
          handleClose={handleClose}
          voucherModify={voucherModify}
          setVoucherModify={setVoucherModify}
          setRefresh={setRefresh}
        />
      </Modal>
    </>
  );
}

export default Voucher;

function ModalCreateVoucher({
  handleClose,
  voucherModify,
  setVoucherModify,
  setRefresh,
}) {
  const [name, setName] = useState(voucherModify ? voucherModify.name : "");
  const [description, setDescription] = useState(
    voucherModify ? voucherModify.description : ""
  );
  const [count, setCount] = useState(voucherModify ? voucherModify.count : 0);
  const [discount, setDiscount] = useState(
    voucherModify ? voucherModify.discount : 0
  );
  const [condition, setCondition] = useState(
    voucherModify ? voucherModify.condition : 0
  );
  const [img, setImg] = useState(voucherModify ? voucherModify.img : "");
  const [code, setCode] = useState(voucherModify ? voucherModify.code : "");
  const [valid, setValid] = useState(
    voucherModify ? voucherModify.valid : true
  );
  const [banner, setBanner] = useState(
    voucherModify ? voucherModify.banner : false
  );

  const handleUploadImg = async (e) => {
    let newAvt = e.target.files;

    const formData = new FormData();
    formData.append("file", newAvt[0]);
    formData.append("upload_preset", "zjd6i9ar");

    let avt = await axios
      .post("https://api.cloudinary.com/v1_1/soosoo/image/upload", formData)
      .then((res) => {
        return res.data.secure_url;
      })
      .catch((error) => {
        console.log(error);
      });
    setImg(avt);
  };

  const handleCreateVoucher = async () => {
    const voucherObj = {
      name,
      description,
      count,
      img,
      discount,
      condition,
      code,
      retained: count,
      valid,
      banner,
    };
    let res;
    if (voucherModify) {
      res = await voucherApi.modify({
        id: voucherModify._id,
        change: { ...voucherObj },
      });
    } else {
      res = await voucherApi.createVoucher(voucherObj);
    }
    if (res.data && res.data.code == 11000) console.log("Code đã bị trùng");
    else {
      setVoucherModify(null);
      setRefresh({});
      handleClose();
    }
  };

  return (
    <div className="modal-voucher">
      <div className="form-voucher">
        <div className="field-wrap">
          <label className="required-field">Tên voucher</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tên voucher"
            required
          />
        </div>
        <div className="field-wrap">
          <label className="required-field">Mã Code</label>
          <input
            type="text"
            name="code"
            value={code}
            maxLength="15"
            minLength="3"
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="Nhập mã code"
            required
          />
        </div>
        <div className="field-wrap">
          <label className="required-field">Mô tả</label>
          <textarea
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Mô tả"
            required
          />
        </div>
        <div className="field-wrap">
          <label className="required-field">Giảm</label>
          <input
            type="number"
            name="discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="Nhập số tiền giảm"
            required
          />
        </div>
        <div className="field-wrap">
          <label className="required-field">Đơn từ</label>
          <input
            type="number"
            name="condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            placeholder="Nhập điều kiện"
            required
          />
        </div>
        <div className="field-wrap">
          <label className="required-field">Số lượng</label>
          <input
            type="number"
            name="count"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            placeholder="Số lượng"
            required
          />
        </div>
        <div className="field-wrap">
          <label className="required-field">Có hiệu lực</label>
          <input
            type="checkbox"
            name="valid"
            value={valid}
            checked={valid}
            onChange={(e) => setValid(e.target.checked)}
            required
          />
        </div>
        <div className="field-wrap">
          <label className="required-field">Hiển thị Banner</label>
          <input
            type="checkbox"
            name="banner"
            value={banner}
            checked={banner}
            onChange={(e) => setBanner(e.target.checked)}
            required
          />
        </div>
        <div className="field-wrap">
          <label className="required-field">Ảnh</label>
          <input
            id="file-input-user"
            type="file"
            onChange={(e) => handleUploadImg(e)}
          />
        </div>
      </div>
      <div className="preview-voucher">
        <div className="modal-discount">
          <div className="discount-title">{name}</div>
          <div className="discount-content">
            <img src={img} alt="img-preview" className="discount-img" />
            <div className="discount-head">{name}</div>
            <div className="discount-text">{emoji.emojify(description)}</div>
          </div>
        </div>
      </div>
      <button className="btn-create" onClick={() => handleCreateVoucher()}>
        {voucherModify ? "Sửa Voucher" : "Tạo voucher"}
      </button>
      <button className="btn-cancel" onClick={handleClose}>
        Quay lại
      </button>
    </div>
  );
}
