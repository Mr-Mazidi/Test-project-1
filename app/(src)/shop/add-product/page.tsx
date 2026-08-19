"use client"

import { Axios } from "@/app/Api/Axios"
import Button from "@/app/components/button"
import Input from "@/app/components/input"
import MessageStatuse from "@/app/components/MessageStatus"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { MyContext } from "../../layout"
import { MyContextType } from "../../layout"

const schema = z.object({
    title: z.string().min(3, { error: "The title must be more then 3 characters" }),

    price: z.string()
        .refine((value) => {
            return Number(value)
        }, { error: "The price is not correct." }).refine((value) => {
            const price = Number(value)
            return price > 0.1
        }, { error: "The price must be more 0.1$ " }),


    description: z.string().min(20, { error: "The description must be more then 20 characters" }),

    category: z.string(),

    image: z.custom<FileList>().refine((value) => {
        return value?.length > 0
    }, ({ error: "Please select a photo" })),

})

type DataForm = z.infer<typeof schema>

export default function Page() {
    function fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {

            const render = new FileReader()

            render.onload = () => {
                resolve(render.result as string)
            }

            render.onerror = () => {
                reject(new Error("Failed to read file"))
            }

            render.readAsDataURL(file)
        }
        )
    }

    async function submit(data: DataForm) {

        return await Axios({
            url: "https://fakestoreapi.com/products",
            method: "post",
            body: {
                title: data.title,
                price: data.price,
                description: data.description,
                category: data?.category,
                image: await fileToBase64(data.image[0])
            }
        })
    }

    const [isShowError, setIsShowError] = useState<boolean>(false)
    const router = useRouter()

    const { isError, mutate, isPending } = useMutation({
        mutationFn: submit,
        onSuccess: (data) => {
            setShowSuccessful(true)
            router.replace("/shop/products")
        }
    })

    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: zodResolver(schema)
    })


    if (isError) {
        setIsShowError(true)
    }

    const context = useContext<MyContextType | null>(MyContext)



    if (!context) {
        throw new Error("context is null")
    }

    const { setShowSuccessful } = context


    return (

        <form className="pt-24" onSubmit={handleSubmit((data) => mutate(data))}>
            <fieldset className="flex flex-col justify-center items-center " disabled={isPending}>


                <Input size="sm" className="mt-2" type="text" placeholder="Title" {...register("title")} />
                {errors.title && <p className="text-red-600 px-3 text-center text-sm mb-1">{errors.title.message}</p>}

                <Input size="sm" className="mt-2" type="text" placeholder="Price" {...register("price")} />
                {errors.price && <p className="text-red-600 px-3 text-center text-sm mb-1">{errors.price.message}</p>}

                <Input size="sm" className="mt-2" type="text" placeholder="Description" {...register("description")} />
                {errors.description && <p className="text-red-600 px-3 text-center text-sm mb-1">{errors.description.message}</p>}

                <Input size="sm" className="mt-2" type="text" placeholder="Category" {...register("category")} />
                {errors.category && <p className="text-red-600 px-3 text-center text-sm mb-1">{errors.category.message}</p>}

                <Input size="sm" className="mt-2 file:bg-blue-100 file:rounded-md file:p-1 file:m-1" type="file" accept="image/*" placeholder="Image" {...register("image")} />
                {errors.image && <p className="text-red-600 px-3 text-center text-sm mb-1">{errors.image.message}</p>}

                <div className="flex justify-center">
                    <Button type="button" className="w-1/12 min-w-24 my-2 mx-1" onClick={() => router.replace("/shop/products")} >Cancel</Button>
                    <Button className="w-1/12 min-w-24 my-2 mx-1" type="submit">Send</Button>
                </div>


                {isShowError && <MessageStatuse setIsShow={setIsShowError} isShow={isShowError} Status="error" />}
            </fieldset>
        </form>
    )
}