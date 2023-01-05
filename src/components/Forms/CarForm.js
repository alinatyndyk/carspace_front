import {carActions} from "../../redux";

import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {useForm} from "react-hook-form";

export default function CarForm() {
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const {errors} = useSelector(state => state.auth);

    const [img, setImg] = useState({
        filePreview: null
    });

    const submit = async (data) => {
        console.log(data, 'data in submit');
        console.log(data.testImage[0], 'data in picture');
        const {error} = await dispatch(carActions.postCar({car: {...data, testImage: data.testImage[0]}}))
        console.log(error, 'error from submit');
        setImg({filePreview: URL.createObjectURL(data.testImage[0])});
    }

    return (
        <div>
            <form className={'car-form'} onSubmit={handleSubmit(submit)} encType={'multipart/form-data'}>
                <div>Create a car</div>
                <input type="text" placeholder={'brand'} {...register('brand')}/>
                <input type="text" placeholder={'model'} {...register('model')}/>
                <input type="number" placeholder={'model_year'} {...register('model_year')}/>
                <input type="text" placeholder={'description'} {...register('description')}/>
                <input type="file" placeholder={'testImage'} {...register('testImage')}/>
                <button>Create car</button>
                {img.filePreview !== null ?
                    <img src={img.filePreview} alt=""/> : null}
            </form>
            {errors}

        </div>
    )
}