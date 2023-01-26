import Modal from "../components/Modal/Modal";
import LoginForm from "../components/Forms/LoginForm";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {carActions} from "../redux";
import CarCard from "../components/CarCard";
import {createBrowserHistory} from "history";
import {axiosService} from "../services";
import {useSearchParams} from "react-router-dom";
import {push} from 'react-router-redux';
import Cars from "../components/Cars";
import CarPage from "./CarPage";

const history = createBrowserHistory();

export default function HomePage() {
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const [modalActive, setModalActive] = useState(true);
    const {cars} = useSelector(state => state.cars)

    const submit = (data) => {
        console.log(data);
        const {errors} = dispatch(carActions.getFilteredByDate({info: data}));
        if (!errors) {
            history.push('/cars');
            // navigate('/cars');
        }

        console.log(errors);
    }

    const [searchParams, setSearchParams] = useSearchParams();
    const [getType, setType] = useState();
    useEffect(() => {
        setSearchParams(searchParams);
        const {errors} = dispatch(carActions.getAllWithParams({params: searchParams}));
        if (!errors) {
            // history.push(`/cars/${window.location.search}/search`);
            dispatch(push('/cars/search/done'))
        }
    }, [getType])

    return (
        <div>

            <div className={'login_page'}>
                Home page ...
                <div className={'login_page_insides'}>
                    <h2>RENT A CAR IN LONDON</h2>
                    <div>Book directly from local suppliers. No commission, no mark-ups.</div>
                    <form className={'find_by_date_form'} onSubmit={handleSubmit(submit)}>
                        <input type="date" placeholder={'from_date'} {...register('from_date')}/>
                        <input type="date" placeholder={'to_date'} {...register('to_date')}/>
                        <input type="text" placeholder={'Car search'} {...register('description')}/>
                        <button>Find</button>
                        {/*<CarParamsForm/>*/}
                    </form>

                </div>
                <Modal active={modalActive} setActive={setModalActive}>
                    <LoginForm/>
                </Modal>
                {/*<form onSubmit={handleSubmit(uploadAlbum)} encType={'multipart/form-data'}>*/}
                {/*    <input type="file" multiple="multiple" {...register('files')}/>*/}
                {/*    <button>upload album</button>*/}
                {/*</form>*/}
                {/*{cars.map(car => <CarCard car={car}/>)}*/}
            </div>
            CAR TYPES
            <div className={'car_types'}>
                <div onClick={() => {
                    // setValue('vehicle_type', 'Luxury');
                    setType('luxury');
                    searchParams.set('vehicle_type', 'luxury')
                }}>Luxury
                </div>
                <div onClick={() => {
                    // setValue('vehicle_type', 'Economy');
                    setType('economy');
                    searchParams.set('vehicle_type', 'economy')
                }}>Economy
                </div>
                <div onClick={() => {
                    // setValue('vehicle_type', 'SUV');
                    setType('suv');
                    searchParams.set('vehicle_type', 'suv')
                }}>SUV
                </div>
                <div onClick={() => {
                    // setValue('vehicle_type', 'Sedan');
                    setType('sedan');
                    searchParams.set('vehicle_type', 'sedan')
                }}>Sedan
                </div>
                <div onClick={() => {
                    // setValue('vehicle_type', 'Sports');
                    setType('sports');
                    searchParams.set('vehicle_type', 'sports')
                }}>Sports
                </div>
                <div onClick={() => {
                    // setValue('vehicle_type', 'Crossover');
                    setType('crossover');
                    searchParams.set('vehicle_type', 'crossover');
                }}>Crossover
                </div>
                <div onClick={() => {
                    // setValue('vehicle_type', 'Convertible');
                    setType('convertible');
                    searchParams.set('vehicle_type', 'convertible');
                }}>Convertible
                </div>
                <div onClick={() => {
                    // setValue('vehicle_type', 'Electric');
                    setType('electric');
                    searchParams.set('vehicle_type', 'electric');
                }}>Electric
                </div>
                <div onClick={() => {
                    // setValue('vehicle_type', 'Truck');
                    setType('truck');
                    searchParams.set('vehicle_type', 'truck');
                }}>Truck
                </div>
                <div onClick={() => {
                    // setValue('vehicle_type', 'Minivan');
                    setType('minivan');
                    searchParams.set('vehicle_type', 'minivan');
                }}>Minivan
                </div>
                <div onClick={() => {
                    // setValue('vehicle_type', 'Coupe');
                    setType('coupe');
                    searchParams.set('vehicle_type', 'coupe');
                }}>Coupe
                </div>
            </div>
            <div>
                <CarPage/>
            </div>
        </div>
    )
}