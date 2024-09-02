import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";
import { AccountCircle } from "@mui/icons-material";

const Header = () => {

    const navigate = useNavigate();

    const handleLogOut = () => {

        localStorage.removeItem("userId");
        navigate(ROUTES.HOME);

    }

    return <div className="p-4 text-4xl font-bold flex items-center justify-between w-full">
        <span>Toy Store</span>
        {!!localStorage.getItem("userId") &&
        <div className="flex gap-2 items-center">
            <AccountCircle className="cursor-pointer" style={{fontSize: 34}} />
            <Button onClick={handleLogOut} variant="outlined" color="error">Log Out</Button>
        </div>}
    </div>
}

export default Header;