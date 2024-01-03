import { RootState, AppDispatch } from "../store";
import { useSelector, useDispatch } from "react-redux";
import Login from "./Components/LoginForm";
import Header from "./Components/Header";
import { useEffect, useState } from "react";
import { getLocalStorage, saveLocalStorage } from "./utils";
import { fetchLoginDetail, reset } from "@/store/reducers/LoginSlice";
import { useAuth0 } from "@auth0/auth0-react";

type MainProps = {};

const Main: React.FC<MainProps> = () => {
  const userDetails = useSelector(
    (state: RootState) => state.userDetails.loginDetails
  );
  const dispatch = useDispatch<AppDispatch>();

  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <>
      <Header userInfo={userDetails} />
      <main style={{padding: 70}}>
        {isAuthenticated && <h2 className="text-dark text-xl">{user?.name}</h2>}
      </main>
    </>
  );
};

export default Main;
