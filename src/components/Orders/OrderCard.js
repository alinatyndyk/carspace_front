import {useLocation} from "react-router";
import {useDispatch} from "react-redux";
import {companyActions} from "../../redux";

export default function OrderCard({order}) {
    const {state} = useLocation();
    const dispatch = useDispatch();
    const {_id, user, from_date, to_date, car, Difference_In_Days} = order;

    const deleteOrder = (_id) => {
        dispatch(companyActions.deleteCarOrder({_id}));
    }

    const today = new Date().getTime();
    const orderStart = new Date(from_date).getTime();

    return (
        <div>
            <h3>Order Card</h3>
            <div>Order id: {_id}</div>
            {state?.type === 'company-orders' ? <div className={'user'}>
                <div>User: {user?.name} {user?.last_name}</div>
                <div>User-email/phone: {user?.email}/{user?.contact_number}</div>
            </div> : null }
            <div className={''}>
                <div>Car brand: {car?.brand}</div>
                <div>Car model: {car?.model}</div>
                <div>Car model_year: {car?.model_year}</div>
            </div>
            {car?.image ?
                <div>
                    <img className={'order--img'} src={`${car?.image?.link}`} alt="Red dot"/>
                </div> :
                <img className={'order-card-img'} src={`${car?.images[0]?.link}`} alt="Red dot"/>}
            {state?.type !== 'company-orders' && orderStart > today ? <div>
                <button onClick={() => deleteOrder(_id)}>delete order</button>
            </div> : null}
            <div>Order starting date: {from_date}</div>
            <div>Order finishing date: {to_date}</div>
            <div>Order duration: {Difference_In_Days}</div>
            <hr/>
        </div>
    )
}