import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import './Header.css'
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {authActions, brandActions, carActions} from "../../redux";
import React from "react";
import {useNavigate} from "react-router";
import {authService} from "../../services";
import jwt_decode from "jwt-decode";

export default function Header() {

    const [isShown, setIsShown] = useState(false);
    const [isLocation, setIsLocation] = useState(false);
    const [location, setLocation] = useState(null);
    const [isAccount, setIsAccount] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [isAuthUser, setIsAuthUser] = useState(false);
    const [isAuthAdmin, setIsAuthAdmin] = useState(false);
    const [Id, setId] = useState(null);
    const [getBrand, setBrand] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm();
    const {brands} = useSelector(state => state.brands);

    const access = authService.getAccessToken();
    useEffect(() => {
        dispatch(brandActions.getAll());
        if (access) {
            const first = access.split(' ')[0];
            const {_id, status} = jwt_decode(access);
            if (first === 'Company') {
                setId(_id);
                setIsAuth(true);
            } else if (first === 'User') {
                setId(_id);
                setIsAuthUser(true);
            } else if (first === 'Admin') {
                setId(_id);
                setIsAuthUser(true);
                if (status === 'admin') {
                    setIsAuthAdmin(true);
                }
            }
        }
    }, []);

    useEffect(() => {
        if (getBrand !== null) {
            dispatch(carActions.getByBrand({brand: getBrand}));
        }
    }, [getBrand])

    useEffect(() => {
        if (location !== null) {
            dispatch(carActions.getByLocation({location}))
        }
    }, [location])

    const submit = async (data) => {
        const str = data?.description.replaceAll(" ", '_').toLowerCase();
        const {errors} = dispatch(carActions.getByDescription({description: {description: str.toLowerCase()}}));
        if (!errors) {
            navigate(`/cars?description=${str}`);
        }
    }

    const logout = () => {
        const {errors} = dispatch(authActions.logoutCompany());
        if (!errors) {
            navigate('/login/company')
        }
    }

    const logoutUser = () => {
        const {errors} = dispatch(authActions.logoutUser());
        if (!errors) {
            navigate('/login');
        }
    }

    return (
        <div className={'header'}>
            <div className={'menu'}>
                <h3 onClick={() => navigate('/home')}>Carspace.</h3>
                {isAuth === true ?
                    <span
                        onMouseOver={() => setIsAccount(true)}
                        onMouseLeave={() => setIsAccount(false)}>
                        <span
                            onClick={() => navigate(`/account`)}
                            className={'menu_link'}>Account</span> {isAccount && (
                        <div className={'brands'}>
                            <div onClick={() => navigate(`/account/orders`, {state: {type: 'company-orders'}})}>Orders
                            </div>
                            <div
                                onClick={() => navigate(`/account/orders?today=true`, {state: {type: 'company-orders'}})}>Today
                                Orders
                            </div>
                            <span><button onClick={() => logout()}>Logout</button></span>
                        </div>
                    )}</span> : isAuthUser === true ?
                        <span
                            onMouseOver={() => setIsAccount(true)}
                            onMouseLeave={() => setIsAccount(false)}>
                        <span
                            onClick={() => navigate(`/account`, {state: {Id, type: 'user'}})}
                            className={'menu_link'}> User Account</span> {isAccount && (
                            <div className={'brands'}>
                                <div onClick={() => navigate(`/account/orders`, {state: {type: 'user-orders'}})}>My
                                    orders
                                </div>
                                <span><button onClick={() => logoutUser()}>Logout User</button></span>
                            </div>
                        )}</span> :
                        <div className={'auth_links'}>
                            <span><Link className={'auth_link'}
                                        to={'/login/company'}>Sign in your property</Link></span>
                            <span><Link className={'auth_link'} to={'/login'}>Sign in</Link></span>
                            <span><Link className={'auth_link'} to={'/register'}>Sign up</Link></span>
                        </div>
                }
            </div>
            <div>
                <div className={'menu_navbar'}>
                    <div className={'menu_navbar_links'}>

                        <p><Link className={'menu_navbar_link'} to={'/home'}>Home</Link></p>
                        <p
                            onMouseOver={() => setIsLocation(true)}
                            onMouseLeave={() => setIsLocation(false)}>
                            <Link className={'menu_navbar_link'} to={'/brands'}>Brands</Link> {isLocation && (
                            <div className={'brands'}>
                                {brands.map(brand => <div onClick={() => {
                                    navigate(`brands/${brand.brand}`);
                                    setBrand(brand.brand)
                                }}>{brand.brand}</div>)}
                            </div>
                        )}
                        </p>
                        <p
                            onMouseOver={() => setIsShown(true)}
                            onMouseLeave={() => setIsShown(false)}>
                            <div className={'menu_navbar_link'}>Locations</div>
                            {isShown && (
                                <div className={'brands'}>
                                    <div onClick={() => {
                                        navigate(`/locations/london`)
                                        setLocation('london');
                                    }}>London
                                    </div>
                                    <div onClick={() => {
                                        navigate(`/locations/birmingham`)
                                        setLocation('birmingham')
                                    }}>Birmingham
                                    </div>
                                    <div onClick={() => {
                                        navigate(`/locations/manchester`)
                                        setLocation('manchester')
                                    }}>Manchester
                                    </div>
                                    <div onClick={() => {
                                        navigate(`/locations/leeds`)
                                        setLocation('leeds')
                                    }}>Leeds
                                    </div>
                                    <div onClick={() => {
                                        navigate(`/locations/sheffield`)
                                        setLocation('sheffield')
                                    }}>Sheffield
                                    </div>
                                    <div onClick={() => {
                                        navigate(`/locations/liverpool`)
                                        setLocation('liverpool')
                                    }}>Liverpool
                                    </div>
                                    <div onClick={() => {
                                        navigate(`/locations/bristol`)
                                        setLocation('bristol')
                                    }}>Bristol
                                    </div>
                                    <div onClick={() => {
                                        navigate(`/locations/wakefield`)
                                        setLocation('wakefield')
                                    }}>Wakefield
                                    </div>
                                </div>
                            )}
                        </p>
                        <p><Link className={'menu_navbar_link'} to={'/about'}>About us</Link></p>
                        <p><Link onDoubleClick={() => window.location.reload()} className={'menu_navbar_link'}
                                 to={'/cars'}>Cars</Link></p>
                        <p><Link className={'menu_navbar_link'} to={'/companies'}>Companies</Link></p>
                        {isAuthAdmin === true ?
                            <p><Link className={'menu_navbar_link'} to={'/admin'}>Admin control panel</Link></p> : null}
                    </div>
                    <div className={'menu_navbar_form'}>
                        <form onSubmit={handleSubmit(submit)}>
                            <input type="text" placeholder={'Car rentals in London'} {...register('description')}/>
                            <button>Go!</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}