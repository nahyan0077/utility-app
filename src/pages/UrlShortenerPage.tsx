import { Header } from "@/components/common/header";
import { UrlShortner } from "@/components/features/UrlShortener";
import React from "react";

export const UrlShortnerPage : React.FC = () => {
    return (
        <>
            <Header />
            <UrlShortner />
        </>
    )
}