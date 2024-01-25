import { RootState, AppDispatch } from "../store";
import { useSelector, useDispatch } from "react-redux";
import Login from "./Components/LoginForm";
import Header from "./Components/Header";
import React, { useEffect, useState, useRef } from "react";
import { getLocalStorage, saveLocalStorage } from "./utils";
import { fetchLoginDetail, reset } from "@/store/reducers/LoginSlice";
import { useAuth0 } from "@auth0/auth0-react";
import mapboxgl from "mapbox-gl";

type MainProps = {
  latitude: number;
  longitude: number;
  zoom : number;
  mapHeight: string;
};

mapboxgl.accessToken =
  "pk.eyJ1IjoiZGhlZXJhamFyb3JhMTk5NyIsImEiOiJjbDlvM2VmbTQwZHlzM3BvNW04ODU1NTJ1In0.kpZXObzDZM5VFW3y3oq99g";

const MainMap: React.FC<MainProps> = ({latitude, longitude, zoom, mapHeight}) => {
  const mapContainerRef = useRef<any>("");
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [longitude, latitude],
      zoom: zoom,
    });
    return () => map.remove();
  }, [longitude, latitude, zoom]);

  return (
    <>
      <div
        className="map-container"
        ref={mapContainerRef}
        style={{ height: mapHeight }}
      />
    </>
  );
};

export default MainMap;
