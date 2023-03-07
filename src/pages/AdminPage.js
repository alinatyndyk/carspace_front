import {Link, Outlet} from "react-router-dom";
import React from "react";
import RegisterCompanyForm from "../components/Forms/RegisterCompanyForm";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {brandActions, companyActions, userActions} from "../redux";
import User from "../components/Users/User";

export default function AdminPage() {
    const {register, reset, setValue, handleSubmit} = useForm();
    const {user} = useSelector(state => state.users);
    const {errors} = useSelector(state => state.brands);

    const dispatch = useDispatch();

    const sendVerificationCode = (data) => {
        dispatch(userActions.adminVerificationCode({email: data.email}));
        reset();
    }

    const findUserById = (data) => {
        dispatch(userActions.getById({_id: data.id}));
    }

    const deleteCompanyById = (data) => {
        dispatch(companyActions.deleteById({_id: data._id}));
        reset();
    }

    const addCarBrand = (data) => {
        dispatch(brandActions.create({object: data}));
        reset();
    }

    const deleteCarBrand = (data) => {
        dispatch(brandActions.deleteById({_id: data._id}));
        reset();
    }

    return (
        <div className={'df'}>
            <div>
                <RegisterCompanyForm/>
                {errors}
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
                <form className={'register_form'} onSubmit={handleSubmit(addCarBrand)}>
                    Add new car brand
                    <input type="text" placeholder={'brand'} {...register('brand')}/>
                    <button>Add</button>
                </form>
                <form className={'register_form'} onSubmit={handleSubmit(deleteCarBrand)}>
                    Delete brand by id
                    <input type="text" placeholder={'_id'} {...register('_id')}/>
                    <button>Delete</button>
                </form>
            </div>
            <div>
                <p><Link to={'users'}>Users</Link></p>
                <Outlet/>
            </div>
        </div>
    )
}