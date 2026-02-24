import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginForm from "./Components/Pages/LoginForm";
import SignUp from "./Components/Pages/SignUp";
import Home from "./Components/Pages/Home";
import Dashboard from "./Components/Pages/Dashboard";
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
  return <RouterProvider router={router} />;
}

export default App;
