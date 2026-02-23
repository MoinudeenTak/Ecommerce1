import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginForm from "./Components/LoginSignup/LoginForm";
import SignUp from "./Components/LoginSignup/SignUp";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
  { path: "/SignUp", 
    element: <SignUp /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
