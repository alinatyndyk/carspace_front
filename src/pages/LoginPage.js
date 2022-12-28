import LoginForm from "../components/Forms/LoginForm";
import Modal from "../components/Modal/Modal";
import {useState} from "react";
import './Pages.css';

export default function LoginPage() {
    const [modalActive, setModalActive] = useState(true);
    return (
        <div className={'login_page'}>
            login page
            <Modal active={modalActive} setActive={setModalActive}>
                <LoginForm/>
            </Modal>
            <button onClick={() => setModalActive(true)}>Modal</button>
        </div>
    )
}