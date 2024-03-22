
import { Link } from 'react-router-dom';
import style from '../../styles/Footer.module.css'
import { ROUTES } from '../../utils';
import LOGO from '../../images/logo.svg'
import { FaInstagram } from "react-icons/fa";
import { CiYoutube } from "react-icons/ci";
import { FaFacebookF } from "react-icons/fa";


const Footer = () => {

    return(
        <footer className={style.footer}>
            <div className={style.logo}>
                <Link to={ROUTES.HOME}>
                    <img src={LOGO} alt="Stuff" />
                </Link>
            </div>
            <div className={style.rights}>
                <b>Developed by Evgeny Talyzin</b>
            </div>
            <div className={style.socials}>
                <a 
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                >
                    <CiYoutube/>
                </a>
                <a 
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                >
                    <FaFacebookF/>
                </a>
                <a 
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                >
                    <FaInstagram/>
                </a>
            </div>
        </footer>
    )
}

export default Footer;