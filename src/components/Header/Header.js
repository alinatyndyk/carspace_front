import {Link} from "react-router-dom";
import BrandsPage from "../../pages/BrandsPage";
import {useState} from "react";
import './Header.css'

export default function Header() {
    const [isShown, setIsShown] = useState(false);
    return (
        <div>
            <div className={'menu'}>
                <h3>Carspace.</h3>
                <div className={'menu_navbar'}>
                    <p><Link className={'menu_navbar_link'} to={'/home'}>Home</Link></p>
                    <p><Link className={'menu_navbar_link'} to={'/locations'}>Locations</Link></p>
                    <p
                        onMouseOver={() => setIsShown(true)}
                        onMouseLeave={() => setIsShown(false)}>
                        <Link className={'menu_navbar_link'} to={'/brands'}>Brands</Link> {isShown && (
                        <div className={'brands'}>
                            <BrandsPage/>
                        </div>
                    )}
                    </p>
                    <p><Link className={'menu_navbar_link'} to={'/about'}>About us</Link></p>
                    <p><Link className={'menu_navbar_link'} to={'/cars'}>Cars</Link></p>
                    <p><Link className={'menu_navbar_link'} to={'/users'}>Users</Link></p>
                </div>
                <div className={'auth_links'}>
                    <span><Link className={'menu_navbar_link'} to={'/login/company'}>Sign in your property</Link></span>
                    <span><Link className={'menu_navbar_link'} to={'/login'}>Sign in</Link></span>
                    <span><Link className={'menu_navbar_link'} to={'/register'}>Sign up</Link></span>
                </div>
            </div>
        </div>
    )
}