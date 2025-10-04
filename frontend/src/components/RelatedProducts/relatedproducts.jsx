import React from 'react';
import './relatedproducts.css';
import data_product from '../assests/data.js';
import Item from '../item/item.jsx';

const Relatedproducts = (props) => {
    return (
       <div className='relatedproducts'>
            <h1>Related Products</h1>
            <hr />
            <div className="relatedproducts-item">
                {data_product.map((item,i)=>{
                    return <Item key = {i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
                })}
            </div>
       </div>
    );
}

export default Relatedproducts;