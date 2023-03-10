import Cars from "../components/Cars";
import {useParams} from "react-router";
import CarParamsForm from "../components/Forms/CarParamsForm";

export default function CarPage({accountCompanyId}) {
    const {car_id} = useParams();

    return (
        <div>
            <div className={'car-page'}>
                <div><CarParamsForm/></div>
                <div><Cars id={car_id} accountCompanyId={accountCompanyId}/></div>
            </div>
        </div>
    )
}