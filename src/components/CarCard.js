import {useLocation, useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import './Car.css'

const CarCard = ({car, auth}) => {

    const {
        _id,
        model,
        brand,
        model_year,
        image,
        images,
        price_day_basis,
        location,
        transmission,
        vehicle_type,
        engine_capacity
    } = car;
    const navigate = useNavigate();
    const [equal, setEqual] = useState(false);

    useEffect(() => {
        if (auth === true) {
            setEqual(true);
        }
    });


    return (
        <div className={'car'} onClick={() => navigate(`/cars/${_id}`)}>
            {image ?
                <div>
                    <img src={`${image?.link}`} alt="Red dot"/>
                </div> :
                <img src={`${images[0]?.link}`} alt="Red dot"/>}

            {/*{equal === true ? <button>Update car form</button> : null}*/}
            <div className={'car_card-top-info'}>
                <h5>{brand} {model} {model_year}</h5>
                <h4>{price_day_basis}$</h4>
            </div>
            {/*<button onClick={() => navigate(`/brands/${brand}`)}>Get cars with this brand</button>*/}
            <hr/>
            <div className={'car_card_details'}>
                <div>
                    <div>location: {location}</div>
                    <div>transmission: {transmission}</div>
                </div>
                <div>
                    <div>type: {vehicle_type}</div>
                    <div>engine: {engine_capacity}-litre</div>
                </div>
            </div>
        </div>
    );
};

export default CarCard;