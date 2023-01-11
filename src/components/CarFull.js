import {useDispatch, useSelector} from "react-redux";
import {carActions} from "../redux";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {authService} from "../services";
import jwt_decode from "jwt-decode";
import CarOrderForm from "./Forms/CarOrderForm";

export default function CarFull() {
    const dispatch = useDispatch();
    const {register, handleSubmit, reset, setValue} = useForm();
    // const {state} = useLocation();
    // console.log(state, 'uselocation state');
    const {car_id} = useParams();
    console.log(car_id, 'useparams');

    useEffect(() => {
        const {errors} = dispatch(carActions.getById({_id: car_id}));
        console.log(errors);
    }, [car_id])

    const {car, carForUpdate} = useSelector(state => state.cars);
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
        digital_hud
    } = car;
    // console.log(car_features);
    console.log(car);

    // for (const [key, value] of Object.entries(car_features)) {
    //     console.log(`${key}: ${value}`);
    //     // if (value === true) {
    //     // console.log(key);
    //     // }
    // }
    // presentFeatures.push({key: value})
    // console.log(presentFeatures, 'present features');

    // const presentFeatures = [];
    // for (const [key, value] of Object.entries(car_features)) {
    //     console.log(`${key}: ${value}`);
    //     if (value === true) {
    //         console.log(`${key}: ${value}`);
    //         presentFeatures.push({key, value})
    //     }
    // }
    // console.log(presentFeatures, 'present features');

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
            // console.log('equals', company, getDecoded._id);
            setEqual(true);
        } else {
            setEqual(false)
            // console.log('not equals', company, 'company id', getDecoded._id._id);
        }

    })

    return (
        <div>
            <h2>Car Full</h2>
            {equal === true ?
                <form onSubmit={handleSubmit(submit)}>
                    <input type="text" placeholder={'model'} {...register('model')}/>
                    <input type="number" placeholder={'model_year'} {...register('model_year')}/>
                    <input type="text" placeholder={'description'} {...register('description')}/>
                    <button>Update car</button>
                </form> : null}
            <div>id:{_id}</div>
            <div>brand:{brand}</div>
            <div>model:{model}</div>
            <div>model_year:{model_year}</div>
            <div>location:{location}</div>
            <div>description:{description}</div>
            <img src={`${image?.link}`} alt=''/>
            <button onClick={() => dispatch(carActions.setCarForUpdate(car))}>set for update</button>
            <button onClick={() => setBook(true)}>Book this car</button>
            {book === true ? <div><CarOrderForm/></div> : null}
            <h4>Car features</h4>
            driver: {digital_hud?.toString()}
            {/*{JSON.stringify(car_features)}*/}
            {/*{JSON.stringify(presentFeatures)}*/}
            ---------------------------
            {/*{presentFeatures.map(present => <div>{present.key}</div>)}*/}
            {/*<div>hud{digital_hud.toString()}</div>*/}
            {/*<div>{cruise_control.toString()}</div>*/}
            {/*<div>{adaptive_cruise_control.toString()}</div>*/}
            <button>Get cars with this brand</button>
            {/*<Modal active={modalActive} s etActive={setModalActive}>*/}
            {/*    <CarOrderForm/>*/}
            {/*</Modal>*/}
            {/*<button onClick={() => setModalActive(true)}>Create order</button>*/}
        </div>
    )
}