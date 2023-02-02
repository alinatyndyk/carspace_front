import {userActions} from "../../redux";

import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {useEffect} from "react";

export default function UserForm({user}) {
    const dispatch = useDispatch();
    const {register, handleSubmit, setValue} = useForm();
    const {errors} = useSelector(state => state.users);

    const submit = async (data) => {
        await dispatch(userActions.updateUser({_id: user._id, user: data}))
    }

    useEffect(() => {
        setValue('name', user.name);
        setValue('last_name', user.last_name);
        setValue('age', user.age);
        setValue('email', user.email);
        setValue('contact_number', user.contact_number);
    }, [])

    return (
        <div>
            <form className={'user-form'} onSubmit={handleSubmit(submit)} encType={'multipart/form-data'}>
                <div>Update user</div>
                <input type="text" placeholder={'name'} {...register('name')}/>
                <input type="text" placeholder={'last_name'} {...register('last_name')}/>
                <input type="number" placeholder={'age'} {...register('age')}/>
                <input type="email" placeholder={'email'} {...register('email')}/>
                <input type="text" placeholder={'contact_number'} {...register('contact_number')}/>
                <button>Update user</button>
            </form>
            {errors}

        </div>
    )
}