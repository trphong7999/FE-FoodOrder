import React from 'react'
import './Banner.scss'
import banner from 'assets/image/banner.jpg'
import { BsSearch } from "react-icons/bs";

function Banner(props) {
    return (
        <div className="banner-wrap">
            <div className="banner-img" style={{backgroundImage: `url("${banner}")` }}>
                <div className="search-box">
                    <span className="btn-search">
                        <BsSearch className="icon-search"/>
                    </span>
                    <input 
                        type="text" 
                        className="input-search" 
                        placeholder="Tìm quán ăn yêu thích để đặt FoodLovers giao ngay"
                    />
                </div>
            </div>
        </div>
    )
}

export default Banner

