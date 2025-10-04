
import './App.css';
import Navbar from './components/navbar/navbar.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Shop from './pages/shop.jsx';
import ShopCategory from './pages/shopcategory.jsx';
import Product from './pages/product.jsx';
import Cart from './pages/cart.jsx';
import LoginSignup from './pages/loginsignup.jsx';
import Footer from './components/Footer/Footer.jsx';
import men_banner from './components/assests/banner_mens.png';
import women_banner from './components/assests/banner_women.png';
import kid_banner from './components/assests/banner_kids.png';
function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/mens' element={<ShopCategory banner = {men_banner} category="men"/>}/>
        <Route path='/womens' element={<ShopCategory banner = {women_banner} category="women"/>}/>
        <Route path='/kids' element={<ShopCategory banner = {kid_banner} category="kid"/>}/> 
        <Route path='/product/:productId' element={<Product/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>
      </Routes>
      <Footer />
      </BrowserRouter>
      
    </div>
  );
}

export default App;
