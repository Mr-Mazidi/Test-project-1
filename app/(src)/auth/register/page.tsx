"use client"
//ذخیره توکن
import { Axios } from "@/app/Api/Axios"
import { DeleteCodeEmail, GetCodeEmail, SetToken } from "@/app/Api/Token"
import Button from "@/app/components/button"
import Input from "@/app/components/input"
import Timer from "@/app/components/Timer"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

export default function Page() {
    const router = useRouter()

    const [isShowText, setIsShowText] = useState<boolean>(false)
    const [isShowInput, setIsShowInput] = useState<boolean>(false)


    async function submit(data: FormData) {
        setIsShowText(false)
        const Data = await Axios({
            url: "https://reqres.in/api/register",
            method: "post",
            body: {
                email: "eve.holt@reqres.in",
                password: data.password,
            },
            headers: {
                "x-api-key": "free_user_3GrfQWLgkhlag3TCm14mtSwrHvG",
            }
        })
        return Data
    }


    const schema = z.object({
        username: z.string().min(3, { error: "User name must be more than 3 characters" }),
        password: z.string().min(6, { error: "PassWord must be more then 6 characters" }),
        passwordrepeat: z.string(),
        email: z.email({ error: "Email is not valid" }),

        code: z.string().length(6, { error: "Code must be 6 characters" })
            .refine(async (value) => {

                const Code: string | undefined = await GetCodeEmail()
                return value === Code
            }, { error: "The code is not correct." }),





    }).superRefine((data, ctx) => {

        if (data.password !== data.passwordrepeat) {

            ctx.addIssue({
                code: "custom",
                path: ["passwordrepeat"],
                message: "Passwords are not equal"
            })

        }
    })



    type FormData = z.infer<typeof schema>;



    const { register, handleSubmit, formState: { errors }, getValues, trigger } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const { isPending, isError, mutate } = useMutation({

        mutationFn: submit,

        onSuccess: async (data) => {
            await SetToken(data.token)
            router.replace("/shop/products")
        },

    })



    async function SendCode() {
        try {
            setIsShowText(true)
            await Axios({
                url: "/Api/sendEmail",
                method: "post",
                body: {
                    email: getValues("email"),
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(function () {


        if (!isShowText) {
            DeleteCodeEmail()
        }
    }, [isShowText])

    return (
        <div>

            <form className="pt-36" onSubmit={handleSubmit((data) => mutate(data))}>
                <fieldset className="flex flex-col justify-center items-center" disabled={isPending}>

                    <Input className="text-sm" size="sm" type="text" placeholder="User Name." {...register("username")} />
                    {errors.username && <p className="mb-0.5 text-red-500 text-xs text-center">{errors.username?.message}</p>}


                    <div className="w-3/6 flex flex-col justify-center items-center">

                        <div className="w-full flex flex-col justify-center items-center">
                            <Input className="text-sm" size="full" disabled={isShowText} type="email" placeholder="Email." {...register("email")} />
                            {errors.email && <p className="mb-0.5 text-red-500 text-xs text-center">{errors.email?.message}</p>}
                        </div>

                        <div className="flex flex-col justify-center items-center md:flex-row w-9/12 my-2 mx-1 gap-1">
                            <Button className="text-xs w-full" disabled={isShowText} type="button" onClick={async () => {

                                const isEmail = await trigger("email")
                                if (!isEmail) return
                                setIsShowInput(true)
                                await SendCode()

                            }}>{!isShowText ? "Send Code" : <Timer setIsShowText={setIsShowText} valueTime={2 * 60} />}</Button>{/* اینجا به ثانیه بده؟ */}


                            {isShowText && <Button className="text-xs w-full" onClick={() => {
                                DeleteCodeEmail()
                                setIsShowText(false)
                            }}>
                                Change Email</Button>
                            }
                        </div>

                    </div>

                    {
                        isShowInput &&

                        <>
                            <Input className="text-sm" size="sm" type="text" placeholder="Enter Code." {...register("code")} />
                            {errors.code && <p className="mb-0.5 text-red-500 text-xs text-center">{errors.code?.message}</p>}

                        </>

                    }

                    <Input className="text-sm" size="sm" type="password" placeholder="PassWord." {...register("password")} />
                    {errors.password && <p className="mb-0.5 text-red-500 text-xs text-center">{errors.password?.message}</p>}

                    <Input className="text-sm" size="sm" type="password" placeholder="Repeat PassWord." {...register("passwordrepeat")} />
                    {errors.passwordrepeat && <p className="mb-0.5 text-red-500 text-xs text-center">{errors.passwordrepeat?.message}</p>}

                    <Button className="text-sm mt-1.5 mb-3" size="xl" type="submit">Send</Button>

                </fieldset>
            </form>


            {isError && <p className="mb-5 text-red-500 text-xl text-center">Please check your Internet</p>}

        </div>
    )
}