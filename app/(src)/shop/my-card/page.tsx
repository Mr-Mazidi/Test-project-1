"use client"

import { Axios } from "@/app/Api/Axios"
import Error from "@/app/components/Error"
import Loading from "@/app/loading"
import { useQuery } from "@tanstack/react-query"
import ListProducts from "./list-products-card"


export default function Page() {

    const { data, isPending, isError } = useQuery({
        queryKey: ["MyCard"],
        queryFn: async () => {

            const data = await Axios({
                url: "https://fakestoreapi.com/carts/1",
                method: "get"
            })

            return data.products
        }
    })

    if (isPending) return <Loading />
    if (isError) return <Error />

    return (
        <div>

            <ListProducts Data={data} />

        </div>
    )
}