"use client"

import { Axios } from "@/app/Api/Axios"
import { SetToken } from "@/app/Api/Token"
import Button from "@/app/components/button"
import Input from "@/app/components/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"


// email: "eve.holt@reqres.in",
//     password: "cityslicka",
export default function Page() {
    const router = useRouter()

    const schema = z.object({
        email: z.email({ error: "Email is not valid" }),
        password: z.string().min(6, { error: "Password must be more than 6 characters" })
    })

    type FormData = z.infer<typeof schema>

    const submit = async function (data: FormData) {
        return await Axios({
            url: "https://reqres.in/api/login",
            method: "post",
            body: data,
            headers: {
                "x-api-key": "free_user_3GrfQWLgkhlag3TCm14mtSwrHvG",
            }
        })
    }

    const { mutate, isPending, isError } = useMutation({
        mutationKey: ["Login"],
        mutationFn: submit,
        onSuccess: async (data) => {
            await SetToken(data.token)
            router.replace("/shop/products")
        }
    })

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })


    return (
        <div className="pt-20">

            <form onSubmit={handleSubmit((data) => mutate(data))}>
                <fieldset className="flex flex-col justify-center items-center" disabled={isPending}>

                    <Input size="sm" type="email" placeholder="Enter Your Email" {...register("email")} />
                    {errors.email && <p className="text-red-600">{errors.email.message}</p>}

                    <Input size="sm" type="password" placeholder="Enter Your Password" {...register("password")} />
                    {errors.password && <p className="text-red-600">{errors.password.message}</p>}

                    <Button className=" mt-2 " type="submit">Login</Button>

                    <p>Do not you have an account? <Link className="text-blue-500" href={"/auth/register"}>Click here</Link></p>
                </fieldset>
            </form>


            {isError && <p className="text-red-600 text-center mt-3 text-xl">Please check your Internet</p>}

            <p>email:eve.holt@reqres.in</p>
            <p>password : cityslicka</p>
        </div >
    )
}