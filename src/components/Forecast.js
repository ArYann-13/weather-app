import React from 'react';

const Forecast = ({ threeHrForecast, forecast,showUnit }) => {
    const data = threeHrForecast || [];
    const data2 = forecast || [];

    // Function to get icon URL based on weather condition
    const getIconUrl = (iconCode) => `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    const formatTime = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const formatDay = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleDateString('en-US', {
            weekday: 'short'
        });
    };

    return (
        <div className="mt-6">
            {/* 3-Hour Step Forecast */}
            <div className="mb-4">
                <p className="font-medium uppercase text-lg text-gray-800">3-Hour Step Forecast</p>
                <hr className="my-2 border-gray-300" />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {data.map((step, index) => (
                        <div key={index} className="flex flex-col items-center bg-white p-3 rounded-lg shadow-md">
                            <p className="text-sm text-gray-700">{formatTime(step.dt)}</p>
                            <img src={getIconUrl(step.weather[0].icon)} alt="weather-icon" className="w-12 my-1" />
                            <p className="text-sm text-gray-600">{step.weather[0].main}</p>
                            <p className="font-semibold text-lg">{Math.round(step.main.temp)}{showUnit}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 4-Day Forecast */}
            <div>
                <p className="font-medium uppercase text-lg text-gray-800">4-Day Forecast</p>
                <hr className="my-2 border-gray-300" />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {data2.map((step, index) => (
                        <div key={index} className="flex flex-col items-center bg-white p-3 rounded-lg shadow-md">
                            <p className="text-sm text-gray-700">{formatDay(step.dt)}</p>
                            <img src={getIconUrl(step.weather[0].icon)} alt="weather-icon" className="w-12 my-1" />
                            <p className="text-sm text-gray-600">{step.weather[0].main}</p>
                            <p className="font-semibold text-lg">{Math.round(step.main.temp)}{showUnit}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Forecast;
