import Modal from "../components/Modal/Modal";
import LoginForm from "../components/Forms/LoginForm";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {carActions} from "../redux";
import CarCard from "../components/CarCard";
import {history} from "../services";
import CarParamsForm from "../components/Forms/CarParamsForm";

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
        if (!errors) {
            history.push('/cars')
        }

        console.log(errors);
    }

    return (
        <div className={'login_page'}>
            Home page ...
            {/*<button onClick={() => setSearchParams({'greeting': 'bonjour'})}>set search</button>*/}
            <Modal active={modalActive} setActive={setModalActive}>
                <LoginForm/>
            </Modal>
            {/*<button onClick={() => setModalActive(true)}>Modal</button>*/}
            <form onSubmit={handleSubmit(submit)}>
                <input type="date" placeholder={'from_date'} {...register('from_date')}/>
                <input type="date" placeholder={'to_date'} {...register('to_date')}/>
                <input type="text" placeholder={'Car search'} {...register('description')}/>
                <button>Find</button>
                {/*<CarParamsForm/>*/}
            </form>
            {/*{cars.map(car => <CarCard car={car}/>)}*/}
        </div>
    )
}