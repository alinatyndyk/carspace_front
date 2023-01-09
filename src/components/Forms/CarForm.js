import {carActions} from "../../redux";

import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {useForm} from "react-hook-form";

export default function CarForm() {
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const {errors} = useSelector(state => state.auth);

    const [img, setImg] = useState({
        filePreview: null
    });

    const submit = async (data) => {
        console.log(data, 'data in submit **************************');

        console.log(data.testImage[0], 'data in picture');
        const {error} = await dispatch(carActions.postCar({
            car: {
                ...data, testImage: data.testImage[0],
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
        console.log(error, 'error from submit');
        setImg({filePreview: URL.createObjectURL(data.testImage[0])});
    }

    return (
        <div>
            <form className={'car-form'} onSubmit={handleSubmit(submit)} encType={'multipart/form-data'}>
                <div>Create a car</div>
                <input type="text" placeholder={'brand'} {...register('brand')}/>
                <input type="text" placeholder={'model'} {...register('model')}/>
                <input type="number" placeholder={'model_year'} {...register('model_year')}/>
                <input type="text" placeholder={'description'} {...register('description')}/>
                <input type="file" placeholder={'testImage'} {...register('testImage')}/>
                <input type="text" placeholder={'location'} {...register('location')}/>
                <input type="number" placeholder={'min_drivers_age'} {...register('min_drivers_age')}/>
                <input type="number" placeholder={'min_rent_time'} {...register('min_rent_time')}/>
                <input type="checkbox" placeholder={'driver_included'} {...register('driver_included')}/>driver
                <input type="text" placeholder={'transmission'} {...register('transmission')}/>
                <input type="text" placeholder={'engine_capacity'} {...register('engine_capacity')}/>
                <input type="text" placeholder={'vehicle_type'} {...register('vehicle_type')}/>
                <input type="number" placeholder={'no_of_seats'} {...register('no_of_seats')}/>
                <input type="number" placeholder={'fits_bags'} {...register('fits_bags')}/>
                <input type="number" placeholder={'price_day_basis'} {...register('price_day_basis')}/>
                <input type="number" placeholder={'security_deposit'} {...register('security_deposit')}/>
                <input type="number" placeholder={'add_milage_charge'} {...register('add_milage_charge')}/>
                <input type="checkbox" placeholder={'digital_hud'} {...register('digital_hud')}/>digital hud
                <input type="checkbox" placeholder={'cruise_control'} {...register('cruise_control')}/>cruise control
                <input type="checkbox"
                       placeholder={'adaptive_cruise_control'} {...register('adaptive_cruise_control')}/>auto cruise
                control
                <input type="checkbox" placeholder={'parking_assist'} {...register('parking_assist')}/>parking assist
                <input type="checkbox" placeholder={'parking_sensors'} {...register('parking_sensors')}/>parking sensors
                <input type="checkbox" placeholder={'reverse_camera'} {...register('reverse_camera')}/>reverse camera
                <input type="checkbox"
                       placeholder={'three_d_surround_camera'} {...register('three_d_surround_camera')}/>3d surround
                camera
                <input type="checkbox" placeholder={'tinted_windows'} {...register('tinted_windows')}/>tinted windows
                <input type="checkbox" placeholder={'power_seats'} {...register('power_seats')}/>power seats
                <input type="checkbox" placeholder={'leather_seats'} {...register('leather_seats')}/>leather seats
                <input type="checkbox" placeholder={'massaging_seats'} {...register('massaging_seats')}/>massaging seats
                <input type="checkbox" placeholder={'rear_ac'} {...register('rear_ac')}/>rear ac
                <input type="checkbox" placeholder={'sunroof_moonroof'} {...register('sunroof_moonroof')}/>sonroof/moonroof
                <input type="checkbox" placeholder={'premium_audio'} {...register('premium_audio')}/>premium audio
                <input type="checkbox" placeholder={'apple_carplay'} {...register('apple_carplay')}/>apple carplay
                <input type="checkbox" placeholder={'android_auto'} {...register('android_auto')}/>android auto
                <input type="checkbox" placeholder={'front_rear_airbags'} {...register('front_rear_airbags')}/>front
                rear airbags
                <input type="checkbox" placeholder={'bluetooth'} {...register('bluetooth')}/>bluetooth
                <input type="checkbox" placeholder={'usb'} {...register('usb')}/>USB
                <input type="checkbox" placeholder={'chiller_freezer'} {...register('chiller_freezer')}/>chiller/freezer
                {/*<input type="checkbox" placeholder={'cruise_control'} {...register('cruise_control')}/>cruise control*/}
                <button>Create car</button>
                {img.filePreview !== null ?
                    <img src={img.filePreview} alt=""/> : null}
            </form>
            {errors}

        </div>
    )
}