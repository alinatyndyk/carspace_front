import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {carActions} from "../../redux";

export default function CarOrderForm() {
    const {handleSubmit, register} = useForm();
    const dispatch = useDispatch();
    const {errors} = useSelector(state => state.cars)
    const {car_id} = useParams();

    const submit = (data) => {
        const {errors} = dispatch(carActions.postCarOrder({_id: car_id, dates: data}))
        console.log(errors);
    }

    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <input type="date" placeholder={'from_date'} {...register('from_date')}/>
                <input type="date" placeholder={'to_date'} {...register('to_date')}/>
                <button>Create an order</button>
            </form>
            {errors}
        </div>
    )
}