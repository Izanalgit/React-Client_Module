import { useApp } from '../context/AppContext';
import '../css/Footer.css';

const Footer = () =>{
    const {logedIn} = useApp();

    return (<>
        {logedIn &&
            <footer>
                <p>cosas del footer</p>
                <p>cosas del footer</p>
                <p>cosas del footer</p>
                <p>cosas del footer</p>
            </footer>
        }
    </>)


}

export default Footer;