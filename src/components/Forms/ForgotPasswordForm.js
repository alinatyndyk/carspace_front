import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router";
import {authActions} from "../../redux";
import "./Forms.css"

export default function ForgotPasswordForm() {
    const {register, handleSubmit} = useForm();
    const {element} = useParams();
    console.log(element);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submit = async (data) => {
        console.log(data);
        const res = await dispatch(authActions.forgotPasswordUser({ info: data}));
        console.log(res, 'res in dispatch');
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