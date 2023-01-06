import {Link} from "react-router-dom";
import BrandsPage from "../../pages/BrandsPage";
import {useEffect, useState} from "react";
import './Header.css'
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {carActions} from "../../redux";
import React from "react";
import {useNavigate} from "react-router";
import {authService} from "../../services";
import jwt_decode from "jwt-decode";

export default function Header() {
    const [isShown, setIsShown] = useState(false);
    const [isLocation, setIsLocation] = useState(false);
    const [isAccount, setIsAccount] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [Id, setId] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const {errors} = useSelector(state => state.cars)
    const {register, handleSubmit} = useForm();

    // if (!access) {
    //     console.log('no access');
    // } else if (access) {
    //     const {_id} = jwt_decode(access);
    //     setIsAuth(true)
    //     console.log(access, _id);
    //
    // }

    const access = authService.getAccessToken();
    useEffect(() => {
        if (!access) {
            console.log('no access');
        } else if (access) {
            const {_id} = jwt_decode(access);
            setId(_id);
            setIsAuth(true)
            console.log(access, _id);

        }
        // if (access) {
        //     console.log('auth done');
        //     setIsAuth(true);
        // } else {
        //     setIsAuth(false);
        // }
    }, [])

    const submit = async (data) => {
        dispatch(carActions.getByDescription({search: data}))
    }
    // const isAuth = authService.getAccessToken();
    return (
        <div>
            <div className={'menu'}>
                <h3>Carspace.</h3>
                {isAuth === true ?
                    <span
                        onMouseOver={() => setIsAccount(true)}
                        onMouseLeave={() => setIsAccount(false)}><span
                        onClick={() => navigate(`/account`, { state: { Id } })}
                        className={'menu_link'}>Account</span> {isAccount && (
                        <div className={'brands'}>
                            <div onClick={() => navigate(`/account/orders`)}>Company Orders</div>
                            <div onClick={() => navigate(`/account/orders?today=true`)}>Company Orders Today</div>
                            {/*<Link to={`/account/orders?today=true`}>Company Orders Today</Link>*/}
                        </div>
                    )}</span> :
                    <div className={'auth_links'}>
                        <span><Link className={'menu_link'} to={'/login/company'}>Sign in your property</Link></span>
                        <span><Link className={'menu_link'} to={'/login'}>Sign in</Link></span>
                        <span><Link className={'menu_link'} to={'/register'}>Sign up</Link></span>
                    </div>
                }
                {/*<div className={'auth_links'}>*/}
                {/*    <span><Link className={'menu_link'} to={'/login/company'}>Sign in your property</Link></span>*/}
                {/*    <span><Link className={'menu_link'} to={'/login'}>Sign in</Link></span>*/}
                {/*    <span><Link className={'menu_link'} to={'/register'}>Sign up</Link></span>*/}
                {/*</div>*/}
            </div>
            <div>
                <div className={'menu_navbar'}>
                    <p><Link className={'menu_navbar_link'} to={'/home'}>Home</Link></p>
                    {/*<p><Link className={'menu_navbar_link'} to={'/locations'}>Locations</Link></p>*/}
                    <p
                        onMouseOver={() => setIsLocation(true)}
                        onMouseLeave={() => setIsLocation(false)}>
                        <Link className={'menu_navbar_link'} to={'/brands'}>Brands</Link> {isLocation && (
                        <div className={'brands'}>
                            <BrandsPage/>
                        </div>
                    )}
                    </p>
                    <p
                        onMouseOver={() => setIsShown(true)}
                        onMouseLeave={() => setIsShown(false)}>
                        <Link className={'menu_navbar_link'} to={'/brands'}>Locations</Link> {isShown && (
                        <div className={'brands'}>
                            {/*<BrandsPage/>*/}
                            <div>London</div>
                            <div>Manchester</div>
                            <div>Dubai</div>
                            <input type="checkbox"/>
                        </div>
                    )}
                    </p>
                    <p><Link className={'menu_navbar_link'} to={'/about'}>About us</Link></p>
                    <p><Link className={'menu_navbar_link'} to={'/cars'}>Cars</Link></p>
                    {/*<p><Link className={'menu_navbar_link'} to={'/users'}>Users</Link></p>*/}
                    <p><Link className={'menu_navbar_link'} to={'/companies'}>Companies</Link></p>
                    <form onSubmit={handleSubmit(submit)}>
                        <input type="text" placeholder={'Car rentals in London'} {...register('search')}/>
                        <button onClick={() => navigate('/cars')}>Search</button>
                    </form>
                </div>
            </div>
        </div>
    )
}