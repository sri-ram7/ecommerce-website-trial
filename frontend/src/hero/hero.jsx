// import React from 'react';
// import './hero.css';
// import hand_icon from '../components/assests/hand_icon.png';
// import arrow_icon from '../components/assests/arrow.png';
// import hero_image from '../components/assests/hero_image.png';


// const Hero = () => {
//     return (
//         <div className='hero'>
//              <div className="hero-left">
//                 <h2>New Arrivals Only</h2>
//                 <div>
//                     <div className="hand-hand-icon">
//                         <p>new</p>
//                         <img src={hand_icon} alt="hand-icon" />
//                     </div>
//                     <p>
//                         collection
//                     </p>
//                     <p>
//                         for everyone
//                     </p>
//                 </div>
//                 <div className="hero-latest-btn">
//                     <div>Latest Collection</div>
//                     <img src={arrow_icon} alt="arrow-icon" />
//                 </div>
//              </div>
//              <div className="hero-right">
//                 <img src={hero_image} alt="hero-image" />
//              </div>    
//         </div>
//     );
// }

// export default Hero;

import React from 'react';
import './hero.css';
import hand_icon from '../components/assests/hand_icon.png';
import arrow_icon from '../components/assests/arrow.png';
import hero_image from '../components/assests/hero_image.png';

const Hero = () => {   
    return (
        <div className='hero'>
             <div className="hero-left">
                <h2>New Arrivals Only</h2>
                <div>
                    <div className="hero-hand-icon">
                        <p>new</p>
                        <img src={hand_icon} alt="hand-icon" />
                    </div>
                    <p>collection</p>
                    <p>for everyone</p>
                </div>
                <div className="hero-latest-btn">
                    <div>Latest Collection</div>
                    <img src={arrow_icon} alt="arrow-icon" />
                </div>
             </div>
             <div className="hero-right">
                <img src={hero_image} alt="hero-image" />
             </div>    
        </div>
    );
}

export default Hero;  
