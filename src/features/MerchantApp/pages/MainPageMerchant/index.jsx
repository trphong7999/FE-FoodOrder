import React, { useState } from 'react'
import {TiThMenu} from 'react-icons/ti' 
import {HiClipboardList, HiDocumentReport} from 'react-icons/hi'
import {GiStorkDelivery} from 'react-icons/gi'
import {IoWallet} from 'react-icons/io5'
import {MdClear} from 'react-icons/md'
import './style.scss'

function MainPageMerchant() {
    const [openMenu, setOpenMenu] = useState(false)


    return (
        <div className="grid">
            <div className="main-merchant">
                <TiThMenu className="icon" onClick={() => setOpenMenu(!openMenu)}/> this is main page
            </div>

            <div className="side-bar">
                <div className={openMenu === false ? "side-bar__overlay side-bar__overlay--close" : "side-bar__overlay side-bar__overlay--open"}></div>
                <div className={openMenu === false ? "side-bar__menu side-bar__menu--close" : "side-bar__menu side-bar__menu--open"} >
                    <div className="menu-wrap">
                        <div className="menu-name">
                            <span>Hải Sản Hội An</span>    
                            <MdClear id="close-menu-merchant-menu" className="menu-name__icon" onClick={() => setOpenMenu(!openMenu)}/>
                        </div>
                        <div className="menu-content">
                            <div className="menu-content__item">
                                <HiClipboardList className="menu-content__item-icon menu-content__item-icon--blue"/>
                                <span>Đơn hàng</span>
                            </div>
                            <div className="menu-content__item">
                                <GiStorkDelivery className="menu-content__item-icon menu-content__item-icon--red"/>
                                <span>Ship</span>
                            </div>
                            <div className="menu-content__item">
                                <HiClipboardList className="menu-content__item-icon menu-content__item-icon--yellow"/>
                                <span>Khuyến mãi</span>
                            </div>
                            <div className="menu-content__item">
                                <HiDocumentReport className="menu-content__item-icon menu-content__item-icon--purple"/>
                                <span>Báo cáo</span>
                            </div>
                            <div className="menu-content__item">
                                <IoWallet className="menu-content__item-icon menu-content__item-icon--gray"/>
                                <span>FLM Wallet</span>
                            </div>

                            <ul className="menu-content__list">
                                <li className="menu-content__list-item">Thực đơn</li>
                                <li className="menu-content__list-item">Lịch sử đổi quà</li>
                                <li className="menu-content__list-item">Khách hàng của tôi</li>
                                <li className="menu-content__list-item">Quản lý nhân viên</li>
                                <li className="menu-content__list-item">Cài đặt</li>                           
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPageMerchant
