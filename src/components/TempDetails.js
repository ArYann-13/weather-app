import React from "react";
import { BiSolidDropletHalf } from "react-icons/bi";
import { FaThermometerEmpty, FaWind } from "react-icons/fa";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

function TempDetails({
  temp,
  main,
  windSpeed,
  feelsLike,
  humidity,
  tempMax,
  tempMin,
  sunrise,
  sunset,
  icon,
  showUnit,
}) {
  const verticalDetails = [
    {
      id: 1,
      Icon: FaThermometerEmpty,
      title: "Real Feel:",
      value: `${feelsLike}${showUnit}`,
    },
    {
      id: 2,
      Icon: BiSolidDropletHalf,
      title: "Humidity:",
      value: `${humidity} %`,
    },
    {
      id: 3,
      Icon: FaWind,
      title: "Wind Speed:",
      value: `${windSpeed} km/h`,
    },
  ];

  const horizontalDetails = [
    {
      id: 1,
      Icon: GiSunrise,
      title: "Sunrise",
      value: sunrise,
    },
    {
      id: 2,
      Icon: GiSunset,
      title: "Sunset",
      value: sunset,
    },
    {
      id: 3,
      Icon: MdKeyboardArrowUp,
      title: "Max Temp:",
      value: `${tempMax}${showUnit}`,
    },
    {
      id: 4,
      Icon: MdKeyboardArrowDown,
      title: "Min Temp:",
      value: `${tempMin}${showUnit}`,
    },
  ];

  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {/* Weather Condition */}
      <div className="flex items-center justify-center py-4 text-xl text-cyan-300">
        <p>{main}</p>
      </div>

      {/* Temperature & Main Details */}
      <div className="flex flex-col md:flex-row items-center justify-between py-4 space-y-4 md:space-y-0">
        <img src={iconUrl} alt="weather-icon" className="w-20 md:w-24" />
        <p className="text-4xl md:text-5xl font-semibold">{temp} {showUnit}</p>

        {/* Vertical Details */}
        <div className="flex flex-col space-y-3 items-center md:items-start">
          {verticalDetails.map(({ id, Icon, title, value }) => (
            <div key={id} className="flex items-center text-lg font-light">
              <Icon size={20} className="mr-1" />
              {title} <span className="font-medium ml-1">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Horizontal Details */}
      <div className="flex flex-wrap justify-center gap-6 text-sm py-4">
        {horizontalDetails.map(({ id, Icon, title, value }) => (
          <div key={id} className="flex items-center text-lg font-light">
            <Icon size={20} className="mr-1" />
            {title} <span className="font-medium ml-1">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TempDetails;
