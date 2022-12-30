import {Link} from "react-router-dom";
import './Brands.css'

const Brand = ({item}) => {
    const {_id, brand, cars} = item;
    return (
        <div>
            <div><Link className={'brand_link'} to={`/brands/${brand}`}>{brand}</Link></div>
        </div>
    );
};

export default Brand;