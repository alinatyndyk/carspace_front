import Cars from "../components/Cars";
import {useParams} from "react-router";
import CarParamsForm from "../components/Forms/CarParamsForm";

export default function CarPage() {
    const {car_id} = useParams();
    console.log(car_id, 'crapage id');

    return (
        <div>
            <h2>CarPage</h2>
            <div className={'car-page'}>
                <div><CarParamsForm/></div>
                <div><Cars id={car_id}/></div>
            </div>
        </div>
    )
}