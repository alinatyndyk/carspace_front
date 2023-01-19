import {useDispatch, useSelector} from "react-redux";
import {carActions} from "../redux";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {authService} from "../services";
import jwt_decode from "jwt-decode";
import CarOrderForm from "./Forms/CarOrderForm";
import CheckoutComponent from "./CheckoutComponent";
import './Car.css'
import {Carousel} from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
import Slider from "react-slick";
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Keyboard, Navigation, Pagination, Scrollbar} from "swiper";

export default function CarFull() {
    const dispatch = useDispatch();
    const {register, handleSubmit, reset, setValue} = useForm();

    const {car_id} = useParams();
    console.log(car_id, 'useparams');

    useEffect(() => {
        const {errors} = dispatch(carActions.getById({_id: car_id}));
        console.log(errors);
    }, [car_id])

    const {car, carForUpdate, errors} = useSelector(state => state.cars);
    console.log(car);
    const {
        _id,
        model,
        brand,
        model_year,
        image,
        images,
        company,
        location,
        description,
        car_features,
        min_rent_time,
        security_deposit,
        price_day_basis
    } = car;
    console.log(car);

    useEffect(() => {
        if (carForUpdate) {
            setValue('model', carForUpdate.model)
            setValue('model_year', carForUpdate.model_year)
            setValue('description', carForUpdate.description)
        }
    }, [carForUpdate])

    const submit = async (data) => {
        console.log(carForUpdate, 'car for upate submit');
        console.log(carForUpdate._id, 'car for upate id submit');
        console.log(data, 'data submit');
        dispatch(carActions.updateCar({_id: carForUpdate._id, car: data}));
        reset();
    }

    const [equal, setEqual] = useState(false);
    const [getDecoded, setDecoded] = useState(false);
    const [book, setBook] = useState(false);

    console.log(getDecoded, 'get decoded');
    useEffect(() => {
        const token = authService.getAccessToken();
        console.log(token, token);
        if (token) {
            const decoded = jwt_decode(token);
            console.log(decoded, decoded, 'decoded');
            console.log(decoded, company, 'decoded token in company');
            setDecoded(decoded);
        } else if (!token) {
            console.log('no token');
        }
        console.log(token, 'token in company');
    }, [])

    useEffect(() => {
        if (company === getDecoded._id?._id) {
            setEqual(true);
        } else {
            setEqual(false)
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
            <h2>Rent {brand} {model} in {location.charAt(0).toUpperCase() + location.slice(1)}</h2>
            <div>{min_rent_time === 1 ? <div>1 day rent available</div> : null}--{security_deposit}USD</div>
            <div className={'car-full'}>
                <div className={'car-full-top'}>
                    {/*<img src={`${image?.link}`} alt=''/>*/}
                    {/*{images.map(image => <div><img src={`${image?.link}`} alt=''/></div>)}*/}
                    <Swiper
                        className={'swiper_wrapper_car'}
                        // install Swiper modules
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
                        {/*<div>id:{_id}</div>*/}
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
                            <p>{location.charAt(0).toUpperCase() + location.slice(1)}</p>
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
                        {book === true ? <div className={'checkout-form'}><CheckoutComponent car={car} carErrors={errors}/></div> : null}
                </div>
                <div className={'car-full-bottom'}>
                    <div>description:{description}</div>
                    <h4>Car features</h4>
                    {/*{JSON.stringify(car_features)}*/}
                    {/*{JSON.stringify(features)}*/}
                    {features.map(item => <div>{item}</div>)}
                    <button onClick={() => {
                        dispatch(carActions.setCarForUpdate(car));
                        // setEqual(true)
                    }}>set for update
                    </button>

                    {equal === true ?
                        <div>
                            <form onSubmit={handleSubmit(submit)}>
                                <input type="text" placeholder={'model'} {...register('model')}/>
                                <input type="number" placeholder={'model_year'} {...register('model_year')}/>
                                <input type="text" placeholder={'description'} {...register('description')}/>
                                <button>Update car</button>
                            </form>
                        </div> : null}
                </div>
            </div>
        </div>
    )
}
