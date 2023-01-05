import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {companyActions} from "../../redux";

export default function CompanyForm() {
    const {companyForUpdate, errors} = useSelector(state => state.companies);
    const dispatch = useDispatch();

    useEffect(() => {
        if (companyForUpdate) {
            setValue('name', companyForUpdate.name)
            setValue('contact_number', companyForUpdate.contact_number)
            setValue('email', companyForUpdate.email)
            setValue('description', companyForUpdate.description)
        }
    }, [companyForUpdate])
    console.log(companyForUpdate, 'company for update');
    const submit = async (data) => {
        console.log(data, 'in submit');
        await dispatch(companyActions.update({_id: companyForUpdate._id, company: data}))
    }
    const {register, handleSubmit, reset, setValue} = useForm();
    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <input type="text" placeholder={'name'} {...register('name')}/>
                <input type="text" placeholder={'contact_number'} {...register('contact_number')}/>
                <input type="text" placeholder={'email'} {...register('email')}/>
                <input type="text" placeholder={'description'} {...register('description')}/>
                {errors}
                <button>Update Company</button>
            </form>

        </div>
    )
}