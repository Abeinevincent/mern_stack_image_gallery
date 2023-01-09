import "./app.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

const user = localStorage.getItem("token");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "login",
    element: user ? <Navigate replace to="/" /> : <Login />,
  },
  {
    path: "register",
    element: user ? <Navigate replace to="/" /> : <Register />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
