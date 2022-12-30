import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../redux";

export default function ResetPasswordForm() {
    const {register, handleSubmit, reset} = useForm();
    const dispatch = useDispatch();
    const {errors} = useSelector(state => state.auth)

    const submit = async (data) => {
        const {errors} = await dispatch(authActions.resetPasswordUser({password: data}))
        console.log(errors, 'res-----------------------------');
        reset();
    }
    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <input type="text" placeholder={'password'} {...register('password')}/>
                <button>Reset password</button>
                {errors}
            </form>

        </div>
    )
}