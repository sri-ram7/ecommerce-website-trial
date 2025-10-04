import React from 'react';
import "./Footer.css";
import footer_logo from '../assests/logo_big.png';
import instagram_logo from '../assests/instagram_icon.png';
import pintrest_logo from '../assests/pintester_icon.png';
import whatsapp_logo from '../assests/whatsapp_icon.png';

const Footer = (props) => {
    return (
        <div className="footer">
            <div className='footer-logo'>
                <img src = {footer_logo} alt = "" />
                <p>SHOPPER</p>
            </div>
            <ul className='footer-links'>
                <li>Company</li>
                <li>Products</li>
                <li>Offices</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            <div className="footer-social-icon">
                <div className="footer-icons-container">
                    <img src={instagram_logo} alt="instagram-logo" />
                </div>
                <div className="footer-icons-container">
                    <img src={pintrest_logo} alt="instagram-logo" />
                </div>
                <div className="footer-icons-container">
                    <img src={whatsapp_logo} alt="instagram-logo" />
                </div>
                <div className="footer-copyright">
                    <hr />
                    <p>Copyright @ 2023 by Shopper. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}

export default Footer;