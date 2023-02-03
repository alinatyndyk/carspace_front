import Modal from "../components/Modal/Modal";
import LoginForm from "../components/Forms/LoginForm";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {carActions} from "../redux";
import {useSearchParams} from "react-router-dom";

export default function HomePage() {
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const [modalActive, setModalActive] = useState(true);
    const navigate = useNavigate();

    const {errors} = useSelector(state => state.cars);
    const submit = (data) => {
        const {errors: dateErrors} = dispatch(carActions.getFilteredByDate({info: data}));
        if (!dateErrors) {
            navigate('/cars');
        }
        console.log(errors, 'errors');
    }

    const [searchParams, setSearchParams] = useSearchParams();
    const [getType, setType] = useState();
    useEffect(() => {
        if (getType !== undefined) {
            const {errors} = dispatch(carActions.getAllWithParams({params: searchParams}));
            if (!errors) {
                navigate(`/cars?vehicle_type=${getType}`);
            }
        }
    }, [getType])

    return (
        <div>
            <div className={'login_page'}>
                <div className={'login_page_insides'}>
                    <h2>RENT A CAR IN LONDON</h2>
                    <div>Book directly from local suppliers. No commission, no mark-ups.</div>
                    <form className={'find_by_date_form'} onSubmit={handleSubmit(submit)}>
                        <input type="date" placeholder={'from_date'} {...register('from_date')}/>
                        <input type="date" placeholder={'to_date'} {...register('to_date')}/>
                        <input type="text" placeholder={'Car search'} {...register('description')}/>
                        <button>Find</button>
                        {/*{carErrors}*/}
                        {errors}
                    </form>

                </div>
                <Modal active={modalActive} setActive={setModalActive}>
                    <LoginForm/>
                </Modal>
            </div>
            <div className="car_types_wrap">
                <h2>Car types</h2>
                <div className={'car_types'}>
                    <div onClick={() => {
                        setType('luxury');
                        searchParams.set('vehicle_type', 'luxury')
                    }}>Luxury
                    </div>
                    <div onClick={() => {
                        setType('economy');
                        searchParams.set('vehicle_type', 'economy')
                    }}>Economy
                    </div>
                    <div onClick={() => {
                        setType('suv');
                        searchParams.set('vehicle_type', 'suv')
                    }}>SUV
                    </div>
                    <div onClick={() => {
                        setType('sedan');
                        searchParams.set('vehicle_type', 'sedan')
                    }}>Sedan
                    </div>
                    <div onClick={() => {
                        setType('sports');
                        searchParams.set('vehicle_type', 'sports')
                    }}>Sports
                    </div>
                    <div onClick={() => {
                        setType('crossover');
                        searchParams.set('vehicle_type', 'crossover');
                    }}>Crossover
                    </div>
                    <div onClick={() => {
                        setType('convertible');
                        searchParams.set('vehicle_type', 'convertible');
                    }}>Convertible
                    </div>
                    <div onClick={() => {
                        setType('electric');
                        searchParams.set('vehicle_type', 'electric');
                    }}>Electric
                    </div>
                    <div onClick={() => {
                        setType('truck');
                        searchParams.set('vehicle_type', 'truck');
                    }}>Truck
                    </div>
                    <div onClick={() => {
                        setType('minivan');
                        searchParams.set('vehicle_type', 'minivan');
                    }}>Minivan
                    </div>
                    <div onClick={() => {
                        setType('coupe');
                        searchParams.set('vehicle_type', 'coupe');
                    }}>Coupe
                    </div>
                </div>
            </div>
        </div>
    )
}