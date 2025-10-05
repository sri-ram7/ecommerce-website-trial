import React, {useContext} from 'react';
import './Breadcrum.css';
import arrow_icon from '../assests/arrow.png';

const Breadcrum = (props) => {
    const {product} = props;
    return (
        <div className='breadcrum'>
           home <img src={arrow_icon} alt="arrow" /> {product.category} <img src={arrow_icon} alt="arrow" /> {product.name}
        </div>
    );
}

export default Breadcrum;
