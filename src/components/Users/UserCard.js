const UserCard = ({user}) => {

    return (
        <div className={'df'}>
            <img className={'order-card-img'} src={`${user?.image?.link}`} alt="Red dot"/>
            <div>
                <div>id:{user?._id}</div>
                {user?.status === 'admin' ? <div className={'highlight'}>Admin access</div> : null}
                <div>user:{user?.name} {user?.last_name} {user?.age}</div>
                <div>{user?.email} -- {user?.contact_number}</div>
            </div>
        </div>
    );
};

export default UserCard;