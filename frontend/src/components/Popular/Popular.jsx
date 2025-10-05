import React from 'react';
import './Popular.css';
import data_product from '../assests/data.js'
import Item from '../item/item.jsx';

const  Popular = () => {
    return (
        <div className='popular'>
            <h1 className='autoshow'>Popular in women</h1>
            <hr/ >
            <div className='popular-item imagereveal'>
                {data_product.map((item,i) =>{
                    return <Item key = {i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} style={{ color: 'white' }}/>
                })}
            </div>
        </div>
    );
}

export default Popular;
