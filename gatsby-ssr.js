import "./src/styles/global.css"
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {Layout} from "./src/components/ui/layout"
import { ThemeProvider } from "./src/context/theme-provider"
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});
export const wrapRootElement = ({ element }) => (
  <QueryClientProvider client={queryClient}>
    {element}
  </QueryClientProvider>
)

export const wrapPageElement = ({ element }) => (
      <ThemeProvider defaultTheme="dark">
          <Layout>{element}</Layout>
       </ThemeProvider>
  
)