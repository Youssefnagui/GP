// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LoginPage from "./features/auth/pages/LoginPage.jsx";
import SignUpPage from "./features/auth/pages/SignUpPage.jsx";

const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignUpPage /> },        // ⬅️ new
  { path: "/forgot-password", element: <div style={{padding:32}}>Forgot Password (WIP)</div> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
