import {useLocation, useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import './Car.css'

const CarCard = ({car, auth}) => {

    const {_id, model, brand, model_year, image} = car;
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location, 'location');
    console.log(auth, 'auth car card');
    const [equal, setEqual] = useState(false);

    useEffect(() => {
        if (auth === true) {
            setEqual(true);
        }
    });


    return (
        <div className={'car'} onClick={() => navigate(`/cars/${_id}`)}>
            <h2>Car card</h2>
            {equal === true ? <button>Update car form</button> : null}
            <Link to={`${_id}`} state={{...car}}>details</Link>
            <div>id:{_id}</div>
            <div>brand:{brand}</div>
            <div>model:{model}</div>
            <div>model_year:{model_year}</div>
            <img src={`${image?.link}`} alt="Red dot"/>
            <button>Get cars with this brand</button>
            <hr/>
            <br/>
        </div>
    );
};

export default CarCard;