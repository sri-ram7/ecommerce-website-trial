import React, { useContext, useState, useRef , useEffect} from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import logo from '../assests/logo.png'; 
import cart_icon from '../assests/shopcart.png';
import nav_dropdown from '../assests/nav_dropdown.png';
import { ShopContext } from '../../context/ShopContext';

const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const { gettotalcartitems } = useContext(ShopContext);
    const totalItems = gettotalcartitems();
    const menuRef = useRef();
    const dropdownRef = useRef();
    const [bump, setBump] = useState(false);

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

     useEffect(() => {
        if (totalItems === 0) return;

        setBump(true);

        const timer = setTimeout(() => {
            setBump(false);
        }, 400); // animation duration

        return () => clearTimeout(timer);
    }, [totalItems]);

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
                    <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>SHOP</Link>
                    {menu === "shop" ? <hr /> : null}
                </li>
                <li onClick={() => handleMenuClick("mens")}>
                    <Link to='/mens' style={{ textDecoration: 'none', color: 'white' }}>MEN</Link>
                    {menu === "mens" ? <hr /> : null}
                </li>
                <li onClick={() => handleMenuClick("women")}>
                    <Link to='/womens' style={{ textDecoration: 'none', color: 'white' }}>WOMEN</Link>
                    {menu === "women" ? <hr /> : null}
                </li>
                <li onClick={() => handleMenuClick("kids")}>
                    <Link to='/kids' style={{ textDecoration: 'none', color: 'white' }}>KIDS</Link>
                    {menu === "kids" ? <hr /> : null}
                </li>
            </ul>


            <div className="nav-login-cart">
                {localStorage.getItem('auth-token') ? (
                    <button onClick={() => { localStorage.removeItem('auth-token'); window.location.reload(); }}>
                        Logout
                    </button>
                ) : (
                    <Link to='/login'><button>Login Here</button></Link>
                )}
                <Link to='/cart'><img src={cart_icon} alt="cart-icon" /></Link>
                <div className={`nav-cart-count${bump ? ' bump' : ''}`}>{totalItems}</div>

            </div>

        </div>
    );
};

export default Navbar;
