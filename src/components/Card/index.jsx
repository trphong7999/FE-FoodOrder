import React from 'react'
import ImageDish from 'assets/image/dishes/dish1.jpg'
import { HiLocationMarker } from 'react-icons/hi'
import './style.scss'

export default function Card() {
    return (
        <div className="col l-2">
            <div className="dish-item">
                <img src={ImageDish} alt="ImageDish" className="dish-img"/>
                <div className="dish-info">
                    <div className="dish-name">Nem Nướng Nha Trang </div>
                    <div className="dish-price">20.000 đ</div>
                    <div className="dish-location">
                        <HiLocationMarker className="location-icon" />
                        <div className="location-km">8.6 km</div>
                    </div>
                </div>
                <div className="dish-buy">
                    <span className="btn btn-buy">Chọn mua</span>
                </div>
            </div>
        </div>
    )
}
