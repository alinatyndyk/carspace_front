import {useNavigate} from "react-router";

const Car = ({car}) => {
    const {_id, model, brand, model_year} = car;
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`/cars/${_id.toString()}`)}>
            <div>id:{_id}</div>
            <div>brand:{brand}</div>
            <div>model:{model}</div>
            <div>model:{model_year}</div>x
            <button>Get cars with this brand</button>
            <hr/>
            <br/>
        </div>
    );
};

export default Car;