import {useDispatch, useSelector} from "react-redux";
import {carActions} from "../redux";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import CarOrderForm from "./Forms/CarOrderForm";
import Modal from "./Modal/Modal";

export default function CarFull() {
    const dispatch = useDispatch();
    // const {state} = useLocation();
    // console.log(state, 'uselocation state');
    const {car_id} = useParams();
    console.log(car_id, 'useparams');

    useEffect(() => {
        const {errors} = dispatch(carActions.getById({_id: car_id}));
        console.log(errors);
    }, [car_id])

    const {car} = useSelector(state => state.cars);
    console.log(car);
    const {_id, model, brand, model_year, image} = car;
    // const [modalActive, setModalActive] = useState(false);

    return (
        <div>
            <h2>Car Full</h2>
            <div>id:{_id}</div>
            <div>brand:{brand}</div>
            <div>model:{model}</div>
            <div>model_year:{model_year}</div>
            <img src={`${image?.link}`} alt=''/>
            <button>Get cars with this brand</button>
            {/*<Modal active={modalActive} s etActive={setModalActive}>*/}
            {/*    <CarOrderForm/>*/}
            {/*</Modal>*/}
            {/*<button onClick={() => setModalActive(true)}>Create order</button>*/}
        </div>
    )
}