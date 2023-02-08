import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../redux";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";

export default function ResetPasswordForm({resetToken}) {
    const {register, handleSubmit, reset} = useForm();
    const dispatch = useDispatch();
    const {errors} = useSelector(state => state.auth)

    const submit = async (data) => {
        await dispatch(authActions.resetPasswordUser({password: data, actionToken: resetToken}));
        reset();
    }
    return (
        <div>
            <form  className={'pass_forgot_form'} onSubmit={handleSubmit(submit)}>
                <input type="text" placeholder={'password'} {...register('password')}/>
                <button>Reset password</button>
                {errors}
            </form>

        </div>
    )
}