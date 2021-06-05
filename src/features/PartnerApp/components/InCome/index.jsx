import React, { useEffect, useState } from "react";
import {
  FaRegCalendarAlt,
  FaCaretDown,
  FaClipboardList,
  FaSmile,
  FaAngry,
  FaTimesCircle,
  FaMeh,
  FaKiss,
  FaSadTear,
  FaChevronLeft,
} from "react-icons/fa";
import {
  RiMoneyDollarCircleFill,
  RiArrowRightSLine,
  RiUserLocationFill,
} from "react-icons/ri";
import { BsClockFill } from "react-icons/bs";
import "./style.scss";
import orderApi from "api/orderApi";
import {
  formatDatetimeToStringDate,
  formatDatetimeToStringDateWithoutYear,
  datetimeFromTimestamp,
  validatePrice,
} from "func";
import { toast, ToastContainer } from "react-toastify";

export default function InCome() {
  const [ordersWeek, setOrderWeek] = useState([]);
  const [currentFetch, setCurrentFetch] = useState(0);
  useEffect(() => {
    const fetchOrdersInWeekByTime = async (date) => {
      const res = await orderApi.getOrderInWeekByTime(date);
      // if (res.orders.length !== 0 || res.orders.length !== 0)
      setOrderWeek([...ordersWeek, res]);
    };
    fetchOrdersInWeekByTime(Date.now() - 604800000 * currentFetch);
  }, [currentFetch]);

  return (
    <div className="in-come">
      <div className="in-come__title">thu nhập</div>

      <div className="in-come__debt">
        <div className="debt-text">Bạn đang nợ công ty 360,972đ</div>
        <div className="debt-action">Thanh toán</div>
      </div>
      <div className="in-come__list">
        {ordersWeek && ordersWeek.length > 0
          ? ordersWeek.map((infos) => <InComeWeek infos={infos} />)
          : ""}
        {/* <InComeWeek />
        <InComeWeek /> */}
      </div>
      <div style={{ textAlign: "center" }}>
        <button
          onClick={() => setCurrentFetch(currentFetch + 1)}
          style={{ padding: "0.5rem 1rem", borderRadius: "12px" }}
        >
          Hiển thị thêm
        </button>
      </div>
    </div>
  );
}

function InComeWeek({ infos }) {
  const [showWeekContent, setshowWeekContent] = useState(false);

  const warningOpen = () => toast.warn("😮 Không có dữ liệu đơn hàng!");

  const handleChangeShowWeekContent = () => {
    if (infos.orders.length === 0) warningOpen();
    else setshowWeekContent(!showWeekContent);
  };
  const { monday, sunday, orders, ordersCanceled } = infos;
  console.log(monday, sunday, orders, ordersCanceled);

  return (
    <div className="in-come__week">
      <div className="week-time" onClick={handleChangeShowWeekContent}>
        <FaRegCalendarAlt className="week-time__icon-calendar" />
        <span>
          Tuần {formatDatetimeToStringDate(new Date(+monday))} -{" "}
          {formatDatetimeToStringDate(new Date(+sunday))}
        </span>
        <FaCaretDown className="week-time__icon-down" />
      </div>
      <ToastContainer />
      <WeekContent
        showWeekContent={showWeekContent}
        orders={orders}
        ordersCanceled={ordersCanceled}
        monday={monday}
      />
    </div>
  );
}

