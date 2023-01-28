import {useLocation, useParams} from "react-router";

export default function OrderCard({order}) {
    const {state} = useLocation();
    console.log(state, 'state order cars');

    const {_id, user, from_date, to_date, car, Difference_In_Days} = order;

    return (
        <div>
            <h3>Order Card</h3>
            <div>Order id: {_id}</div>
            {state.type === 'company-orders' ? <div className={'user'}>
                <div>User: {user.name} {user.last_name}</div>
                <div>User-email/phone: {user.email}/{user.contact_number}</div>
            </div> : null }
            <div className={'car'}>
                <div>Car brand: {car?.brand}</div>
                <div>Car model: {car?.model}</div>
                <div>Car model_year: {car?.model_year}</div>
            {/*<div><img src={car.image?.link} alt=""/></div>*/}
            </div>
            {car?.image ?
                <div>
                    <img className={'order-card-img'} src={`${car?.image?.link}`} alt="Red dot"/>
                </div> :
                <img className={'order-card-img'} src={`${car?.images[0]?.link}`} alt="Red dot"/>}
            <div>Order starting date: {from_date}</div>
            <div>Order finishing date: {to_date}</div>
            <div>Order duration: {Difference_In_Days}</div>
            <br/>
            {JSON.stringify(order.user)}

        </div>
    )
}