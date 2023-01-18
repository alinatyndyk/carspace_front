import {useLocation, useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {authActions, companyActions} from "../../redux";
import './Company.css'
import {useEffect, useState} from "react";
import CarCard from "../CarCard";
import CarForm from "../Forms/CarForm";
import {authService} from "../../services";
import {Outlet} from "react-router";
import jwt_decode from "jwt-decode";
import CompanyForm from "../Forms/CompanyForm";

const CompanyFull = () => {
    const location = useLocation();
    // console.log(location.state, 'location');
    const navigate = useNavigate();
    const {company_id} = useParams();
    // console.log(company_id, 'use params id');
    const dispatch = useDispatch();

    useEffect(() => {
        if (!company_id && location.state === null) {
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
        console.log(token, token);
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
            console.log('not equals', company_id, 'company id', getDecoded._id);
        }

    })

    return (
        <div>
            {equal === true ? <div><CompanyForm company={company}/></div> : null}
            <div className={'company-full-company'}>
                <div>id:{_id}</div>
                <div>name:{name}</div>
                <div>number:{contact_number}</div>
                <div>email:{email}</div>
                <div>Read more about us:{description}</div>
                <img src={`${image?.link}`} alt="Red dot"/>
            </div>
            <div className={'company-full'}>
                {equal === true ? <div><CarForm/></div> : null}
            </div>
            <div className={'company-full-cars'}>
                <h3>COMPANY CARS</h3>
                {cars?.map(car => <CarCard key={car._id} car={car} auth={equal}/>)}
            </div>
        </div>
    );
};

export default CompanyFull;