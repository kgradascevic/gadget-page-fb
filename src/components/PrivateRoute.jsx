import { ROUTES } from "../constants";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}) => {

    const userId = localStorage.getItem("userId");

    if(!userId) return <Navigate to={ROUTES.HOME} />;

    return children;
}

export default PrivateRoute;