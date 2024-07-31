import React from "react";
import { Button } from "../ui/button";
import { ModeToggle } from "../ui/mode-toggler";
import { RiLockPasswordFill } from "react-icons/ri";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { ImEmbed2 } from "react-icons/im";

export const Home: React.FC = () => {
  return (
    <>
      <div className="relative">
        <div className="absolute top-4 right-4">
          <ModeToggle />
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-center items-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            The Joke Tax Chronicles
          </h1>
        </header>

        <main>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <RiLockPasswordFill className="w-16 h-16 mb-4" />,
                title: "Random Password Generator",
                description: "Generate strong, secure passwords with ease.",
              },
              {
                icon: <TiWeatherPartlySunny className="w-16 h-16 mb-4" />,
                title: "Weather Info",
                description: "Get real-time weather updates for any location.",
              },
              {
                icon: <ImEmbed2 className="w-16 h-16 mb-4" />,
                title: "URL Reducer",
                description: "Shorten long URLs into manageable links.",
              },
            ].map((card, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-6 flex flex-col items-center">
                {card.icon}
                <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 text-center">
                  {card.description}
                </p>
                <Button>Explore Now</Button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
