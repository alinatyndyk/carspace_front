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
            <h2>Company card</h2>
            <div>id:{_id}</div>
            <div>name:{name}</div>
            <img src={`${image.link}`} alt="Red dot"/>
            <button onClick={() => dispatch(companyActions.setCompanyForUpdate(company))}>Set company for update</button>
            <hr/>
            <br/>
        </div>
    );
};

export default CompanyCard;