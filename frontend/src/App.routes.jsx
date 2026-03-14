import {createBrowserRouter} from "react-router-dom"
import Register from "./features/auth/pages/Register"
import Login from "./features/auth/pages/Login"
import "./features/shared/global.scss"
import Protected from "./features/auth/components/Protected"
import Home from "./features/home/pages/Home"

const router = createBrowserRouter([
    {
        path:"/",
        element: <h1>Landing page</h1>
    },
    {
        path:"/home",
        element: <Protected><Home /></Protected>
    },    
    {
        path:"/register",
        element: <Register />
    },
    {
        path:"/login",
        element: <Login />
    },

])

export default router