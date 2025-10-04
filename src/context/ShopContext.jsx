// import React, { createContext } from "react";  
// import all_product from '../components/assests/all_product.js';

// export const ShopContext = createContext(null);

// const getDefaultCart = () => {
//         let cart = {};
//         for(let i=0; i<=all_product.length; i++){
//             cart[index] = 0;
//         }
//         return cart;
// }

// const ShopContextProvider = (props) => {
//     const [cartItems, setCartItems] = useState(getDefaultCart());
//     const contextValue = { all_product,cartItems };
    
//     const addtocart = (itemid) =>{
//         setCartItems((prev) => ({...prev, [itemid]: prev[itemid] + 1}));
//     }

//     const removefromcart = (itemid) =>{
//         setCartItems((prev) => ({...prev, [itemid]: prev[itemid] - 1}));
//     }

//     const contextValue = { all_product, cartItems, addtocart, removefromcart };

//     return (
//         <ShopContext.Provider value={contextValue}>
//             {props.children}
//         </ShopContext.Provider>
//     );
// };
            
// export default ShopContextProvider;

import React, { createContext, useState } from "react";
import all_product from "../components/assests/all_product.js";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 0; i < all_product.length; i++) {
    cart[all_product[i].id] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const gettotalcartamount = () => {
    let totalamount = 0;
    for(const item in cartItems){
      if(cartItems[item] > 0){
        let iteminfo = all_product.find((product) => product.id ===  Number(item))
        totalamount += iteminfo.new_price * cartItems[item];
      }
    }
    return totalamount;
  }

  const gettotalcartitems = () => {
    let totalitem = 0;
    for(const item in cartItems){
        if(cartItems[item] > 0){
          totalitem += cartItems[item];
        }
    }
    return totalitem;
  }

  const contextValue = { gettotalcartitems, gettotalcartamount, all_product, cartItems, addToCart, removeFromCart };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );

  //ShopContext.Provider is a special component created by createContext().

  // The value={contextValue} part is the data and functions you want to share globally (in your case: cartItems, addToCart, etc.).

  // Any component inside this provider can access that data using useContext(ShopContext).

  
};

export default ShopContextProvider;
