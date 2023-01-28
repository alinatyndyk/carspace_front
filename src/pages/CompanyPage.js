import Companies from "../components/Companies/Companies";
import {useParams} from "react-router";

export default function CompanyPage(){
    const {company_id} = useParams();
    console.log(company_id, 'company page id');

    return(
        <div>
            <Companies id={company_id}/>
        </div>
    )
}