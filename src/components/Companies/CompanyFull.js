import {useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {carActions, companyActions} from "../../redux";
import './Company.css'
import {useEffect, useState} from "react";
import CarCard from "../CarCard";
import CarForm from "../Forms/CarForm";
import {authService} from "../../services";
import jwt_decode from "jwt-decode";
import CompanyForm from "../Forms/CompanyForm";
import CarPage from "../../pages/CarPage";

const CompanyFull = ({accountCompanyId}) => {
    const navigate = useNavigate();
    const {company_id} = useParams();
    const dispatch = useDispatch();
    // const {cars} = useSelector(state => state.cars)

    useEffect(() => {
        if (!company_id && !accountCompanyId) { //todo
            navigate('/login');
        } else if (!company_id) {
            const {errors} = dispatch(companyActions.getById({_id: accountCompanyId}));
            // dispatch(carActions.getAllWithParams({params: {company: accountCompanyId}}));
            console.log(errors);
        } else {
            const {errors} = dispatch(companyActions.getById({_id: company_id}));
            // dispatch(carActions.getAllWithParams({params: {company: company_id}}));
            console.log(errors);
        }
    }, [company_id]);

    useEffect(() => {
        if (!company_id) {
            dispatch(carActions.getAllWithParams({params: `company=${accountCompanyId}`}));
        } else {
            dispatch(carActions.getAllWithParams({params: `company=${company_id}`}));
        }
    }, [company_id, accountCompanyId])


    const {company} = useSelector(state => state.companies);
    const {name, email, contact_number, image, description, cars} = company; //cars

    const [equal, setEqual] = useState(false);
    const [getDecoded, setDecoded] = useState(false);

    useEffect(() => {
        const token = authService.getAccessToken();
        if (token) {
            const decoded = jwt_decode(token);
            setDecoded(decoded);
        }
    }, [])

    useEffect(() => {
        if (company_id === getDecoded._id) {
            setEqual(true);
        }
    })

    return (
        <div className={'company-full-wrap'}>
            <div className={'company-full-company'}>
                <div>
                    <img src={`${image?.link}`} alt="Red dot"/>
                </div>
                <div>
                    <h2>{name}</h2>
                    <h3>Contact information</h3>
                    <div>number:{contact_number}</div>
                    <div>email:{email}</div>
                    <h3>Read more about us:</h3>
                    <div>{description}</div>
                    {equal === true ? <div><CompanyForm company={company}/></div> : null}
                </div>
            </div>
            <div className={'company-full-cars'}>
                <h3>Comapny cars</h3>
                <CarPage/>
                {/*{cars?.map(car => <CarCard key={car._id} car={car} auth={equal}/>)}*/}
            </div>
            <div className={''}>
                {equal === true ? <div><CarForm/></div> : null}
            </div>
        </div>
    );
};

export default CompanyFull;