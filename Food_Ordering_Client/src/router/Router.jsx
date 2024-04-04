import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/home";
import Menu from "../pages/shop/Menu";
import Signup from "../components/Signup";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import CartPage from "../pages/shop/CartPage";
import Modal from "../components/Modal";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import User from "../pages/dashboard/admin/User";
const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
          path:"/",
          element:<Home/>
        },
        {
           path:"/menu",
           element:<Menu/>
        },
        {
          path:"/update-profile",
          element:<UpdateProfile/>
        },
        {
          path:"/cart-page",
          element:<PrivateRouter><CartPage/></PrivateRouter>
        }
      ] 
    },
    {
      path: "/signup",
      element :<Signup/>
    },
    {
      path:"/login",
      element:<Modal/>
    },{
      path:"/dashboard",
      element:<PrivateRouter><DashboardLayout/></PrivateRouter>,
      children:[
        {
          path:"",
          element:<Dashboard />
        },
        {
          path:"users",
          element:<User/>
        }
      ]
    }
  ]);

  export default router;