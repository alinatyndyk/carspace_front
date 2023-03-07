import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../redux";
import {Link, useSearchParams} from "react-router-dom";
import {useState} from "react";
import {useNavigate} from "react-router";

export default function RegisterCompanyForm() {
    const {register, handleSubmit} = useForm();
    const {errors} = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [getErrors, setErrors] = useState(null);

    const submit = async (data) => {
        let promise1;

            promise1 = Promise.resolve(dispatch(authActions.registerCompany({
                company: {
                    ...data,
                    testImage: data.testImage[0]
                }
            })))

        promise1.then((value) => {
            if (value.error) {
                throw new Error(value.payload);
            } else {
                setErrors(null);
                navigate('/login/company');
            }
        }).catch((error) => {
            setErrors(error.message)
        })
    }

    return (
        <div>
            <form className={'register_form'} onSubmit={handleSubmit(submit)} encType="multipart/form-data">
                REGISTER A NEW COMPANY
                <input type="text" placeholder={'name'} {...register('name')}/>
                <input type="text" placeholder={'contact_number'} {...register('contact_number')}/>
                <input type="text" placeholder={'email'} {...register('email')}/>
                <input type="text" placeholder={'password'} {...register('password')}/>
                <input type="file" name={'testImage'} placeholder={'testImage'} {...register('testImage')}/>
                <div><textarea placeholder={'description'} {...register('description')} rows="5" cols="50"
                               id="TITLE"/></div>
                <button>Register Company</button>
                {errors}
                <div className={'error'}>{getErrors}</div>
            </form>

        </div>
    )
}