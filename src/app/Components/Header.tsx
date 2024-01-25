"use client";
import { FC, useEffect, useState } from "react";
import { RootState, AppDispatch } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "@/store/reducers/LoginSlice";
import { removeLocalStorage } from "../utils";
import { useAuth0 } from "@auth0/auth0-react";

export type IHeaderProp = {
  userInfo?: {
    userName: string;
  };
};

const Header: FC<IHeaderProp> = ({ userInfo }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <nav className="bg-gray-800 fixed w-full" style={{ top: 0 }}>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className={`relative flex h-16 items-center justify-between`}>
          <h1 className="text-white text-2xl">Logo</h1>
          {isAuthenticated ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() =>
                logout({ logoutParams: { returnTo: '/' } })
              }
            >
              Logout
            </button>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                loginWithRedirect();
              }}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
