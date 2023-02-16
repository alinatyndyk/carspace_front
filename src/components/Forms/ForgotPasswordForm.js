import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../redux";
import "./Forms.css"
import {useState} from "react";

export default function ForgotPasswordForm() {

    const {errors} = useSelector(state => state.auth);
    const {register, handleSubmit, reset} = useForm();
    const [response, setResponse] = useState();
    const dispatch = useDispatch();

    const submit = async (data) => {
        const promise1 = Promise.resolve(dispatch(authActions.forgotPasswordUser({info: data})))

        promise1.then((value) => {
            if (value.error) {
                setResponse(null);
                throw new Error(value.payload);
            }else {
                setResponse('Check your emails');
                reset();
            }
        })
    }

    return (
        <div>
            <form className={'pass_forgot_form'} onSubmit={handleSubmit(submit)}>
                <input type="text" placeholder={'email'} {...register('email')}/>
                <button>Send email</button>
                {response}
                {errors ? <div className={'error'}>{errors}</div> : null}
            </form>
        </div>
    )
}