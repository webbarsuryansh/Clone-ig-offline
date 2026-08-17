import {createBrowserRouter} from "react-router";
import Login from "./feature/auth/pages/Login";
import Signup from "./feature/auth/pages/Signup";
import Home from "./feature/auth/pages/Home";

const router = createBrowserRouter([
    {
        path: "/home",
        element: <Home/>
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/signup",
        element: <Signup />
    }
    
])


module.exports = router