import Login from "../initials/Login";
import { useRoutes } from "react-router-dom";
import Home from "../initials/Home";
import Loading from "../initials/Loading";


const AppRoutes = () => {
    let routes = useRoutes([
        {
            path: '/',
            element: <Loading/>
        },
        {
            path: '/auth',
            element: <Login/>
        },
        {
            path: '/home',
            element: <Home/>
        }
    ]);

    return routes;
}

export default AppRoutes;
