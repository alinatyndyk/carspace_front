import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {companyActions, userActions} from "../../redux";
import OrderCard from "./OrderCard";
import {useLocation} from "react-router";
import {useSearchParams} from "react-router-dom";
import {useForm} from "react-hook-form";

export default function Orders() {
    const {orders, order, errors} = useSelector(state => state.companies);
    const {orders: userOrders} = useSelector(state => state.users);
    const dispatch = useDispatch();
    const {state} = useLocation();
    const {register, handleSubmit} = useForm();
    console.log(state, 'location state');
    // console.log(state.type, 'location state type');
    const [searchParams, setSearchParams] = useSearchParams();
    const today = searchParams.get("today");

    console.log(today, 'today search');

    useEffect(() => {
        if (today && state?.type === 'company-orders') {
            console.log('in  true today xxx');
            const {errors} = dispatch(companyActions.getCompanyOrdersToday());
            console.log(errors);
        } else if (state?.type === 'user-orders') {
            console.log('in type user-orders');
            const {errors} = dispatch(userActions.getUserOrders());
            console.log(errors);
        } else if (state?.type === 'company-orders') {
            console.log('in all company orders');
            const {errors} = dispatch(companyActions.getCompanyOrders());
            console.log(errors);
        }
    }, [today])

    const submit = (data) => {
        console.log(data);
        dispatch(companyActions.getCompanyOrderById(data));
    }

    if (state?.type === 'user-orders') {
        return (
            <div>
                {/*{JSON.stringify(userOrders)}*/}
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
            {JSON.stringify(order)}
            {/*{<OrderCard key={order._id} order={order}/>}*/}
            <hr/>
            {orders?.map(order => <OrderCard key={order._id} order={order}/>)}
        </div>
    )
}