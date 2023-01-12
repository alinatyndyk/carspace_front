import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useSearchParams} from "react-router-dom";
import {brandActions, carActions} from "../../redux";

export default function CarParamsForm() {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const {register, handleSubmit, setValue} = useForm();
    const {errors} = useSelector(state => state.cars);
    const {brands} = useSelector(state => state.brands);

    useEffect(() => {
        if (isBrand === true) {
            const {errors} = dispatch(brandActions.getAll());
        }
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
    // console.log(getBrand, 'get brand');
    // console.log(getLocation, 'get location');
    // console.log(getYear, 'get year');

    useEffect(() => {
        // searchParams.set('brand', getBrand);
        // searchParams.set('model_year', getYear);
        // searchParams.set('location', getLocation);
        console.log(getBrand, 'get brand IN EFFECT');
        console.log(getLocation, 'get location IN EFFECT');

        // searchParams.forEach((value, key) => {
        //     console.log(value, key, "PARSEEEEEEEE");
        //     // if (value !== null) {
        //     //     searchParams.set(`${key}`, `${value}`);
        //     //
        //     // }
        // });
        // setSearchParams(searchParams);

        setSearchParams(searchParams);
    }, [getBrand, getYear, getLocation, getAge, getTransmission])


    const searchString = window.location.search;
    console.log(searchString, 'search string');

    const submit = async (data) => {
        // console.log(data, 'data in submit **************************');
        dispatch(carActions.getAllWithParams({params: searchString}))

    }
    const [isBrand, setIsBrand] = useState(false);

    return (
        <div>
            {errors}
            <form className={'car-form'} onSubmit={handleSubmit(submit)} encType={'multipart/form-data'}>
                <div>Search cars by params</div>
                <span onMouseOver={() => setIsBrand(true)}
                      onMouseLeave={() => setIsBrand(false)}>
                    <input type="text" {...register('brand')}/>
                    {isBrand === true ?
                        <div>{brands.map(item => <div
                            onClick={() => {
                                setValue('brand', item.brand);
                                setBrand(item.brand);
                                searchParams.set('brand', item.brand);
                            }}>{item.brand}</div>)}
                            <div onClick={() => {
                                setValue('brand', '');
                                setBrand(null);
                                searchParams.delete('brand')
                            }}>None
                            </div>
                        </div>
                        : null}
                </span>
                <span>
                <input type="number" maxLength='4' minLength={4} {...register('model_year')}
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
                <input type="checkbox" name={'driver_included'} onClick={handleParams}
                       placeholder={'driver_included'} {...register('driver_included')}/>driver
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
                        }}>Manual</div>
                    </div> : null}
                </span>
                <input type="text" placeholder={'vehicle_type'} {...register('vehicle_type')}/>
                <input type="number" placeholder={'no_of_seats'} {...register('no_of_seats')}/>
                <input type="number" placeholder={'fits_bags'} {...register('fits_bags')}/>
                <input type="number" placeholder={'price_day_basis'} {...register('price_day_basis')}/>
                <input type="checkbox" name={'digital_hud'} onClick={handleParams}
                       placeholder={'digital_hud'} {...register('digital_hud')}/>digital hud
                <input type="checkbox" name={'cruise_control'} onClick={handleParams}
                       placeholder={'cruise_control'} {...register('cruise_control')}/>cruise control
                <input type="checkbox" name={'adaptive_cruise_control'} onClick={handleParams}
                       placeholder={'adaptive_cruise_control'} {...register('adaptive_cruise_control')}/>auto cruise
                control
                <input type="checkbox" name={'parking_assist'} onClick={handleParams}
                       placeholder={'parking_assist'} {...register('parking_assist')}/>parking assist
                <input type="checkbox" name={'parking_sensors'} onClick={handleParams}
                       placeholder={'parking_sensors'} {...register('parking_sensors')}/>parking sensors
                <input type="checkbox" name={'reverse_camera'} onClick={handleParams}
                       placeholder={'reverse_camera'} {...register('reverse_camera')}/>reverse camera
                <input type="checkbox" name={'three_d_surround_camera'} onClick={handleParams}
                       placeholder={'three_d_surround_camera'} {...register('three_d_surround_camera')}/>3d surround
                camera
                <input type="checkbox" name={'tinted_windows'} onClick={handleParams}
                       placeholder={'tinted_windows'} {...register('tinted_windows')}/>tinted windows
                <input type="checkbox" name={'power_seats'} onClick={handleParams}
                       placeholder={'power_seats'} {...register('power_seats')}/>power seats
                <input type="checkbox" name={'leather_seats'} onClick={handleParams}
                       placeholder={'leather_seats'} {...register('leather_seats')}/>leather seats
                <input type="checkbox" name={'massaging_seats'} onClick={handleParams}
                       placeholder={'massaging_seats'} {...register('massaging_seats')}/>massaging seats
                <input type="checkbox" name={'rear_ac'} onClick={handleParams}
                       placeholder={'rear_ac'} {...register('rear_ac')}/>rear ac
                <input type="checkbox" name={'sunroof_moonroof'} onClick={handleParams}
                       placeholder={'sunroof_moonroof'} {...register('sunroof_moonroof')}/>sonroof/moonroof
                <input type="checkbox" name={'premium_audio'} onClick={handleParams}
                       placeholder={'premium_audio'} {...register('premium_audio')}/>premium audio
                <input type="checkbox" name={'apple_carplay'} onClick={handleParams}
                       placeholder={'apple_carplay'} {...register('apple_carplay')}/>apple carplay
                <input type="checkbox" name={'android_auto'} onClick={handleParams}
                       placeholder={'android_auto'} {...register('android_auto')}/>android auto
                <input type="checkbox" name={'front_rear_airbags'} onClick={handleParams}
                       placeholder={'front_rear_airbags'} {...register('front_rear_airbags')}/>front
                rear airbags
                <input type="checkbox" name={'bluetooth'} onClick={handleParams}
                       placeholder={'bluetooth'} {...register('bluetooth')}/>bluetooth
                <input type="checkbox" name={'usb'} onClick={handleParams} placeholder={'usb'} {...register('usb')}/>USB
                <input type="checkbox" name={'chiller_freezer'} onClick={handleParams}
                       placeholder={'chiller_freezer'} {...register('chiller_freezer')}/>chiller/freezer
                <button>Search Cars</button>
            </form>
        </div>
    )
}