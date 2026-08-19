"use client"


import { Axios } from "@/app/Api/Axios"
import Button from "@/app/components/button"
import Error from "@/app/components/Error"
import Loading from "@/app/loading"
import { useQuery } from "@tanstack/react-query"
import clsx from "clsx"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useInView } from "react-intersection-observer"


type PropsType =
    {
        productId: number,
        quantity: number
    }[]

type DataType = {
    category: string
    description: string
    id: number
    image: string
    price: number
    quantity: number
    title: string
}


export default function ListProducts({ Data }: { Data: PropsType }) {

    const router = useRouter()


    const { inView, ref } = useInView({
        threshold: 0.2,
        triggerOnce: true
    })

    const { data, isPending, isError } = useQuery<DataType[]>({
        queryKey: ["productsCard"],
        queryFn: async () => {
            return Promise.all(
                Data.map(async function (value) {

                    const res = await Axios({
                        url: `https://fakestoreapi.com/products/${value.productId}`,
                        method: "get"
                    })

                    return { ...res, quantity: value.quantity }
                })

            )
        }
    })

    const [dataObj, setDataObj] = useState<Record<number, number>>({ 1: 4, 2: 1, 3: 6 })

    const minus = function (id: number) {
        if (dataObj[id] === 0) return
        setDataObj((prev) => ({
            ...prev,
            [id]: prev[id] - 1
        }))
    }

    const plass = function (id: number) {

        setDataObj((prev) => ({
            ...prev,
            [id]: prev[id] + 1
        }))
    }


    if (isPending) return <Loading />
    if (!data || isError) return <Error />

    const sum = data.reduce(function (sum, value) {
        return sum + (value.price * dataObj[value.id])
    }, 0)

    return (

        <div className="flex flex-col justify-center items-center">

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full gap-2 justify-center items-center pt-40 h-full ">

                {
                    data.map(function (product: DataType) {
                        return (
                            <div key={product.id}
                                className={clsx({
                                    "hidden": dataObj[product.id] === 0,
                                })}
                            >
                                {<div
                                    ref={ref}
                                    className={
                                        clsx("transition-all duration-1000 -translate-y-20 p-7 w-11/12 border-b-2  border-blue-500 h-52 max-h-52",
                                            {
                                                "opacity-0": !inView,
                                                "translate-x-5": inView,
                                            }
                                        )
                                    }
                                >

                                    <div
                                        className="grid grid-cols-5 justify-center items-center"
                                        onClick={() => router.push(`/shop/products/${product.id}`)}>

                                        <div className="w-25 h-25 flex justify-end items-center p-4 col-span-2">
                                            <Image src={product.image} alt="Picture products" width={65} height={65} />
                                        </div>

                                        <div className="flex flex-col col-span-3 ">

                                            <p className="font-bold">{product.title.length > 18 ? product.title.slice(0, 18) + "..." : product.title}</p>

                                            <p className="mt-4">{(product.price * dataObj[product.id]).toFixed(2)}<span className="text-yellow-500">$</span></p>
                                            <p className="text-sm text-gray-700">{product.price}<span className="text-yellow-500 ">$</span></p>

                                            <p className="text-gray-600">{product.category}</p>

                                        </div>



                                    </div>

                                    <div className="w-full col-span-5 flex justify-center items-center">

                                        <Button size="sm" onClick={() => minus(product.id)}>-</Button>

                                        <p className="border-b-2 border-black  m-1 text-center p-1">{dataObj[product.id]}</p>

                                        <Button size="sm" onClick={() => plass(product.id)}>+</Button>

                                    </div>

                                </div>}
                            </div>
                        )
                    })
                }

            </div>


            <div className="flex justify-center items-center gap-1.5 mb-7 ">
                <p className="flex">{(sum).toFixed(2)} <span className="text-yellow-500">$</span></p>

                <Button>Buy</Button>

            </div>

        </div>
    )
}