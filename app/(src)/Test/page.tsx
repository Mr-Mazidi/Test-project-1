"use client"

import Button from "@/app/components/button"
import { useRouter } from "next/navigation"

export default function Error() {
    const router = useRouter()

    return (
        <div className="w-full py-36 flex flex-col justify-center items-center  ">
            <div className="text-center text-red-600 font-bold text-2xl ">
                <p>A problem occurred</p>
                <p>Try again</p>

            </div>
            <Button className="mt-3" onClick={() => { router.refresh() }}>try again</Button>
        </div>
    )
}