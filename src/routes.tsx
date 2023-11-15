import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import PageNotFound from "./pages/404";
import Authorized from "./pages/Authorized";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/Routes/PrivateRoute";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <PageNotFound />
    },
    {
        path: "/authorized",
        element: <Authorized />,
    },
    {
        path: "/profile",
        element: <PrivateRoute><Profile /></PrivateRoute>,
    },
]);
