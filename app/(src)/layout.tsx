"use client"

import { createContext, Dispatch, SetStateAction, useState } from "react"

export type MyContextType = {
    showSuccessful: boolean,
    setShowSuccessful: Dispatch<SetStateAction<boolean>>,
}

export const MyContext = createContext<MyContextType | null>(null)

export default function Layout({
    children
}: {
    children: React.ReactNode
}) {
    const [showSuccessful, setShowSuccessful] = useState<boolean>(false)


    return (
        <section>
            <MyContext.Provider value={{ showSuccessful, setShowSuccessful }}>
                <main>
                    {children}
                </main>
            </MyContext.Provider>
        </section >

    )
}