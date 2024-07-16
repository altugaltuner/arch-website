"use client"
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const IsCookie = () => {
    const location = useLocation();
    const isLogin = Cookies.get("isLogin")
    const navigate = useNavigate();

    if (isLogin) {
        const isRouter = (location.pathname && "/login");

        if (isRouter) {
            navigate("/homepage");
        }
    }
    return
}

export default IsCookie