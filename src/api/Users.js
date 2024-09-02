import Axios from "./axios";

export const registerUser = (user) => Axios.post("/users/register", user);

export const loginUser = (user) => Axios.post("/users/login", user);
