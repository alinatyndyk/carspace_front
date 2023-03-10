import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../redux";
import {useNavigate} from "react-router";
import "./Forms.css"
import {Link} from "react-router-dom";
import {useState} from "react";


export default function CompanyLoginForm() {
    const {register, handleSubmit} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [getErrors, setErrors] = useState();

    const submit = async (data) => {
        const promise1 = Promise.resolve(dispatch(authActions.loginCompany({company: data})))

        promise1.then((value) => {
            if (value.error) {
                setErrors(value.payload);
                throw new Error(value.payload);
            } else {
                navigate('/account');
                window.location.reload();
            }
        })
    }

    return (
        <div className={'login_div'}>
            <h3>Company Sign in</h3>
            <p>Enter your email address below and we will email you your login page</p>
            <form className={'login_form'} onSubmit={handleSubmit(submit)}>
                <input type="text" placeholder={'contact_number'} {...register('contact_number')}/>
                <input type="text" placeholder={'password'} {...register('password')}/>
                <div className={'error'}>{getErrors}</div>
                <button>Login Company</button>
                <Link to={'/password-forgot/company'}>Forgot password?</Link>
            </form>

        </div>
    )
}