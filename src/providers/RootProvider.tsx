import BrowserRouterProvider from "./BrowserRouterProvider";
import ReactQueryProvider from "./ReactQueryProvider";
import StoreProvider from "./StoreProvider";

export default function RootProvider() {
  return (
    <StoreProvider>
      <ReactQueryProvider>
        <BrowserRouterProvider />
      </ReactQueryProvider>
    </StoreProvider>
  );
}
