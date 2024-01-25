"use client";
import { FC, useState, useEffect } from "react";
import MainMap from "../Map";
import { useRouter } from "next/navigation";

const FindMe: FC = () => {
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(10);
  const [jsonData, setJsonData] = useState<string>("");
  const router = useRouter();

  const jsonUpdated = (value: string) => {
    const trimString = value.trim();
    setJsonData(trimString);
    const parseJson = JSON.parse(trimString);
    if (parseJson?.latitude && parseJson?.longitude) {
      setLatitude(parseJson.latitude);
      setLongitude(parseJson.longitude);
    } else {
      alert("Invalid Json Entered");
    }
  };

  useEffect(()=>{
      if (typeof window !== "undefined") {
        if (window.location.search) {
            console.log(window.location.search)
          const urlParams = new URLSearchParams(window.location.search);
          const lat = urlParams.get("latitude");
          const lon = urlParams.get("longitude");
          if (lat && lon) {
            setLatitude(+lat);
            setLongitude(+lon);
          }
        }
      }
  }, [])

  return (
    <>
      <div className="flex h-screen">
        {/* Left Side */}
        <div className="flex-1 bg-gray-800 p-8 flex justify-center w-full relative">
          <form className="w-full flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4 text-white">
              Paste the Location codes
            </h2>
            <div className="mb-4">
              <label
                className="block text-sm font-bold text-gray-200"
                htmlFor="input1"
              >
                latitude
              </label>
              <input
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${
                  jsonData ? "bg-gray-100" : ""
                }`}
                type="text"
                id="input1"
                name="input1"
                placeholder="Enter value for Input 1"
                value={latitude}
                readOnly={jsonData ? true : false}
                onChange={(e) => {
                  setLatitude(+e.target.value);
                }}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-bold text-gray-200"
                htmlFor="input2"
              >
                longitude
              </label>
              <input
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${
                  jsonData ? "bg-gray-100" : ""
                }`}
                type="text"
                id="input2"
                name="input2"
                placeholder="Enter value for Input 2"
                value={longitude}
                readOnly={jsonData ? true : false}
                onChange={(e) => {
                  setLongitude(+e.target.value);
                }}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-sm font-bold text-gray-200"
                htmlFor="rangeInput"
              >
                Range Input: {zoom}
              </label>
              <input
                className="w-full"
                type="range"
                id="rangeInput"
                name="rangeInput"
                min="7"
                max="15"
                step="1"
                value={zoom}
                onChange={(e) => {
                  setZoom(+e.target.value);
                }}
              />
              <div className="flex justify-between">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded-md"
                  type="button"
                  onClick={() => {
                    setZoom(zoom > 7 ? zoom - 1 : zoom);
                  }}
                >
                  -
                </button>
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded-md"
                  type="button"
                  onClick={() => {
                    setZoom(zoom < 15 ? zoom + 1 : zoom);
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-bold text-gray-200"
                htmlFor="rangeInput"
              >
                Paste Copied Json here
              </label>
              <textarea
                placeholder={`{latitude: ${latitude},longitude: ${longitude}}`}
                value={jsonData}
                onChange={(e) => {
                  jsonUpdated(e.target.value);
                }}
                style={{ resize: "none", height: "100px" }}
                className="p-2 w-full rounded-md"
              >
                {jsonData}
              </textarea>
            </div>
          </form>
          <button
            onClick={() => {
              router.push("/");
            }}
            className="bg-gray-200 text-dark px-3 py-2 rounded-md"
            style={{ position: "absolute", left: "20px", bottom: "20px" }}
          >
            Back to Location Page
          </button>
          <a
            href="https://www.linkedin.com/in/dheerajarora1997/"
            className="bg-blue-500 text-white px-3 py-2 rounded-md"
            target="_blank"
            type="button"
            style={{ position: "absolute", right: "40px", bottom: "20px" }}
          >
            Dheeraj Arora
          </a>
        </div>

        {/* Right Side */}
        <div className="flex-1 bg-gray-300 p-0">
          {latitude && longitude && (
            <MainMap latitude={latitude} longitude={longitude} zoom={zoom} />
          )}
        </div>
      </div>
    </>
  );
};

export default FindMe;
