import ReactQueryProvider from "./ReactQueryProvider";

export default function RootProvider({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
