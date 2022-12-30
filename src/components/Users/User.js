import {useEffect, useState} from "react";
import axios from "axios";


const User = ({user}) => {
    const {_id, name, image,} = user;
    // console.log(image.data.data.toString('base64'));
    console.log(image?.link);
    // const xxx = image?.data.data;
    const [img, setImg] = useState(null);
    useEffect(() => {
        axios.get('http://localhost:5000/photos/3c43c24a8ca1a4abaad4158617545e44.png')
            .then(value => setImg(value.data));
    }, [])
    // const axios = require('axios')
    //
    // const func = async url => {
    //     const response = await axios(url, { responseType: 'arraybuffer' })
    //     const buffer64 = Buffer.from(response.data, 'binary').toString('base64')
    //     return buffer64
    // }
    //
    // setImg({filePreview: URL.createObjectURL(data.testImage[0])});
    // const base64String = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

    // console.log(Buffer.isBuffer(image.data));
    // const Buffer = image.data.data;
    // const img = Buffer.from(image.data.data, 'binary').toString("base64");
    // console.log(img);
    // console.log(img, 'img');
    // console.log(Buffer.from("Hello World").toString('base64'));
    // setUserProfileImage(`data:image/png;base64, ${Buffer.from(image.data.data).toString('base64')}`);


    // const [userProfileImage, setUserProfileImage] = useState({});
    // const base64String = btoa(String.fromCharCode(...new Uint8Array(image.data.data)));
    // console.log(base64String);
    //
    // setUserProfileImage(base64String);


    return (
        <div>
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