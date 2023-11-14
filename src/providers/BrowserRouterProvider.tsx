import { RouterProvider } from "react-router-dom";
import { routes } from "../routes";

export default function BrowserRouterProvider() {
  return <RouterProvider router={routes}></RouterProvider>;
}
