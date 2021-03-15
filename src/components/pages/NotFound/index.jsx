import Navbar from 'features/UserApp/components/Navbar'
import Footer from 'features/UserApp/components/Footer'
import React from 'react'
import notFound from 'assets/image/not-found.jpg'

export default function NotFound() {
    return (
        <div className="not-found__page" >
            <Navbar/>
            <div className="grid wide" style={{textAlign: "center"}}>
                <img src={notFound} className="not-found__img" style={{width:"50%"}}/>
            </div>
            <Footer/>
        </div>
    )
}
