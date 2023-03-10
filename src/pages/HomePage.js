import Modal from "../components/Modal/Modal";
import LoginForm from "../components/Forms/LoginForm";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import {carActions} from "../redux";
import {useSearchParams} from "react-router-dom";
import {authService, history} from "../services";

export default function HomePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm();
    const [getErrors, setErrors] = useState(null);
    const [modalActive, setModalActive] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();

    const token = authService.getAccessToken();

    useEffect(() => {
        setErrors(null);
    }, [window.location.search])

    const submit = (data) => {
        const str = data?.description.replaceAll(" ", '_').toLowerCase();

        searchParams.set('from_date', data.from_date);
        searchParams.set('to_date', data.to_date);
        searchParams.set('description', str);
        setSearchParams(searchParams);
        const promise1 = Promise.resolve(dispatch(carActions.getFilteredByDate({info: data})))

        promise1.then((value) => {
            if (value.error) {
                throw new Error(value.payload);
            } else {
                history.push(`/cars?${searchParams}`);
            }
        }).catch((error) => {
            setErrors(error.message)
        })

        setSearchParams(searchParams);
    }
    const [getType, setType] = useState();
    useEffect(() => {
        if (getType !== undefined) {
            console.log('str54');
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
                        {getErrors}
                    </form>
                </div>
                {!token ? <Modal active={modalActive} setActive={setModalActive}>
                    <LoginForm/>
                </Modal> : null}
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