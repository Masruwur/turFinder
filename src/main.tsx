import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from "./util/user";

const rootElement: HTMLElement | null = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>  
      <UserProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </UserProvider>
    </GoogleOAuthProvider>
  );
}
