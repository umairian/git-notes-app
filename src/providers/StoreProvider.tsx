import { Provider } from "react-redux";
import { store } from "../store/index";

export default function StoreProvider({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) {
  return <Provider store={store}>{children}</Provider>;
}
