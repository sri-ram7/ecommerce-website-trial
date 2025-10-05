import React from 'react';
import './offer.css';
import exclusive_image from '../assests/picture-elegant-young-fashion-man.jpg';
const Offers= () => {  
     return (
        <div className='offers'>
            <div className='offer-box-left '></div> 
            <div className="offers-box">
                <div className="offers-left autoshow">
                    <h1>Exclusive</h1>
                    <h1>Offers For You</h1>
                    <p>ONLY ON BEST SELLERS PRODUCTS</p>
                    <button>Check Now</button>
                </div>
                <div className="offe-right">
                    <img src={exclusive_image} alt="exclusive-image" />
                </div>
            </div>
            <div className='offer-box-right'></div> 
        </div>
    );
}

export default Offers;  
