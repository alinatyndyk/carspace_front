import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../redux";
import {useNavigate} from "react-router";
import "./Forms.css"
import {Link} from "react-router-dom";
export default function LoginForm() {
    const {register, handleSubmit, reset} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {errors} = useSelector(state => state.auth)

    const submit = async (data) => {
        console.log(data, 'in submit');
        const {error} = await dispatch(authActions.login({user: data}))
        if (!error) {
            navigate('/account')
        }
        console.log(error, 'error');
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