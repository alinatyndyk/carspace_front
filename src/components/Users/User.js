import {useNavigate} from "react-router";


const User = ({user}) => {
    const {_id, name, image,} = user;
    const navigate = useNavigate();
    console.log(image?.link);
    // const [img, setImg] = useState(null);
    // useEffect(() => {
    //     axios.get('http://localhost:5000/photos/3c43c24a8ca1a4abaad4158617545e44.png')
    //         .then(value => setImg(value.data));
    // }, [])

    return (
        <div onClick={() => navigate(`/users/${_id.toString()}`)}>
            <div>id:{_id}</div>
            <div>user:{name}</div>
            <div>link: {image.link}</div>
            {/*<img src={`data:text/plain;base64,${userProfileImage}`} alt="Red dot" />*/}
            <img src={`${image.link}`} alt="Red dot"/>
            {/*<div><img src={base64String}/></div>*/}
            {/*<div>image:{JSON.stringify(image.data)}</div>*/}
            <button>Get cars with this brand</button>
            <hr/>
            <br/>
        </div>
    );
};

export default User;