import { RootState, AppDispatch } from "../store";
import { useSelector, useDispatch } from "react-redux";
import Login from "./Components/LoginForm";
import Header from "./Components/Header";
import React, { useEffect, useState, useRef } from "react";
import { getLocalStorage, saveLocalStorage } from "./utils";
import { fetchLoginDetail, reset } from "@/store/reducers/LoginSlice";
import { useAuth0 } from "@auth0/auth0-react";
import mapboxgl from 'mapbox-gl';

type MainProps = {};

mapboxgl.accessToken = 'pk.eyJ1IjoiZGhlZXJhamFyb3JhMTk5NyIsImEiOiJjbDlvM2VmbTQwZHlzM3BvNW04ODU1NTJ1In0.kpZXObzDZM5VFW3y3oq99g';


const Main: React.FC<MainProps> = () => {
  const userDetails = useSelector(
    (state: RootState) => state.userDetails.loginDetails
  );
  const dispatch = useDispatch<AppDispatch>();
  const [userRoles, setUserRoles] = useState();
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const { user, isAuthenticated, isLoading } = useAuth0();
  const mapContainerRef = useRef<any>('');
  const [zoom, setZoom] = useState(15);
  useEffect(() => {
    if (isAuthenticated) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if(position.coords){
              setLatitude(position.coords.latitude)
              setLongitude(position.coords.longitude)
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }, [isAuthenticated]);

  useEffect(()=>{
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [longitude, latitude],
      zoom: zoom,
     });
     return () => map.remove();
  }, [longitude, latitude])
 
  return (
    <>
      <Header userInfo={userDetails} />
      <main style={{ padding: 70 }}>
        {isLoading && "Loading..."}
        {isAuthenticated && (
          <>
            <h2 className="text-dark text-xl">{user?.name}</h2>
            <h4 className="text-dark text-xl">{user?.email}</h4>
          </>
        )}
          <div className='map-container' ref={mapContainerRef} style={{height: '600px'}} />
      </main>
    </>
  );
};

export default Main;
