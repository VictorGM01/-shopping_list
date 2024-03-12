import React from "react";
import ReactDOM from "react-dom/client";
import AppRoute from "./routes.jsx";
import "./reset.css";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppRoute />
    </QueryClientProvider>
  </React.StrictMode>
);
