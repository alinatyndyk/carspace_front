import {useLocation} from "react-router";
import CompanyFull from "../components/Companies/CompanyFull";
import User from "../components/Users/User";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../redux";
import {useEffect} from "react";

export default function AccountPage() {
    const {state} = useLocation();
    console.log(state, 'state account page');
    const dispatch = useDispatch();

    const {user, errors} = useSelector(state => state.users);


    useEffect(() => {
        const {errors} = dispatch(userActions.getById({_id: state.Id}))
        console.log(errors, 'errors');
    }, [])

    console.log(user, 'userBody');

    if (state.type === 'company') {
        console.log('type company');
        return (
            <div><CompanyFull/></div>
        )
    } else if (state.type === 'user') {
        return (
            <div>
                <div>User account full page</div>
                <User user={user}/>
            </div>
        )
    }

    // return (
    //     <div>
    //         Account page
    //     </div>
    // )
}