import StripeCheckout from 'react-stripe-checkout'
import {useState} from "react";
import {useForm} from "react-hook-form";
import {useParams} from "react-router";
import {axiosService} from "../services";

export default function CheckoutComponent({car, carErrors}) {

    const {car_id} = useParams();
    const {register, handleSubmit} = useForm();

    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [getCheckout, setCheckout] = useState(false);
    const [getErrors, setErrors] = useState(null);

    const Difference_In_Time = new Date(toDate).getTime() - new Date(fromDate).getTime();
    const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    const payNow = async token => {
        try {
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
            setErrors(e.response.data);
        }
    }

    const submit = (data) => {
        setFromDate(data.from_date);
        setToDate(data.to_date);
    }

    const priceForStripe = car.price_day_basis * 100 * Difference_In_Days;
    const stripeKeyPublish = 'pk_test_51MIX9gIAfGNWX8HhBIwUrgdZnEdnQ3Rji9C5k11GZk0tIpdGxewspLxOhGoIEAB53kAwJ2xDRTRt3ctswqph2JoF00AnaMMfdG'
    return (
        <div className={'checkout-form-insides'}>
            <h2>Checkout Form</h2>
            <form onSubmit={handleSubmit(submit)}>
                <div className={'checkout-form-dates'}>
                    <div>
                        <input type="date" placeholder={'from_date'} {...register('from_date')}/>
                    </div>
                    <div>
                        <input type="date" placeholder={'to_date'} {...register('to_date')}/>
                    </div>
                </div>
                <div>{carErrors}</div>
                <div>{getErrors}</div>
                <button onClick={() => {
                    if (fromDate === '' || toDate === '') {
                        setErrors('Choose a date');
                        console.log(getErrors, 'geterrors');
                    } else {
                        setErrors(false)
                    }
                    if (typeof getErrors === 'boolean') {
                        console.log(getErrors, 'geterrors');
                        setCheckout(true);
                    }
                }}>Set dates
                </button>
            </form>
            {getCheckout === true ? <div>
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

            </div> : null}
        </div>
    )
}