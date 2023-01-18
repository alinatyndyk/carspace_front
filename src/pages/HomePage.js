import Modal from "../components/Modal/Modal";
import LoginForm from "../components/Forms/LoginForm";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {carActions} from "../redux";
import CarCard from "../components/CarCard";
// import {history} from "../services";
import CarParamsForm from "../components/Forms/CarParamsForm";
import CarPage from "./CarPage";
import {createBrowserHistory} from "history";
import axios from "axios";
import {axiosService} from "../services";

const history = createBrowserHistory();

export default function HomePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm();
    const [modalActive, setModalActive] = useState(true);
    const {cars} = useSelector(state => state.cars)


//Add a second foo parameter.

    let url = new URL('https://example.com?');
    let params = new URLSearchParams(url.search);
    console.log(params.toString(), 'outside'); // "foo=1&bar=2&baz=3"

// Add a third parameter.
    let query;
    const handleChange = (event) => {
        if (event.target.checked) {
            console.log(event.target.name);
            console.log(event.target.value);
            console.log('✅ Checkbox is checked');
            params.set(event.target.name, event.target.value);
            console.log(params.toString()); // "foo=1&bar=2&baz=3"
            query = params.toString();
            return query
        }
    };
    console.log(query, 'query outside');

    // const [searchParams, setSearchParams] = useSearchParams();
    // useEffect(() => {
    //     setSearchParams({'leave': 'goodbye'})
    //     const greeting = searchParams.toString();
    //     console.log(greeting, 'to string');
    //
    // }, [searchParams])
    // console.log(searchParams, 'greeting ******************************');


    const submit = (data) => {
        console.log(data);
        const {errors} = dispatch(carActions.getFilteredByDate({info: data}));
        history.push('/cars');
        if (!errors) {
            // navigate('/cars');
        }

        console.log(errors);
    }
    // const [files, setFiles] = useState();

    const uploadAlbum = async (fileList) => {
        console.log(fileList, 'AlbumData');
        // const formData = new FormData;
        let files = [];
        // let files = fileList;
        // console.log(formData, 'formData');
        // console.log(fileList.files, 'op');

        for (let index = 0; index < fileList.files.length; index++) {
            console.log('xxx *******');
            const file = fileList.files[index];
            files.push(file);
            // formData.append("files", file);
            console.log('xxx *******');
        }
        console.log(files, 'files');
        // console.log(formData, 'form data');
        // console.log(fileList.files, 'file index');
        try {
            const result = axiosService.post('http://localhost:5000/users/album', files, {
                headers: {
                    // access_token: `${authService.getAccessToken()}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(result);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className={'login_page'}>
            Home page ...
            {/*<button onClick={() => setSearchParams({'greeting': 'bonjour'})}>set search</button>*/}
            {/*<button onClick={() => setModalActive(true)}>Modal</button>*/}
            <div className={'login_page_insides'}>
                <h2>RENT A CAR IN DUBAI</h2>
                <div>Book directly from local suppliers. No commission, no mark-ups.</div>
                {/*<form className={'find_by_date_form'} onSubmit={handleSubmit(submit)}>*/}
                {/*    <input type="date" placeholder={'from_date'} {...register('from_date')}/>*/}
                {/*    <input type="date" placeholder={'to_date'} {...register('to_date')}/>*/}
                {/*    <input type="text" placeholder={'Car search'} {...register('description')}/>*/}
                {/*    <button>Find</button>*/}
                {/*    /!*<CarParamsForm/>*!/*/}
                {/*</form>*/}

            </div>
            {cars.map(car => <CarCard car={car}/>)}
            <Modal active={modalActive} setActive={setModalActive}>
                <LoginForm/>
            </Modal>
            <form onSubmit={handleSubmit(uploadAlbum)} encType={'multipart/form-data'}>
                <input type="file" multiple="multiple" {...register('files')}/>
                <button>upload album</button>
            </form>
            {/*{cars.map(car => <CarCard car={car}/>)}*/}
        </div>
    )
}