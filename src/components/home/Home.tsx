import React from "react";
import { Button } from "../ui/button";
import { RiLockPasswordFill } from "react-icons/ri";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { ImEmbed2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { FaTools } from "react-icons/fa";

export const Home: React.FC = () => {
    const navigate = useNavigate()

    return (
        <div className="  min-h-screen">
            <div className="container mx-auto px-4 py-16">
                <header className="flex justify-center items-center mb-16">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                        <div className="flex items-center">
                            <span className="mr-2">Quick</span>
                            <FaTools className="w-12 h-12 mx-2" />
                            <span className="ml-2">Tools</span>
                        </div>
                    </h1>
                </header>

                <main>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[
                            {
                                icon: <RiLockPasswordFill className="w-20 h-20 mb-6" />,
                                title: "Random Password Generator",
                                description: "Create strong, unique passwords instantly. Customize length and character types to enhance your online security effortlessly.",
                                navigateTo: 'generate-password'
                            },
                            {
                                icon: <TiWeatherPartlySunny className="w-20 h-20 mb-6" />,
                                title: "Weather Info",
                                description: "Access real-time weather data for any location worldwide. Get temperature, humidity, wind speed, and more with just a city name.",
                                navigateTo: 'weather-info'
                            },
                            {
                                icon: <ImEmbed2 className="w-20 h-20 mb-6" />,
                                title: "URL Shortener",
                                description: "Transform long, complex URLs into concise, shareable links. Perfect for social media, emails, and anywhere character count matters.",
                                navigateTo: 'url-shortener'
                            },
                        ].map((card, index) => (
                            <div
                                key={index}
                                className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-8 flex flex-col items-center transition-all duration-300 hover:shadow-xl ">
                                {card.icon}
                                <h2 className="text-2xl font-bold mb-4 text-center">{card.title}</h2>
                                <p className="text-gray-700 dark:text-gray-500 text-base mb-6 text-center text-sm">
                                    {card.description}
                                </p>
                                <Button 
                                    onClick={() => navigate(`/${card.navigateTo}`)}
                                    className="bg-gray-800 hover:bg-gray-700 text-white dark:bg-gray-200 dark:hover:bg-gray-300 dark:text-gray-900 font-semibold py-2 px-6 rounded-xl transition-colors duration-300"
                                >
                                    Explore Now
                                </Button>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Home;