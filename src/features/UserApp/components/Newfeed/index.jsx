import Card from 'components/Card'
import React from 'react'
import './style.scss'
import { Link } from 'react-router-dom'
import { FaChevronRight } from 'react-icons/fa'

export default function Newfeed() {
    return (
        <div className="newfeed-wrap">
            <div className="title">
                <h1>khám phá món mới</h1>
            </div>
            <div className="content">
                <div className="list-view row sm-gutter">
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />

                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>
                <Link to="/" className="view-all">
                    Xem tất cả 
                    <FaChevronRight className="view-all-icon"/>
                </Link>
            </div>
        </div>
    )
}
