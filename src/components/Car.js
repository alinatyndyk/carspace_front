import {useNavigate} from "react-router";

const Car = ({car}) => {
    const {_id, model, brand, price_day_basis, location} = car;
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`/cars/${_id.toString()}`)}>
            <div>id:{_id}</div>
            <div>brand:{brand}</div>
            <div>model:{model}</div>
            <div>price:{price_day_basis}</div>
            <div>location:{location}</div>
            <button>Get cars with this brand</button>
            <hr/>
            <br/>
        </div>
    );
};

export default Car;