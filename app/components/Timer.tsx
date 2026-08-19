import { useEffect, useState } from "react"


export default function Timer({ valueTime, setIsShowText }: { valueTime: number, setIsShowText: React.Dispatch<React.SetStateAction<boolean>> }) {


    const [time, setTime] = useState<number>(valueTime)

    useEffect(function () {
        if (time < 0) setIsShowText(false)

        const timer = setInterval(function () {
            setTime((num) => num - 1)
        }, 1000)

        const clearTimer = setTimeout(function () {
            clearInterval(timer)
        }, valueTime * 1000)

        return () => {
            clearInterval(timer)
            clearTimeout(clearTimer)
        }
    }, [setIsShowText, valueTime, time])

    return (
        <p>{`
            ${Math.floor(time / 60)

            } :
             ${time % 60 < 10 ? `0${time % 60}` : time % 60

            }`}</p>
    )
}