import React from 'react';

const Navbar = ({ setSelectedCity }) => {
    const cities = [
        {
            id: 1,
            name: "Mumbai"
        },
        {
            id: 2,
            name: "Lucknow"
        },
        {
            id: 3,
            name: "New York"
        },
        {
            id: 4,
            name: "Tokyo"
        },
        {
            id: 5,
            name: "London"
        },
    ];

    return (
        <div className="w-full max-w-2xl mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3 md:gap-5 py-4 shadow-md bg-white/10 rounded-lg">
                {cities.map((city) => (
                    <button
                        key={city.id}
                        className="text-base md:text-lg font-medium bg-gray-700/10 px-4 py-2 rounded-lg
                               transition ease-in hover:bg-gray-700/30 focus:ring-2 focus:ring-gray-500 shadow-lg"
                        onClick={() => setSelectedCity(city.name)}
                    >
                        {city.name}
                    </button>
                ))}
            </div>
        </div>

    )
}

export default Navbar
