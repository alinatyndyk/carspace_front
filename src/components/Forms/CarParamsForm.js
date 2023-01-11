import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useSearchParams} from "react-router-dom";
import {carActions} from "../../redux";

export default function CarParamsForm() {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const {register, handleSubmit} = useForm();
    // const {errors} = useSelector(state => state.auth);

    const handleParams = (e) => {
        // e.preventDefault()
        console.log(e.target);
        console.log(e.target.checked);
        if (e.target.checked === true) {
            searchParams.set(e.target.name, e.target.checked);
        } else if (e.target.checked === false) {
            searchParams.delete(e.target.name, e.target.checked);
        }
        setSearchParams(searchParams);

        // for (const [key, value] of searchParams.entries()) {
        //     console.log(key, value.toString(), "ITER PARAMS");
        // }
    }

    const searchString = window.location.search;
    console.log(searchString, 'search string');

    const submit = async (data) => {
        console.log(data, 'data in submit **************************');
        // for (const [key, value] of searchParams.entries()) {
        //     console.log(key, value, "ITER PARAMS");
        // }
        // const entries = searchParams.entries();
        // console.log(entries, 'entries');

        dispatch(carActions.getAllWithParams({params: searchString}))

    }

    return (
        <div>
            <form className={'car-form'} onSubmit={handleSubmit(submit)} encType={'multipart/form-data'}>
                <div>Search cars by params</div>
                <input type="text" name={'brand'} onChange={handleParams} placeholder={'brand'} {...register('brand')}/>
                {/*<input type="text" placeholder={'model'} {...register('model')}/>*/}
                <input type="number" placeholder={'model_year'} {...register('model_year')}/>
                {/*<input type="text" placeholder={'description'} {...register('description')}/>*/}
                {/*<input type="file" placeholder={'testImage'} {...register('testImage')}/>*/}
                <input type="text" placeholder={'location'} {...register('location')}/>
                <input type="number" placeholder={'min_drivers_age'} {...register('min_drivers_age')}/>
                <input type="number" placeholder={'min_rent_time'} {...register('min_rent_time')}/>
                <input type="checkbox" name={'driver_included'} onClick={handleParams}
                       placeholder={'driver_included'} {...register('driver_included')}/>driver
                {/*<input type="text" placeholder={'transmission'} {...register('transmission')}/>*/}
                {/*<input type="text" placeholder={'engine_capacity'} {...register('engine_capacity')}/>*/}
                <input type="text" placeholder={'vehicle_type'} {...register('vehicle_type')}/>
                <input type="number" placeholder={'no_of_seats'} {...register('no_of_seats')}/>
                <input type="number" placeholder={'fits_bags'} {...register('fits_bags')}/>
                {/*<input type="number" placeholder={'price_day_basis'} {...register('price_day_basis')}/>*/}
                {/*<input type="number" placeholder={'security_deposit'} {...register('security_deposit')}/>*/}
                {/*<input type="number" placeholder={'add_milage_charge'} {...register('add_milage_charge')}/>*/}
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
                {/*<input type="checkbox" placeholder={'cruise_control'} {...register('cruise_control')}/>cruise control*/}
                <button>Search Cars</button>
            </form>
        </div>
    )
}