import StripeCheckout from 'react-stripe-checkout'
import axios from "axios";
import {useState} from "react";
import CarOrderForm from "./Forms/CarOrderForm";
import {useForm} from "react-hook-form";
import {useParams} from "react-router";
import {axiosService} from "../services";
import {useSelector} from "react-redux";


export default function CheckoutComponent({car, carErrors}) {

    const {car_id} = useParams();
    const {register, handleSubmit} = useForm();

    const [product, setProduct] = useState({
        name: 'Car audi',
        price: 1000
    });
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();
    console.log(fromDate, toDate, 'state date');

    const Difference_In_Time = new Date(toDate).getTime() - new Date(fromDate).getTime();
    const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    console.log(fromDate, toDate, Difference_In_Days);

    const payNow = async token => {
        try {
            // const response = await axios(
            //     {
            //     url: `http://localhost:5000/cars/${car_id}/order`,
            //     method: 'post',
            //     data: {
            //         amount: product.price * 100,
            //         token,
            //         from_date: fromDate,
            //         to_date: toDate,
            //         carId: car_id
            //     }
            // });
            const response = await axiosService.post(`http://localhost:5000/cars/${car_id}/order`, {
                amount: car.price_day_basis * 100 * Difference_In_Days,
                token,
                from_date: fromDate,
                to_date: toDate,
                carId: car_id
            })
            if (response.status === 200) {
                console.log('Your payment was successful');
            }
        } catch (e) {
            console.log(e, 'error');
        }
    }

    const submit = (data) => {
        console.log(data);
        setFromDate(data.from_date);
        setToDate(data.to_date);
        console.log(fromDate, toDate, 'state date done');
    }

    const priceForStripe = car.price_day_basis * 100 * Difference_In_Days;
    const stripeKeyPublish = 'pk_test_51MIX9gIAfGNWX8HhBIwUrgdZnEdnQ3Rji9C5k11GZk0tIpdGxewspLxOhGoIEAB53kAwJ2xDRTRt3ctswqph2JoF00AnaMMfdG'
    return (
        <div>
            Checkout Component
            <h2>Checkout Form</h2>
            <form onSubmit={handleSubmit(submit)}>
                <input type="date" placeholder={'from_date'} {...register('from_date')}/>
                <input type="date" placeholder={'to_date'} {...register('to_date')}/>
                {carErrors}
                <button>Set dates</button>
            </form>
            <div>Name: {car.model}</div>
            <div>Price: ${car.price_day_basis}</div>
            <StripeCheckout
                stripeKey={stripeKeyPublish}
                label='Pay now'
                name='Pay with credit card'
                billingAddress
                shippingAddress
                amount={priceForStripe}
                description={`Your total is $${car.price_day_basis * Difference_In_Days}`}
                token={payNow}
            />
        </div>
    )
}