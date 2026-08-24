"use client"

import clsx from "clsx"
import { CheckIcon, X } from "lucide-react"
import { useState } from "react"


export default function CreateList({
    completed,
    id,
    todo,
    mutate }: {
        completed: boolean,
        id: number,
        todo: string,
        mutate: (id: number) => void

    }) {

    const [isCompleted, setCompleted] = useState<boolean>(completed)


    return (
        <div className={clsx("bg-blue-50 rounded-xl transition-all duration-500", {
            "opacity-50": isCompleted
        })}>
            <div className={"p-4"}>

                <p>
                    {
                        todo
                    }
                </p>

                <div className="relative bottom-0">
                    <button className="p-1 rounded-md bg-red-600 relative bottom-0 left-0" onClick={() => mutate(id)}>Delete</button>

                    <div className=" flex justify-center items-center gap-1 relative bottom-0">
                        <p>Status:</p>
                        <button onClick={() => setCompleted((prev) => !prev)} className={clsx("cursor-pointer border-b-2 transition-all duration-500", {
                            "border-green-600": isCompleted,
                            "border-red-600": !isCompleted,
                        })}>{isCompleted ? <CheckIcon /> : <X />}</button>
                    </div>

                </div>

            </div>
        </div>
    )
}