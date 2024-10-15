import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";
import AuthProvider from "./components/AuthProvider";
import { Provider } from 'react-redux';  // Import the Provider from react-redux
import { store } from "../src/app/store";  // Import your Redux store (you'll need to have one)

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>  {/* Wrap with Redux Provider */}
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);

