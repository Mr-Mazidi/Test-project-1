"use client"

import { Axios } from "@/app/Api/Axios"
import Button from "@/app/components/button"
import Input from "@/app/components/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const schema = z.object({
    textTodo: z.string().min(2, { error: "The text must be more than 2 characters" })
})

type FormData = z.infer<typeof schema>


export default function AddTodo({ setIsShowMessage, setShowAddTodo }: { setIsShowMessage: Dispatch<SetStateAction<boolean>>, setShowAddTodo: Dispatch<SetStateAction<boolean>> }) {


    const submit = async function (data: FormData) {

        await Axios({
            url: "https://dummyjson.com/todos/add",
            method: "post",
            body: {
                todo: data.textTodo,
                completed: false,
                userId: 10
            }
        })
    }

    const { mutate, isPending, isError } = useMutation({
        mutationFn: submit,
        onSuccess: () => {
            setIsShowMessage(true)
            setShowAddTodo(false)
        }
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    })

    return (

        <form className="w-full mb-10" onSubmit={handleSubmit((data: FormData) => mutate(data))}>

            <fieldset className="w-full flex flex-col justify-center items-center gap-2" disabled={isPending}>

                <Input size="sm" type="text" placeholder="Text Todo" {...register("textTodo")} />

                <Button type="submit">Add Todo</Button>
                {errors.textTodo && <p className="text-red-600">{errors.textTodo.message}</p>}


                {isError && <p className="text-red-600">Please try again</p>}
            </fieldset>

        </form>

    )
}



// fetch('https://dummyjson.com/todos/add', {
//   body: JSON.stringify({
//     todo: 'Use DummyJSON in the project',
//     completed: false,
//     userId: 5,