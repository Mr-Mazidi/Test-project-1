"use client"

import { useRouter } from "next/navigation";
import Button from "./components/button";

export default function NotFound() {

    const router = useRouter()

    return (
        <div className="w-full flex flex-col justify-center items-center py-36">

            <div className="text-center text-red-600 font-bold text-2xl m-3">
                <p>We can not found this page</p>
                <p>So go to main page</p>
            </div>

            <Button onClick={() => router.push("/")}>Main Page</Button>
        </div>
    )
}