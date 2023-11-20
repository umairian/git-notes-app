import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity, // 30 minutes in milliseconds
          },
    }
});

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
