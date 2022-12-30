import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../../redux";
import User from "./User";

const Users = () => {
    const {users} = useSelector(state => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        const res = dispatch(userActions.getAll())
        console.log(res);
    }, [])

    return (
        <div>
            Users Components like page
            {users?.map(user => <User key={user._id} user={user}/>)}
        </div>
    );
};

export default Users;