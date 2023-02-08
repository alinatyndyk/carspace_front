import ResetPasswordForm from "../components/Forms/ResetPasswordForm";
import {useParams} from "react-router";
import ResetPasswordCompanyForm from "../components/Forms/ResetPasswordCompanyForm";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";

export default function ResetPasswordPage() {
    const {element, tokenAction} = useParams();

    const [searchParams, setSearchParams] = useSearchParams();
    const [token, setToken] = useState();

    useEffect(() => {
        const token = searchParams.get('tokenAction');
        setToken(token);
        setSearchParams(searchParams);
    }, [tokenAction]);

    if (element) {
        return (
            <div>
                Reset forgot page company
                <ResetPasswordCompanyForm resetToken={token}/>
            </div>
        )
    }
    return (
        <div>
            Reset forgot page
            <ResetPasswordForm resetToken={token}/>
        </div>
    )
}