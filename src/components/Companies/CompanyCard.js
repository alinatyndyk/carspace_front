import {useNavigate} from "react-router";
import "./Company.css"

const CompanyCard = ({company}) => {
    const {_id, name, image} = company;
    const navigate = useNavigate();

    return (
        <div className={'company-full'} onClick={() => navigate(`/companies/${_id.toString()}`)}>
            <img src={`${image.link}`} alt="Red dot"/>
            <h3>{name}</h3>
        </div>
    );
};

export default CompanyCard;