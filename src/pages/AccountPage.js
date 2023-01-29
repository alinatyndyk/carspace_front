import CompanyFull from "../components/Companies/CompanyFull";
import User from "../components/Users/User";
import {authService} from "../services";
import jwt_decode from "jwt-decode";

export default function AccountPage() {
    const access = authService.getAccessToken();
    const decode = jwt_decode(access);
    const first = access.split(' ')[0];

    console.log('account page');
    if (first === 'Company') {
        console.log('Company component');
        return (
            <div><CompanyFull accountCompanyId={decode._id}/></div>
        )
    } else if (first === 'User') {
        console.log('User component');
        return (
            <div><User accountUserId={decode._id}/></div>
        )
    }
}