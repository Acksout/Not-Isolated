import React, { useEffect, useState } from "react";

const GetCountry = () => {
  const [country, setCountry] = useState(null);
  const [error, setError] = useState(null);
  const [countryCount, setCountryCount] = useState(0);
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    const successHandler = async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await response.json();
        setCountry(data.address.country);
        setCountryCount(countryCount + 1);
      } catch (error) {
        setError("Failed to fetch country information");
      }
    };

    const errorHandler = (error) => {
      setError(`Geolocation error: ${error.message}`);
    };

    navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
  }, []);
  return (
    <div className="text-white">
      <div>
        {error ? (
          <p>{error}</p>
        ) : country ? (
          <p>Your country is: {country}</p>
        ) : (
          <p>Fetching your location...</p>
        )}
      </div>

      <div>
        Country Count {country} : {countryCount}
      </div>
    </div>
  );
};

export default GetCountry;
