import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "../components/ui/sonner";
import { Layout } from "../components/ui/layout";
import { ThemeProvider } from '../context/theme-provider';
import WeatherDashboard from "./weather-dashboard";



function App({children}) {
  return (
    
      <div >
        {children}
        <WeatherDashboard/> 
      </div>
    
  );
}

export default App;