import {useLocation} from "react-router";
import CompanyFull from "../components/Companies/CompanyFull";
import User from "../components/Users/User";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../redux";
import {useEffect} from "react";

export default function AccountPage() {
    const {state} = useLocation();
    const dispatch = useDispatch();

    const {user, errors} = useSelector(state => state.users);


    useEffect(() => {
        const {errors} = dispatch(userActions.getById({_id: state.Id}))
        console.log(errors, 'errors');
    }, [])

    if (state.type === 'company') {
        return (
            <div><CompanyFull/> {errors}</div>

        )
    } else if (state.type === 'user') {
        return (
            <div>
                <div>User account full page</div>
                <User user={user}/>
                {errors}
            </div>
        )
    }
}