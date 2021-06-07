import React, { useEffect, useState } from "react";
import {
  FcBullish,
  FcCurrencyExchange,
  FcHome,
  FcInspection,
  FcShop,
  FcSportsMode,
} from "react-icons/fc";
import "./style.scss";
import orderApi from "api/orderApi";
import userApi from "api/userApi";
import { validatePrice } from "func";
import merchantApi from "api/merchantApi";
import partnerApi from "api/partnerApi";

function DashBoard(props) {
  const [ordersMonth, setOrdersMonth] = useState([]);
  const [ordersYear, setOrdersYear] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const [userInMonth, setUserInMonth] = useState([]);
  const [allMerchant, setAllMerchant] = useState([]);
  const [merchantMonth, setMerchantMonth] = useState([]);
  const [partnerAll, setPartnerAll] = useState([]);
  const [partnerMonth, setPartnerMonth] = useState([]);
  const totalInMonth = ordersMonth.reduce((val, od) => {
    if (od.status === "complete") {
      return (
        val +
        parseInt(od.detail.total) * (parseInt(od.merchantId.deduct) / 100) +
        parseInt(od.detail.fee) * 0.1 -
        parseInt(od.detail.discount)
      );
    }
    return val;
  }, 0);

  const totalInYear = ordersYear.reduce((val, od) => {
    if (od.status === "complete") {
      return (
        val +
        parseInt(od.detail.total) * (parseInt(od.merchantId.deduct) / 100) +
        parseInt(od.detail.fee) * 0.1 -
        parseInt(od.detail.discount)
      );
    }
    return val;
  }, 0);

  useEffect(() => {
    const fetchOrdersInMonthByTime = async (date) => {
      const res = await orderApi.getOrderMonthByTime(date);
      if (!res.status) setOrdersMonth([...res.orders]);
    };
    fetchOrdersInMonthByTime(Date.now());

    const fetchOrdersInYearByTime = async (date) => {
      const res = await orderApi.getOrderYearByTime(date);
      if (!res.status) setOrdersYear([...res.orders]);
    };
    fetchOrdersInYearByTime(Date.now());

    const fetchAllUser = async () => {
      const res = await userApi.getAllUser();
      if (!res.status) setAllUser([...res]);
    };
    fetchAllUser();

    const fetchAllUserInMonth = async (date) => {
      const res = await userApi.getUserInMonth(date);
      if (!res.status) setUserInMonth([...res]);
    };
    fetchAllUserInMonth(Date.now());

    const fetchAllMerchant = async () => {
      const res = await merchantApi.getAll();
      if (!res.status) setAllMerchant([...res]);
    };
    fetchAllMerchant();

    const fetchAllMerchantInMonth = async (date) => {
      const res = await merchantApi.getInMonth(date);
      if (!res.status) setMerchantMonth([...res]);
    };
    fetchAllMerchantInMonth(Date.now());

    const fetchAllPartnerMonth = async (date) => {
      const res = await partnerApi.getAllInMonth(date);
      if (!res.status) setPartnerMonth([...res]);
    };
    fetchAllPartnerMonth(Date.now());

    const fetchAllPartner = async () => {
      const res = await partnerApi.getAll();
      if (!res.status) setPartnerAll([...res]);
    };
    fetchAllPartner();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "5rem",
        }}
      >
        <CartTotal
          total={totalInMonth}
          labelLeft="VNĐ"
          labelMidTop="Doanh thu"
          labelMidBot="Tháng"
          Icon={FcCurrencyExchange}
        />
        <CartTotal
          total={totalInYear}
          labelLeft="VNĐ"
          labelMidTop="Doanh thu"
          labelMidBot="Năm"
          Icon={FcCurrencyExchange}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "5rem",
        }}
      >
        <CartTotal
          total={ordersMonth.length}
          labelLeft="đơn"
          labelMidTop="Số lượng đơn"
          labelMidBot="Tháng"
          Icon={FcInspection}
        />
        <CartTotal
          total={ordersYear.length}
          labelLeft="đơn"
          labelMidTop="Số lượng đơn"
          labelMidBot="Năm"
          Icon={FcInspection}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "5rem",
        }}
      >
        <CartTotal
          total={userInMonth.length}
          labelLeft="Users"
          labelMidTop="Số lượng"
          labelMidBot="Tháng"
          Icon={FcBullish}
        />
        <CartTotal
          total={allUser.length}
          labelLeft="Users"
          labelMidTop="Số lượng"
          labelMidBot="Năm"
          Icon={FcBullish}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "5rem",
        }}
      >
        <CartTotal
          total={merchantMonth.length}
          labelLeft="Đại lý"
          labelMidTop="Tổng đăng ký"
          labelMidBot="Tháng"
          Icon={FcShop}
        />
        <CartTotal
          total={allMerchant.length}
          labelLeft="Đại lý"
          labelMidTop="Tổng đăng ký"
          labelMidBot="Năm"
          Icon={FcShop}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "5rem",
        }}
      >
        <CartTotal
          total={partnerMonth.length}
          labelLeft="Đối tác"
          labelMidTop="Tổng đăng ký"
          labelMidBot="Tháng"
          Icon={FcSportsMode}
        />
        <CartTotal
          total={partnerAll.length}
          labelLeft="Đối tác"
          labelMidTop="Tổng đăng ký"
          labelMidBot="Năm"
          Icon={FcSportsMode}
        />
      </div>
    </div>
  );
}

export default DashBoard;

function CartTotal({ total, labelLeft, labelMidTop, labelMidBot, Icon }) {
  return (
    <div className="card-total">
      <div
        style={{
          fontSize: "3rem",
          fontWeight: "700",
          lineHeight: "1.2",
          color: "rgb(79, 79, 79)",
        }}
      >
        {validatePrice(total)} {labelLeft}
      </div>
      <div>
        <div
          style={{
            fontSize: "2.2rem",
            fontWeight: "500",
            color: "rgb(79, 79, 79)",
          }}
        >
          {labelMidTop}
        </div>
        <div style={{ fontSize: "1.8rem", color: "#888" }}>{labelMidBot}</div>
      </div>
      <div>
        <Icon size="70" />
      </div>
    </div>
  );
}
