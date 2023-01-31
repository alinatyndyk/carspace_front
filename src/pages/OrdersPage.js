import Orders from "../components/Orders/Orders";
import {useLocation} from "react-router";

export default function OrdersPage(){
    return(
        <div>
            Orders Page
            <Orders/>
        </div>
    )
}