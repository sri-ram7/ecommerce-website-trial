import React from 'react';
import './NewsLetter.css';

const NewsLetter = () => {  
    return (
      <div className="box"> 
        <div className='newsletter autoshow'>
          <h1>Exclusive Offers On Your Email</h1>
          <p>Subscribe to our newsletter and stay updated</p>
          <div>
            <input type = "email" placeholder='Enter your email' />
            <button> Subscribe </button>
          </div>
        </div>
      </div>
      
    )
}

export default NewsLetter;  
