import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {carActions} from "../../redux";
import {useState} from "react";
import CheckoutComponent from "../CheckoutComponent";
import axios from "axios";

export default function CarOrderForm() {
    const {handleSubmit, register} = useForm();
    // const [isPayment, setIsPayment] = useState(false);
    const dispatch = useDispatch();
    const {errors} = useSelector(state => state.cars)
    const {car_id} = useParams();
    console.log(car_id, 'use params car order form');

    const submit = (data) => {
        console.log(data, 'car order form data');
        console.log(car_id, 'car order form data');

        const {errors} = dispatch(carActions.postCarOrder({_id: car_id, dates: data}))
        console.log(errors);
    }

    // const handleCheckout = (data) => {
    //     console.log(data);
    //     axios.post(`http://localhost:5000/create-checkout-session`, {
    //         from_date : data.from_date,
    //         to_date: data.to_date,
    //         carId: car_id
    //     }).then((res) => {
    //         if(res.data.url) {
    //             window.location.href = res.data.url;
    //             // window.location.href = 'http://localhost:3000/checkout-success';
    //         }
    //     }).catch((err) => console.log(err.message, 'mess'));
    // };

    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <input type="date" placeholder={'from_date'} {...register('from_date')}/>
                <input type="date" placeholder={'to_date'} {...register('to_date')}/>
                <button>Create an order</button>
            </form>
            {errors}
        </div>
    )
}