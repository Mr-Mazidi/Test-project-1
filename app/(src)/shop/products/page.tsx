"use client"

import { Axios } from "@/app/Api/Axios"
import Loading from "@/app/loading"
import { useQuery } from "@tanstack/react-query"
import { ListProducts } from "./list-products"
import { useContext } from "react"
import { MyContext, MyContextType } from "../../layout"
import MessageStatuse from "@/app/components/MessageStatus"
import ErrorComponent from "@/app/components/Error"

type DataType = {
    category: string,
    description: string,
    id: number,
    image: string,
    price: number,
    title: string
}

export default function Page() {

    const { isPending, isError, data } = useQuery({
        queryKey: ["Get Products"],
        queryFn: async () => {

            const data = await Axios({
                url: "https://fakestoreapi.com/products",
                method: "get",
            })
            return data
        }
    })

    const context = useContext<MyContextType | null>(MyContext)

    if (!context) throw new Error("context is null")

    const { showSuccessful, setShowSuccessful } = context

    if (isPending) {
        return <Loading />
    }
    if (isError) {
        return <ErrorComponent />
    }
    return (
        <div className={"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full gap-2 justify-center items-center pt-40 h-full "}>
            {
                data.map(function (data: DataType) {
                    return (


                        <ListProducts
                            key={data.id}
                            id={data.id}
                            category={data.category}
                            image={data.image}
                            price={data.price}
                            title={data.title}

                        />

                    )
                })
            }

            {showSuccessful && <MessageStatuse Status="successful" isShow={showSuccessful} setIsShow={setShowSuccessful} />}

        </div>
    )
}

