import {useLocation, useParams} from "react-router";

export default function OrderCard({order}) {
    const {state} = useLocation();
    console.log(state, 'state order cars');

    const {_id, user, from_date, to_date, car, Difference_In_Days} = order;

    return (
        <div>
            <h3>Order Card</h3>
            <div>Order id: {_id}</div>
            {state.type = 'user_orders' ? <div>Order car:{car.brand} -- {car.model}
                <div><img src={car.image?.link} alt=""/></div>
            </div> : <div>Order car: {car}</div>}
            {/*<div>Order car: {car.image?.link}</div>*/}
            <div>Order starting date: {from_date}</div>
            <div>Order finishing date: {to_date}</div>
            <div>Order duration: {Difference_In_Days}</div>
            <br/>
            {JSON.stringify(order.user)}

        </div>
    )
}