const port = process.env.PORT || 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");
const { error } = require("console");

app.use(express.json());
app.use(cors());

// database connection with mongodb
mongoose.connect("mongodb+srv://sriramecommerceproject:Sriramanrav@cluster0.ocvkigo.mongodb.net/ecommerce-project");

// API Creation

app.get("/",(req,res)=>{
      res.send("Express app is running")
})

// Schema for creating products

const Product = mongoose.model("Product",{
    id:{
        type: Number,
        required: false,
    },
    name:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    new_price:{
        type: Number,
        required: true,
    },
    old_price:{
        type: Number,
        required: true,
    },
    date:{
        type: Number,
        default: Date.now,
    },
    available:{
         type: Boolean,
         default: true,
    }
})

app.post("/removeproduct", async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name,
    })
})

app.post("/addproduct", async (req, res) => {
  let products = await Product.find({}).sort({ id: -1 }); 
  let id;

  if (products.length > 0) {
    let last_product = products[0];
    console.log("Last product:", last_product);
    if (typeof last_product.id === "number") {
      id = last_product.id + 1;
    } else {
      id = 1;
    }
  } else {
    id = 1;
  }
  console.log("New product id:", id);

  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });

  console.log(product);
  await product.save();
  console.log("Saved");
  res.json({
    success: true,
    name: req.body.name,
  });
});

app.get("/allproducts", async (req,res) => {
  let products = await Product.find({});
  console.log("all products fetched");
  res.send(products);
})

// ScHema creating for user model

const Users = mongoose.model('Users',{
     name:{
      type: String,
     },
     email:{
      type: String,
      unique: true,
     },
     password:{
      type: String,
     },
     cartData:{
      type: Object,
     },
     date:{
      type: Date,
      default: Date.now,
     }
})

// Creating ENdpoint for registering the user

// app.post("/signup",async(req,res) => {

//   let Check = await Users.findOne({email:req.body.email});
//   if(Check){
//     return res.status(400).json({success:false,error:"existing user found with same email address"});
//   }
//   let cart = {};
//   for (let i = 0; i < 300; i++) {
//     cart[i] = 0;
//   }
//   const user = new Users({
//        name:req.body.username,
//        email:req.body.email,
//        password:req.body.password,
//        cartData:cart,
//   })
//   await user.save();

//   const data = {
//     user:{
//       id:user.id
//     }
//   }

//   const token = jwt.sign(data,'secret_ecom');
//   res.json({success:true,token})
// })

app.post("/signup", async (req, res) => {
  try {
    let Check = await Users.findOne({ email: req.body.email });
    if (Check) {
      return res.status(400).json({ success: false, error: "existing user found with same email address" });
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }
    const user = new Users({
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
      cartData: cart,
    });
    await user.save();
    const data = { user: { id: user.id } };
    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


//creating endpoint for user login

app.post("/login", async (req,res) => {
    let user = await Users.findOne({email:req.body.email});
    if(user){
      const passCompare = req.body.password === user.password;
      if(passCompare){
        const data= {
          user:{
            id:user.id
          }
        }
        const token = jwt.sign(data, 'secret_ecom');
        res.json({success:true,token});
      }
      else{
        res.json({success:false,errors:"Wrong Password"});
      }
    }
    else{
      res.json({success:false, errors:"Wrong email ID"})
    }
})

app.get("/newcollections",async(req,res) => {
    let products = await Product.find({});
    let newcollections = products.slice(0,8);
    console.log("new collections fetched");
    res.send(newcollections);
})

//creating  middleware to fetch user
const fetchuser = async(req,res,next) => {
  const token = req.header('auth-token');
  if(!token){
    res.status(401).send({error:"Please authenticate using a valid token"})
  }
  try{
    const data = jwt.verify(token,'secret_ecom');
    req.user = data.user;
    next();
  }catch(error){
    res.status(401).send({error:"Please authenticate using a valid token"})
  }
}

app.post("/addtocart",fetchuser,async(req,res) => {
    console.log(req.body,req.user);
    let userData = await Users.findOne({_id:req.user.id});
    let cart = userData.cartData;
    let itemId = req.body.itemId;
    cart[itemId] = cart[itemId] + 1;
    await Users.findByIdAndUpdate(req.user.id,{cartData:cart});
    res.json({success:true,cartData:cart});
})

app.post("/removecart",fetchuser,async(req,res) => {
    console.log(req.body,req.user);
    let userData = await Users.findOne({_id:req.user.id});
    let cart = userData.cartData;
    let itemId = req.body.itemId;
    if(cart[itemId] > 0){
      cart[itemId] = cart[itemId] - 1;
    }
    await Users.findByIdAndUpdate(req.user.id,{cartData:cart});
    res.json({success:true,cartData:cart});
})

app.get("/getcart",fetchuser,async(req,res) => {
    let userData = await Users.findOne({_id:req.user.id});
    let cart = userData.cartData;
    res.json({success:true,cartData:cart});
})

app.listen(port,(error)=>{
   if(!error){
      console.log("Server running on port" +port)
   }else{
      console.log("error: " +error)
   }
})

//Image storage Engine

// const storage = multer.diskStorage({
//     destination: './upload',
//     filename:(req,file,cb)=>{
//         return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//     }
// })

const storage = multer.diskStorage({
  destination: './upload/images',  // Change this line
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});


const upload = multer({storage:storage})

// Creating  upload endpoint for image

app.use('/images',express.static('upload/images'))

app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success: 1,
        image_url: `https://ecommerce-website-trial-backend.onrender.com/images/${req.file.filename}`
    });

})

