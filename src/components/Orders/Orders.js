import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import OrderCard from "./OrderCard";
import {useLocation, useNavigate} from "react-router";
import {useSearchParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {companyActions, userActions} from "../../redux";
import {authService} from "../../services";

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
            const {errors} = dispatch(companyActions.getCompanyOrdersToday());
            console.log(errors);
        } else if (state?.type === 'user-orders') {
            const {errors} = dispatch(userActions.getUserOrders());
            console.log(errors);
            navigate(`/account/orders`, {state: {type: 'user-orders'}})

        } else if (state?.type === 'company-orders') {
            const {errors} = dispatch(companyActions.getCompanyOrders());
            console.log(errors);
        }
        // else {
        //     const token = authService.getAccessToken();
        //     const first = token.split(' ')[0];
        //     if (first === 'User') {
        //         const {errors} = dispatch(userActions.getUserOrders());
        //         console.log('NO STATE ORDERS USER');
        //
        //     } else if (first === 'Company') {
        //         const {errors} = dispatch(companyActions.getCompanyOrdersToday());
        //         console.log('NO STATE ORDERS COMPANY');
        //
        //     }
        //     console.log('NO STATE ORDERS');
        // }
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
            {JSON.stringify(order)}
            <hr/>
            {orders?.map(order => <OrderCard key={order._id} order={order}/>)}
        </div>
    )
}