import ResetPasswordForm from "../components/Forms/ResetPasswordForm";
import {useParams} from "react-router";
import ResetPasswordCompanyForm from "../components/Forms/ResetPasswordCompanyForm";

export default function ResetPasswordPage(){
    const {element} = useParams();
    console.log(element);
    if(element){
        return (
            <div>
                reset forgot page company
                <ResetPasswordCompanyForm/>
            </div>
        )
    }
    return(
        <div>
            reset forgot page
            <ResetPasswordForm/>
        </div>
    )
}