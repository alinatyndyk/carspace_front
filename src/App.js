import './App.css';
import {Routes, Route, Navigate} from "react-router-dom";
import CarPage from "./pages/CarPage";
import LayoutPage from "./pages/LayoutPage";
import BrandsPage from "./pages/BrandsPage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import Users from "./components/Users/Users";
import CompanyPage from "./pages/CompanyPage";
import CarFull from "./components/CarFull";
import CompanyFull from "./components/Companies/CompanyFull";
import OrdersPage from "./pages/OrdersPage";
import AccountPage from "./pages/AccountPage";

function App() {
    // const [isShown, setIsShown] = useState(false);
    return (
        <div>
            <div className={'content'}>
                <Routes>
                    <Route path={'/'} element={<LayoutPage/>}>
                        <Route path={'/cars'} element={<CarPage/>}/>
                        <Route path={'/cars/:car_id'} element={<CarFull/>}/>
                        {/*<Route path={'/account'} element={<CompanyFull/>}/>*/}
                        <Route path={'/account/orders'} element={<OrdersPage/>}/>
                        <Route path={'/account'} element={<AccountPage/>}/>
                        <Route path={'home'} element={<HomePage/>}/>
                        <Route path={'users'} element={<Users/>}/>
                        <Route path={'users/:user_id'} element={<Users/>}/>
                        <Route path={'/companies'} element={<CompanyPage/>}/>
                        <Route path={'/companies/:company_id'} element={<CompanyFull/>}/>
                        <Route path={'/brands'} element={<BrandsPage/>}/>
                        <Route path={'/brands/:brand'} element={<CarPage/>}/>
                        <Route path={'login'} element={<LoginPage/>}/>
                        <Route path={'login/:element'} element={<LoginPage/>}/>
                        <Route path={'register'} element={<RegisterPage/>}/>
                        <Route path={'password-forgot'} element={<ForgotPasswordPage/>}/>
                        <Route path={'password-forgot/:element'} element={<ForgotPasswordPage/>}/>
                        <Route path={'password-reset'} element={<ResetPasswordPage/>}/>
                        <Route path={'password-reset/:element'} element={<ResetPasswordPage/>}/>
                    </Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;
