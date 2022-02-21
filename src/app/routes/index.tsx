import Login from "../initials/Login";
import { useRoutes } from "react-router-dom";


const AppRoutes = () => {
    let routes = useRoutes([
        {
            path: '/',
            element: <Login/>
        }
    ]);

    return routes;
}

export default AppRoutes;
