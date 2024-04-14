import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import App from '../App'
import Home from "../home/Home";
import Shop from "../shop/Shop";
import About from "../components/About";
import Blog from "../components/Blog";
import SingleBook from "../shop/SingleBook";
import DashboardLayout from "../dashboard/DashboardLayout";
import Dashboard from "../dashboard/Dashboard";
import UploadBook from "../dashboard/UploadBook";
import ManageBooks from "../dashboard/ManageBooks";
import EditBooks from "../dashboard/EditBooks";
import Signup from "../components/Signup";
import Login from "../components/Login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Logout from "../components/Logout";
import Cart from "../shop/Cart";
import Payment from "../shop/Payment";
import Sucess from "../components/Sucess";
import Cancel from "../components/Cancel";
import UserUpload from "../components/UserUpload";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/shop',
                element: <PrivateRoute><Shop /></PrivateRoute>
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/userupload',
                element: <PrivateRoute><UserUpload /></PrivateRoute>
            },
            {
                path: '/book/:id',
                element: <SingleBook />,
                loader: ({ params }) => fetch(`http://localhost:5000/book/${params.id}`)
            },
            {
                path: '/cart',
                element: <Cart />
            },
            {
                path: '/payment',
                element: <Payment />
            },
            {
                path: '/sucess',
                element: <Sucess />
            },
            {
                path: '/cancel',
                element: <Cancel />
            }
        ]
    },
    {
        path: '/admin/dashboard',
        element: <DashboardLayout />,
        children: [
            {
                path: '/admin/dashboard',
                element: <PrivateRoute><UploadBook /></PrivateRoute>
            },
            {
                path: '/admin/dashboard/upload',
                element: <UploadBook />
            },
            {
                path: '/admin/dashboard/manage',
                element: <ManageBooks />
            },
            {
                path: '/admin/dashboard/edit-books/:id',
                element: <EditBooks />,
                loader: ({ params }) => fetch(`http://localhost:5000/book/${params.id}`)
            }
        ]
    },
    {
        path: "sign-up",
        element: <Signup />
    },
    {
        path: 'login',
        element: <Login />
    },
    {
        path: 'logout',
        element: <Logout />
    }
]);

export default router;

