import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import PageNotFound from "./pages/404";
import Authorized from "./pages/Authorized";

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
]);
