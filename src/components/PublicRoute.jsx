import { ROUTES } from "../constants";
import { Navigate } from "react-router-dom";

const PublicRoute = ({children}) => {

    const userId = localStorage.getItem("userId");

    if(userId) return <Navigate to={ROUTES.GADGETS} />;

    return children;
}

export default PublicRoute;