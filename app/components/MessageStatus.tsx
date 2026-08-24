"use client"

import clsx from "clsx";
import { X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect } from "react";

type StatusType = "successful" | "error"

export default function MessageStatuse({ Status, setIsShow, isShow }: {
    isShow: boolean,
    Status: StatusType,
    setIsShow: Dispatch<SetStateAction<boolean>>
}) {

    useEffect(() => {
        if (!isShow) return

        const timer = setTimeout(() => {
            setIsShow(false)
        }, 5000)

        return () => clearTimeout(timer)

    }, [isShow, setIsShow])
    return (
        <div className="fixed inset-0 w-full h-screen  flex justify-center items-center">

            <div className={clsx(`w-72 md:w-80
            h-20 md:h-28
            flex flex-col justify-between 
            rounded-md
            overflow-hidden
            `, {
                "bg-red-600": Status === "error",
                "bg-green-600": Status === "successful",
            })}>

                <div className="flex text-justify items-center p-3 w-full h-full">

                    <p className="ml-2.5 text-xs md:text-base text-center">{Status === "successful" ?
                        "The operation was successful" : "The operation encountered an error"}</p>


                    <button className="border-[1.5px]  md:border-2 border-black rounded-full ml-1.5 
                            active:scale-95  duration-100
                            flex justify-center items-center
                            "

                        onClick={() => setIsShow(false)}
                    >

                        <X size={26} className="p-1" />

                    </button>

                </div>


                <div className="w-full h-2
                 bg-black/10
                relative bottom-0
                 ">
                    <div className={clsx("w-full h-2 changeWidth", {
                        "bg-red-800": Status === "error",
                        "bg-green-800": Status === "successful",
                    })}></div>
                </div>


            </div>
        </div>
    )
}