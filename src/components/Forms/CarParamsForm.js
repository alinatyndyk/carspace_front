import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useSearchParams} from "react-router-dom";
import {brandActions, carActions} from "../../redux";
import {useNavigate, useParams} from "react-router";

export default function CarParamsForm() {
    const dispatch = useDispatch();
    const {brand} = useParams();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const {register, handleSubmit, setValue} = useForm();
    const {errors} = useSelector(state => state.cars);
    const {brands} = useSelector(state => state.brands);

    useEffect(() => {
        setSearchParams('')
        dispatch(brandActions.getAll());
    }, [])


    const handleParams = (e) => {
        console.log(e.target.checked);
        if (e.target.checked === true) {
            searchParams.set(e.target.name, e.target.checked);
        } else if (e.target.checked === false) {
            searchParams.delete(e.target.name, e.target.checked);
        }
        setSearchParams(searchParams);
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
    const [carFeatures, setCarFeatures] = useState(false);

    useEffect(() => {
        // setSearchParams(searchParams);
        // for (const [key, value] of searchParams.entries()){
        //     console.log(key, value);
        // }
        setValue('brand', brand);
        if (getBrand === null) {
            searchParams.delete('brand');
        } else {
        setValue('brand', getBrand);
        }
        if(window.location.search.includes('description')){
            searchParams.delete('description')
        }
    }, [getBrand, getYear, getLocation, getAge, getTransmission, getType, getSeats, getPriceDay, brand])


    const submit = async (data) => {
        const searchString = window.location.search;
        console.log(searchString, 'search string ***********************************');
        searchParams.set('page', 1)
        console.log(searchParams, 'LOOK');
        console.log(data, 'LOOK');
        setSearchParams(data);
        searchParams.keys((key) => console.log(key));
        if(brand){
            searchParams.set('brand', brand);
        }
        const {errors} = dispatch(carActions.getAllWithParams({params: searchParams}));
        if (!errors) {
            setSearchParams(searchParams);
        }
    }
    const [isBrand, setIsBrand] = useState(false);

    return (
        <div>
            {errors}
            <form className={'car-form'} onSubmit={handleSubmit(submit)} encType={'multipart/form-data'}>
                <div>Search cars by params</div>
                <div onClick={()=> setSearchParams('')}>Reset search params</div>
                <span onClick={() => {
                    if (isBrand === false) {
                        setIsBrand(true)
                    } else {
                        setIsBrand(false)
                    }
                }}>
                    <input type="text" disabled={true} placeholder={'brand'} {...register('brand')}/>
                    {isBrand && !brand === true ?
                        <div>{brands.map(item => <div
                            onClick={() => {
                                // setValue('brand', item.brand);
                                setBrand(item.brand);
                                searchParams.set('brand', item.brand);
                            }}>{item.brand}</div>)}
                            <div onClick={() => {
                                // setValue('brand', '');
                                setBrand(null);
                            }}>None
                            </div>
                        </div>
                        : null}
                </span>
                <span>
                <input type="number" placeholder={'model_year'} {...register('model_year')}
                       onChange={(e) => {
                           setYear(e.target.value);
                           searchParams.set('model_year', e.target.value)
                       }}/>
                    <div onClick={() => {
                        setValue('model_year', '');
                        setYear(null);
                        searchParams.delete('model_year');
                    }}>Reset year</div>
                </span>
                <span
                    onMouseOver={() => setIsLocation(true)}
                    onMouseLeave={() => setIsLocation(false)}>
                <input type="text" placeholder={'location'} {...register('location')}/>{isLocation === true ?
                    <div>
                        <div onClick={() => {
                            setValue('location', 'london');
                            setLocation('london');
                            searchParams.set('location', 'london')
                        }}>London
                        </div>
                        <div onClick={() => {
                            setValue('location', 'birmingham');
                            setLocation('Birmingham');
                            searchParams.set('location', 'birmingham');
                        }}>Birmingham
                        </div>
                        <div onClick={() => {
                            setValue('location', 'Manchester');
                            setLocation('Manchester');
                            searchParams.set('location', 'Manchester');
                        }}>Manchester
                        </div>
                        <div onClick={() => {
                            setValue('location', 'Leeds');
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
                <input type="number" placeholder={'min_drivers_age'} {...register('min_drivers_age')}
                       onChange={(e) => {
                           searchParams.set('min_drivers_age', e.target.value);
                           setAge(e.target.value)
                       }}/>
                {/*<input type="number" placeholder={'min_rent_time'} {...register('min_rent_time')}/>*/}
                <span>
                <input type="checkbox" name={'driver_included'} onClick={handleParams}
                       placeholder={'driver_included'} {...register('driver_included')}/>driver
                </span>
                <span
                    onMouseOver={() => setIsTransmission(true)}
                    onMouseLeave={() => setIsTransmission(false)}>
                <input type="text" placeholder={'transmission'} {...register('transmission')}/>
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
                    </div> : null}
                </span>
                <span
                    onMouseOver={() => setIsType(true)}
                    onMouseLeave={() => setIsType(false)}>
                <input type="text" placeholder={'vehicle_type'} {...register('vehicle_type')}/>
                    {getIsType === true ?
                        <div>
                            CAR TYPES
                            <div onClick={() => {
                                setValue('vehicle_type', 'Luxury');
                                setType('luxury');
                                searchParams.set('vehicle_type', 'luxury')
                            }}>Luxury</div>
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
                        </div> : null}
                </span>
                <input type="number" placeholder={'no_of_seats'} {...register('no_of_seats')}
                       onChange={(e) => {
                           searchParams.set('no_of_seats', e.target.value);
                           setSeats(e.target.value);
                       }}/>
                {/*<input type="number" placeholder={'fits_bags'} {...register('fits_bags')}/>*/}
                <input type="number" placeholder={'price_day_basis'} {...register('price_day_basis')}
                       onChange={(e) => {
                           searchParams.set('price_day_basis', e.target.value);
                           setPriceDay(e.target.value);
                       }}/>
                <div onClick={() => {
                    if (carFeatures === false) {
                        setCarFeatures(true)
                    } else {
                        setCarFeatures(false)
                    }
                }}>Car features
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

                <button>Search Cars</button>
            </form>
        </div>
    )
}