import React, { useContext } from 'react';
import './ProductDisplay.css';
import star_icon from '../assests/star_icon.png';
import star_dull_icon from '../assests/star_dull_icon.png';
import { ShopContext } from '../../context/ShopContext';

const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} className='photos' alt={product.name} />
          <img src={product.image} className='photos' alt={product.name} />
          <img src={product.image} className='photos' alt={product.name} />
          <img src={product.image} className='photos' alt={product.name} />
        </div>
        <div className="productdisplay-img">
          <img className='productdisplay-main-img' src={product.image} alt={product.name} />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className='productdisplay-right-star'>
          <img src={star_icon} alt='star icon' />
          <img src={star_icon} alt='star icon' />
          <img src={star_icon} alt='star icon' />
          <img src={star_icon} alt='star icon' />
          <img src={star_dull_icon} alt='star dull icon' />
          <p>{122}</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">${product.old_price}</div>
          <div className="productdisplay-right-price-new">${product.new_price}</div>
        </div>
        <div className="productdisplay-right-description">
          This elegant dress is designed for effortless style and comfort. Made from soft, breathable fabric, it drapes beautifully on all body types and offers a flattering silhouette. Perfect for both casual outings and special occasions, it features subtle detailing, with a comfortable fit that allows you to move freely. Available in multiple colors, this versatile dress will be a staple piece in your wardrobe for seasons to come.
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button onClick={() => addToCart(product.id)}>ADD TO CART</button>
        <p className='productdisplay-right-category'><span>Category:</span> Women , T-Shirt , Crop-Top</p>
        <p className='productdisplay-right-category'><span>Tags: </span>Modern latest</p>
      </div>
    </div>
  );
};

export default ProductDisplay;
