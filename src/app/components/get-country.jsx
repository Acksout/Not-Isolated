import React, { useEffect, useState } from "react";

const GetCountry = () => {
  const [country, setCountry] = useState(null);
  const [error, setError] = useState(null);
  const [countryCount, setCountryCount] = useState(0);
  const [dbCountryCount, setDbCountryCount] = useState([]);
  const [isCountryFetched, setIsCountryFetched] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser");
        setLoading(false);
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
          setCountryCount(1);
          setLoading(false);
        } catch (error) {
          setError("Failed to fetch country information");
          setLoading(false);
        }
      };

      const errorHandler = (error) => {
        setError(`Geolocation error: ${error.message}`);
        setLoading(false);
      };

      navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    let isMounted = true;

    const sendData = async () => {
      if (country && countryCount && !isCountryFetched) {
        try {
          const postData = {
            country: country,
            points: parseInt(countryCount, 10),
          };
          console.log("Sent Post Data:", postData);
          const response = await fetch("/api/location-data", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
          });

          const data = await response.json();
          console.log("Success", data);
          if (isMounted) {
            setIsCountryFetched(true);
          }
        } catch (error) {
          console.log("Error", error);
        }
      }
    };
    sendData();

    return () => {
      isMounted = false;
    };
  }, [country, countryCount, isCountryFetched]);

  useEffect(() => {
    let isMounted = true;

    const fetchCountry = async () => {
      if (isCountryFetched) {
        try {
          const response = await fetch("/api/location-data", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          if (Array.isArray(data)) {
            if (isMounted) {
              setDbCountryCount(data);
            }
          } else {
            console.error("Invalid response from API");
          }
        } catch (error) {
          console.log(error);
          if (isMounted) {
            setLoading(false);
          }
        }
      }
    };
    fetchCountry();

    return () => {
      isMounted = false;
    };
  }, [isCountryFetched]);

  return (
    <div className="text-white">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div>
            {error ? (
              <p>{error}</p>
            ) : country ? (
              <p>Your country is: {country}</p>
            ) : (
              <p>Fetching your location...</p>
            )}
          </div>

          {dbCountryCount.length > 0 ? (
            dbCountryCount.map((item, index) => {
              return (
                <div key={index}>
                  <p>{item.country}</p>
                  <p>{item.points}</p>
                </div>
              );
            })
          ) : (
            <p>No country data available.</p>
          )}
        </>
      )}
    </div>
  );
};
export default GetCountry;
