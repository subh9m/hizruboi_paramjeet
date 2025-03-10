
import About from './pages/about/about.jsx';
import Contact from './pages/contact/contact.jsx';
import Header from './pages/Home/Header.jsx';
import Login from './pages/Login/Login.jsx'
import Signup from './pages/Signup/Signup.jsx'
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return <BrowserRouter>
  <Routes>
    
    <Route path="/" element={<Header/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/about" element={<About/>}/>
    



  </Routes>
  </BrowserRouter>
}

export default App;
