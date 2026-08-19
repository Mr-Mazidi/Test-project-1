import { Loader } from "lucide-react"

export default function Loading() {

    return (

        <div className="w-full h-screen fixed z-40 flex justify-center items-center bg-gray-400/30 backdrop-blur-3xl text-blue-50">

            <Loader size={50} className="Loading" />

        </div>

    )
}