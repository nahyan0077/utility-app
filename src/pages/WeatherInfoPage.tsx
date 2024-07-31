import { Header } from "@/components/common/header";
import { WeatherInfo } from "@/components/features/WeatherInfo";
import React from "react";

export const WeatherInfoPage: React.FC = () => {
    return (
        <>
            <Header />
            <WeatherInfo />
        </>
    )
}