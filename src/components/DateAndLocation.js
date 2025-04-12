import React from "react";

const TimeandDate = ({ name, country, localTime }) => {
    const dateBuilder = (d) => {
        let months = [
            "January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"
        ];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day}, ${date} ${month} ${year}`;
    };

    return (
        <div className="w-full max-w-2xl mx-auto px-4">
            {/* Date & Local Time */}
            <div className="flex items-center justify-center my-4">
                <p className="text-lg md:text-xl font-light text-center">
                    {dateBuilder(new Date())} | Local time: {localTime}
                </p>
            </div>

            {/* City & Country */}
            <div className="flex items-center justify-center my-3">
                <p className="text-2xl md:text-3xl font-semibold text-center">
                    {name}, {country}
                </p>
            </div>
        </div>
    );
};

export default TimeandDate;
