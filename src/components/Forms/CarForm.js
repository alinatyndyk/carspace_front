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
        console.log(data);
        const fileList = data.files;
        let filesArr = [];
        for (let index = 0; index < fileList.length; index++) {
            const file = fileList[index];
            filesArr.push(file);
        }

        const promise1 = Promise.resolve(dispatch(carActions.postCar({
            car: {
                ...data,
                files: filesArr,
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
        })))
        promise1.then((value) => {
            if (value?.error) {
                throw new Error(value.payload);
            } else {
                console.log(value.payload, '!!!!!!!!!!');
                navigate(`/cars/${value.payload._id}`);
            }
        })
        setImg({filePreview: URL.createObjectURL(data.files[0])});
    }

    const {brands} = useSelector(state => state.brands);

    return (
        <div>
            <form className={'car-params-form'} onSubmit={handleSubmit(submit)} encType='multipart/form-data'>
                <div>Create a car</div>
                <div>
                    brand
                    <select onClick={(e) => {
                        setValue('brand', e.target?.value);
                    }} {...register('brand')}>
                        {brands.map(item => <option>{item.brand}</option>)}
                        <option>None</option>
                    </select>
                </div>
                <div>
                    model
                    <input type="text" placeholder={'model'} {...register('model')}/>
                </div>
                <div>
                    model year
                    <input type="number" placeholder={'model_year'} min={'1960'}
                           max={`${new Date().getFullYear()}`} {...register('model_year')}/>
                </div>
                <div>
                    description
                    <input type="text" placeholder={'description'} {...register('description')}/>
                </div>
                <div>
                    avatar
                    <input type="file" multiple='multiple' placeholder={'files'} {...register('files')}/>
                </div>
                <div>
                    location
                    <select defaultValue={''} {...register('location')} onClick={(e) => {
                        setValue('location', e.target?.value);
                    }}>
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
                <div>
                    min driver age
                    <input type="number" placeholder={'min_drivers_age'} min={'18'}
                           max={90} {...register('min_drivers_age')}/>
                </div>
                <div>
                    min rent time
                    <input type="number" placeholder={'min_rent_time'} min={'1'}
                           max={'60'} {...register('min_rent_time')}/>
                </div>
                <span>
                <input type="checkbox" placeholder={'driver_included'} {...register('driver_included')}/>driver
                </span>
                <span>
                transmission
                <select {...register('transmission')}
                        onClick={(e) => {
                            setValue('transmission', e.target?.value);
                        }}>
                    <option>Auto</option>
                    <option>Manual</option>
                </select>
                </span>
                <div>
                    engine capacity
                    <input type="number" min={'1'} max={'100'}
                           placeholder={'engine_capacity'} {...register('engine_capacity')}/>
                </div>
                <span>
                    car type
                    <select {...register('vehicle_type')}
                            onClick={(e) => {
                                setValue('vehicle_type', e.target?.value);
                            }}>
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
                </span>
                <div>
                    num of seats
                    <input type="number" placeholder={'no_of_seats'} min={'1'} max={'60'} {...register('no_of_seats')}/>
                </div>
                <div>
                    fits bags
                    <input type="number" placeholder={'fits_bags'} min={'1'} max={'300'} {...register('fits_bags')}/>
                </div>
                <div>
                    price/day
                    <input type="number" placeholder={'price_day_basis'} min={0}
                           max={'1000000'} {...register('price_day_basis')}/>
                </div>
                <div>
                    security deposit
                    <input type="number" placeholder={'security_deposit'} min={'0'}
                           max={'1000000'} {...register('security_deposit')}/>
                </div>
                <div>
                    add milage charge
                    <input type="number" placeholder={'add_milage_charge'} min={'0'}
                           max={'100000'} {...register('add_milage_charge')}/>
                </div>
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
                <button>Create car</button>
                {img.filePreview !== null ?
                    <img src={img.filePreview} alt=""/> : null}
            </form>
            {errors}

        </div>
    )
}