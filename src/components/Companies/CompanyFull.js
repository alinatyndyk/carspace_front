import {useLocation, useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {companyActions} from "../../redux";
import './Company.css'
import {useEffect, useState} from "react";
import CarCard from "../CarCard";
import CarForm from "../Forms/CarForm";
import {authService} from "../../services";
import jwt_decode from "jwt-decode";
import CompanyForm from "../Forms/CompanyForm";

const CompanyFull = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {company_id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!company_id && !location.state) {
            navigate('/login');
        } else if (!company_id) {
            const {errors} = dispatch(companyActions.getById({_id: location.state.Id}));
            console.log(errors);
        } else {
            const {errors} = dispatch(companyActions.getById({_id: company_id}));
            console.log(errors);
        }
    }, [company_id, location.state]);

    const {company} = useSelector(state => state.companies);
    const {_id, name, email, contact_number, image, description, cars} = company;

    const [equal, setEqual] = useState(false);
    const [getDecoded, setDecoded] = useState(false);

    useEffect(() => {
        const token = authService.getAccessToken();
        if (token) {
            const decoded = jwt_decode(token);
            setDecoded(decoded);
        } else if (!token) {
            console.log('no token');
        }
    }, [])

    useEffect(() => {
        if (company_id === getDecoded._id) {
            setEqual(true);
        } else {
            console.log('not equals', company_id, getDecoded._id);
        }
    })

    return (
        <div className={'company-full-wrap'}>
            <div className={'company-full-company'}>
                <img src={`${image?.link}`} alt="Red dot"/>
                <h2>{name}</h2>
                <h3>Contact information</h3>
                <div>number:{contact_number}</div>
                <div>email:{email}</div>
                <h3>Read more about us:</h3><div>{description}</div>
            {equal === true ? <div><CompanyForm company={company}/></div> : null}
            </div>
            <div className={'company-full-cars'}>
                <h3>Comapny cars</h3>
                {cars?.map(car => <CarCard key={car._id} car={car} auth={equal}/>)}
            </div>
            <div className={''}>
                {equal === true ? <div><CarForm/></div> : null}
            </div>
        </div>
    );
};

export default CompanyFull;