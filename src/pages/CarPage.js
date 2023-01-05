import Cars from "../components/Cars";
import {useParams} from "react-router";

export default function CarPage() {
    const {car_id} = useParams();
    console.log(car_id, 'crapage id');

    return (
        <div>
            <h2>CarPage</h2>
            <div className={'car-page'}>
                <Cars id={car_id}/>
            </div>
        </div>
    )
}