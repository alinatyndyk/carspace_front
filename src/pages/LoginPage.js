
import './Pages.css';
import LoginForm from "../components/Forms/LoginForm";
import {useParams} from "react-router";
import CompanyLoginForm from "../components/Forms/CompanyLoginForm";

export default function LoginPage() {
    const {element} = useParams()
    if(element){
        return (
            <div>
                <CompanyLoginForm/>
            </div>
        )
    }
    return (
        <div>
            <LoginForm/>
        </div>
    )
}