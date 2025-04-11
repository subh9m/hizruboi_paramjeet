

import About from './pages/about/about.jsx';
import Contact from './pages/contact/contact.jsx';
import Dashboard from './pages/dashboard/dashboard.jsx';
import EditProduct from './pages/edit-product/EditProduct.jsx';
import EditUser from './pages/edit-user/EditUser.jsx';
import Header from './pages/Home/Header.jsx';
// import Login from './pages/Login/Login.jsx'
import Product from './pages/product/product.jsx';
import Signup from './pages/Signup/Signup.jsx'
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  return <BrowserRouter>
  <Routes>
    
    <Route path="/" element={<Header/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/product" element={<Product/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/edit-product" element={<EditProduct/>}/>
    <Route path="/edit-user" element={<EditUser/>}/>
    
  


  </Routes>
  </BrowserRouter>
}

export default App;
