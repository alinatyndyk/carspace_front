import Cars from "../components/Cars";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {carActions} from "../redux";
import {useState} from "react";

export default function CarPage() {
    const {register, handleSubmit} = useForm();
    const dispatch = useDispatch();
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
    console.log(img, 'img from usestate');

    return (
        <div>
            <form onSubmit={handleSubmit(submit)} encType={'multipart/form-data'}>
                <input type="text" placeholder={'brand'} {...register('brand')}/>
                <input type="text" placeholder={'model'} {...register('model')}/>
                <input type="number" placeholder={'model_year'} {...register('model_year')}/>
                <input type="file" placeholder={'testImage'} {...register('testImage')}/>
                <button>Create car</button>
                {img.filePreview !== null ?
                    <img src={img.filePreview} alt=""/> : null}
            </form>
            {errors}
            <h2>CarPage</h2>
            <Cars/>
        </div>
    )
}