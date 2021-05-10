import React, { useState } from "react";
import {
  FaRegCalendarAlt,
  FaCaretDown,
  FaClipboardList,
  FaSmile,
  FaAngry,
  FaTimesCircle,
  FaSadCry,
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

export default function InCome() {
  return (
    <div className="in-come">
      <div className="in-come__title">thu nhập</div>
      <div className="in-come__time-update">
        Dữ liệu cập nhật lúc 10:20 ngày 13/06/2021
      </div>
      <div className="in-come__debt">
        <div className="debt-text">Bạn đang nợ công ty 360,972đ</div>
        <div className="debt-action">Thanh toán</div>
      </div>
      <div className="in-come__list">
        <InComeWeek />
        <InComeWeek />
      </div>
    </div>
  );
}

function InComeWeek() {
  const [showWeekContent, setshowWeekContent] = useState(false);

  const handleChangeShowWeekContent = () => {
    setshowWeekContent(!showWeekContent);
  };
  return (
    <div className="in-come__week">
      <div className="week-time" onClick={handleChangeShowWeekContent}>
        <FaRegCalendarAlt className="week-time__icon-calendar" />
        <span>Tuần 11/02 - 17/02</span>
        <FaCaretDown className="week-time__icon-down" />
      </div>

      <WeekContent showWeekContent={showWeekContent} />
    </div>
  );
}

function WeekContent({ showWeekContent }) {
  const [showDayContent, setShowDayContent] = useState(false);

  const handleOpenDayContent = () => {
    setShowDayContent(true);
  };

  const handleCloseDayContent = () => {
    setShowDayContent(false);
  };
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
        <div className="percent-number">100 %</div>
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
            <div>9 đơn</div>
          </div>
          <div className="work-body__colum work-body__colum--bad">
            <FaAngry />
            <div>K.Tốt</div>
            <div>0 đơn</div>
          </div>
          <div className="work-body__colum work-body__colum--deny">
            <FaSadCry />
            <div>Từ chối</div>
            <div>0 đơn</div>
          </div>
          <div className="work-body__colum work-body__colum--miss">
            <FaSadTear />
            <div>Bỏ qua</div>
            <div>0 đơn</div>
          </div>
          <div className="work-body__colum work-body__colum--quit">
            <FaTimesCircle />
            <div>Quit</div>
            <div>0 đơn</div>
          </div>
        </div>
      </div>

      <div className="week-content__must-turn">
        <div className="must-turn__item">
          <RiMoneyDollarCircleFill className="must-turn__item-icon" />
          <span>Phải nộp</span>
        </div>
        <div className="must-turn__item">
          <span>58,583đ</span>
          <RiArrowRightSLine className="must-turn__item-icon" />
        </div>
      </div>

      <div className="week-content__debt-day">
        <div className="debt-day__list">
          <div className="debt-day__list-item" onClick={handleOpenDayContent}>
            <div>170.4k</div>
            <div>11/05</div>
            <div>T2</div>
          </div>
          <div className="debt-day__list-item" onClick={handleOpenDayContent}>
            <div>93.4k</div>
            <div>13/05</div>
            <div>T3</div>
          </div>
          <div className="debt-day__list-item" onClick={handleOpenDayContent}>
            <div>0k</div>
            <div>11/05</div>
            <div>T4</div>
          </div>
          <div className="debt-day__list-item" onClick={handleOpenDayContent}>
            <div>0k</div>
            <div>14/05</div>
            <div>T5</div>
          </div>
          <div className="debt-day__list-item" onClick={handleOpenDayContent}>
            <div>0k</div>
            <div>15/05</div>
            <div>T6</div>
          </div>
          <div className="debt-day__list-item" onClick={handleOpenDayContent}>
            <div>0k</div>
            <div>16/05</div>
            <div>T7</div>
          </div>
          <div className="debt-day__list-item" onClick={handleOpenDayContent}>
            <div>0k</div>
            <div>17/05</div>
            <div>CN</div>
          </div>
        </div>
      </div>

      <div className="week-content__average">
        <div className="average-item">
          <BsClockFill className="average-item__icon" />
          <span>Thời gian trung bình</span>
          <span>30'</span>
        </div>
        <div className="average-item">
          <RiUserLocationFill className="average-item__icon" />
          <span>Khoảng cách trung bình</span>
          <span>3.2 km</span>
        </div>
      </div>

      <DayContent
        showDayContent={showDayContent}
        callBackCloseDayContent={handleCloseDayContent}
      />
    </div>
  );
}

function DayContent({ showDayContent, callBackCloseDayContent }) {
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
        Thu nhập ngày (17/06)
      </div>
      <div className="day-content__quantity-order">Tổng: 5 đơn</div>
      <div className="day-content__orders">
        <ul className="orders-list">
          <li>
            <div className="list-item">
              <div className="list-item__left">
                <div className="left-time">14:51</div>
                <div className="left-code">
                  <span>Đơn hàng</span>
                  <span>#12545-645665</span>
                </div>
              </div>
              <div className="list-item__amount--green">70,200đ</div>
            </div>
          </li>
          <li>
            <div className="list-item">
              <div className="list-item__left">
                <div className="left-time">14:51</div>
                <div className="left-code">
                  <span>Đơn hàng</span>
                  <span>#12545-645665</span>
                </div>
              </div>
              <div className="list-item__amount--green">70,200đ</div>
            </div>
          </li>
          <li>
            <div className="list-item">
              <div className="list-item__left">
                <div className="left-time">14:51</div>
                <div className="left-code">
                  <span>Đơn hàng</span>
                  <span>#12545-645665</span>
                </div>
              </div>
              <div className="list-item__amount--red">70,200đ</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
