'use client'
import { Provider } from "react-redux";
import Header from "./Components/Header";
import store from "../store"; 
import Login from "./Components/LoginForm";
import Main  from "./main";

export default function Home() {

 
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
