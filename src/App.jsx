import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginForm from "./Components/Pages/LoginForm";
import SignUp from "./Components/Pages/SignUp";
import Home from "./Components/Pages/Home";
import Dashboard from "./Components/Pages/Dashboard";
import CartItem from "./Components/Pages/CartItem";
import Payment from "./Components/Pages/Payment";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "./Components/Store/ContextApi";
import useMultiTabAutoLogout from "./Components/Pages/Logout";
import { ToastContainer } from "react-toastify";
import AdminRoute from "./Components/Pages/AdminRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/payment",
    element: <Payment />,
  },
  {
    path: "/cart",
    element: <CartItem />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/dashboard",
    element: (
      <AdminRoute>
        <Dashboard />
      </AdminRoute>
    ),
  },
]);
function App() {
  const { isAuthenticated, logout } = useCart();

  useMultiTabAutoLogout(logout, isAuthenticated, 500000);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}
export default App;
