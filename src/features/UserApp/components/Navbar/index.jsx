import React, {useState} from "react";
import logo from "assets/image/logo.png";
import "./style.scss";
import { Link } from "react-router-dom";
import TransitionsModal from "components/TransitionsModal";
import NavAccount from "components/NavAccount";

function Navbar(props) {
  const [account, setAccount] = useState(0);
  return (
    <nav className="navbar">
      <section className="grid wide">
        <div className="nav__wrap">
          <div className="nav__logo">
            <Link to="#">
              <img src={logo}  alt="logo" className="nav-logo__img" />
            </Link>
          </div>

          <ul className="nav__list">
            <li className="nav-list__item">
              <Link to="#" className="nav-list__link  ">
                Cửa hàng gần bạn
              </Link>
            </li>
            <li className="nav-list__item">
              <Link to="#" className="nav-list__link nav-list__link--active">
                Ăn sáng
              </Link>
            </li>
            <li className="nav-list__item">
              <Link to="#" className="nav-list__link">
                Ăn trưa
              </Link>
            </li>
            <li className="nav-list__item">
              <Link to="#" className="nav-list__link">
              Ăn tối
              </Link>
            </li>
            <li className="nav-list__item">
              <Link to="#" className="nav-list__link">
                Đồ ăn
              </Link>
            </li>
            <li className="nav-list__item">
              <Link to="#" className="nav-list__link">
                Đồ uống
              </Link>
            </li>
          </ul>

          <div className="nav__account">
            {account === 1 ? (<TransitionsModal/>): (<NavAccount/>)}       
          </div>
        </div>
      </section>
    </nav>
  );
}

export default Navbar;
