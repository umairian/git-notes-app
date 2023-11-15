import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactElement | React.ReactElement[] | string;
}) {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  return isLoggedIn ? children : <Navigate to={"/"} replace={true} />;
}
