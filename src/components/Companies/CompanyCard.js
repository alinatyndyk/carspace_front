import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {companyActions} from "../../redux";
import "./Company.css"

const CompanyCard = ({company}) => {
    const {_id, name, image} = company; //todo company image
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div className={'company-full'} onClick={() => navigate(`/companies/${_id.toString()}`)}>
            <img src={`${image.link}`} alt="Red dot"/>
            <h3>{name}</h3>
        </div>
    );
};

export default CompanyCard;