import Modal from "../components/Modal/Modal";
import LoginForm from "../components/Forms/LoginForm";
import {useState} from "react";
import {Link} from "react-router-dom";

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
    return (
        <div className={'login_page'}>
            Home page ...
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