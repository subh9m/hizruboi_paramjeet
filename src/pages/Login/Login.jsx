import './Login.css';
import Hdr from "../../components/hdr/hdr";
import Footer from "../../components/footer/footer";
import { Link } from 'react-router-dom';
import { useEffect } from "react";
function Login(){
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);
  
    return(
      
        <>
         <Hdr/>


         <form className="form">
  <p className="title">Register</p>
  <p className="message">Signup now and get full access to our app.</p>
  
  
    <label>
      <input className="input" type="text" placeholder="" required />
      <span>Username</span>
    </label>

                    

  <label>
    <input className="input" type="email" placeholder="" required />
    <span>Email</span>
  </label>  

  <label>
    <input className="input" type="password" placeholder="" required />
    <span>Password</span>
  </label>

  <label>
    <input className="input" type="password" placeholder="" required />
    <span>Confirm password</span>
  </label>

  <button className="submit">Submit</button>
  <p className="signin">
    Already have an account? <Link to="/signup" className="link">Sign in</Link>
  </p>
</form>


<Footer/>

        </>

    );

}
export default Login;