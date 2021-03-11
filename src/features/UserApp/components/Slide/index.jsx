import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './style.scss'
import { Link } from 'react-router-dom'
import { Container, Card, Row, Col } from "react-bootstrap";

import img1 from 'assets/image/slide1.jpg'
import img2 from 'assets/image/slide2.jpg'
import img3 from 'assets/image/slide3.jpg'
import img4 from 'assets/image/slide4.jpg'
import img5 from 'assets/image/slide5.jpg'
import img6 from 'assets/image/slide6.jpg'

export default function SlickList() {
    
    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true
    };

    return (
        <div className="slide-wrapper"> 
            <section className="grid wide">        
                <Slider {...settings}>
                    <div className="slide-item ">
                        <div className="slide-img" style={{backgroundImage: `url(${img1})`}}></div>
                    </div>
                    <div className="slide-item ">
                        <div className="slide-img" style={{backgroundImage: `url(${img2})`}}></div>
                    </div>
                    <div className="slide-item ">
                        <div className="slide-img" style={{backgroundImage: `url(${img3})`}}></div>
                    </div>
                    <div className="slide-item ">
                        <div className="slide-img" style={{backgroundImage: `url(${img4})`}}></div>
                    </div>
                    <div className="slide-item ">
                        <div className="slide-img" style={{backgroundImage: `url(${img5})`}}></div>
                    </div>
                    <div className="slide-item ">
                        <div className="slide-img" style={{backgroundImage: `url(${img6})`}}></div>
                    </div>
                </Slider>
            </section>  
        </div>
    )
}


