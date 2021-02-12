import React,{useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { MdFingerprint } from "react-icons/md";
import { FaBars,FaTimes } from "react-icons/fa";
import { Button } from './Button';
import './Navbar.css';



export default function Navbar() {
    const [click, setClick] = useState(false)
    const [button, setButton] = useState(true)

    const handleClick = () => setClick(!click)

    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if(window.innerWidth <= 960){
            setButton(false)
        }else{
            setButton(true)
        }
    }

    useEffect(() => {
        showButton();
        window.addEventListener('resize', showButton)
        return () => {
            window.removeEventListener('resize', showButton)
        }
    }, [])

    return (
        <div>
            <div className='navbar'>
                <div className='navbar-container container'>
                    <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                        <MdFingerprint className='navbar-icon' />
                        Delitaste
                    </Link>  
                    <div className='menu-icon' onClick={handleClick}>
                        {click ? <FaTimes/> : <FaBars/>}
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/service' className='nav-links' onClick={closeMobileMenu}>
                                Services
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/food' className='nav-links' onClick={closeMobileMenu}>
                                Foods
                            </Link>
                        </li>
                        <li className='nav-btn'>
                            {button ? (<Link to='/signup' className='btn-link'>
                                <Button buttonStyle='btn--outline'>
                                    SIGN UP
                                </Button>
                            </Link>
                            ) : (<Link to='/signup' className='btn-link'>
                                <Button 
                                  buttonStyle='btn--outline'
                                  buttonSize='btn--mobile' 
                                  onClick={closeMobileMenu}
                                >
                                    SIGN UP
                                </Button>
                            </Link>)}
                        </li>
                    </ul>                   
                </div>
            </div>
        </div>
    )
}
