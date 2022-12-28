import LoginForm from "../components/Forms/LoginForm";
import Modal from "../components/Modal/Modal";
import {useState} from "react";

export default function LoginPage() {
    const [modalActive, setModalActive] = useState(true);
    return (
        <div>
            login page
            {/*<Modal active={modalActive} setActive={setModalActive}/>*/}
            <LoginForm/>
        </div>
    )
}