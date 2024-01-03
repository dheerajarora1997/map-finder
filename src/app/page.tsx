"use client";
import { Provider } from "react-redux";
import Header from "./Components/Header";
import store from "../store";
import Login from "./Components/LoginForm";
import Main from "./main";
import { Auth0Provider } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const url = window.location.origin;
  }, []);
  return (
    <Auth0Provider
      domain="india-999.us.auth0.com"
      clientId="6HVppH4Y9WCyZOc2VlTD4EIsoBn4Abf4"
      authorizationParams={{
        redirect_uri:
          typeof window !== "undefined" ? window.location.origin : "",
      }}
    >
      <Provider store={store}>
        <Main />
      </Provider>
    </Auth0Provider>
  );
}
