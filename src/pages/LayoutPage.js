import Header from "../components/Header/Header";
import {Outlet} from "react-router";
import {useSelector} from "react-redux";

export default function LayoutPage() {
    // const {errors} = useSelector(state => state.auth)
    return (
        <div className={'layout'}>
            <Header/>
            <Outlet/>
            {/*{errors&&<h3>{JSON.stringify(errors)}</h3>}*/}
        </div>
    )
}