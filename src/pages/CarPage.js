import Cars from "../components/Cars";
import {useParams} from "react-router";
import CarParamsForm from "../components/Forms/CarParamsForm";
import {useSelector} from "react-redux";

export default function CarPage() {
    const {car_id} = useParams();
    const {errors} = useSelector(state => state.cars);

    return (
        <div>
            <div className={'car-page'}>
                <div><CarParamsForm/></div>
                <div><Cars id={car_id}/></div>
            </div>
        </div>
    )
}