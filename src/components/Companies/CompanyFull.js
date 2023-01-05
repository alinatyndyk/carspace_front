import {useLocation, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {companyActions} from "../../redux";
import './Company.css'
import {useEffect, useState} from "react";
import CarCard from "../CarCard";
import CarForm from "../Forms/CarForm";
import {authService} from "../../services";
import jwt_decode from "jwt-decode";

const CompanyFull = () => {
    const location = useLocation();
    const {company_id} = useParams();
    console.log(company_id, 'use params id');
    const dispatch = useDispatch();

    useEffect(() => {
        if (!company_id) {
            const {_id} = location.state
            console.log('no id from params');
            console.log(_id, 'state use location');
            const {errors} = dispatch(companyActions.getById({_id: _id}));
            console.log(errors);
        } else {
            const {errors} = dispatch(companyActions.getById({_id: company_id}));
            console.log(errors);

        }
    }, [company_id]);
    const {company} = useSelector(state => state.companies);
    console.log(company);
    const {_id, name, email, contact_number, image, description, cars} = company;

    const [equal, setEqual] = useState(false);
    const [getDecoded, setDecoded] = useState(false);

    console.log(getDecoded, 'get decoded');
    useEffect(() => {
        const token = authService.getAccessToken();
        console.log(token, token);
        if (token) {
            const decoded = jwt_decode(token);
            console.log(decoded, decoded._id, 'decoded');
            console.log(decoded._id, company_id, 'decoded token in company');
            setDecoded(decoded);
        } else if(!token){
            console.log('no token');
        }
        console.log(token, 'token in company');
    }, [])

    useEffect(() => {
        if (company_id === getDecoded._id) {
            console.log('equals', company_id, getDecoded);
            setEqual(true);
        } else {
            console.log('not equals', company_id, getDecoded);
        }

    })

    return (
        <div>
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
                <div className={'company-full-cars'}>
                    <h3>COMPANY CARS</h3>
                    {cars?.map(car => <CarCard key={car._id} car={car} auth={equal}/>)}
                </div>
            </div>
        </div>
    );
};

export default CompanyFull;