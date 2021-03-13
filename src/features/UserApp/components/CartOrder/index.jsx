import React from 'react'
import { GrLocation } from 'react-icons/gr'
import './style.scss'

export default function CartOrder() {
    return (
        <div className="order">
            <div className="order__promotion">
                <div className="promotion__title">Ưu đãi</div>
                <div className="promotion__content">
                    <GrLocation className="promotion__icon"/>
                    Freeship đơn hàng dưới 2km
                </div>
            </div>

            <div className="order__cart-list">
                <div className="list__title">Đơn hàng của bạn</div>
                <div className="list__item">
                    <div className="item">
                        <div className="item-name">Trà Sữa Collagen</div>
                        <div className="item-update">
                            <div className="item-update__down">-</div>
                            <div className="item-update__quantity">1</div>
                            <div className="item-update__up">+</div>
                        </div>
                        <div className="item-price">64.000 đ</div>
                    </div>
                    <div className="item">
                        <div className="item-name">Hồng Trà</div>
                        <div className="item-update">
                            <div className="item-update__down">-</div>
                            <div className="item-update__quantity">1</div>
                            <div className="item-update__up">+</div>
                        </div>
                        <div className="item-price">64.000 đ</div>
                    </div>
                </div>
                <div className="list__amount">
                    Tổng :
                    <div className="amount__num">64.000 đ</div>
                </div>
            </div>

            <div className="order__button">Tiếp tục</div>
        </div>
    )
}
