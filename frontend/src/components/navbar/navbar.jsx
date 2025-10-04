import React, { useContext, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import logo from '../assests/logo.png'; 
import cart_icon from '../assests/cart_icon.png';
import nav_dropdown from '../assests/nav_dropdown.png';
import { ShopContext } from '../../context/ShopContext';

const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const { gettotalcartitems } = useContext(ShopContext);
    const menuRef = useRef();
    const dropdownRef = useRef();

    const dropdown_toggle = () => {
        menuRef.current.classList.toggle('nav-menu-visible');
        dropdownRef.current.classList.toggle('open');
    };

//useref is used to keep the rerender not happening ! due to rereder it leads to problems ! 

    const handleMenuClick = (menuName) => {
        setMenu(menuName);
       
        if (menuRef.current.classList.contains('nav-menu-visible')) {
            menuRef.current.classList.remove('nav-menu-visible');
            dropdownRef.current.classList.remove('open'); 
            
            //classlist.toogle or .remove it adds and remove the classnames means it adds another classname to the elemnt
            // here the dropwref and the menuref are used  in different html elements ! when the action is done it is used to add "current"-> means it points to element , and later use the classlist to add the classname!  
        }
    };

    return (
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt="logo" />
                <p>SHOPPER</p>
            </div>

            <img
                onClick={dropdown_toggle}
                src={nav_dropdown}
                alt="dropdown"
                className="nav-dropdown"
                ref={dropdownRef}
            />

            <ul ref={menuRef} className="nav-menu">
                <li onClick={() => handleMenuClick("shop")}>
                    <Link to='/' style={{ textDecoration: 'none' }}>Shop</Link>
                    {menu === "shop" ? <hr /> : null}
                </li>
                <li onClick={() => handleMenuClick("mens")}>
                    <Link to='/mens' style={{ textDecoration: 'none' }}>Men</Link>
                    {menu === "mens" ? <hr /> : null}
                </li>
                <li onClick={() => handleMenuClick("women")}>
                    <Link to='/womens' style={{ textDecoration: 'none' }}>Women</Link>
                    {menu === "women" ? <hr /> : null}
                </li>
                <li onClick={() => handleMenuClick("kids")}>
                    <Link to='/kids' style={{ textDecoration: 'none' }}>Kids</Link>
                    {menu === "kids" ? <hr /> : null}
                </li>
            </ul>

            <div className="nav-login-cart">
                {localStorage.getItem('auth-token') ? (
                    <button onClick={() => { localStorage.removeItem('auth-token'); window.location.reload(); }}>
                        Logout
                    </button>
                ) : (
                    <Link to='/login'><button>Login</button></Link>
                )}
                <Link to='/cart'><img src={cart_icon} alt="cart-icon" /></Link>
                <div className="nav-cart-count">{gettotalcartitems()}</div>
            </div>

        </div>
    );
};

export default Navbar;
