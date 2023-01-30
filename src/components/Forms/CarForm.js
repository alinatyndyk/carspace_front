import {carActions} from "../../redux";

import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router";

export default function CarForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {register, handleSubmit, setValue} = useForm();
    const {errors} = useSelector(state => state.auth);

    const [img, setImg] = useState({
        filePreview: null
    });

    const submit = async (data) => {
        const fileList = data.files;
        let files = [];
        for (let index = 0; index < fileList.length; index++) {
            const file = fileList[index];
            files.push(file);
        }
        const {error} = await dispatch(carActions.postCar({
            car: {
                ...data,
                files,
                car_features: {
                    digital_hud: data.digital_hud,
                    cruise_control: data.cruise_control,
                    adaptive_cruise_control: data.adaptive_cruise_control,
                    parking_assist: data.parking_assist,
                    parking_sensors: data.parking_sensors,
                    reverse_camera: data.reverse_camera,
                    three_d_surround_camera: data.three_d_surround_camera,
                    tinted_windows: data.tinted_windows,
                    power_seats: data.power_seats,
                    leather_seats: data.leather_seats,
                    massaging_seats: data.massaging_seats,
                    rear_ac: data.rear_ac,
                    sunroof_moonroof: data.sunroof_moonroof,
                    premium_audio: data.premium_audio,
                    front_rear_airbags: data.front_rear_airbags,
                    apple_carplay: data.apple_carplay,
                    android_auto: data.android_auto,
                    bluetooth: data.bluetooth,
                    usb: data.usb,
                    chiller_freezer: data.chiller_freezer
                }
            }
        }))
        setImg({filePreview: URL.createObjectURL(data.files[0])});
        navigate('/account');
    }

    const {brands} = useSelector(state => state.brands);
    const [isBrand, setIsBrand] = useState(false);
    const [isLocation, setIsLocation] = useState(false);
    const [getTransmission, setTransmission] = useState(false);
    const [getIsType, setIsType] = useState(false);

    return (
        <div>
            <form className={'car-params-form'} onSubmit={handleSubmit(submit)} encType='multipart/form-data'>
                <div>Create a car</div>
                <input onClick={() => {
                    if (isBrand === false) {
                        setIsBrand(true)
                    } else {
                        setIsBrand(false)
                    }
                }} type="text" placeholder={'brand'} {...register('brand')}/>
                {isBrand === true ?
                    <div>{brands.map(item => <div
                        onClick={() => {
                            setValue('brand', item.brand);
                        }}>{item.brand}</div>)}
                    </div>
                    : null}
                <input type="text" placeholder={'model'} {...register('model')}/>
                <input type="number" placeholder={'model_year'} {...register('model_year')}/>
                <input type="text" placeholder={'description'} {...register('description')}/>
                <input type="file" multiple='multiple' placeholder={'files'} {...register('files')}/>
                <input type="text" onClick={() => {
                    isLocation === false ? setIsLocation(true) : setIsLocation(false)
                }} placeholder={'location'} {...register('location')}/>
                {isLocation === true ?
                    <div>
                        <div onClick={() => {
                            setValue('location', 'London');
                        }}>London
                        </div>
                        <div onClick={() => {
                            setValue('location', 'Birmingham');
                        }}>Birmingham
                        </div>
                        <div onClick={() => {
                            setValue('location', 'Manchester');
                        }}>Manchester
                        </div>
                        <div onClick={() => {
                            setValue('location', 'Leeds');
                        }}>Leeds
                        </div>
                        <div onClick={() => {
                            setValue('location', 'Sheffield');
                        }}>Sheffield
                        </div>
                        <div onClick={() => {
                            setValue('location', 'Liverpool');
                        }}>Liverpool
                        </div>
                        <div onClick={() => {
                            setValue('location', 'Bristol');
                        }}>Bristol
                        </div>
                        <div onClick={() => {
                            setValue('location', 'Wakefield');
                        }}>Wakefield
                        </div>
                    </div> : null}
                <input type="number" placeholder={'min_drivers_age'} {...register('min_drivers_age')}/>
                <input type="number" placeholder={'min_rent_time'} {...register('min_rent_time')}/>
                <span>
                <input type="checkbox" placeholder={'driver_included'} {...register('driver_included')}/>driver
                </span>
                <span onMouseOver={() => setTransmission(true)} onMouseLeave={() => setTransmission(false)}>
                <input type="text" placeholder={'transmission'} {...register('transmission')}/>
                    {getTransmission === true ? <div>
                        <div onClick={() => {
                            setValue('transmission', 'auto');
                        }}>Auto
                        </div>
                        <div onClick={() => {
                            setValue('transmission', 'manual');
                        }}>Manual
                        </div>
                    </div> : null}
                </span>
                <input type="text" placeholder={'engine_capacity'} {...register('engine_capacity')}/>
                <span onMouseOver={() => setIsType(true)} onMouseLeave={() => setIsType(false)}>
                <input type="text" placeholder={'vehicle_type'} {...register('vehicle_type')}/>
                    {getIsType === true ?
                        <div>
                            <div onClick={() => {
                                setValue('vehicle_type', 'Luxury');
                            }}>Luxury
                            </div>
                            <div onClick={() => {
                                setValue('vehicle_type', 'Economy');
                            }}>Economy
                            </div>
                            <div onClick={() => {
                                setValue('vehicle_type', 'SUV');
                            }}>SUV
                            </div>
                            <div onClick={() => {
                                setValue('vehicle_type', 'Sedan');
                            }}>Sedan
                            </div>
                            <div onClick={() => {
                                setValue('vehicle_type', 'Sports');
                            }}>Sports
                            </div>
                            <div onClick={() => {
                                setValue('vehicle_type', 'Crossover');
                            }}>Crossover
                            </div>
                            <div onClick={() => {
                                setValue('vehicle_type', 'Convertible');
                            }}>Convertible
                            </div>
                            <div onClick={() => {
                                setValue('vehicle_type', 'Electric');
                            }}>Electric
                            </div>
                            <div onClick={() => {
                                setValue('vehicle_type', 'Truck');
                            }}>Truck
                            </div>
                            <div onClick={() => {
                                setValue('vehicle_type', 'Minivan');
                            }}>Minivan
                            </div>
                            <div onClick={() => {
                                setValue('vehicle_type', 'Coupe');
                            }}>Coupe
                            </div>
                        </div> : null}

                </span>
                <input type="number" placeholder={'no_of_seats'} {...register('no_of_seats')}/>
                <input type="number" placeholder={'fits_bags'} {...register('fits_bags')}/>
                <input type="number" placeholder={'price_day_basis'} {...register('price_day_basis')}/>
                <input type="number" placeholder={'security_deposit'} {...register('security_deposit')}/>
                <input type="number" placeholder={'add_milage_charge'} {...register('add_milage_charge')}/>
                <span>
                <input type="checkbox" placeholder={'digital_hud'} {...register('digital_hud')}/>digital hud
                </span>
                <span>
                <input type="checkbox" placeholder={'cruise_control'} {...register('cruise_control')}/>cruise control
                </span>
                <span>
                <input type="checkbox"
                       placeholder={'adaptive_cruise_control'} {...register('adaptive_cruise_control')}/>auto cruise control
                </span>
                <span>
                <input type="checkbox" placeholder={'parking_assist'} {...register('parking_assist')}/>parking assist
                </span>
                <span>
                <input type="checkbox" placeholder={'parking_sensors'} {...register('parking_sensors')}/>parking sensors
                </span>
                <span>
                <input type="checkbox" placeholder={'reverse_camera'} {...register('reverse_camera')}/>reverse camera
                </span>
                <span>
                <input type="checkbox"
                       placeholder={'three_d_surround_camera'} {...register('three_d_surround_camera')}/>3d surround camera
                </span>
                <span>
                <input type="checkbox" placeholder={'tinted_windows'} {...register('tinted_windows')}/>tinted windows
                </span>
                <span>
                <input type="checkbox" placeholder={'power_seats'} {...register('power_seats')}/>power seats
                </span>
                <span>
                <input type="checkbox" placeholder={'leather_seats'} {...register('leather_seats')}/>leather seats
                </span>
                <span>
                <input type="checkbox" placeholder={'massaging_seats'} {...register('massaging_seats')}/>massaging seats
                </span>
                <span>
                <input type="checkbox" placeholder={'rear_ac'} {...register('rear_ac')}/>rear ac
                </span>
                <span>
                <input type="checkbox" placeholder={'sunroof_moonroof'} {...register('sunroof_moonroof')}/>sonroof/moonroof
                </span>
                <span>
                <input type="checkbox" placeholder={'premium_audio'} {...register('premium_audio')}/>premium audio
                </span>
                <span>
                <input type="checkbox" placeholder={'apple_carplay'} {...register('apple_carplay')}/>apple carplay
                </span>
                <span>
                <input type="checkbox" placeholder={'android_auto'} {...register('android_auto')}/>android auto
                </span>
                <span>
                <input type="checkbox" placeholder={'front_rear_airbags'} {...register('front_rear_airbags')}/>frontrear airbags
                </span>
                <span>
                <input type="checkbox" placeholder={'bluetooth'} {...register('bluetooth')}/>bluetooth
                </span>
                <span>
                <input type="checkbox" placeholder={'usb'} {...register('usb')}/>USB
                </span>
                <span>
                <input type="checkbox" placeholder={'chiller_freezer'} {...register('chiller_freezer')}/>chiller/freezer
                </span>
                {/*<input type="checkbox" placeholder={'cruise_control'} {...register('cruise_control')}/>cruise control*/}
                <button>Create car</button>
                {img.filePreview !== null ?
                    <img src={img.filePreview} alt=""/> : null}
            </form>
            {errors}

        </div>
    )
}