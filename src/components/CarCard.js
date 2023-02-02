import {useNavigate} from "react-router";
import './Car.css'

const CarCard = ({car}) => {

    const navigate = useNavigate();
    const {
        _id,
        model,
        brand,
        model_year,
        image,
        images,
        price_day_basis,
        location,
        driver_included,
        transmission,
        vehicle_type,
        engine_capacity,
        min_rent_time
    } = car;

    return (
        <div className={'car'} onClick={() => navigate(`/cars/${_id}`)}>
            {image ?
                <div>
                    <img src={`${image?.link}`} alt="Red dot"/>
                </div> :
                <img src={`${images[0]?.link}`} alt="Red dot"/>}
            <div className={'car_card-top-info'}>
                <h5>{brand} {model} {model_year}</h5>
                <h4>{price_day_basis}$</h4>
                <div>{min_rent_time === 1 ? <div>1 day rent available</div> : null}</div>
            </div>
            <hr/>
            <div className={'car_card_details'}>
                <div>
                    <div>location: {location}</div>
                    <div>transmission: {transmission}</div>
                </div>
                <div>
                    <div>type: {vehicle_type}</div>
                    <div>engine: {engine_capacity}-litre</div>
                    <div>driver: {driver_included.toString()}</div>
                </div>
            </div>
        </div>
    );
};

export default CarCard;