"use client"

import { Axios } from "@/app/Api/Axios";
import Error from "@/app/components/Error";
import MessageStatuse from "@/app/components/MessageStatus";
import Loading from "@/app/loading";
import { useQuery } from "@tanstack/react-query";
import { ArrowRightSquareIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

type DataType = {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string
}

export default function Page() {
    const [isShowMessageError, setIsShowMessageError] = useState<boolean>(false)

    const router = useRouter()
    const params = useParams()
    const id = params.id

    const { data, isPending, isError } = useQuery<DataType>({
        queryKey: ["description", id],
        queryFn: async () => {
            return await Axios({
                url: `https://fakestoreapi.com/products/${id}`,
                method: "get"
            })
        },
        enabled: !!id
    })





    if (isPending) {
        <Loading />
    }

    if (isError) {
        setIsShowMessageError(true)
    }

    if (!data) {
        return <Error />
    }

    return (
        <>


            <div className="w-full h-full flex justify-center items-cente py-24">
                <div className="
                  bg-gray-400
                    rounded-md
                    w-xs md:w-md xl:w-xl   
                    overflow-auto
                    flex flex-col justify-start items-center
                    min-h-[500px]
                    ">

                    <div className="flex items-center justify-end w-full p-2 bg-black text-white">
                        <button
                            onClick={() => router.back()}>
                            <ArrowRightSquareIcon size={28} />
                        </button>
                    </div>


                    <div className="w-full flex justify-center items-center p-5">

                        <Image src={data.image} alt="Picture products" width={85} height={85} />

                    </div>

                    <p className="font-bold max-w-52 text-center">{data.title}</p>

                    <div className="grid grid-cols-2 mt-2">

                        <p className="mr-7">{data.price} <span className="text-yellow-400">$</span></p>
                        <p>{data.category}</p>

                    </div>

                    <p className="text-sm w-5/6 text-center">{data.description}</p>
                </div>
            </div>

            {isShowMessageError && <MessageStatuse Status="error" isShow={isShowMessageError} setIsShow={setIsShowMessageError} />}
        </>
    )
}