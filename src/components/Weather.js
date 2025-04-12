import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import DateAndLocation from "./DateAndLocation";
import TempDetails from "./TempDetails";
import Navbar from "./Navbar";
import Forecast from "./Forecast";

const api = {
    key: "727f062fc8d992aaea8862448f6f84a3",
    base: "https://api.openweathermap.org/data/2.5/",
};

const Weather = () => {
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [weather, setWeather] = useState({});
    const [unit, setUnit] = useState("metric");
    const [selectedCity, setSelectedCity] = useState("Delhi");
    const [showUnit, setShowUnit] = useState("°C");
    const [cityDetails, setCityDetails] = useState({
        name: '',
        country: '',
        sunrise: null,
        sunset: null,
        timezone: null
    });


    //forecastingggg data 

    const [forecast, setForecast] = useState([]);
    const [threeHrForecast, setThreeHrForecast] = useState([]);




    const fetchWeather = async (city) => {
        try {
            setLoading(true);
            if (!city.trim()) return;
            const response = await fetch(
                `${api.base}forecast?q=${city}&appid=${api.key}&units=${unit}`
            );
            const weatherData = await response.json();
            setWeather(weatherData.list[0]);
            setCityDetails(weatherData.city);
            setQuery("");
            // console.log(weatherData);


            // daily forecast


            const dailyForecast = weatherData.list
                .filter((_, index) => index % 8 === 0).slice(1, 5);

                
            // console.log(dailyForecast);

            setForecast(dailyForecast);

            
            //3 hr forecast
            const hourlyForecast = weatherData.list.slice(1, 5);
            

            setThreeHrForecast(hourlyForecast);


        } catch (error) {
            console.error("Error fetching data:", error);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather(selectedCity);
    }, [unit, selectedCity]);

    const search = (evt) => {
        if (evt.key === "Enter" && query.trim() !== "") {
            fetchWeather(query);
        }
    };

    const formatTime = (unixTimestamp, timezoneOffset) => {
        return new Date((unixTimestamp + timezoneOffset) * 1000).toLocaleTimeString(
            "en-US",
            {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
                timeZone: "UTC",
            }
        );
    };

    

    if (loading) return <div>Loading weather data...</div>;

    return (
        <div className="w-full min-h-[500px] max-w-4xl mx-auto p-4">
            <main>
                <Navbar setSelectedCity={setSelectedCity} />

                {/* Search Bar & Unit Toggle */}
                <div className="flex flex-col md:flex-row justify-center items-center my-6 gap-4">
                    {/* Search Input & Button */}
                    <div className="flex items-center w-full md:w-3/4 bg-white p-2 rounded-lg shadow-lg">
                        <input
                            type="text"
                            className="text-gray-600 text-lg p-2 w-full border-none outline-none placeholder:text-gray-400 placeholder:capitalize capitalize"
                            placeholder="Search by city..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyPress={search}
                        />
                        <BiSearch
                            size={30}
                            className="cursor-pointer text-blue-500 hover:scale-110 transition"
                            onClick={() => fetchWeather(query)}
                        />
                    </div>

                    {/* °C | °F Toggle */}
                    <div className="flex items-center justify-center space-x-4">
                        <button
                            className={`text-xl font-semibold ${unit === "metric" ? "text-blue-700" : "text-gray-800"
                                } transition hover:scale-110`}
                            onClick={() => {
                                setUnit("metric");
                                setShowUnit("°C");
                            }}
                        >
                            °C
                        </button>
                        <span className="text-xl font-semibold">|</span>
                        <button
                            className={`text-xl font-semibold ${unit === "imperial" ? "text-blue-700" : "text-gray-800"
                                } transition hover:scale-110`}
                            onClick={() => {
                                setUnit("imperial");
                                setShowUnit("°F");
                            }}
                        >
                            °F
                        </button>
                    </div>
                </div>

                {/* Weather Info */}
                {!loading && (
                    <div className="text-center">

                        <DateAndLocation
                            name={cityDetails.name}
                            country={cityDetails.country}
                            localTime={formatTime(weather.dt,cityDetails.timezone)}
                        />

                        <TempDetails
                            showUnit={showUnit}
                            temp={Math.round(weather.main.temp)}
                            main={weather.weather[0].main}
                            windSpeed={weather.wind.speed}
                            feelsLike={Math.round(weather.main.feels_like)}
                            humidity={weather.main.humidity}
                            tempMax={Math.round(weather.main.temp_max)}
                            tempMin={Math.round(weather.main.temp_min)}
                            sunrise={formatTime(cityDetails.sunrise, cityDetails.timezone)}
                            sunset={formatTime(cityDetails.sunset, cityDetails.timezone)}
                            icon={weather.weather[0].icon}
                        />

                        <Forecast

                            threeHrForecast={threeHrForecast}
                            forecast={forecast}
                            showUnit={showUnit}

                        />
                    </div>
                )}
            </main>
        </div>
    );
};

export default Weather;
