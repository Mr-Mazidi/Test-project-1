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

        if (isShow) {

            setTimeout(() => {
                setIsShow(false)
            }, 5000)

        }

    }, [isShow, setIsShow])
    return (
        <div className="fixed w-full bottom-0 flex justify-center items-center">
            <div className={clsx("mb-2 p-2 w-40 md:w-48 h-10 md:h-14 flex justify-center items-center rounded-4xl", {
                "bg-red-600": Status === "error",
                "bg-green-600": Status === "successful",
            })}>

                <p className="ml-2.5 text-xs md:text-base text-center">{Status ? "The operation was successful" : "The operation encountered an error"}</p>

                <button className="border-[1.5px]  md:border-2 border-black rounded-full ml-1 
                active:scale-95  duration-1000
                "
                    onClick={() => setIsShow(false)}
                >
                    <X size={26} className="p-1" />
                </button>

            </div>
        </div>
    )
}