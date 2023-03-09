import {useDispatch, useSelector} from "react-redux";
import {carActions} from "../redux";
import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {authService} from "../services";
import jwt_decode from "jwt-decode";
import CheckoutComponent from "./CheckoutComponent";
import './Car.css'
import {Link} from "react-router-dom";
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Navigation, Pagination, Scrollbar} from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function CarFull() {
    const dispatch = useDispatch();
    const {car_id} = useParams();
    const navigate = useNavigate();
    const {register, handleSubmit, setValue} = useForm();

    useEffect(() => {
        dispatch(carActions.getById({_id: car_id}));
    }, [car_id])

    const {car, carForUpdate, errors} = useSelector(state => state.cars);
    const {
        model,
        brand,
        model_year,
        images,
        company,
        location,
        description,
        car_features,
        min_rent_time,
        security_deposit,
        price_day_basis,
        min_drivers_age
    } = car;

    useEffect(() => {
        if (carForUpdate) {
            setValue('model', carForUpdate.model)
            setValue('model_year', carForUpdate.model_year)
            setValue('description', carForUpdate.description)
            setValue('price_day_basis', carForUpdate.price_day_basis)
        }
    }, [carForUpdate])

    const submit = async (data) => {
        dispatch(carActions.updateCar({_id: carForUpdate._id, car: data}));
    }

    const [equal, setEqual] = useState(false);
    const [getDecoded, setDecoded] = useState(false);
    const [book, setBook] = useState(false);

    useEffect(() => {
        const token = authService.getAccessToken();
        if (token) {
            const decoded = jwt_decode(token);
            setDecoded(decoded);
        }
    }, [])

    useEffect(() => {
        if (company === getDecoded._id) {
            setEqual(true);
        } else {
            setEqual(false);
        }
    })

    let features = [];
    for (const feature in car_features) {
        if (car_features[feature]) {
            features.push(feature);
        }
    }

    return (
        <div className={'car-full-wrap'}>
            <div>{min_rent_time === 1 ? <div className={'green'}>1 day rent available</div> : null} security deposit:{security_deposit}USD
            </div>
            <div className={'car-full'}>
                <div className={'car-full-top'}>
                    <Swiper
                        className={'swiper_wrapper_car'}
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        slidesPerView={1}
                        navigation={true}
                        grabCursor={true}
                        pagination={{clickable: true}}
                        scrollbar={{draggable: true}}
                    >
                        {
                            images?.map(image => <SwiperSlide><img src={`${image?.link}`} alt=''/></SwiperSlide>)
                        }
                    </Swiper>
                    <div className={'car-full-data'}>
                        <div className={'car-pricing'}>
                            <p className={'car-full-data-property-name'}>Pricing</p>
                            <p>{price_day_basis}USD</p>
                        </div>
                        <div>
                            <p className={'car-full-data-property-name'}>Brand</p>
                            <p>{brand}</p>
                        </div>
                        <div>
                            <p className={'car-full-data-property-name'}>Model</p>
                            <p>{model}</p>
                        </div>
                        <div>
                            <p className={'car-full-data-property-name'}>Model Year</p>
                            <p>{model_year}</p>
                        </div>
                        <div>
                            <p className={'car-full-data-property-name'}>Location</p>
                            <p>{location}</p>
                        </div>
                        <button className={'book-car_button'} onClick={() => {
                            if (book === false) {
                                setBook(true)
                            } else {
                                setBook(false)
                            }
                        }}>Book this car
                        </button>
                    </div>
                </div>
                <div className={'car-full-bottom'}>
                    <div>
                        <h3>Description</h3>
                        <br/>
                        <div>{description}</div>
                        <div className={'error'}>You have to be at least {min_drivers_age} to rent this car</div>
                        <div><Link to={`/companies/${company}`}>More cars from this company</Link></div>
                    </div>
                    <div>
                        {book === true ?
                            <div className={'checkout-form'}><CheckoutComponent car={car} carErrors={errors}/>
                            </div> : null}
                    </div>
                </div>
                <h3>Extra features</h3>
                <div className={'car_features'}>{features.map(item => <div
                    className={'car_feature'}>{item}</div>)}</div>
                {equal === true ?
                    <div>
                        <button onClick={() => {
                            dispatch(carActions.setCarForUpdate(car));
                        }}>set for update
                        </button>
                        <button onClick={() => {
                            dispatch(carActions.deleteById({_id: car_id}));
                            navigate('/account');
                        }}>delete car
                        </button>
                    </div>
                    : null}
                {equal === true ?
                    <div>
                        <form onSubmit={handleSubmit(submit)}>
                            <div><input type="text" placeholder={'model'} {...register('model')}/></div>
                            <div><input type="number" placeholder={'model_year'} {...register('model_year')}/></div>
                            <div><input type="number" placeholder={'price_day_basis'} {...register('price_day_basis')}/>
                            </div>
                            <div><textarea placeholder={'description'} {...register('description')} rows="5" cols="80"
                                           id="TITLE"/></div>
                            <button>Update car</button>
                        </form>
                    </div> : null}
            </div>
        </div>
    )
}
