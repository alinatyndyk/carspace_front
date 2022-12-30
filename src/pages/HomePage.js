
import Modal from "../components/Modal/Modal";
import LoginForm from "../components/Forms/LoginForm";
import {useState} from "react";

export default function HomePage(){
    const [modalActive, setModalActive] = useState(true);
    return (
        <div className={'login_page'}>
            Home page ...
            <Modal active={modalActive} setActive={setModalActive}>
                <LoginForm/>
            </Modal>
            {/*<button onClick={() => setModalActive(true)}>Modal</button>*/}
        </div>
    )
}