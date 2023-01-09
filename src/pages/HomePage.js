import Modal from "../components/Modal/Modal";
import LoginForm from "../components/Forms/LoginForm";
import {useEffect, useState} from "react";
import {Link, useSearchParams} from "react-router-dom";

export default function HomePage() {
    const [modalActive, setModalActive] = useState(true);


//Add a second foo parameter.

    let url = new URL('https://example.com?');
    let params = new URLSearchParams(url.search);
    console.log(params.toString(), 'outside'); // "foo=1&bar=2&baz=3"

// Add a third parameter.
    let query;
    const handleChange = (event) => {
        if (event.target.checked) {
            console.log(event.target.name);
            console.log(event.target.value);
            console.log('✅ Checkbox is checked');
            params.set(event.target.name, event.target.value);
            console.log(params.toString()); // "foo=1&bar=2&baz=3"
            query = params.toString();
            return query
        }
    };
    console.log(query, 'query outside');

    // const [searchParams, setSearchParams] = useSearchParams();
    // useEffect(() => {
    //     setSearchParams({'leave': 'goodbye'})
    //     const greeting = searchParams.toString();
    //     console.log(greeting, 'to string');
    //
    // }, [searchParams])
    // console.log(searchParams, 'greeting ******************************');


    return (
        <div className={'login_page'}>
            Home page ...
            {/*<button onClick={() => setSearchParams({'greeting': 'bonjour'})}>set search</button>*/}
            <Modal active={modalActive} setActive={setModalActive}>
                <LoginForm/>
            </Modal>
            {/*<button onClick={() => setModalActive(true)}>Modal</button>*/}
            <div>
                brand
                <input type="checkbox" name={'brand'} value={'AUDI'} onChange={handleChange}/>
            </div>
        </div>
    )
}