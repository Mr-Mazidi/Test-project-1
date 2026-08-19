"use client"

import { Axios } from "@/app/Api/Axios"
import Button from "@/app/components/button"
import Options from "@/app/components/Options"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { MoveRightIcon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const schama = z.object({
    firstNum: z.string().max(10, { error: "The value must be more than 6 characters" }).refine(
        (value) => { return Number(value) }, { error: "The number is incorrect." }).refine(
            (value) => { return Number(value) > 0 }, { error: "The number must be greater than zero." }
        ),
    sourceCurrency: z.string(),
    destinationCurrecy: z.string(),
})

type DataFormType = z.infer<typeof schama>

export default function Page() {

    const [result, setResult] = useState<string>("")
    const [valueFirstNum, setValueFirstNum] = useState<string>("0")

    const { register, formState: { errors }, handleSubmit, getValues } = useForm<DataFormType>({

        defaultValues: {

            firstNum: "0",
            sourceCurrency: "USD",
            destinationCurrecy: "EUR",

        },

        resolver: zodResolver(schama)
    })


    const { isPending, isError, mutate } = useMutation({

        mutationKey: ["Money"],
        mutationFn: async (data: DataFormType) => {
            return await Axios({
                url: `/Api/currency?amount=${valueFirstNum}&from=${data.sourceCurrency}&to=${data.destinationCurrecy}`,
                method: "get"
            })
        },

        onSuccess: (data) => {
            setResult(Number(data.rates[getValues("destinationCurrecy")]).toLocaleString("en-US"))
            console.log(1, data)
        }

    })



    return (
        <div className="pt-40 w-full h-screen min-h-96">

            <form onSubmit={handleSubmit((data) => {
                if (data.destinationCurrecy === data.sourceCurrency) {
                    setResult(Number(data.firstNum).toLocaleString("en-US"))
                    return
                }


                mutate(data)
            })}>
                <fieldset className="flex flex-col justify-center items-center gap-3" disabled={isPending}>



                    <input
                        type="text"
                        maxLength={10}
                        className="
                            w-5max-w-52 max-w-52 
                            border-b-2 border-black
                            text-center
                            outline-none

                            disabled:opacity-50
                            "

                        {...register("firstNum", {

                            onChange: (e) => {
                                setValueFirstNum(e.target.value)
                                setResult("")

                            }

                        })}

                    />



                    <div className="flex flex-col md:flex-row justify-center items-center mt-3">

                        <div className="group flex flex-col md:flex-row justify-center items-center ">

                            <label className="disabled:opacity-50" htmlFor="From">{Number(valueFirstNum).toLocaleString("en-US")}</label>
                            <select className="
                            text-center
                            bg-blue-300 
                            rounded-md 
                            cursor-pointer  
                            p-2 m-1
                            

                            disabled:opacity-50
                            disabled:cursor-not-allowed
                            "

                                id="From"
                                {...register("sourceCurrency", {

                                    onChange: () => {
                                        setResult("")
                                    }
                                })}>
                                <Options value="USD"> USD دلار آمریکا</Options>
                                <Options value="EUR"> EUR یورو</Options>
                                <Options value="GBP"> GBP پوند انگلیس</Options>
                                <Options value="JPY"> JPY ین ژاپن</Options>
                                <Options value="CHF"> CHF فرانک سوئیس</Options>
                                <Options value="CAD"> CAD دلار کانادا</Options>
                                <Options value="CNY"> CNY یوان چین</Options>
                                <Options value="TRY"> TRY لیر ترکیه</Options>
                            </select>


                        </div>

                        <MoveRightIcon className="m-5 rotate-90 md:rotate-0" size={40} strokeWidth={2} />

                        <div className="flex flex-col md:flex-row justify-center items-center group">




                            <label className="" htmlFor="to">{result || "_____"}</label>

                            <select className="text-center bg-blue-300
                                rounded-md
                                cursor-pointer
                                p-2 m-3 
                                

                                disabled:opacity-50
                                disabled:cursor-not-allowed
                                "
                                id="to"
                                {...register("destinationCurrecy", {
                                    onChange: () => {
                                        setResult("")
                                    }
                                })}>

                                <Options value="USD"> USD دلار آمریکا</Options>
                                <Options value="EUR"> EUR یورو</Options>
                                <Options value="GBP"> GBP پوند انگلیس</Options>
                                <Options value="JPY"> JPY ین ژاپن</Options>
                                <Options value="CHF"> CHF فرانک سوئیس</Options>
                                <Options value="CAD"> CAD دلار کانادا</Options>
                                <Options value="CNY"> CNY یوان چین</Options>
                                <Options value="TRY"> TRY لیر ترکیه</Options>

                            </select>


                        </div>

                    </div>

                    <Button type="submit" >Change</Button>

                    {errors.firstNum && <p>{errors.firstNum.message}</p>}
                    {isError && <p>Try again later.</p>}
                </fieldset >
            </form >



        </div >
    )
}