import BrowserRouterProvider from "./BrowserRouterProvider";
import ReactQueryProvider from "./ReactQueryProvider";

export default function RootProvider() {
  return (
    <ReactQueryProvider>
      <BrowserRouterProvider />
    </ReactQueryProvider>
  );
}
