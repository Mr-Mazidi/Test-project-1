"use client"

import { Axios } from "@/app/Api/Axios"
import Error from "@/app/components/Error"
import Loading from "@/app/loading"
import { useMutation, useQuery } from "@tanstack/react-query"
import { DeleteTodo } from "./Delete"
import MessageStatuse from "@/app/components/MessageStatus"
import { useState } from "react"
import CreateList from "./CreateList"
import AddTodo from "./add-todo"
import Button from "@/app/components/button"

type dataTodoList = {
    completed: boolean,
    id: number,
    todo: string
}


export default function Page() {

    const [showAddTodo, setShowAddTodo] = useState<boolean>(false)

    const { data, isPending, isError } = useQuery({
        queryKey: ["Todo List"],
        queryFn: async () => {
            return await Axios({
                url: "https://dummyjson.com/todos",
                method: "get"
            })
        }
    })

    const { mutate, isPending: IsPending } = useMutation({
        mutationFn: async (id: number) => await DeleteTodo({ id }),
        onSuccess: () => {
            setIsShowSuccess(true)
        },
        onError: () => {
            setIsShowError(true)
        }
    })

    const [isShowMessage, setIsShowMessage] = useState<boolean>(false)
    const [isShowError, setIsShowError] = useState<boolean>(false)
    const [isShowSuccess, setIsShowSuccess] = useState<boolean>(false)


    if (isPending || IsPending) return <Loading />
    if (isError) return <Error />
    if (!data) return
    return (
        <div className="w-full flex flex-col justify-center items-center py-32">
            {showAddTodo && <AddTodo setIsShowMessage={setIsShowMessage} setShowAddTodo={setShowAddTodo} />}
            <div className="w-5/6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

                {data.todos.map(function (todo: dataTodoList) {

                    return <CreateList key={todo.id} completed={todo.completed} id={todo.id} todo={todo.todo} mutate={mutate} />

                })
                }

                {isShowSuccess && <MessageStatuse Status="successful" setIsShow={setIsShowSuccess} isShow={isShowSuccess} />}
                {isShowError && <MessageStatuse Status="error" setIsShow={setIsShowError} isShow={isShowError} />}
                {isShowMessage && <MessageStatuse Status="successful" isShow={isShowMessage} setIsShow={setIsShowMessage} />}

                <div className="fixed bottom-0 right-0 m-4">
                    <Button onClick={() => setShowAddTodo(true)}>Add Todo </Button>
                </div>
            </div>
        </div>
    )
}

