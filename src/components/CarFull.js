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
        company,
        location,
        description,
        car_features
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
        if (company === getDecoded._id) {
            setEqual(true);
        } else {
            setEqual(false)
        }
    })

    return (
        <div>
            <h2>Car Full</h2>
            <div className={'car-full'}>
                <div className={'car-full-top'}>
                    <img src={`${image?.link}`} alt=''/>
                    <div className={'car-full-data'}>
                        <div>id:{_id}</div>
                        <div>brand:{brand}</div>
                        <div>model:{model}</div>
                        <div>model_year:{model_year}</div>
                        <div>location:{location}</div>
                        <div>description:{description}</div>
                    </div>
                </div>
                <div className={'car-full-bottom'}>
                    <h4>Car features</h4>
                    {JSON.stringify(car_features)}
                    <button onClick={() => {
                        dispatch(carActions.setCarForUpdate(car));
                        // setEqual(true)
                    }}>set for update
                    </button>
                    <button onClick={() => {if(book === false){setBook(true)}else{setBook(false)}}}>Book this car</button>
                    {book === true ? <div><CheckoutComponent car={car} carErrors={errors}/></div> : null}
                    {/*{equal === true ?*/}
                    {/*    <div>*/}
                    {/*    </div> : null}*/}
                            <form onSubmit={handleSubmit(submit)}>
                                <input type="text" placeholder={'model'} {...register('model')}/>
                                <input type="number" placeholder={'model_year'} {...register('model_year')}/>
                                <input type="text" placeholder={'description'} {...register('description')}/>
                                <button>Update car</button>
                            </form>
                </div>
                {/*{book === true ? <div><CarOrderForm/></div> : null}*/}
            </div>
        </div>
    )
}
