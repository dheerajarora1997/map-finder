import React, { useEffect, useState } from "react";
import { RootState, AppDispatch } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { fetchLoginDetail, reset } from "@/store/reducers/LoginSlice";
import { saveLocalStorage, removeLocalStorage } from "../utils";

type LoginProps = {};

export type ILoginPayload = {
  userName: string;
  password?: string;
  emailAddress?: string;
};

let loginPayload: ILoginPayload = {
  userName: "",
};

const Login: React.FC<LoginProps> = ({}) => {
  const userDetails = useSelector(
    (state: RootState) => state.userDetails.loginDetails
  );

  const dispatch = useDispatch<AppDispatch>();

  const [loginDetails, setLoginDetails] = useState<ILoginPayload>(loginPayload);

  const fieldChange = (key: string, value: string | number) => {
    setLoginDetails({ ...loginDetails, [key]: value });
  };

  let onsubmit = (e: any) => {
    e.preventDefault();
    dispatch(fetchLoginDetail(loginDetails));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100" style={{top: 0}}>
      <form
        onSubmit={(e) => {
          onsubmit(e);
        }}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            required
            value={loginDetails.userName}
            onChange={(e) => {
              fieldChange("userName", e.target.value);
            }}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-gray-800 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
