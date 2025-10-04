import React, { useContext } from 'react';
import './css/shopcategory.css';
import { ShopContext } from '../context/ShopContext.jsx';
import Item from '../components/item/item.jsx';
import dropdown_icon from '../components/assests/dropdown_icon.png';


const ShopCategory = (props) => {
    const { all_product } = useContext(ShopContext);
    return (
        <div className='shop-category'>
            <img src={props.banner} alt='' />
            <div className="shopcategory-indexSort">
                <p>
                    <span> Showing 1-12</span> out of 36 products
                </p>
                <div className="shopcategory-sort">
                    Sort by <img src={dropdown_icon} alt='' />
                </div>
            </div>
            <div className="shopcategory-products">
                {all_product.map((item, i) => {
                    if (props.category === item.category) {
                        return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                    }
                    else{
                        return null;
                    }
                })}
            </div>
            <div className="shopcategory-loadmore">
                Explore More
            </div>
        </div>
    );
}

export default ShopCategory;


// How These Work Together in Your App

// You define your products in a separate file (all_product.js) with image imports and product details.

// You create a React Context (ShopContext) and a Provider (ShopContextProvider) that includes the products data in its value.

// At the root of your app (like in index.js), you wrap your entire <App /> inside <ShopContextProvider>, making products data globally accessible.

// Any component, like ShopCategory, that wishes to access product data uses useContext(ShopContext) to get the current products.

// ShopCategory also gets a banner prop separately — passed via routing in App.jsx — to show category-specific banner images.




// props comes from wherever your component is used.

// If you render <ShopCategory banner={someImage} />, then inside ShopCategory you receive props.banner === someImage.

// React automatically passes this props object as a parameter to your component function.

