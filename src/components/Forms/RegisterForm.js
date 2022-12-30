import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../redux";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";

export default function RegisterForm() {
    const {register, handleSubmit} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {errors} = useSelector(state => state.auth)

    const submit = async (data) => {
        console.log(data);
        console.log(data.testImage[0]);
        // const formData = new FormData();
        // for(const field in data){
        //     field === 'testImage' ? formData.append('testImage')
        // }
        const {error} = await dispatch(authActions.register({user: {...data, testImage: data.testImage[0]}}))
        if(!error){
            navigate('/login');
        }
        console.log(error);
    }

    // const submit = async (data) => {
    //     const formData = new FormData();
    //
    //     for (const field in data) {
    //         field === 'testImage'
    //             ? formData.append('testImage', data.testImage[0])
    //             : formData.append(field, data[field]);
    //     }
    //     // TODO  тут свій код додай
    //     const {error} = await dispatch(authActions.register({user: {...data, testImage: data.testImage[0]}}))
    //     if (!error) {
    //         navigate('/login');
    //     }
    //     console.log(error);
    // }

    return (
        <form onSubmit={handleSubmit(submit)} encType="multipart/form-data">
            <input type="text" placeholder={'name'} {...register('name')}/>
            <input type="text" placeholder={'last_name'} {...register('last_name')}/>
            <input type="text" placeholder={'contact_number'} {...register('contact_number')}/>
            <input type="number" placeholder={'age'} {...register('age')}/>
            <input type="text" placeholder={'email'} {...register('email')}/>
            <input type="text" placeholder={'password'} {...register('password')}/>
            <input type="file" name={'testImage'} placeholder={'testImage'} {...register('testImage')}/>
            <button>Register</button>
            <Link to={'/login'}>Already have an account?</Link>
            {errors}
        </form>
    )
}