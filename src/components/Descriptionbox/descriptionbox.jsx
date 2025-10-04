import React from 'react';
import './descriptionbox.css'


const Descriptionbox = (props) => {
    return (
         <div className='descriptionbox'>
            <div className="descriptionbox-navigator">
                <div className="descriptionboc-nav-box">
                    Description
                </div>
                <div className="description-nav-box fade">
                    Reviews (122)
                </div>
            </div>
            <div className="descriptionbox-description">
                <p></p>
                <p></p>
            </div>
         </div>
    );
}

export default Descriptionbox;