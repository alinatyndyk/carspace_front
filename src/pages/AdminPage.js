import {Link, Outlet} from "react-router-dom";
import React from "react";
import RegisterCompanyForm from "../components/Forms/RegisterCompanyForm";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {companyActions, userActions} from "../redux";
import User from "../components/Users/User";

export default function AdminPage() {
    const {register, reset, setValue, handleSubmit} = useForm();
    const {user} = useSelector(state => state.users);

    const dispatch = useDispatch();

    const sendVerificationCode = (data) => {
        dispatch(userActions.adminVerificationCode({email: data.email}));
    }

    const findUserById = (data) => {
        dispatch(userActions.getById({_id: data.id}));
    }

    const deleteCompanyById = (data) => {
        dispatch(companyActions.deleteById({_id: data._id}));
    }

    return (
        <div className={'df'}>
            <div>
                <RegisterCompanyForm/>
                <form className={'register_form'} onSubmit={handleSubmit(sendVerificationCode)}>
                    Create admin (send verification code)
                    <input type="text" placeholder={'email'} {...register('email')}/>
                    <button>Send code</button>
                </form>
                <form className={'register_form'} onSubmit={handleSubmit(deleteCompanyById)}>
                    Delete company by ID
                    <input type="text" placeholder={'_id'} {...register('_id')}/>
                    <button>Remove</button>
                </form>
                <form className={'register_form'} onSubmit={handleSubmit(findUserById)}>
                    Find user by ID
                    <input type="text" placeholder={'_id'} {...register('id')}/>
                    <button>Find</button>
                    <p>{user?.name} {user?.last_name}</p>
                    <p>{user?.contact_number} {user?.email}</p>
                </form>
            </div>
            <div>
                <p><Link to={'users'}>Users</Link></p>
                <Outlet/>
            </div>
        </div>
    )
}