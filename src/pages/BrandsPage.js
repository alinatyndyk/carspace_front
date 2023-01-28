import Brands from "../components/Brands/Brands";
import Modal from "../components/Modal/Modal";
import LoginForm from "../components/Forms/LoginForm";
import {carActions} from "../redux";
import {useDispatch} from "react-redux";
import CarPage from "./CarPage";
import {useForm} from "react-hook-form";

export default function BrandsPage() {
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const submit = (data) => {
        console.log(data);
        const {errors} = dispatch(carActions.getFilteredByDate({info: data}));
        if (!errors) {
            // navigate('/cars');
            // history.push('/cars')
        }
        console.log(errors);
    }
    return (
        <div>
            <div className={'login_page'}>
                <div className={'login_page_insides'}>
                    <h2>RENT A CAR IN LONDON</h2>
                    <div>Book directly from local suppliers. No commission, no mark-ups.</div>
                    <form className={'find_by_date_form'} onSubmit={handleSubmit(submit)}>
                        <input type="date" placeholder={'from_date'} {...register('from_date')}/>
                        <input type="date" placeholder={'to_date'} {...register('to_date')}/>
                        <input type="text" placeholder={'Car search'} {...register('description')}/>
                        <button>Find</button>
                    </form>
                </div>
            </div>
            <Brands/>
        </div>
    )
}