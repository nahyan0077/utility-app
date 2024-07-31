import { Header } from "@/components/common/header"
import PasswordGenerator from "@/components/features/PasswordGenerator"
import React from "react"

export const PasswordGeneratePage: React.FC = () => {
    return (
        <>
            <Header />
            <PasswordGenerator/>
        </>
    )
}