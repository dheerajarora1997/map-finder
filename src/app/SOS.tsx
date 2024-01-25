import { useRouter } from "next/navigation";
import { FC, useState, useEffect } from "react";

const SOS: FC = () => {
  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();
  const router = useRouter();

  if (typeof window !== 'undefined' && typeof navigator !== 'undefined' && typeof navigator.geolocation !== undefined) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      function (error) {
        console.error("Error getting location:", error.message);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }


  const clickToCopy = () => {
    const dataToCopy = {
        latitude: latitude,
        longitude: longitude
      };
    const jsonString = JSON.stringify(dataToCopy);
    if(jsonString) navigator.clipboard.writeText(jsonString);
    router.push(`/findme?latitude=${latitude}&longitude=${longitude}`);
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen w-screen bg-gray-800">
        <div className="bg-white rounded-lg p-8 flex items-center flex-col">
          <h2 className="text-3xl font-bold mb-4 text-gray-700">Click on button</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={clickToCopy}>
            Click to Copy
          </button>
        </div>
      </div>
    </>
  );
};

export default SOS;
