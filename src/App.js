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

function App() {
    // const [isShown, setIsShown] = useState(false);
    return (
        <div>
            <div className={'content'}>
                <Routes>
                    <Route path={'/'} element={<LayoutPage/>}>
                        <Route path={'/cars'} element={<CarPage/>}>
                            <Route path={':car_id'} element={<CarPage/>}/>
                        </Route>
                        <Route path={'home'} element={<HomePage/>}/>
                        <Route path={'locations'} element={<CarPage/>}/>
                        {/*<Route path={'upload'} element={<Uplo/>}/>*/}
                        <Route path={'locations/:location'} element={<CarPage/>}/>
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
