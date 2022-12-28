import {Link} from "react-router-dom";
import BrandsPage from "../../pages/BrandsPage";
import {useState} from "react";
import './Header.css'

export default function Header() {
    const [isShown, setIsShown] = useState(false);

    return (
        <div>
            <div className={'menu'}>
                <h2>Carspace</h2>
                <ul className={'menu_navbar'}>
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/locations'}>Locations</Link></li>
                    <li
                        onMouseOver={() => setIsShown(true)}
                        onMouseLeave={() => setIsShown(false)}>
                        <Link to={'/brands'}>Brands</Link> {isShown && (
                        <div className={'brands'}>
                            <BrandsPage/>
                        </div>
                    )}
                    </li>
                    <li><Link to={'/about'}>About us</Link></li>
                </ul>
                <div>
                    <span><Link to={'/login'}>Sign in</Link></span>
                    <Link to={'/register'}>Sign up</Link>
                </div>
            </div>
        </div>
    )
}