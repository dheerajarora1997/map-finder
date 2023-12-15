"use client";
import { FC, useEffect, useState } from "react";
import { RootState, AppDispatch } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "@/store/reducers/LoginSlice";

export type IHeaderProp = {
  userInfo?: {
    userName: string;
  };
};

const Header: FC<IHeaderProp> = ({ userInfo }) => {
  const dispatch = useDispatch<AppDispatch>();

  const logoutAction = () => {
    dispatch(reset());
  };
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div
          className={`relative flex h-16 items-center ${
            userInfo?.userName ? "justify-between" : "justify-center"
          } text-white`}
        >
            {userInfo?.userName || "Welcome"}
            {!userInfo?.userName || <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              logoutAction();
            }}
          >
            Logout
          </button>}
          
        </div>
      </div>
    </nav>
  );
};

export default Header;
