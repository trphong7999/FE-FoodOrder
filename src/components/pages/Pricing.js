import React from 'react'
import { Button } from './Button'
import { Link } from 'react-router-dom'
import { BsXDiamondFill} from 'react-icons/bs'
import { FaFire } from 'react-icons/fa'
import { GiCrystalize} from 'react-icons/gi'
import { IconContext } from 'react-icons/lib'
import './Pricing.css'

export default function Pricing() {
    return (
        <IconContext.Provider value={{color: '#fff', size: 64}}>
            <div>
                <div className="pricing__section">
                    <div className="pricing__wrapper">
                        <h1 className="pricing__heading">Pricing</h1>
                        <div className="pricing__container">
                            <Link to="/signup" className="pricing__container-card">
                                <div className="pricing__container-cardInfo">
                                    <div className="icon">
                                        <FaFire/>
                                    </div>
                                    <h3>Starter</h3>
                                    <h4>10.000</h4>
                                    <p>per month</p>
                                    <ul className="pricing__container-features">
                                        <li>100 transacton</li>
                                        <li>100 transacton</li>
                                        <li>100 transacton</li>
                                    </ul>
                                    <Button buttonSize="btn--wide" buttonColor="primary">
                                        Choose Plan
                                    </Button>
                                </div>
                            </Link>
                            <Link to="/signup" className="pricing__container-card">
                                <div className="pricing__container-cardInfo">
                                    <div className="icon">
                                        <BsXDiamondFill/>
                                    </div>
                                    <h3>Gold</h3>
                                    <h4>10.000</h4>
                                    <p>per month</p>
                                    <ul className="pricing__container-features">
                                        <li>100 transacton</li>
                                        <li>100 transacton</li>
                                        <li>100 transacton</li>
                                    </ul>
                                    <Button buttonSize="btn--wide" buttonColor="primary">
                                        Choose Plan
                                    </Button>
                                </div>
                            </Link>
                            <Link to="/signup" className="pricing__container-card">
                                <div className="pricing__container-cardInfo">
                                    <div className="icon">
                                        <GiCrystalize/>
                                    </div>
                                    <h3>Ruby</h3>
                                    <h4>10.000</h4>
                                    <p>per month</p>
                                    <ul className="pricing__container-features">
                                        <li>100 transacton</li>
                                        <li>100 transacton</li>
                                        <li>100 transacton</li>
                                    </ul>
                                    <Button buttonSize="btn--wide" buttonColor="primary">
                                        Choose Plan
                                    </Button>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </IconContext.Provider>
    )
}
