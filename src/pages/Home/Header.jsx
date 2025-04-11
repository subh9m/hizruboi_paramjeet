import Image from '../../assets/img1.png';
import Image1 from '../../assets/img2.jpg';
import Image2 from '../../assets/img3.jpg';
import Image3 from '../../assets/img4.jpg';
import Image4 from '../../assets/img5.jpg';
import Image5 from '../../assets/img6.jpg';

import './Header.css';
// import Hdr from "../../components/hdr/hdr";
import Footer from "../../components/footer/footer";
// import Download from "../../components/download/download";
// import Flipcard from "../../components/flipcard/flipcard";
import Faq from "../../components/faq/faq";
import Hdr from '../../components/hdr/hdr';
import Flashcard from '../../components/flashcard/flashcard';
import Pricing from '../../components/price/Pricing';
import { useEffect } from "react";
import ItemForm from '../../components/item-form/itemform';
import DrawerMobileNavigation from '../../components/DrawerMobileNavigation/DrawerMobileNavigation';



function Header() {
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);
  return (
    <>
    
    <Hdr/>

    
    

      <div className="hero">
        <div className="para">
          <h1>Welcome to Velafaram!</h1>
          <h3>Stay Organized, Never Miss An Expiry.</h3>
          <p>Velafaram is your smart reminder companion, helping you keep track of important dates, product expirations, and daily tasks. Get notified before it's too late and stay ahead of your schedule effortlessly.</p>
        </div>

        <div>
          <img className="img1" src={Image} alt='profile pic' />
        </div>

        
      </div>



      <div>
        <div className="why">
          <h1>Why Velafaram? </h1>
        </div>
        <Flashcard/>
        
      </div>



      <div className='hor-cards'>
        <div className='rec-card1'>
          <div className='c1h'>
          <h1>Reliable & Timely</h1>
          <h2>Never forget important dates again.</h2>
          </div>
          
          <div className='img5'>
          <img className="img-5" src={Image4} alt="User-Friendly Interface" />
          </div>
         
        </div>
      
  
        <div className='rec-card2'>
          <div className='img-6'>
          <img className="img6" src={Image5} alt="User-Friendly Interface" />
          </div>
        
        <div className='c2h'>
        <h1> Analytics & Insights</h1>
        <h2>Track your reminder habits with useful insights.</h2>
        </div>
        </div>

        </div>



        <Pricing/>
    

<Faq/>
{/* <ItemForm/> */}



      <Footer/>


<flashcard/>




      
    </>
  );
}

export default Header;
