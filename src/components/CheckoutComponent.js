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

    let today = new Date();
    let dd = today.getDate() + 1;
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd;

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
                        <input type="date"  placeholder={'from_date'} min={today} {...register('from_date')}/>
                    </div>
                    <div>
                        <input type="date" placeholder={'to_date'} {...register('to_date')}/>
                    </div>
                </div>
                <div className={'error'}>{carErrors}</div>
                <div className={'error'}>{getErrors}</div>
                <button onClick={() => {
                    try {
                        const x = new Date(fromDate).getTime();
                        const y = new Date(toDate).getTime();
                        const t = new Date().getTime();
                        const In_Time = x - t;
                        const In_Days = In_Time / (1000 * 3600 * 24);
                        if (fromDate === '' || toDate === '') {
                            throw new Error(`Choose rent dates!`);
                        }
                        if(t > x){
                            throw new Error(`Choose a starting date after today!`);
                        }
                        if(y < x){
                            throw new Error(`Choose a finishing date after the starting date!`);
                        }
                        if (Difference_In_Days < car?.min_rent_time) {
                            throw new Error(`Minimum rent time is ${car?.min_rent_time}!`);
                        }
                        if(Difference_In_Days > 120){
                            throw new Error(`You are not allowed to make orders for more than 4 month`);
                        }
                        if(In_Days > 150){
                            throw new Error(`You are not allowed to preorder for 5 month`);
                        }
                        setErrors(false);
                        setCheckout(true);
                    } catch (e) {
                        setErrors(e.message);
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