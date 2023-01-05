// import {useForm} from "react-hook-form";
// import {useDispatch, useSelector} from "react-redux";
// import {useParams} from "react-router";
// import {carActions} from "../../redux";
// import {useEffect, useState} from "react";
//
// export default function CarOrderForm() {
//     const {handleSubmit, register} = useForm();
//     const dispatch = useDispatch();
//     const {errors} = useSelector(state => state.cars)
//     const {car_id} = useParams();
//     console.log(car_id, 'use params car order form');
//     const [data, setData] = useState();
//
//     const submit = (data) => {
//         console.log(data, 'car order form data');
//         console.log(car_id, 'car order form data');
//         setData(data);
//     }
//
//     useEffect(() => {
//         const {errors} = dispatch(carActions.postCarOrder({_id: car_id, dates: data}))
//         console.log(errors);
//
//     },[])
//
//     return (
//         <div>
//             <form onSubmit={handleSubmit(submit)}>
//                 <input type="date" placeholder={'from_date'} {...register('from_date')}/>
//                 <input type="date" placeholder={'to_date'} {...register('to_date')}/>
//                 <button>Create an order</button>
//             </form>
//             {errors}
//         </div>
//     )
// }