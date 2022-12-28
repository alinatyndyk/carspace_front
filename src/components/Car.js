const Car = ({car}) => {
    const {_id, model, brand, price_day_basis, location} = car
    return (
        <div>
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