import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import "./lib/i18n";
import { queryClient } from "./lib/react-query";
import "./App.css";

function App() {
  return null;
}

const root = createRoot(document.getElementById("root") as HTMLDivElement);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
