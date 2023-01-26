import './Brands.css'
import {useNavigate} from "react-router";

const Brand = ({item}) => {
    const navigate = useNavigate();
    const {brand, cars} = item;
    return (
        <div className={'brand_link'} onClick={() => navigate(`${brand}`)}>{brand} ({cars.length})</div>
    );
};

export default Brand;