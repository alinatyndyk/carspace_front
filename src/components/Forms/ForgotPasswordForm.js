import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../redux";
import "./Forms.css"

export default function ForgotPasswordForm() {

    const {errors} = useSelector(state => state.auth);
    const {register, handleSubmit} = useForm();
    const dispatch = useDispatch();

    const submit = async (data) => {
        await dispatch(authActions.forgotPasswordUser({info: data}));
    }

    return (
        <div>
            <form className={'pass_forgot_form'} onSubmit={handleSubmit(submit)}>
                <input type="text" placeholder={'email'} {...register('email')}/>
                <button>Send email</button>
                {errors ? <div className={'error'}>{errors}</div> : null}
            </form>
        </div>
    )
}