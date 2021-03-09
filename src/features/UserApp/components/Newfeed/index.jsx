import Card from 'components/Card'
import React from 'react'
import './style.scss'

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
            </div>
        </div>
    )
}