function WeekContent({ showWeekContent, orders, ordersCanceled, monday }) {
  const [showDayContent, setShowDayContent] = useState(false);
  const [currentDayContent, setCurrentDayContent] = useState(null);
  const [currentDay, setCurrentDay] = useState(null);

  const handleOpenDayContent = (time) => {
    setShowDayContent(true);
    const start = +getTimeStartDay(time);
    const end = +getTimeEndDay(time);
    const ordersInDay = orders.filter(
      (od) => end > +od.timeOrder && +od.timeOrder > start
    );
    setCurrentDay(time);
    setCurrentDayContent([...ordersInDay]);
  };

  const handleCloseDayContent = () => {
    setShowDayContent(false);
  };
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
      if (end > +od.timeOrder && +od.timeOrder > start) {
        return val + (od.detail.fee * 90) / 100;
      }
      return val;
    }, 0);
  };

  const totalReturn = orders.reduce((val, od) => {
    return (
      val + od.detail.total * 0.2 + od.detail.fee * 0.1 - od.detail.discount
    );
  }, 0);

  return (
    <div
      className="week-content"
      style={{ display: `${showWeekContent ? "block" : "none"}` }}
    >
      <div className="week-content__percent">
        <div className="percent-text">
          <FaClipboardList className="percent-text__icon" />
          <span>Tỷ lệ hoàn thành</span>
        </div>
        <div className="percent-number">
          {(
            (orders.length / (orders.length + ordersCanceled.length)) *
            100
          ).toFixed(2)}{" "}
          %
        </div>
      </div>

      <div className="week-content__work">
        <div className="work-head">
          <div>Đơn hoàn thành</div>
          <div>Đơn không hoàn thành</div>
        </div>
        <div className="work-body">
          <div className="work-body__colum work-body__colum--good">
            <FaSmile />
            <div>Tốt</div>
            <div>
              {
                orders.filter(
                  (od) => od.reviewPartner && od.reviewPartner.rate > 3
                ).length
              }{" "}
              đơn
            </div>
          </div>
          <div className="work-body__colum work-body__colum--normal">
            <FaMeh />
            <div>B.Thường</div>
            <div>
              {
                orders.filter(
                  (od) => od.reviewPartner && od.reviewPartner.rate === 3
                ).length
              }{" "}
              đơn
            </div>
          </div>
          <div className="work-body__colum work-body__colum--bad">
            <FaAngry />
            <div>K.Tốt</div>
            <div>
              {
                orders.filter(
                  (od) => od.reviewPartner && od.reviewPartner.rate < 3
                ).length
              }{" "}
              đơn
            </div>
          </div>
          <div className="work-body__colum work-body__colum--not">
            <FaKiss />
            <div>Chưa Đánh Giá</div>
            <div>{orders.filter((od) => !od.reviewPartner).length} đơn</div>
          </div>
          <div className="work-body__colum work-body__colum--miss">
            <FaSadTear />
            <div>Khách Hủy</div>
            <div>{orders.filter((od) => od.status == "cancel").length} đơn</div>
          </div>
          <div className="work-body__colum work-body__colum--quit">
            <FaTimesCircle />
            <div>Quit</div>
            <div>{ordersCanceled.length} đơn</div>
          </div>
        </div>
      </div>

      <div className="week-content__must-turn">
        <div className="must-turn__item">
          <RiMoneyDollarCircleFill className="must-turn__item-icon" />
          <span>Phải nộp</span>
        </div>
        <div className="must-turn__item">
          <span style={{ color: totalReturn < 0 ? "green" : "" }}>
            {validatePrice(totalReturn > 0 ? totalReturn : -totalReturn)}đ
          </span>
          <RiArrowRightSLine className="must-turn__item-icon" />
        </div>
      </div>

      <div className="week-content__debt-day">
        <div className="debt-day__list">
          {[...Array(7)].map((val, index) => (
            <div
              className="debt-day__list-item"
              onClick={() =>
                handleOpenDayContent(
                  new Date(monday + minisecondOfHour * index)
                )
              }
            >
              <div>
                {validatePrice(
                  getIncomeOfDayByDatetime(
                    new Date(monday + minisecondOfHour * index)
                  )
                )}
                đ
              </div>
              <div>
                {formatDatetimeToStringDateWithoutYear(
                  new Date(monday + minisecondOfHour * index)
                )}
              </div>
              <div>{index === 6 ? `CN` : `T${index + 2}`}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="week-content__average">
        <div className="average-item">
          <BsClockFill className="average-item__icon" />
          <span>Thời gian trung bình</span>
          <span>
            {orders.reduce((val, od) => {
              console.log(val);
              if (od.status === "complete")
                return (
                  val +
                  parseInt(od.timeDeliverDone) -
                  parseInt(od.timePartnerReceive)
                );
              return val;
            }, 0) /
              60000 /
              orders.filter((od) => od.status === "complete").length}
            '
          </span>
        </div>
        <div className="average-item">
          <RiUserLocationFill className="average-item__icon" />
          <span>Khoảng cách trung bình</span>
          <span>
            {orders.reduce(
              (val, od) => (val + od.status === "cancel" ? 0 : od.distance),
              0
            ) / orders.filter((od) => od.status === "complete").length}
            km
          </span>
        </div>
      </div>

      {currentDayContent ? (
        <DayContent
          showDayContent={showDayContent}
          callBackCloseDayContent={handleCloseDayContent}
          currentDayContent={currentDayContent}
          currentDay={currentDay}
        />
      ) : (
        ""
      )}
    </div>
  );
}

function DayContent({
  showDayContent,
  callBackCloseDayContent,
  currentDayContent,
  currentDay,
}) {
  const sendDataShowDayContent = () => {
    callBackCloseDayContent();
  };
  return (
    <div
      className="day-content"
      style={{ display: `${showDayContent ? "block" : "none"}` }}
    >
      <div className="day-content__title">
        <FaChevronLeft
          className="title-back"
          onClick={sendDataShowDayContent}
        />
        Thu nhập ngày ({formatDatetimeToStringDateWithoutYear(currentDay)})
      </div>
      <div className="day-content__quantity-order">
        Tổng:{currentDayContent.length} đơn
      </div>
      <div className="day-content__orders">
        <ul className="orders-list">
          {currentDayContent.map((od) => (
            <li>
              <div className="list-item">
                <div className="list-item__left">
                  <div className="left-time">
                    {datetimeFromTimestamp(od.timeDeliverDone)}
                  </div>
                  <div className="left-code">
                    <div>Đơn hàng</div>
                    <div>#{od._id}</div>
                  </div>
                </div>
                <div className="list-item__amount--green">
                  + {validatePrice((od.detail.fee * 90) / 100)}đ
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
