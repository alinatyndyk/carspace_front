import {useParams} from "react-router";

export default function OrderCard({order}){


    const {_id, user, from_date, to_date, car, Difference_In_Days} = order;

    return(
        <div>
            <h3>Order Card</h3>
            <div>Order id: {_id}</div>
            {/*<div>Order owner id: {JSON.stringify(user)}</div>*/}
            <div>Order owner id: {user._id}</div>
            <div>Order owner: {user.name}-{user.last_name}</div>
            <div>Order car: {car}</div>
            <div>Order starting date: {from_date}</div>
            <div>Order finishing date: {to_date}</div>
            <div>Order duration: {Difference_In_Days}</div>
            <br/>
            {JSON.stringify(order.user)}

        </div>
    )
}