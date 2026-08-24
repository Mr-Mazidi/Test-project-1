
import { Axios } from "@/app/Api/Axios"

export async function DeleteTodo({ id }: { id: number }) {

    await Axios({
        url: `https://dummyjson.com/todos/${id}`,
        method: "delete"
    })

}