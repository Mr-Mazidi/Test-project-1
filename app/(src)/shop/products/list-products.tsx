"use cleint"

import clsx from "clsx"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { useInView } from "react-intersection-observer"

type DataType = {
    id: number,
    category: string,
    image: string,
    price: number,
    title: string,
}

export function ListProducts({
    id,
    category,
    image,
    price,
    title,
}: DataType) {
    const router = useRouter()


    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2
    })


    return (


        <div onClick={() => router.push(`/shop/products/${id}`)}>

            <div ref={ref} className={
                clsx("transition-all duration-1000 -translate-y-20 p-7 grid grid-cols-5 justify-center items-center w-11/12 border-b-2  border-blue-500 h-40 max-h-40",
                    {
                        "opacity-0": !inView,
                        "translate-x-5": inView
                    }
                )
            }>

                <div className="w-25 h-25 flex justify-end items-center p-4 col-span-2">
                    <Image src={image} alt="Picture products" width={65} height={65} />
                </div>

                <div className="flex flex-col col-span-3 ">

                    <p className="font-bold">{title.length > 18 ? title.slice(0, 18) + "..." : title}</p>

                    <p className="mt-4">{price}<span className="text-yellow-500">$</span></p>

                    <p className="text-gray-600">{category}</p>

                </div>
            </div>



        </div>
    )
}