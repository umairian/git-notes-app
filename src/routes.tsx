import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import PageNotFound from "./pages/404";
import Authorized from "./pages/Authorized";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/Routes/PrivateRoute";
import CreateGistPage from "./pages/CreateGist";
import GistDetailsPage from "./pages/GistDetails";

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
    {
        path: "/gists/create",
        element: <PrivateRoute><CreateGistPage /></PrivateRoute>,
    },
    {
        path: "/gists/:gistId",
        element: <PrivateRoute><GistDetailsPage /></PrivateRoute>,
    },
]);
