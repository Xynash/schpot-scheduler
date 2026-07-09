import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import App from "./App";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster position="top-center"
        toastOptions={{ style: { border: "2px solid #141414", borderRadius: 0, boxShadow: "4px 4px 0 #141414" } }} />
    </QueryClientProvider>
  </React.StrictMode>
);