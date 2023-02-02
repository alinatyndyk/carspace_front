import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {useParams} from "react-router";
import {authActions} from "../../redux";
import "./Forms.css"

export default function ForgotPasswordCompanyForm() {
    const {register, handleSubmit} = useForm();
    const dispatch = useDispatch();

    const submit = async (data) => {
        await dispatch(authActions.forgotPasswordCompany({contact_number: data}));
    }

    return (
        <div>
            <form className={'pass_forgot_form'} onSubmit={handleSubmit(submit)}>
                <input type="text" placeholder={'contact_number'} {...register('contact_number')}/>
                <button>Send email by number</button>
            </form>
        </div>
    )
}