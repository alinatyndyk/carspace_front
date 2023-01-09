import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {companyActions} from "../../redux";

export default function CompanyForm({company}) {
    const {companyForUpdate, errors} = useSelector(state => state.companies);
    const dispatch = useDispatch();
    console.log(company, 'company in form');

    useEffect(() => {
            setValue('name', company.name)
            setValue('contact_number', company.contact_number)
            setValue('email', company.email)
            setValue('description', company.description)
    }, [company])
    console.log(companyForUpdate, 'company for update');
    const submit = async (data) => {
        console.log(data, 'in submit');
        await dispatch(companyActions.update({_id: company._id, company: data}))
    }
    const {register, handleSubmit, reset, setValue} = useForm();
    return (
        <div>
            <h3>COMPANY FORM</h3>
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