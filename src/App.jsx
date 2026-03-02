import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginForm from "./Components/Pages/LoginForm";
import SignUp from "./Components/Pages/SignUp";
import Home from "./Components/Pages/Home";
import Dashboard from "./Components/Pages/Dashboard";
import CartItem from './Components/Pages/CartItem'
import Payment from "./Components/Pages/Payment";
import useAutoLogout from './Components/Pages/Logout'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logout from './Components/Pages/Logout'
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Home />
      </div>
    ),
  },
  {
    path: "/payment",
    element: (
      <div>
        <Payment />
      </div>
    ),
  },
  
  
 {
    path: "/Cart",
    element: (
      <div>
        <CartItem />
      </div>
    ),
  },
  {
    path: "/",
    element: (
      <div>
        <Logout />
      </div>
    ),
  },
  {
    path: "/LoginForm",
    element: (
      <div>
        <LoginForm />
      </div>
    ),
  },
  {
    path: "/SignUp",
    element: (
      <div>
        <SignUp />
      </div>
    ),
  },
   {
    path: "/dashboard",
    element: (
      <div>
        <Dashboard />
      </div>
    ),
  },
]);

function App() {
  //  const { isAuthenticated, logout } = useCart();
  // useAutoLogout(isAuthenticated, logout, 300000);
  
  return<>
  <ToastContainer />
  <RouterProvider router={router} />;
  </> 
}

export default App;
