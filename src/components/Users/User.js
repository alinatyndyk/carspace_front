import {useNavigate} from "react-router";
import {useEffect, useState} from "react";
import UserForm from "../Forms/UserForm";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../../redux";

const User = ({accountUserId}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [update, setUpdate] = useState(false);

    const {user} = useSelector(state => state.users);

    useEffect(() => {
        dispatch(userActions.getById({_id: accountUserId}))
    },[accountUserId])

    return (
        <div>
            <div>id:{user?._id}</div>
            <div>user:{user?.name} {user?.last_name} {user?.age}</div>
            <div>{user?.email} -- {user?.contact_number}</div>
            <img src={`${user?.image.link}`} alt="Red dot"/>
            {update === true ? <UserForm user={user}/> : null}
            <div>
                <button onClick={() => setUpdate(true)}>update user</button>
                <button>create order</button>
                <button  onClick={() =>
                    navigate(`/account/orders`, {state: {type: 'user-orders'}})}>manage orders</button>
            </div>
            <hr/>
            <br/>
        </div>
    );
};

export default User;