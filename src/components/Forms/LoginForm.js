import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {authActions} from "../../redux";
import {useNavigate} from "react-router";

export default function LoginForm() {
    const {register, handleSubmit} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submit = async (data) => {
        const res = await dispatch(authActions.login({user: data}))
        // if(!error){
        //     navigate('/');
        // }
        console.log(res);
    }

    return (
        <form onSubmit={handleSubmit(submit)}>
            <input type="text" placeholder={'email'} {...register('email')}/>
            <input type="text" placeholder={'password'} {...register('password')}/>
            <button>Login</button>
        </form>
    )
}