import Header from "../components/Header/Header";
import {Outlet} from "react-router";

export default function LayoutPage() {
    return (
        <div className={'layout'}>
            <Header/>
            <Outlet/>
        </div>
    )
}