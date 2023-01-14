import {Link, useSearchParams} from "react-router-dom";
import BrandsPage from "../../pages/BrandsPage";
import {useEffect, useState} from "react";
import './Header.css'
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {authActions, carActions} from "../../redux";
import React from "react";
import {useNavigate} from "react-router";
import {authService} from "../../services";
import jwt_decode from "jwt-decode";
import {createBrowserHistory} from "history";

const history = createBrowserHistory();

export default function Header() {
    const [isShown, setIsShown] = useState(false);
    const [isLocation, setIsLocation] = useState(false);
    const [location, setLocation] = useState(false);
    const [isAccount, setIsAccount] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [isAuthUser, setIsAuthUser] = useState(false);
    const [Id, setId] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    // const {errors} = useSelector(state => state.cars)
    const {register, handleSubmit} = useForm();
    const {cars} = useSelector(state => state.cars);
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
            const first = access.split(' ')[0];
            console.log(first, 'first');
            const {_id} = jwt_decode(access);
            if (first === 'Company') {
                setId(_id);
                setIsAuth(true);
                console.log(access, _id);
            } else if (first === 'User') {
                setId(_id);
                setIsAuthUser(true);
            }

        }
    }, [])

    useEffect(() => {
        searchParams.set('location', location)
        setSearchParams(searchParams);
        const {errors} = dispatch(carActions.getAllWithParams({params: searchParams}));
        if(!errors){
            navigate(`/cars?${searchParams}`);
        }
    }, [location])

    const submit = async (data) => {
        console.log(data, "DATA**************************");
        const {errors} = dispatch(carActions.getByDescription({description: data}));
        if (!errors) {
            navigate(`/cars`, {state: {description: data}})
        }
    }
    // const isAuth = authService.getAccessToken();

    const logout = () => {
        const {errors} = dispatch(authActions.logoutCompany());
        if (!errors) {
            navigate('/login/company')
        }
        console.log('logout function');
    }

    const logoutUser = () => {
        const {errors} = dispatch(authActions.logoutUser());
        if (!errors) {
            navigate('/login')
        }
        console.log('logout function');
    }

    return (
        <div className={'header'}>
            <div className={'menu'}>
                <h3>Carspace.</h3>
                <button onClick={() => window.location.reload()}>Reload page</button>
                {isAuth === true ?
                    <span
                        onMouseOver={() => setIsAccount(true)}
                        onMouseLeave={() => setIsAccount(false)}>
                        <span
                            onClick={() => navigate(`/account`, {state: {Id, type: 'company'}})}
                            className={'menu_link'}>Account</span> {isAccount && (
                        <div className={'brands'}>
                            <div onClick={() => navigate(`/account/orders`, {state: {type: 'company-orders'}})}>Company
                                Orders
                            </div>
                            <div
                                onClick={() => navigate(`/account/orders?today=true`, {state: {type: 'company-orders'}})}>Company
                                Orders Today
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
                                {/*'London', 'Birmingham', 'Manchester', 'Leeds', 'Sheffield', 'Liverpool', 'Bristol', 'Wakefield'*/}
                                {/*<div onClick={() => {searchParams.set('location', 'london'); setLocation('london');}}>London</div>*/}
                                <div onClick={() => {
                                    // searchParams.set('location', 'london');
                                    setLocation('london')
                                }}>London
                                </div>
                                <div onClick={() => {
                                    // searchParams.set('location', 'birmingham');
                                    setLocation('birmingham')
                                }}>Birmingham
                                </div>
                                <div onClick={() => {
                                    // searchParams.set('location', 'manchester');
                                    setLocation('manchester')
                                }}>Manchester
                                </div>
                                <div onClick={() => {
                                    // searchParams.set('location', 'manchester');
                                    setLocation('leeds')
                                }}>Leeds</div>
                                <div>Sheffield</div>
                                <div>Liverpool</div>
                                <div>Bristol</div>
                                <div>Wakefield</div>
                                {JSON.stringify(cars)}
                            </div>
                        )}
                        </p>
                        <p><Link className={'menu_navbar_link'} to={'/about'}>About us</Link></p>
                        <p><Link className={'menu_navbar_link'} to={'/cars'}>Cars</Link></p>
                        <p><Link className={'menu_navbar_link'} to={'/companies'}>Companies</Link></p>
                    </div>
                    <div className={'menu_navbar_form'}>
                        <form onSubmit={handleSubmit(submit)}>
                            <input type="text" placeholder={'Car rentals in London'} {...register('description')}/>
                            <button>Search</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}