import './Signup.css';
import Hdr from "../../components/hdr/hdr";
import Footer from "../../components/footer/footer";
import Sign from "../../components/Sign/Sign";
import { useEffect } from "react";
function Signup(){
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return(
        <>
        <Hdr/>

        <Sign/>
        

        <Footer/>
        </>
    );
}
export default Signup;