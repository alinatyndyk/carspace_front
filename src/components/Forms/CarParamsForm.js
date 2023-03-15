import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useSearchParams} from "react-router-dom";
import {brandActions, carActions} from "../../redux";
import {useParams} from "react-router";
import {history} from "../../services";

export default function CarParamsForm() {
    const dispatch = useDispatch();
    const {brand, location} = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const {register, handleSubmit, setValue, reset} = useForm();
    const {brands} = useSelector(state => state.brands);
    const {errors} = useSelector(state => state.cars);

    useEffect(() => {
        for (const [key, value] of searchParams) {
            setValue(key, value);

            if (key === 'description') {
                searchParams.delete('description');
                searchParams.delete('from_date');
                searchParams.delete('to_date');
            }
        }
        dispatch(brandActions.getAll());
    }, [window.location.search, searchParams])

    const yearNow = new Date().getFullYear();

    const handleParams = (e) => {
        if (e.target.checked === true) {
            searchParams.set(e.target.name, e.target.checked);
        } else if (e.target.checked === false) {
            searchParams.delete(e.target.name, e.target.checked);
        } else if (!e.target?.value) {
            searchParams.delete(e.target.name);
        }
    }

    const [getBrand, setBrand] = useState(null);
    const [getLocation, setLocation] = useState(null);
    const [getYear, setYear] = useState(null);
    const [getAge, setAge] = useState(null);
    const [getTransmission, setTransmission] = useState(false);
    const [getType, setType] = useState(false);
    const [getSeats, setSeats] = useState(false);
    const [getPriceDay, setPriceDay] = useState(false);
    const [getPriceDayMax, setPriceDayMax] = useState(false);
    const [carFeatures, setCarFeatures] = useState(false);
    const [getErrors, setErrors] = useState(null);

    useEffect(() => {
        if (brand) {
            setValue('brand', brand);
        }
        if (getBrand === null) {
            searchParams.delete('brand');
        } else {
            setValue('brand', getBrand);
        }
        setValue('location', location);
        if (getLocation === null) {
            searchParams.delete('location');
        } else {
            if (typeof getLocation === 'string') {
                setValue('location', getLocation);
            }
        }
        if (window.location.search.includes('description')) {
            searchParams.delete('description')
        }
    }, [getBrand, getYear, getLocation, getAge, getTransmission, getType, getSeats, getPriceDay, getPriceDayMax, brand, location])


    const submit = async (data) => {
        console.log(data);
        searchParams.set('page', 1)
        setSearchParams({...data, ...searchParams});


        if (brand) {
            searchParams.set('brand', brand);
        }
        if (location) {
            searchParams.set('location', location);
        }
        const promise1 = Promise.resolve(dispatch(carActions.getAllWithParams({params: searchParams})))

        promise1.then((value) => {
            console.log(value, 'PROMISE VALUE');
            if (value.error) {
                throw new Error(value.payload);
            } else {
                setErrors('');
                history.push(`/cars?${searchParams}`);
                reset();
                for (const [key, value] of searchParams) {
                    setValue(key, value);
                }
            }
        }).catch((error) => {
            setErrors(error.message)
        })

        if (!errors) {
            setSearchParams(searchParams);
            reset();
        }
    }

    return (
        <div>
            <form className={'car-params-form'} onSubmit={handleSubmit(submit)} encType={'multipart/form-data'}>
                <div>Search cars by params</div>
                <div onClick={() => {
                    setSearchParams([]);
                    reset();
                }}>Reset search params ( + clear form)
                </div>
                <div>
                    <select defaultValue={''} onClick={(e) => {
                        if (e.target?.value !== 'None') {
                            setBrand(e.target?.value);
                            searchParams.set('brand', e.target?.value);
                        } else {
                            setBrand('');
                            searchParams.delete('brand');
                        }
                    }} {...register('brand')}>
                        <option>None</option>
                        {brands.map(item => <option>{item.brand}</option>)}
                    </select>
                </div>
                <span>
                    <div>
                model year
                <input type="number" placeholder={'model_year'} min={'1960'}
                       max={`${yearNow}`} {...register('model_year')}
                       onChange={(e) => {
                           setYear(e.target.value);
                           searchParams.set('model_year', e.target.value)
                       }}/>
                    </div>
                    <div onClick={() => {
                        setValue('model_year', '');
                        setYear(null);
                        searchParams.delete('model_year');
                    }}>Reset year</div>
                </span>
                <span>
                    <div>
                        Location
                        <select defaultValue={''} {...register('location')} onClick={(e) => {
                            if (e.target?.value !== 'None') {
                                setLocation(e.target?.value);
                                searchParams.set('location', e.target?.value);
                            } else {
                                setLocation('');
                                setValue('location', '')
                                searchParams.delete('location');
                            }
                        }}>
                            <option>None</option>
                            <option>London</option>
                            <option>Birmingham</option>
                            <option>Manchester</option>
                            <option>Leeds</option>
                            <option>Sheffield</option>
                            <option>Liverpool</option>
                            <option>Bristol</option>
                            <option>Wakefield</option>
                        </select>
                    </div>
                </span>
                <div>
                    min drivers age
                    <input type="number" placeholder={'min_drivers_age'} min={'18'}
                           max={90} {...register('min_drivers_age')}
                           onChange={(e) => {
                               searchParams.set('min_drivers_age', e.target.value);
                               setAge(e.target.value)
                           }}/>
                </div>
                <span>
                <input type="checkbox" name={'driver_included'} defaultChecked={false} onClick={handleParams}
                       placeholder={'driver_included'} {...register('driver_included')}/>driver
                </span>
                <span>
                    <div>
                        transmission
                        <select {...register('transmission')}
                                onClick={(e) => {
                                    if (e.target?.value !== 'None') {
                                        setValue('transmission', e.target?.value);
                                        setTransmission(e.target?.value);
                                        searchParams.set('transmission', e.target?.value);
                                    } else {
                                        setTransmission('');
                                        searchParams.delete('transmission');
                                    }
                                }}>
                            <option>None</option>
                            <option>Auto</option>
                            <option>Manual</option>
                        </select>
                    </div>
                </span>
                <span>
                    <div>
                        car type
                        <select {...register('vehicle_type')}
                                onClick={(e) => {
                                    if (e.target?.value !== 'None') {
                                        setValue('vehicle_type', e.target?.value);
                                        setType(e.target?.value);
                                        searchParams.set('vehicle_type', e.target.value);
                                    } else {
                                        setType('');
                                        searchParams.delete('vehicle_type');
                                    }
                                }}>
                            <option>None</option>
                            <option>Luxury</option>
                            <option>Economy</option>
                            <option>SUV</option>
                            <option>Sedan</option>
                            <option>Sports</option>
                            <option>Crossover</option>
                            <option>Convertible</option>
                            <option>Electric</option>
                            <option>Truck</option>
                            <option>Minivan</option>
                            <option>Coupe</option>
                        </select>
                    </div>
                </span>
                <div>
                    no of seats
                    <input type="number" min={'1'} max={'60'} placeholder={'no_of_seats'} {...register('no_of_seats')}
                           onChange={(e) => {
                               searchParams.set('no_of_seats', e.target.value);
                               setSeats(e.target.value);
                           }}/>
                </div>
                <span>
                <input type="number" min={'0'} max={getPriceDay}
                       placeholder={'price_day_basis'} {...register('price_day_basis_max')}
                       onChange={(e) => {
                           searchParams.set('price_day_basis_max', e.target.value);
                           setPriceDayMax(e.target.value);
                       }}/>(Enter your minimum budget in USD...)
                </span>
                <span>
                <input type="number" min={getPriceDayMax} max={'1000000'}
                       placeholder={'price_day_basis'} {...register('price_day_basis_min')}
                       onChange={(e) => {
                           searchParams.set('price_day_basis_min', e.target.value);
                           setPriceDay(e.target.value);
                       }}/>(Enter your maximum budget in USD...)
                </span>
                <div onClick={() => {
                    if (carFeatures === false) {
                        setCarFeatures(true)
                    } else {
                        setCarFeatures(false)
                    }
                }}>Car features ↓
                    <hr/>
                </div>
                {carFeatures === true ? <div className={'car_features_params'}>
                        <span>
                <input type="checkbox" name={'digital_hud'} onClick={handleParams}
                       placeholder={'digital_hud'} {...register('digital_hud')}/>digital hud
                </span>
                    <span>
                <input type="checkbox" name={'cruise_control'} onClick={handleParams}
                       placeholder={'cruise_control'} {...register('cruise_control')}/>cruise control
                </span>
                    <span>
                <input type="checkbox" name={'adaptive_cruise_control'} onClick={handleParams}
                       placeholder={'adaptive_cruise_control'} {...register('adaptive_cruise_control')}/>auto cruise control
                </span>
                    <span>
                <input type="checkbox" name={'parking_assist'} onClick={handleParams}
                       placeholder={'parking_assist'} {...register('parking_assist')}/>parking assist
                </span>
                    <span>
                <input type="checkbox" name={'parking_sensors'} onClick={handleParams}
                       placeholder={'parking_sensors'} {...register('parking_sensors')}/>parking sensors
                </span>
                    <span>
                <input type="checkbox" name={'reverse_camera'} onClick={handleParams}
                       placeholder={'reverse_camera'} {...register('reverse_camera')}/>reverse camera
                </span>
                    <span>
                <input type="checkbox" name={'three_d_surround_camera'} onClick={handleParams}
                       placeholder={'three_d_surround_camera'} {...register('three_d_surround_camera')}/>3d surround camera
                </span>
                    <span>
                <input type="checkbox" name={'tinted_windows'} onClick={handleParams}
                       placeholder={'tinted_windows'} {...register('tinted_windows')}/>tinted windows
                </span>
                    <span>
                <input type="checkbox" name={'power_seats'} onClick={handleParams}
                       placeholder={'power_seats'} {...register('power_seats')}/>power seats
                </span>
                    <span>
                <input type="checkbox" name={'leather_seats'} onClick={handleParams}
                       placeholder={'leather_seats'} {...register('leather_seats')}/>leather seats
                </span>
                    <span>
                <input type="checkbox" name={'massaging_seats'} onClick={handleParams}
                       placeholder={'massaging_seats'} {...register('massaging_seats')}/>massaging seats
                </span>
                    <span>
                <input type="checkbox" name={'rear_ac'} onClick={handleParams}
                       placeholder={'rear_ac'} {...register('rear_ac')}/>rear ac
                </span>
                    <span>
                <input type="checkbox" name={'sunroof_moonroof'} onClick={handleParams}
                       placeholder={'sunroof_moonroof'} {...register('sunroof_moonroof')}/>sonroof/moonroof
                </span>
                    <span>
                <input type="checkbox" name={'premium_audio'} onClick={handleParams}
                       placeholder={'premium_audio'} {...register('premium_audio')}/>premium audio
                </span>
                    <span>
                <input type="checkbox" name={'apple_carplay'} onClick={handleParams}
                       placeholder={'apple_carplay'} {...register('apple_carplay')}/>apple carplay
                </span>
                    <span>
                <input type="checkbox" name={'android_auto'} onClick={handleParams}
                       placeholder={'android_auto'} {...register('android_auto')}/>android auto
                </span>
                    <span>
                <input type="checkbox" name={'front_rear_airbags'} onClick={handleParams}
                       placeholder={'front_rear_airbags'} {...register('front_rear_airbags')}/>front
                rear airbags
                </span>
                    <span>
                <input type="checkbox" name={'bluetooth'} onClick={handleParams}
                       placeholder={'bluetooth'} {...register('bluetooth')}/>bluetooth
                </span>
                    <span>
                <input type="checkbox" name={'usb'} onClick={handleParams} placeholder={'usb'} {...register('usb')}/>USB
                </span>
                    <span>
                <input type="checkbox" name={'chiller_freezer'} onClick={handleParams}
                       placeholder={'chiller_freezer'} {...register('chiller_freezer')}/>chiller/freezer
                </span>
                </div> : null}
                <span className={'error'}>{getErrors}</span>
                <button>Search Cars</button>
            </form>
        </div>
    )
}