import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../redux";

export default function ResetPasswordCompanyForm({resetToken}) {
    const {register, handleSubmit, reset} = useForm();
    const dispatch = useDispatch();
    const {errors} = useSelector(state => state.auth);

    const submit = async (data) => {
        await dispatch(authActions.resetPasswordCompany({password: data, actionToken: resetToken}))
        reset();
    }
    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <input type="text" placeholder={'password'} {...register('password')}/>
                <button>Reset password for company</button>
                {errors}
            </form>

        </div>
    )
}