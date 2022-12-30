import ForgotPasswordForm from "../components/Forms/ForgotPasswordForm";
import {useParams} from "react-router";
import ForgotPasswordCompanyForm from "../components/Forms/ForgotPasswordCompanyForm";

export default function ForgotPasswordPage(){
    const {element} = useParams();
    if(element){
        return (
            <div>
                pass forgot company page
                <ForgotPasswordCompanyForm/>
            </div>
        )
    }
    return(
        <div>
            pass forgot page
            <ForgotPasswordForm/>
        </div>
    )
}