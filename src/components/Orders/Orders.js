import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {companyActions} from "../../redux";
import OrderCard from "./OrderCard";
import {useLocation} from "react-router";
import {useSearchParams} from "react-router-dom";
import {useForm} from "react-hook-form";

export default function Orders() {
    const {orders, order, errors} = useSelector(state => state.companies);
    const dispatch = useDispatch();
    const location = useLocation();
    const {register, handleSubmit} = useForm();
    console.log(location, 'location');
    const [searchParams, setSearchParams] = useSearchParams();
    const today = searchParams.get("today");

    console.log(today, 'today search');

    useEffect(() => {
        if (today) {
            console.log('in  true today xxx');
            const {errors} = dispatch(companyActions.getCompanyOrdersToday());
            console.log(errors);
        } else {
            console.log('in all company orders');
            const {errors} = dispatch(companyActions.getCompanyOrders());
            console.log(errors);
        }
    }, [today])

    const submit = (data) => {
        console.log(data);
        dispatch(companyActions.getCompanyOrderById(data));
    }


    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <div>GET ORDER BY ID</div>
                <input type="text" placeholder={'_id'} {...register('_id')}/>
                <button>get order</button>
            </form>
            {errors}
            {/*{JSON.stringify(order)}*/}
            {<OrderCard key={order._id} order={order}/>}
            <hr/>
            {orders?.map(order => <OrderCard key={order._id} order={order}/>)}
        </div>
    )
}