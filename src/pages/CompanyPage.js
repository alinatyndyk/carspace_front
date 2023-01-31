import Companies from "../components/Companies/Companies";
import {useParams} from "react-router";

export default function CompanyPage(){
    const {company_id} = useParams();

    return(
        <div>
            <Companies id={company_id}/>
        </div>
    )
}