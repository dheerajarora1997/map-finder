import { RootState, AppDispatch } from "../store";
import { useSelector, useDispatch } from "react-redux";
import Login from "./Components/LoginForm";
import Header from "./Components/Header";
import React, { useEffect, useState, useRef } from "react";
import { getLocalStorage, saveLocalStorage } from "./utils";
import { fetchLoginDetail, reset } from "@/store/reducers/LoginSlice";
import { useAuth0 } from "@auth0/auth0-react";
import mapboxgl from 'mapbox-gl';
import SOS from "./SOS";

type MainProps = {};

// mapboxgl.accessToken = 'pk.eyJ1IjoiZGhlZXJhamFyb3JhMTk5NyIsImEiOiJjbDlvM2VmbTQwZHlzM3BvNW04ODU1NTJ1In0.kpZXObzDZM5VFW3y3oq99g';


const Main: React.FC<MainProps> = () => {
  
  return (
    <>
      <SOS />
    </>
  );
};

export default Main;
