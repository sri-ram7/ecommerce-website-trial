import React, { useState, useEffect } from 'react';
import './Listproduct.css';
import cross_icon from '../../assets/cross_icon.png';

const Listproduct = () => {

    const [allproducts, setallproducts] = useState([]);

    const fetchInfo = async () => {
        await fetch('https://ecommerce-website-trial-backend.onrender.com/allproducts')
            .then((res) => res.json())
            .then((data) => { setallproducts(data) });
    }

    useEffect(() => {
        fetchInfo();
    }, []); // Add empty dependency array so it runs once on mount

    // const remove_product = async () => {
    //   await fetch('http://localhost:4000/removeproduct' , {
    //     method: 'POST',
    //     headers:{
    //       Accept:'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //     body:JSON.stringify({id:id})
    //   })
    //   await fetchInfo();
    // }

    const remove_product = async (id) => {
      await fetch('https://ecommerce-website-trial-backend.onrender.com/removeproduct', {
        method: 'POST',
        headers: {
          Accept:'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id })
      });
      await fetchInfo();
    };
    

    return (
        <div className='list-product'>
            <h1>All Products List</h1>
            <div className="listproduct-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Oldprice</p>
                <p>newprice</p>
                <p>category</p>
                <p>Remove</p>
            </div>
            <div className="listproduct-allproducts">
                <hr />
                {allproducts.map((product, index) => {
                    return (
                        <div key={index} className="listproduct-format-main listproduct-format">
                            <img src={product.image} alt="" className="listproduct-product-icon" />
                            <p>{product.name}</p>
                            <p>${product.old_price}</p>
                            <p>${product.new_price}</p>
                            <p>{product.category}</p>
                            <img
                                onClick={()=>{remove_product(product.id)}}
                                className='listproduct-remove-icon'
                                src={cross_icon} alt="remove"
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Listproduct;
