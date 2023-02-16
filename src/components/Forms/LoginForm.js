import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../redux";
import "./Forms.css"
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";

export default function LoginForm() {
    const {register, handleSubmit} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {errors} = useSelector(state => state.auth);

    const submit = async (data) => {
        const promise1 = Promise.resolve(dispatch(authActions.login({user: data})))

        promise1.then((value) => {
            if (value.error) {
                throw new Error(value.payload);
            } else {
               navigate('/account');
               window.location.reload();
            }
        })
    }

    return (
        <div className={'login_div'}>
            <h3>Sign in</h3>
            <p>Enter your email address below and we will email you your login page</p>
            <form className={'login_form'} onSubmit={handleSubmit(submit)}>
                <input type="text" placeholder={'email'} {...register('email')}/>
                <input type="text" placeholder={'password'} {...register('password')}/>
                {errors}
                <span>
            <button>Login</button>
                <Link to={'/password-forgot'}>Forgot password?</Link> |
                <Link to={'/login/company'}>You are an employer?</Link>
            </span>
            </form>
        </div>
    )
}