import Orders from "../components/Orders/Orders";
import {useLocation} from "react-router";

export default function OrdersPage(){
    const {state} = useLocation();
    console.log(state, 'state orders page');
    return(
        <div>
            Orders Page
            <Orders/>
        </div>
    )
}