import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {authActions} from "../../redux";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";

export default function RegisterForm() {
    const {register, handleSubmit} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submit = async (data) => {
        const {error} = await dispatch(authActions.register({user: {...data, image: data.image[0]}}))
        console.log(data.image);
        if(!error){
            navigate('/login');
        }
        console.log(error);
    }

    return (
        <form onSubmit={handleSubmit(submit)} encType="multipart/form-data">
            <input type="text" placeholder={'name'} {...register('name')}/>
            <input type="text" placeholder={'last_name'} {...register('last_name')}/>
            <input type="text" placeholder={'contact_number'} {...register('contact_number')}/>
            <input type="number" placeholder={'age'} {...register('age')}/>
            <input type="text" placeholder={'email'} {...register('email')}/>
            <input type="text" placeholder={'password'} {...register('password')}/>
            <input type="file" name={'image'} placeholder={'image'} {...register('image')}/>
            <button>Register</button>
            <Link to={'/login'}>Already have an account?</Link>
        </form>
    )
}