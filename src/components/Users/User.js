import {useNavigate} from "react-router";

const User = ({user}) => {
    const navigate = useNavigate();
    console.log(user, 'in user.js');

    return (
        <div>
            <div>id:{user?._id}</div>
            <div>user:{user?.name}</div>
            <img src={`${user?.image.link}`} alt="Red dot"/>
            <div>
                <button onClick={() => navigate(`/account/orders`, {state: {type: 'user-orders'}})}>update user</button>
                <button>create order</button>
                <button>manage/cancel order</button>
            </div>
            <hr/>
            <br/>
            user js
            {JSON.stringify(user)}
        </div>
    );
};

export default User;