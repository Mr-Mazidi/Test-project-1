"use client"

import { useRouter } from "next/navigation";
import Button from "./components/button";


export default function Page() {
    const router = useRouter()

    return (
        <div className="w-full h-screen bg-blue-50">

            <div className="pt-48 w-full flex flex-col justify-center items-center">

                <h1 className="text-5xl font-bold">Welcome</h1>
                <h2 className="text-2xl font-bold">To Mobin Shop</h2>
                <Button className="text-xl mt-3" onClick={() => router.push("/shop/products")}>Let`s Go</Button>

                <div className="w-5/6 rounded-md h-3 mt-7 changeBackGround" ></div>
            </div>
        </div>
    )
}