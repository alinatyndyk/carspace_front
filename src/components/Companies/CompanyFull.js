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

const CompanyFull = () => {
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location);
    const {company_id} = useParams();
    console.log(company_id, 'use params id');
    const dispatch = useDispatch();
    // if(!company_id && !Id){
    //     navigate('/login')
    // }

    useEffect(() => {
        // const {Id} = location.state
        if (!company_id && location.state === null) {
            navigate('/login');
        } else if (!company_id) {
            console.log('no id from params');
            console.log(location.state.Id, 'state use location');
            const {errors} = dispatch(companyActions.getById({_id: location.state.Id}));
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
        } else if (!token) {
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
    const logout = () => {
        const {errors} = dispatch(authActions.logoutCompany());
        if(!errors){
            navigate('/home');
        }
        console.log(errors);
    }

    const getCompanyOrders = () => {
        const {errors} = dispatch(companyActions.getCompanyOrders());
        // if(!errors){
        //     navigate('/orders');
        // }
        console.log(errors);
    }

    const getCompanyOrdersToday = () => {
        const {errors} = dispatch(companyActions.getCompanyOrdersToday());
        // if(!errors){
        //     navigate('/orders');
        // }
        console.log(errors);
    }

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
                {equal === true ? <div>
                    <button onClick={() => logout()}>Logout</button>
                    <button onClick={() => getCompanyOrders()}>Company Orders</button>
                    <button onClick={() => getCompanyOrdersToday()}>Company Orders Today</button>
                    <CarForm/>
                </div> : null}
                {/*{equal === true ? <div><CarForm/></div> : null}*/}
                <Outlet/>
                <div className={'company-full-cars'}>
                    <h3>COMPANY CARS</h3>
                    {cars?.map(car => <CarCard key={car._id} car={car} auth={equal}/>)}
                </div>
            </div>
        </div>
    );
};

export default CompanyFull;