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
        } else if(!e.target?.value){
            searchParams.delete(e.target.name);
        }
    }

    const [getBrand, setBrand] = useState(null);
    const [getLocation, setLocation] = useState(null);
    const [getYear, setYear] = useState(null);
    const [getAge, setAge] = useState(null);
    const [isLocation, setIsLocation] = useState(false);
    const [isTransmission, setIsTransmission] = useState(false);
    const [getTransmission, setTransmission] = useState(false);
    const [getType, setType] = useState(false);
    const [getIsType, setIsType] = useState(false);
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
        console.log(data, '************************');
        searchParams.set('page', 1);
        setSearchParams(data);


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
    const [isBrand, setIsBrand] = useState(false);

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
                    <select onClick={(e) => {
                        if (e.target?.value !== 'None') {
                            setBrand(e.target?.value);
                            searchParams.set('brand', e.target?.value);
                        } else {
                            setBrand('');
                            searchParams.delete('brand');
                        }
                    }} {...register('brand')}>
                        {brands.map(item => <option>{item.brand}</option>)}
                        <option>None</option>
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
                <span
                    onMouseOver={() => {
                        if (!location) {
                            setIsLocation(true);
                        }
                    }}
                    onMouseLeave={() => setIsLocation(false)}>
                    <div>
                        Location
                <input type="text" placeholder={'location'} {...register('location')}/>???
                    </div>
                    {isLocation === true ?
                        <div>
                            <div onClick={() => {
                                setLocation('london');
                                searchParams.set('location', 'london');
                            }}>London
                            </div>
                            <div onClick={() => {
                                setLocation('Birmingham');
                                searchParams.set('location', 'birmingham');
                            }}>Birmingham
                            </div>
                            <div onClick={() => {
                                setLocation('Manchester');
                                searchParams.set('location', 'Manchester');
                            }}>Manchester
                            </div>
                            <div onClick={() => {
                                setLocation('Leeds');
                                searchParams.set('location', 'Leeds');
                            }}>Leeds
                            </div>
                            <div onClick={() => {
                                setValue('location', 'Sheffield');
                                setLocation('Sheffield');
                                searchParams.set('location', 'Sheffield');
                            }}>Sheffield
                            </div>
                            <div onClick={() => {
                                setValue('location', 'Liverpool');
                                setLocation('Liverpool');
                                searchParams.set('location', 'Liverpool');
                            }}>Liverpool
                            </div>
                            <div onClick={() => {
                                setValue('location', 'Bristol');
                                setLocation('Bristol');
                                searchParams.set('location', 'Bristol');
                            }}>Bristol
                            </div>
                            <div onClick={() => {
                                setValue('location', 'Wakefield');
                                setLocation('Wakefield');
                                searchParams.set('location', 'Wakefield');
                            }}>Wakefield
                            </div>
                            <div onClick={() => {
                                setValue('location', '');
                                setLocation(null);
                                searchParams.delete('location')
                            }}>No location
                            </div>
                        </div> : null}
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
                <span
                    onMouseOver={() => setIsTransmission(true)}
                    onMouseLeave={() => setIsTransmission(false)}>
                    <div>
                        transmission
                        <input type="text" placeholder={'transmission'} {...register('transmission')}/>
                    </div>
                    {isTransmission === true ? <div>
                        <div onClick={() => {
                            setValue('transmission', 'auto');
                            setTransmission('auto');
                            searchParams.set('transmission', 'auto');
                        }}>Auto
                        </div>
                        <div onClick={() => {
                            setValue('transmission', 'manual');
                            setTransmission('manual');
                            searchParams.set('transmission', 'manual');
                        }}>Manual
                        </div>
                        <div onClick={() => {
                            setValue('transmission', '');
                            setTransmission('');
                            searchParams.delete('transmission');
                        }}>Doesnt matter
                        </div>
                    </div> : null}
                </span>
                <span
                    onMouseOver={() => setIsType(true)}
                    onMouseLeave={() => setIsType(false)}>
                    <div>
                        car type
                <input type="text" placeholder={'vehicle_type'} {...register('vehicle_type')}/>
                    </div>
                    {getIsType === true ?
                        <div>
                            <div onClick={() => {
                                setValue('vehicle_type', 'Luxury');
                                setType('luxury');
                                searchParams.set('vehicle_type', 'luxury')
                            }}>Luxury
                            </div>
                            <div onClick={() => {
                                setValue('vehicle_type', 'Economy');
                                setType('economy');
                                searchParams.set('vehicle_type', 'economy')
                            }}>Economy
                            </div>
                            <div onClick={() => {
                                setValue('vehicle_type', 'SUV');
                                setType('suv');
                                searchParams.set('vehicle_type', 'suv')
                            }}>SUV
                            </div>
                            <div onClick={() => {
                                setValue('vehicle_type', 'Sedan');
                                setType('sedan');
                                searchParams.set('vehicle_type', 'sedan')
                            }}>Sedan
                            </div>
                            <div onClick={() => {
                                setValue('vehicle_type', 'Sports');
                                setType('sports');
                                searchParams.set('vehicle_type', 'sports')
                            }}>Sports
                            </div>
                            <div onClick={() => {
                                setValue('vehicle_type', 'Crossover');
                                setType('crossover');
                                searchParams.set('vehicle_type', 'crossover');
                            }}>Crossover
                            </div>
                            <div onClick={() => {
                                setValue('vehicle_type', 'Convertible');
                                setType('convertible');
                                searchParams.set('vehicle_type', 'convertible');
                            }}>Convertible
                            </div>
                            <div onClick={() => {
                                setValue('vehicle_type', 'Electric');
                                setType('electric');
                                searchParams.set('vehicle_type', 'electric');
                            }}>Electric
                            </div>
                            <div onClick={() => {
                                setValue('vehicle_type', 'Truck');
                                setType('truck');
                                searchParams.set('vehicle_type', 'truck');
                            }}>Truck
                            </div>
                            <div onClick={() => {
                                setValue('vehicle_type', 'Minivan');
                                setType('minivan');
                                searchParams.set('vehicle_type', 'minivan');
                            }}>Minivan
                            </div>
                            <div onClick={() => {
                                setValue('vehicle_type', 'Coupe');
                                setType('coupe');
                                searchParams.set('vehicle_type', 'coupe');
                            }}>Coupe
                            </div>
                            <div onClick={() => {
                                setType('');
                                searchParams.delete('vehicle_type');
                                setValue('vehicle_type', '');
                            }}>No type
                            </div>
                        </div> : null}
                </span>
                <div>
                    no of seast
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
                }}>Car features ???
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