import { formatDatetimeToStringDateWithoutYear, validatePrice } from "func";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import "./style.scss";

function PrintReport() {
  const orders = useLocation().state.orders;
  const monday = useLocation().state.monday;
  const totalReturn = useLocation().state.totalReturn;
  const [type, setType] = useState(1);
  const [foodSpread, setFoodSpread] = useState([]);
  const minisecondOfHour = 86400000;

  const getTimeStartDay = (date) => {
    return new Date(new Date(new Date(date).setHours(0)).setMinutes(1));
  };
  const getTimeEndDay = (date) => {
    return new Date(new Date(new Date(date).setHours(23)).setMinutes(59));
  };
  const getIncomeOfDayByDatetime = (time) => {
    const start = +getTimeStartDay(time);
    const end = +getTimeEndDay(time);
    return orders.reduce((val, od) => {
      if (
        end > +od.timeOrder &&
        +od.timeOrder > start &&
        od.timePartnerGetFood
      ) {
        return (
          val + od.detail.total * ((100 - parseInt(od.merchantId.deduct)) / 100)
        );
      }
      return val;
    }, 0);
  };

  useEffect(() => {
    let foods = orders.filter((od) => od.timePartnerGetFood);
    foods = orders.map((item) => item.detail.foods);
    let food = [].concat.apply([], foods);
    let ff = food.reduce((val, item) => {
      console.log(val);
      let index = val.findIndex((val) => val.name.includes(item.name));
      if (index > -1) {
        val[index].quantity = val[index].quantity + item.quantity;
        val[index].total = val[index].total + item.total;
      } else val.push(item);
      return val;
    }, []);
    setFoodSpread([...ff]);
  }, []);

  const getCountByDay = (time) => {
    const start = +getTimeStartDay(time);
    const end = +getTimeEndDay(time);
    return orders.reduce((val, od) => {
      if (
        end > +od.timeOrder &&
        +od.timeOrder > start &&
        od.timePartnerGetFood
      ) {
        return val + 1;
      }
      return val;
    }, 0);
  };
  return (
    <div>
      <div style={{ textAlign: "center" }} className="hide-on-print">
        <h3> Báo cáo theo </h3>
        <select onChange={(e) => setType(e.target.value)}>
          <option value="1">Theo ngày</option>
          <option value="2">Theo món ăn</option>
          <option value="3">Theo đơn</option>
        </select>
        <button class="hide-on-print" onClick={() => window.print()}>
          Print
        </button>
      </div>
      {type == 1 ? (
        <div
          style={{
            border: "1px solid #000",
            padding: "1rem 4rem",
            width: "80%",
            margin: "0 auto",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              fontSize: "3rem",
              textTransform: "uppercase",
            }}
          >
            Báo cáo doanh thu tuần theo ngày <br />
            <div style={{ marginTop: "1.3rem" }}>
              {" "}
              {formatDatetimeToStringDateWithoutYear(new Date(+monday)) +
                ` - ` +
                formatDatetimeToStringDateWithoutYear(
                  new Date(+monday + minisecondOfHour * 7)
                )}
            </div>
          </h1>
          <p>Cơ sở bán hàng: {orders[0].merchantId.name}</p>
          <p>Địa chỉ: {orders[0].merchantId.location.address}</p>
          <p>SĐT: {orders[0].merchantId.phone}</p>
          <p>Chiết khấu quán: {orders[0].merchantId.deduct} %</p>

          <table class="print-receipt">
            <tr>
              <th>Ngày</th>
              <th>Lượng đơn bán</th>
              <th>Doanh thu sau chiết khấu</th>
            </tr>
            {[...Array(7)].map((val, index) => (
              <tr>
                <td>
                  {" "}
                  {formatDatetimeToStringDateWithoutYear(
                    new Date(
                      new Date(+monday).setHours(0) + minisecondOfHour * index
                    )
                  )}
                </td>
                <td>
                  {getCountByDay(
                    new Date(
                      new Date(+monday).setHours(0) + minisecondOfHour * index
                    )
                  )}
                </td>
                <td>
                  {" "}
                  {validatePrice(
                    getIncomeOfDayByDatetime(
                      new Date(
                        new Date(+monday).setHours(0) + minisecondOfHour * index
                      )
                    )
                  )}
                  đ
                </td>
              </tr>
            ))}
            <tr>
              <th>Tổng</th>
              <th></th>
              <th>{validatePrice(totalReturn)}</th>
            </tr>
          </table>
          <div
            style={{
              textAlign: "center",
              marginLeft: "44rem",
              marginTop: "3rem",
            }}
          >
            <i style={{ fontSize: "1.5rem", margin: "2rem 0" }}>
              Hải Phòng ngày ... tháng ... năm ...
            </i>
            <h2>Chữ ký quản lý</h2>
            <i>Ký và ghi rõ họ tên</i>
          </div>
        </div>
      ) : (
        <div
          style={{
            border: "1px solid #000",
            padding: "1rem 4rem",
            width: "80%",
            margin: "0 auto",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              fontSize: "3rem",
              textTransform: "uppercase",
            }}
          >
            Báo cáo doanh thu tuần theo món ăn <br />
            <div style={{ marginTop: "1.3rem" }}>
              {" "}
              {formatDatetimeToStringDateWithoutYear(new Date(+monday)) +
                ` - ` +
                formatDatetimeToStringDateWithoutYear(
                  new Date(+monday + minisecondOfHour * 7)
                )}
            </div>
          </h1>
          <p>Cơ sở bán hàng: {orders[0].merchantId.name}</p>
          <p>Địa chỉ: {orders[0].merchantId.location.address}</p>
          <p>SĐT: {orders[0].merchantId.phone}</p>
          <p>Chiết khấu quán: {orders[0].merchantId.deduct} %</p>

          <table class="print-receipt">
            <tr>
              <th>Tên món</th>
              <th>Số lượng bán</th>
              <th>Tổng giá trị đơn</th>
              <th>Doanh thu sau chiết khấu</th>
            </tr>
            {foodSpread.map((val, index) => (
              <tr>
                <td>{val.name}</td>
                <td>{val.quantity}</td>
                <td>{validatePrice(val.total)}</td>
                <td>{validatePrice(val.total * 0.9)}</td>
              </tr>
            ))}
            <tr>
              <th>Tổng</th>
              <th></th>
              <th></th>
              <th>{validatePrice(totalReturn)}</th>
            </tr>
          </table>
          <div
            style={{
              textAlign: "center",
              marginLeft: "44rem",
              marginTop: "3rem",
            }}
          >
            <i style={{ fontSize: "1.5rem", margin: "2rem 0" }}>
              Hải Phòng ngày ... tháng ... năm ...
            </i>
            <h2>Chữ ký quản lý</h2>
            <i>Ký và ghi rõ họ tên</i>
          </div>
        </div>
      )}
    </div>
  );
}

export default PrintReport;
