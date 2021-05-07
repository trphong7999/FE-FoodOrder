import Footer from "features/UserApp/components/Footer";
import Navbar from "features/UserApp/components/Navbar";
import React, { useState } from "react";
import ava1 from "assets/image/avartar/ava1.jpg";
import {
  RiAccountCircleFill,
  RiCalendarTodoFill,
  RiLockPasswordLine,
  RiMessage2Line,
  RiPhoneLine,
} from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { FaChevronRight, FaRegSmileBeam } from "react-icons/fa";
import { SiFacebook } from "react-icons/si";

import "./style.scss";
import "assets/css/base.scss";
import ModalFormChangePass from "features/UserApp/components/ModalProfile/FormChangePass";
import ModalFormChangeInfo from "features/UserApp/components/ModalProfile/FormChangeInfo";
import ModalFormChangePhone from "features/UserApp/components/ModalProfile/FormChangePhone";
import { Link, useRouteMatch } from "react-router-dom";
import RightColAccount from "features/UserApp/components/RightColAccount";

export default function AccountPage() {
  const match = useRouteMatch();
  const [account, setAccount] = useState({
    name: "trần duy phong",
    email: "phong75664@st.vimaru.edu.vn",
    dateOfBirth: "07/09/1999",
    phone: "0345029068",
    sex: 0,
  });

  const [showModal, setShowModal] = useState({
    passForm: false,
    infoForm: false,
    phoneForm: false,
  });

  // MODAL PASSWORD FORM
  const onChangeShowModalPass = () => {
    setShowModal({ passForm: true });
  };
  const callBackChangeShowModalPass = (childData) => {
    setShowModal({ passForm: childData });
  };

  // MODAL INFOMATION FORM
  const onChangeShowModalInfo = () => {
    setShowModal({ infoForm: true });
  };
  const callBackChangeShowModalInfo = (childData) => {
    setShowModal({ infoForm: childData });
  };

  // MODAL PHONE FORM
  const onChangeShowModalPhone = () => {
    setShowModal({ phoneForm: true });
  };
  const callBackChangeShowModalPhone = (childData) => {
    setShowModal({ phoneForm: childData });
  };

  return (
    <div className="account-page">
      <Navbar />

      <div className="account-page__container">
        <div className="grid wide">
          <div className="row">
            <div className="col l-3">
              <div className="account-left">
                <div className="account-avatar">
                  <img
                    src={ava1}
                    alt="avatar"
                    className="account-avatar__img"
                  />
                </div>

                <div className="account-info">
                  <div className="account-info__head">
                    <span className="head-span__left">Thông tin cá nhân</span>
                    <span
                      className="head-span__right"
                      onClick={onChangeShowModalInfo}
                    >
                      Thay đổi
                    </span>
                  </div>
                  <div className="account-info__content">
                    <div className="content__item">
                      <RiAccountCircleFill className="content-item__icon" />
                      <div className="content-item__text text__uppercase">
                        {account.name}
                      </div>
                    </div>
                    <div className="content__item">
                      <MdEmail className="content-item__icon" />
                      <div className="content-item__text">{account.email}</div>
                    </div>
                    <div className="content__item">
                      <RiCalendarTodoFill className="content-item__icon" />
                      <div className="content-item__text">
                        {account.dateOfBirth}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="account-info">
                  <div className="account-info__head">
                    <span className="head-span__left">
                      Số điện thoại liên lạc
                    </span>
                    <span
                      className="head-span__right"
                      onClick={onChangeShowModalPhone}
                    >
                      Thay đổi
                    </span>
                  </div>
                  <div className="account-info__content">
                    <div className="content__item ">
                      <RiPhoneLine className="content-item__icon" />
                      <div className="content-item__text">{account.phone}</div>
                    </div>
                    <div
                      className="content__item  content__item--hover"
                      onClick={onChangeShowModalPass}
                    >
                      <RiLockPasswordLine className="content-item__icon" />
                      <div className="content-item__text">Đổi mật khẩu</div>
                      <FaChevronRight className="content-item__icon" />
                    </div>
                  </div>
                </div>

                <div className="account-info">
                  <div className="account-info__head">
                    <span className="head-span__left">Tài khoản FACEBOOK</span>
                  </div>
                  <div className="account-info__content account-info__content--facebook">
                    <div className="content__item  content__item--hover content__item--facebook">
                      <SiFacebook className="content-item__icon" />
                      <div className="content-item__text">
                        LIÊN KẾT TÀI KHOẢN FACEBOOK
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="account-left">
                <div className="account-info">
                  <div className="account-info__content">
                    <Link
                      to="#"
                      className="content__item content__item--border content__item--link"
                    >
                      <FaRegSmileBeam className="content-item__icon" />
                      <div className="content-item__text">
                        Cộng đồng FoodLovers
                      </div>
                      <FaChevronRight />
                    </Link>
                    <Link
                      to="#"
                      className="content__item content__item--border content__item--link"
                    >
                      <RiMessage2Line className="content-item__icon" />
                      <div className="content-item__text">
                        Đề xuất cửa hàng mong muốn
                      </div>
                      <FaChevronRight />
                    </Link>
                    <Link
                      to="#"
                      className="content__item content__item--border content__item--link"
                    >
                      <RiMessage2Line className="content-item__icon" />
                      <div className="content-item__text">
                        Đóng góp tính năng FoodLovers
                      </div>
                      <FaChevronRight />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="col l-9">
              <RightColAccount />
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {showModal.passForm ? (
        <ModalFormChangePass
          changeShowModalPass={callBackChangeShowModalPass}
        />
      ) : null}

      {showModal.infoForm ? (
        <ModalFormChangeInfo
          account={account}
          changeShowModalInfo={callBackChangeShowModalInfo}
        />
      ) : null}

      {showModal.phoneForm ? (
        <ModalFormChangePhone
          account={account}
          changeShowModalPhone={callBackChangeShowModalPhone}
        />
      ) : null}
    </div>
  );
}
