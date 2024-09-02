import { Button, CircularProgress, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";
import { db } from "../config";
import { addDoc, collection, getDocs } from "@firebase/firestore";
import PublicRoute from "../components/PublicRoute";
import { loginUser, registerUser } from "../api/Users";

const LandingPage = () => {

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginLoading, setLoginLoading] = useState(false);

    const navigate = useNavigate();

    const onRegisterFormSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted");

        const user = {name, surname, username, password};

        try {
            setLoading(true);
            const {data} = await registerUser(user);
            localStorage.setItem("userId", data);
            navigate(ROUTES.GADGETS);
            console.log("navigated");

        } catch (e) {
            console.log(e.message);
            alert ("Credentials are wrong " + e?.message)
        } finally {
            setLoading(false);
        }
    }

    const onLoginFormSubmit = async (e) => {
        e.preventDefault();

        try {

            setLoginLoading(true);
            const {data} = await loginUser({username: loginUsername, password: loginPassword});
            localStorage.setItem("userId", data);
            navigate(ROUTES.GADGETS);

        } catch (e) {
            alert(e?.response?.data);
        } finally {
            setLoginLoading(false);
        }
    }


    return <PublicRoute>
        <div className="flex h-full">
        <form onSubmit={onLoginFormSubmit} className="w-1/2 border-r-2 h-full gap-2 px-2 flex flex-col">
        <span className="text-2xl font-bold">Login to ToyStore</span>
        {loginLoading ? <CircularProgress /> : <>
        <TextField value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} label="Username"/>
        <TextField value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} label="Password" type="password"/>
        <Button type="submit" variant="contained">Login</Button>
        </>}
        </form>
        <form onSubmit={onRegisterFormSubmit} className="w-1/2 h-full gap-2 px-2 flex flex-col">
        <span className="text-2xl font-bold">Register to ToyStore</span>
        {loading ? <CircularProgress /> : <>
        <TextField value={name} onChange={(e) => setName(e.target.value)} label="Name"/>
        <TextField value={surname} onChange={(e) => setSurname(e.target.value)} label="Surname"/>
        <TextField value={username} onChange={(e) => setUsername(e.target.value)} label="Username"/>
        <TextField value={password} onChange={(e) => setPassword(e.target.value)} label="Password" type="password"/>
        <Button type="submit" variant="contained">Register</Button>
        </>}
        </form>
    </div>;
    </PublicRoute>
};
 
export default LandingPage;