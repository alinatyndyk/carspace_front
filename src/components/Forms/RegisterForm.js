import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {authActions} from "../../redux";
import {useNavigate} from "react-router";

export default function RegisterForm() {
    const {register, handleSubmit} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submit = async (data) => {
        const {error} = await dispatch(authActions.register({user: data}))
        if(!error){
            navigate('/login');
        }
        console.log(error);
    }

    return (
        <form onSubmit={handleSubmit(submit)}>
            <input type="text" placeholder={'name'} {...register('name')}/>
            <input type="text" placeholder={'last_name'} {...register('last_name')}/>
            <input type="text" placeholder={'contact_number'} {...register('contact_number')}/>
            <input type="number" placeholder={'age'} {...register('age')}/>
            <input type="text" placeholder={'email'} {...register('email')}/>
            <input type="text" placeholder={'password'} {...register('password')}/>
            <button>Register</button>
        </form>
    )
}