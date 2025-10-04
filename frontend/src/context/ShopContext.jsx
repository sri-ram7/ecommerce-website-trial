
// import React, { createContext, useState, useEffect } from "react";
// import all_product from "../components/assests/all_product.js";

// export const ShopContext = createContext(null);

// const getDefaultCart = () => {
//   let cart = {};
//   for (let i = 0; i < 300+1; i++) {
//     cart[all_product[i].id] = 0;
//   }
//   return cart;
// };

// // const ShopContextProvider = (props) => {
// //   const [all_product,setall_product] = useState([]);
// //   const [cartItems, setCartItems] = useState(getDefaultCart());

// //   useEffect(() => {
// //       fetch('http://localhost:4000/allproducts')
// //       .then((response) => response.json())
// //       .then((data) => setall_product(data));
// //   },[])

// //   const addToCart = (itemId) => {
// //     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
// //   };

// //   const removeFromCart = (itemId) => {
// //     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
// //   };

// //   const gettotalcartamount = () => {
// //     let totalamount = 0;
// //     for(const item in cartItems){
// //       if(cartItems[item] > 0){
// //         let iteminfo = all_product.find((product) => product.id ===  Number(item))
// //         totalamount += iteminfo.new_price * cartItems[item];
// //       }
     
// //     }
// //      return totalamount;
// //   }

// //   const gettotalcartitems = () => {
// //     let totalitem = 0;
// //     for(const item in cartItems){
// //         if(cartItems[item] > 0){
// //           totalitem += cartItems[item];
// //         }
        
// //     }
// //     return totalitem;
// //   }

// //   const contextValue = { gettotalcartitems, gettotalcartamount, all_product, cartItems, addToCart, removeFromCart };

// //   return (
// //     <ShopContext.Provider value={contextValue}>
// //       {props.children}
// //     </ShopContext.Provider>
// //   );

// //   //ShopContext.Provider is a special component created by createContext().

// //   // The value={contextValue} part is the data and functions you want to share globally (in your case: cartItems, addToCart, etc.).

// //   // Any component inside this provider can access that data using useContext(ShopContext).

  
// // };
//     const ShopContextProvider = (props) => {
//       const [all_product, setall_product] = useState([]);
//       const [cartItems, setCartItems] = useState(getDefaultCart());

//       useEffect(() => {
//         fetch("http://localhost:4000/allproducts")
//           .then((response) => response.json())
//           .then((data) => setall_product(data));
//       }, []); // Run only once on mount


//       const addToCart = (itemId) => {
//         setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
//       };

//       const removeFromCart = (itemId) => {
//         setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
//       };

//       const gettotalcartamount = () => {
//         let totalamount = 0;
//         for (const item in cartItems) {
//           if (cartItems[item] > 0) {
//             let iteminfo = all_product.find(
//               (product) => product.id === Number(item)
//             );
//             totalamount += iteminfo.new_price * cartItems[item];
//           }
//         }
//         return totalamount;
//       };

//       const gettotalcartitems = () => {
//         let totalitem = 0;
//         for (const item in cartItems) {
//           if (cartItems[item] > 0) {
//             totalitem += cartItems[item];
//           }
//         }
//         return totalitem;
//       };

//       const contextValue = {
//         gettotalcartitems,
//         gettotalcartamount,
//         all_product,
//         cartItems,
//         addToCart,
//         removeFromCart,
//       };

//       return (
//         <ShopContext.Provider value={contextValue}>
//           {props.children}
//         </ShopContext.Provider>
//       );
//     };


// export default ShopContextProvider;
// 
import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 0; i < 301; i++) {
    cart[i] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setall_product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(() => {
    fetch("https://ecommerce-website-trial-backend.onrender.com/allproducts")
      .then((response) => response.json())
      .then((data) => setall_product(data));

      if(localStorage.getItem("auth-token")){
        fetch("https://ecommerce-website-trial-backend.onrender.com/getcart", {
          method: "GET", // Use GET method to fetch cart data even if we load the page
          headers: {
            Accept: "application/form-data",
            "auth-token": `${localStorage.getItem("auth-token")}`,
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if(data.success){
              setCartItems(data.cartData);
            }
          });
      }
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch("https://ecommerce-website-trial-backend.onrender.com/addtocart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch("https://ecommerce-website-trial-backend.onrender.com/removecart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  const gettotalcartitems = () => {
    let totalitem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalitem += cartItems[item];
      }
    }
    return totalitem;
  };

  const gettotalcartamount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const itemInfo = all_product.find(
          (product) => product.id === Number(itemId)
        );
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[itemId];
        }
      }
    }
    return totalAmount;
  };

  const contextValue = {
    gettotalcartitems,
    gettotalcartamount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
