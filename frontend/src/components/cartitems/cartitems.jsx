import React, { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext.jsx'; 
import remove_icon from '../assests/cart_cross_icon.png'; 
import './cartitems.css';

const Cartitems = () => {
  const { gettotalcartamount ,all_product, cartItems, removeFromCart } = useContext(ShopContext);

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) =>
        cartItems[e.id] > 0 ? (
          <div key={e.id}>
            <div className="cartitems-format">
              <img src={e.image} alt='' className='carticon-product-icon' />
              <p>{e.name}</p>
              <p>${e.new_price}</p>
              <button className='cartitems-quantity'>{cartItems[e.id]}</button>
              <p>{e.new_price * cartItems[e.id]}</p>
              <img src={remove_icon} onClick={() => removeFromCart(e.id)} alt='' />
            </div>
            <hr />
          </div>
        ) : null
      )}
      <div className="cartitems-down">
        <div className="cartitems-total">
            <h1>cart Totals</h1>
            <div>
                <div className="cartitems-total-item">
                    <p>Subtotal</p>
                    <p>${gettotalcartamount()}</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                    <p>Shipping Fee</p>
                    <p>Free</p>
                </div>
                <hr />
                <div className="cartitems-total-items">
                    <h3>Total</h3>
                    <h3>${gettotalcartamount()}</h3>
                </div>
                <button>Proceed to Checkout</button>
            </div>
            <div className="cartitems-promocode">
              <p>if you have promo code , enter it heree</p>
              <div className="cartitems-promobox">
                <input type="text" placeholder = 'promo code' />
                <button>Submit</button>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Cartitems;
