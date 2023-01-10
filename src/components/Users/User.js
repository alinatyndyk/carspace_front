import {useNavigate} from "react-router";
import {useState} from "react";
import UserForm from "../Forms/UserForm";

const User = ({user}) => {
    const navigate = useNavigate();
    console.log(user, 'in user.js');

    const [update, setUpdate] = useState(false);

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
                <button  onClick={() => navigate(`/account/orders`, {state: {type: 'user-orders'}})}>manage orders</button>
            </div>
            <hr/>
            <br/>
        </div>
    );
};

export default User;