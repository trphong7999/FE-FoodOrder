import React, { useState } from "react";
import DataTable from "components/DataTable";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useEffect } from "react";
import userApi from "api/userApi";

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

const block = async (id, blocked) => {
  const res = await userApi.blockUser({ id, blocked });
  if (res.status !== 400) {
    alert(
      `${
        res === true
          ? "Chặn người dùng thành công"
          : "Bỏ chặn người dùng thành công"
      }`
    );
    window.location.reload();
  } else alert("Không thành công");
};

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
    field: "username",
    headerName: "UserName",
    width: 180,
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
            to={{ pathname: `/manager/user/${params.getValue("_id")}` }}
            style={style}
          >
            {"Chi tiết"}
          </Link>
          <span
            style={style}
            onClick={() =>
              block(params.getValue("_id"), params.getValue("block"))
            }
          >
            {params.getValue("block") ? "Bỏ chặn" : "Chặn"}
          </span>
        </div>
      );
    },
  },
];

function ManageCustomer(props) {
  const [userList, setUserList] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const [findName, setFindName] = useState("");
  const [findAddress, setFindAddress] = useState("");

  const removeAccent = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  };

  const fetchData = (listUser) => {
    const final = listUser.map((User, index) => ({
      id: index + 1,
      name: User.info.name === "" ? "Chưa bổ sung" : User.info.name,
      email: User.info.email === "" ? "Chưa bổ sung" : User.info.email,
      gender:
        User.info.gender === "male"
          ? "Nam"
          : User.info.gender === "female"
          ? "Nữ"
          : "Chưa bổ sung",
      address:
        User.info.location.address === ""
          ? "Chưa bổ sung"
          : User.info.location.address,
      phone: User.info.phone === "" ? "Chưa bổ sung" : User.info.phone,
      username: User.username,
      _id: User._id,
      block: User.blocked,
    }));
    return final;
  };

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const res = await userApi.getAllUser();
        console.log("cc", res);
        const data = fetchData(res);
        setAllUser(res);
        setUserList(data);
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    };

    fetchUserList();
  }, []);

  useEffect(() => {
    const listU = allUser;
    const filterUser = listU.filter((user) =>
      removeAccent(user.info.name)
        .toLowerCase()
        .match(removeAccent(findName).toLowerCase())
    );

    const data = fetchData(filterUser);

    setUserList(data);
  }, [findName]);

  useEffect(() => {
    const listU = allUser;
    const filterUser = listU.filter((user) =>
      removeAccent(user.info.location.address)
        .toLowerCase()
        .match(removeAccent(findAddress).toLowerCase())
    );

    const data = fetchData(filterUser);

    setUserList(data);
  }, [findAddress]);

  return (
    <div>
      <div className="find-group">
        <input
          type="text"
          placeholder="Tên khách hàng"
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
      </div>
      <div className="table-content" style={{ height: 400 }}>
        <DataTable rows={userList} columns={columns} />
      </div>
    </div>
  );
}

export default ManageCustomer;
