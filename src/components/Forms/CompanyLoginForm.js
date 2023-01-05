import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../redux";
import {useNavigate} from "react-router";
import "./Forms.css"
import {Link} from "react-router-dom";

export default function CompanyLoginForm() {
    const {register, handleSubmit} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {errors} = useSelector(state => state.auth)

    const submit = async (data) => {
        console.log(data, 'data from form');
        const {error} = await dispatch(authActions.loginCompany({company: data}))
        if (!error) {
            navigate('/')
        }
        console.log(error, 'error');
    }

    return (
        <div className={'login_div'}>
            <h3>Company Sign in</h3>
            <p>Enter your email address below and we will email you your login page</p>
            <form className={'login_form'} onSubmit={handleSubmit(submit)}>
                <input type="text" placeholder={'contact_number'} {...register('contact_number')}/>
                <input type="text" placeholder={'password'} {...register('password')}/>
                {errors}
                <button>Login Company</button>
                <Link to={'/password-forgot/company'}>Forgot password?</Link>
            </form>

        </div>
    )
}