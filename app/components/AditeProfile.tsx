"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Input from "./input";
import Button from "./button";



const schema = z.object({
    name: z.string().min(
        3, { error: "The name must be more than 3 characters" }).max(
            20, { error: "The name must be not more than 300 characters" }),

    fullName: z.string().min(
        6, { error: "The full name must be more than 6 characters" }).max(
            30, { error: "The full name must be not more than 300 characters" }),

    age: z.string().refine(

        (value) => {
            return Number(value)

        }, { error: "Enter your age corrently" }).refine(

            (value) => {
                const age = Number(value)
                return age > 15

            }, { error: "Age must be more than 15" }),

    phone: z.string().length(11, { error: "Enter your number phone corrently" }).refine((value) => {
        return Number(value)

    }, { error: "Enter your number phone corrently" }),

    biography: z.string().max(300, { error: "The biography must be not more than 300 characters" }),
})

type DataForm = z.infer<typeof schema>

export default function AditeProfile({ setData, setIsShowAdite, data }: {

    setData: React.Dispatch<SetStateAction<DataForm>>,
    setIsShowAdite: React.Dispatch<SetStateAction<boolean>>,
    data: DataForm

}) {


    const submit = function (data: DataForm) {
        setData({
            name: data.name,
            fullName: data.fullName,
            age: data.age,
            phone: data.phone,
            biography: data.biography || "Please write one biography for yourself",
        })
        setIsShowAdite(false)
    }

    const { register, formState: { errors }, handleSubmit } = useForm<DataForm>({

        resolver: zodResolver(schema),

        defaultValues: {
            name: `${data.name}`,
            fullName: `${data.fullName}`,
            age: `${data.age}`,
            phone: `${data.phone}`,
            biography: `${data.biography}`,
        }

    })


    return (



        <form className="
         flex flex-col justify-center items-center
         pt-4
         h-full
         " onSubmit={handleSubmit((data) => submit(data))}>

            <Input type="text" placeholder={"Enter a name for yourself"} {...register("name")} />
            {errors.name && <p className="text-red-700">{errors.name.message}</p>}

            <Input type="text" placeholder={"Enter your fullName"} {...register("fullName")} />
            {errors.fullName && <p className="text-red-700">{errors.fullName.message}</p>}

            <Input type="text" placeholder={"Enter your age"} {...register("age")} />
            {errors.age && <p className="text-red-700">{errors.age.message}</p>}

            <Input type="text" placeholder={"Enter your number phone"} {...register("phone")} />
            {errors.phone && <p className="text-red-700">{errors.phone.message}</p>}

            <Input type="text" placeholder={"Enter your biography"} {...register("biography")} />
            {errors.biography && <p className="text-red-700">{errors.biography.message}</p>}


            <div className="w-full flex justify-center items-center">

                <Button className="w-1/6 m-3" onClick={() => setIsShowAdite(false)}>
                    Cancel
                </Button>

                <Button className="w-1/6 m-3" type="submit">
                    Send
                </Button>

            </div>


        </form>
    )
}