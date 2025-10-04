// import React from 'react'
// import './Addproduct.css'
// import upload_area from '../../assets/upload_area.svg'
// import { useState } from 'react'

// const Addproduct = () => {

//     const [image,setimage] = useState(false);
//     const [productDetails,setProductDetails] = useState({
//         name: "",
//         image: "",
//         category: "women",
//         new_price: "",
//         old_price: ""
//     })

//     const imageHandler = (e) => {
//           setimage(e.target.files[0])
//     } 

//     const changehandler = (e) =>{
//         setProductDetails({...productDetails,[e.target.name]: e.target.value})
//     }

//     const Add_Product = async () => {
//         console.log(productDetails);
//         let responeData;
//         let product = productDetails;
//         let formData = new  FormData();
//         formData.append('product',image);

//         await fetch('https://localhost:4000/upload',{
//             method: 'POST',
//             headers:{
//                 Accept:'application/json',
//             },
//             body:formData,
//         }).then((resp) => resp.json()).then((data) => {responeData=data} );

//         if(responeData.success){
//             product.image = responseData.image_url;
//             console.log(product);
//         }
//     }

//   return (
//     <div className='add-product'>
//         <div className="addproduct-itemfield">
//             <p> Product Title</p>
//             <input value={productDetails.name} onChange={changehandler} type='text' name='name' placeholder='typehere'/>
//         </div>
//         <div className="addproduct-price">
//             <div className="addproduct-itemfield">
//                 <p>Price</p>
//                 <input value={productDetails.old_price} onChange={changehandler} type='text' name = "old_price" placeholder='typehere'/>
//             </div>
//             <div className="addproduct-itemfield">
//                 <p>offer Price</p>
//                 <input value={productDetails.new_price} onChange={changehandler} type='text' name = "new_price" placeholder='typehere'/>
//             </div>
//         </div>
//         <div className="addproduct-itemfield">
//             <p>Product Category</p>
//             <select value={productDetails.category} onChange={changehandler} name='category' className='add-product-selector'>
//                 <option value="women">Women</option>
//                 <option value="men">men</option>
//                 <option value="kid">kid</option>
//             </select>
//         </div>
//         <div className="addproduct-itemfield">
//             <label htmlFor='file-input'>
//                 <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumbnail-img' alt='' />

//             </label>
//             <input onChange={imageHandler} type='file' name='image' id='file-input' hidden />
//         </div>
//         <button onClick={() => {Add_Product()}} className='addproduct-btn'>ADD</button>
//     </div>
//   )
// }

// export default Addproduct

import React, { useState } from 'react';
import './Addproduct.css';
import upload_area from '../../assets/upload_area.svg';

const Addproduct = () => {
  const [image, setimage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: ""
  });

  const imageHandler = (e) => {
    setimage(e.target.files[0]);
  };

  const changehandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const Add_Product = async () => {
    console.log(productDetails);
    let responseData;
    let product = productDetails;
    let formData = new FormData();
    formData.append('product', image);

    await fetch("https://ecommerce-website-trial-backend.onrender.com/upload", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    })
    .then((resp) => resp.json())
    .then((data) => { responseData = data });

    if(responseData.success){       
      product.image = responseData.image_url;
      console.log(product);
      // You can now send `product` to a backend API for saving
      await fetch("https://ecommerce-website-trial-backend.onrender.com/addproduct", {
        method: "POST",
        headers:{
            Accpet:'application/josn',
            'Content-Type':'application/json',
        },
        body:JSON.stringify(product),
      }).then((resp) => resp.json()).then((data) => {
        data.success?alert("Product Added"):alert("Failed")
      })
    }
  };

  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p> Product Title</p>
        <input 
          value={productDetails.name} 
          onChange={changehandler} 
          type='text' 
          name='name' 
          placeholder='typehere'
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input 
            value={productDetails.old_price} 
            onChange={changehandler} 
            type='text' 
            name="old_price" 
            placeholder='typehere'
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input 
            value={productDetails.new_price} 
            onChange={changehandler} 
            type='text' 
            name="new_price" 
            placeholder='typehere'
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select 
          value={productDetails.category} 
          onChange={changehandler} 
          name='category' 
          className='add-product-selector'
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor='file-input'>
          <img 
            src={image ? URL.createObjectURL(image) : upload_area} 
            className='addproduct-thumbnail-img' 
            alt='' 
          />
        </label>
        <input 
          onChange={imageHandler} 
          type='file' 
          name='image' 
          id='file-input' 
          hidden 
        />
      </div>
      <button onClick={() => {Add_Product()}} className='addproduct-btn'>ADD</button>
    </div>
  );
};

export default Addproduct;
