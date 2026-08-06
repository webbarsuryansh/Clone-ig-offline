import {createBrowserRouter} from "react-router";
import Login from "./feature/auth/pages/Login";
import Signup from "./feature/auth/pages/Signup";


const router = createBrowserRouter([
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