import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {authActions} from "../../redux";
import "./Forms.css"

export default function ForgotPasswordForm() {
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
            </form>
        </div>
    )
}