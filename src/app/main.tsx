import { RootState, AppDispatch } from "../store";
import { useSelector, useDispatch } from "react-redux";
import Login from "./Components/LoginForm";
import Header from "./Components/Header";
import { useEffect, useState } from "react";
import { getLocalStorage, saveLocalStorage } from "./utils";
import { fetchLoginDetail, reset } from "@/store/reducers/LoginSlice";

type MainProps = {};

const Main: React.FC<MainProps> = () => {
  const userDetails = useSelector((state: RootState) => state.userDetails);
  const dispatch = useDispatch<AppDispatch>();
  const [localUserData, setLocalUserData] = useState<null | string>(
    localStorage.getItem("userDetails") || ''
  );

  useEffect(() => {
    if (localUserData) {
      
    }

  }, [localUserData]);

  useEffect(() => {
    if (userDetails.loginDetails?.userName) {
      saveLocalStorage("userDetails", JSON.stringify(userDetails.loginDetails));
    }
    setLocalUserData(JSON.stringify(userDetails.loginDetails))
  }, [userDetails.loginDetails]);

  return (
    <main>
      <Header userInfo={userDetails.loginDetails} />
      {localUserData}
      {!localUserData ? <Login /> : <h1>Login</h1>}
    </main>
  );
};

export default Main;
