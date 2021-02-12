import React from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Section.css';

function Section({
    lightBg, 
    topLine, 
    lightText, 
    lightTextDesc, 
    headline, 
    description, 
    buttonLabel, 
    img, 
    alt, 
    imgStart
}) {
    return (
        <div className={lightBg ? 'home__food-section' : 'home__food-section darkBg'}>
            <div className='container'>
                <div 
                className='row home__food-row'
                style={{display: 'flex', textDecoration: imgStart ==='start' ? 'row-reverse' : 'row'}}
                >
                    <div className="col">
                        <div className="home__food-text-wrapper">
                            <div className="top-line">{topLine}</div>
                            <h1 className={lightText ? 'heading' : 'heading dark'}>{headline}</h1>
                            <p className={lightTextDesc ? 'home__food-subtitle' : 'home__food-subtitle dark'}>
                                {description}
                            </p>
                            <Link to="/signup">
                                <Button buttonSize='btn--wide' buttonColor='blue'>
                                    {buttonLabel}
                                </Button>
                            </Link> 
                        </div>
                    </div>
                    <div className="col">
                        <div className="home__food-img-wrapper">
                            <img src={img} alt={alt} className="home__food-img"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Section
