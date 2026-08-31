import { StrictMode } from "react";
import "./index.css";
import App from "./App.tsx";
import { ProviderMode } from "./context/ProviderMode.tsx";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProviderMode>
          <App />
        </ProviderMode>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
