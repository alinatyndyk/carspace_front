import {Link} from "react-router-dom";

const Brand = ({item}) => {
    const {_id, brand, cars} = item;
    return (
        <div>
            <div><Link to={`/brands/${brand}`}>{brand}</Link></div>
        </div>
    );
};

export default Brand;