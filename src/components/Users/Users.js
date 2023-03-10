import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../../redux";
import User from "./User";
import {useParams} from "react-router";
import UserCard from "./UserCard";

const Users = () => {
    const {users, user} = useSelector(state => state.users);
    const dispatch = useDispatch();
    const {user_id} = useParams();
    console.log(users, '*******************');

    useEffect(() => {
        if (user_id) {
            const {errors} = dispatch(userActions.getById({_id: user_id}))
            console.log(errors);
        } else {
            const res = dispatch(userActions.getAll())
            console.log(res);
        }
    }, [])

    if (user_id) {
        return (
            <div><User key={user._id} user={user}/></div>
        )
    }

        return (
            <div>
                Users Components like page
                {users?.map(user => <UserCard key={user._id} user={user}/>)}
            </div>
        );


};

export default Users;