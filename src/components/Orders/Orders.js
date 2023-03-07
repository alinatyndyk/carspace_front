import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import OrderCard from "./OrderCard";
import {useLocation, useNavigate} from "react-router";
import {useSearchParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {companyActions, userActions} from "../../redux";

export default function Orders() {
    const {orders, order, errors} = useSelector(state => state.companies);
    const {orders: userOrders} = useSelector(state => state.users);
    const dispatch = useDispatch();
    const {state} = useLocation();
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm();
    const [searchParams, setSearchParams] = useSearchParams();

    const today = searchParams.get("today");
    useEffect(() => {
        if (today && state?.type === 'company-orders') {
            dispatch(companyActions.getCompanyOrdersToday());
        } else if (state?.type === 'user-orders') {
            dispatch(userActions.getUserOrders());
            navigate(`/account/orders`, {state: {type: 'user-orders'}})

        } else if (state?.type === 'company-orders') {
            dispatch(companyActions.getCompanyOrders());
        }
    }, [today])

    const submit = (data) => {
        dispatch(companyActions.getCompanyOrderById(data));
    }

    if (state?.type === 'user-orders') {
        return (
            <div>
                {userOrders?.map(order => <OrderCard key={order._id} order={order}/>)}
            </div>
        )
    }


    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <div>GET ORDER BY ID</div>
                <input type="text" placeholder={'_id'} {...register('_id')}/>
                <button>get order</button>
            </form>
            {errors}
            {order ? <div>
                <div>Order id: {order._id}</div>
                <div>Car id: {order?.car}</div>
                <div>User id: {order?.user?._id}</div>
                <div>User: {order.user?.name} {order.user?.last_name}</div>
                <div>User-email/phone: {order.user?.email}/{order.user?.contact_number}</div>
                <div>Order starting date: {order.from_date}</div>
                <div>Order finishing date: {order.to_date}</div>
                <div>Order duration: {order?.Difference_In_Days}</div>
                <hr/>
                <br/>
            </div> : null}
            <hr/>
            {orders?.map(order => <OrderCard key={order._id} order={order}/>)}
        </div>
    )
}